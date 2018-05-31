<template>
  <div class="img-collect-item loading-img-collect-item" :class="collectItemClassName">
    <div class="img-collect-item-header">
      <div class="img"></div>
    </div>
    <div class="img-collect-item-body">
      <h2 class="tbw-box"></h2>
      <p class="tbw-box"></p>
    </div>
    <div class="img-collect-item-tail">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "loading-img-collect-item",
    props: {
      itemType: {
        type: String
      }
    },
    computed: {
      collectItemClassName() {
        return `${this.itemType}-img-collect-item`
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "./ImgCollectItem.styl"
</style>
