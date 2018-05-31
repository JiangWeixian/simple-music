<template>
  <div class="collect-item loading-collect-item" :class="collectItemClassName">
    <p class="collect-item-header" v-if="itemType === 'icon'"></p>
    <div class="collect-item-body">
      <p></p>
    </div>
    <p class="collect-item-tail"></p>
  </div>
</template>

<script>
  export default {
    name: "loading-collect-item",
    props: {
      itemType: {
        type: String,
        required: true
      }
    },
    computed: {
      collectItemClassName() {
        return `${this.itemType}-collect-item`
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import './CollectItem.styl'
</style>
