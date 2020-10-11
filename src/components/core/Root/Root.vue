<script lang="ts">
import { defineComponent } from 'vue'
import { DataProvider } from '@/components/core/DataProvider'
import { Layout } from '@/components/core/Layout'
import { AppLoading } from './'

export default defineComponent({
  name: 'Root',
  components: {
    DataProvider,
    Layout,
    AppLoading,
  },
})
</script>

<template>
  <Suspense>
    <template #default>
      <DataProvider>
        <template #default>
          <Layout>
            <router-view />
          </Layout>
        </template>
      </DataProvider>
    </template>
    <template #fallback>
      <AppLoading />
    </template>
  </Suspense>
</template>
