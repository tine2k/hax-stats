import moment from 'moment';
import {createApp} from 'vue';
import App from './App.vue';
import './index.css';

moment.locale('de');

const app = createApp(App);
app.mount('body');
app.config.globalProperties.$filters = {
    formatDateTime(value, pattern) {
        return moment(value).format(pattern ? pattern : 'LLLL');
    },
    formatDuration(value) {
        return moment.utc(Math.round(value * 1000)).format("m:ss");
    }
};
