<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  props: {
    msg: {
      type: String,
      default: 'No Message',
    },
  },
})
</script>

<template>
  <div>home2</div>
</template>
