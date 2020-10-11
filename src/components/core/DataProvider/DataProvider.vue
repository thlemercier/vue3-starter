<script lang="ts">
import { AppStore } from '@/core/store'
import { AppModuleActionTypes } from '@/core/store/typings/app.module.interface'
import { MyInterface } from '@/core/typings'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DataProvider',
  async setup () {
    const appStore = useStore<AppStore>()
    const myInterfaces = computed<MyInterface[]>(() => appStore.state.app.myInterfaces)

    await appStore.dispatch(`app/${AppModuleActionTypes.FETCH_MANDATORY_DATA}`)
    await new Promise(resolve => setTimeout(resolve, 5000))
  },
})
</script>

<template>
  <slot />
</template>
