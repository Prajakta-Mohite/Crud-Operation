import {
    createApp
} from 'vue'

import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.min.css'


const app = createApp(App)

app.use(Vuelidate)

app.use(VueSweetalert2);

app.mount('#app');