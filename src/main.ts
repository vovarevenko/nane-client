import { Quasar } from 'quasar'
import { quasarOptions } from '@/quasar-options'
import { createApp } from 'vue'
import App from '@/App.vue'
import { router } from '@/router'
import { store } from '@/store'

import './styles/master.sass'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(Quasar, quasarOptions)
app.mount('#app')
