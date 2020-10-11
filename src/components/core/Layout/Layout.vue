<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Layout',
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scopped src="./Layout.scss"></style>
<template>
  <section id="app-layout">
    <header id="layout-header">
      header
    </header>
    <main id="layout-content">
      <slot />
    </main>
  </section>
</template>
