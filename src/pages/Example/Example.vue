<script>
  import Button from '@/components/uis/Button/Button.vue'
  import Unfold from '@/components/uis/Unfold/Unfold.vue'
  export default {
    name: 'example',
    data () {
      return {
        name: 'example'
      }
    },
    components: {
      Button,
      Unfold,
    },
  }
</script>

<template>
  <div id="EXAMPLE">
    this is example page
    flat-button
    <Button />
    <Unfold />
  </div>
</template>
