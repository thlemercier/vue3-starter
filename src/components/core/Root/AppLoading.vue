<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppLoading',
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scopped src="./AppLoading.scss"></style>
<template>
  <section id="app-loading">
    <h1>Application</h1>
    <svg
      class="spinner"
      viewBox="0 0 50 50"
    >
      <circle
        class="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      />
    </svg>
  </section>
</template>
