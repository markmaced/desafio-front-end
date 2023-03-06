import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import './registerServiceWorker'

const app = createApp(App)

app.use(router)
app.use(store)
app.component('BootstrapIcon', BootstrapIcon)
app.use(VueSweetalert2)

app.mount('#app')