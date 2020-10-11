import { createApp } from 'vue'
import Root from '@/components/core/Root/Root.vue'
import router from '@/core/router'
import store from '@/core/store'

import '@/core/styles/global.scss'

createApp(Root)
  .use(store)
  .use(router)
  .mount('#app')
