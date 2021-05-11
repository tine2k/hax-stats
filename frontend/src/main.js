import moment from 'moment';
import {createApp} from 'vue';
import App from './App.vue';
import './index.css';
import HighScores from '@/components/layout/HighScores';
import Overview from '@/components/layout/Overview';
import {createRouter, createWebHistory} from 'vue-router';
import {createStore} from 'vuex';

moment.locale('de');

const routes = [
    {path: '/', redirect: '/overview'},
    {path: '/overview/:id?', name: 'overview', component: Overview, props: true},
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
            selectedGame: null
        };
    },
    mutations: {
        loadGames(state, games) {
            state.games = games;
        },
        selectGame(state, game) {
            state.selectedGame = game;
        }
    }
});

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
