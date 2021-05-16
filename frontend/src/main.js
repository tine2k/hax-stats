import moment from 'moment';
import {createApp} from 'vue';
import App from './App.vue';
import './index.css';
import {createRouter, createWebHistory} from 'vue-router';
import {createStore} from 'vuex';
import Games from '@/components/games/Games';
import HighScores from '@/components/highscores/HighScores';
import {firstBy} from 'thenby';

moment.locale('de');

const routes = [
    {path: '/', redirect: '/games'},
    {path: '/games/:id?', name: 'games', component: Games, props: true},
    {path: '/highscores', name: 'highscores', component: HighScores}
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

const store = createStore({
    state() {
        return {
            games: null,
            selectedGame: null,
            filter: {
                lastGames: '20g',
                equalTeamSize: true,
            },
            filteredGames: null
        };
    },
    mutations: {
        loadGames(state, games) {
            state.games = games.sort(firstBy('start', {direction: 'desc'}));
            state.filteredGames = filterGames(state.games, state.filter.lastGames, state.filter.equalTeamSize);
        },
        selectGame(state, game) {
            state.selectedGame = game;
        },
        filterLastGames(state, lastGames) {
            state.filter.lastGames = lastGames;
            state.filteredGames = filterGames(state.games, state.filter.lastGames, state.filter.equalTeamSize);
        },
        filterEqualTeamSize(state, equalTeamSize) {
            state.filter.equalTeamSize = equalTeamSize;
            state.filteredGames = filterGames(state.games, state.filter.lastGames, state.filter.equalTeamSize);
        }
    }
});

const filterGames = (games, lastGames, equalTeamSize) => {
    let filteredGames = games;
    if (equalTeamSize) {
        filteredGames = games.filter(g => g.players.filter(p => p.team === 1).length === g.players.filter(p => p.team === 2).length);
    }
    if (lastGames.endsWith('d')) {
        const days = parseInt(lastGames.substring(0, lastGames.length - 1));
        filteredGames = filteredGames.filter(g => moment(g.start).add(days, 'days').isAfter())
    } else if (lastGames.endsWith('g')) {
        const count = parseInt(lastGames.substring(0, lastGames.length - 1));
        filteredGames = filteredGames.slice(0, count);
    }
    return filteredGames;
};

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('body');
app.config.globalProperties.$filters = {
    formatDateTime(value, pattern) {
        return moment(value).format(pattern ? pattern : 'LLLL');
    },
    formatDuration(value) {
        return moment.utc(Math.round(value * 1000)).format('m:ss');
    }
};

// prevent cursor key from scrolling
window.addEventListener("keydown", e => {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
