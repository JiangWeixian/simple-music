<template>
  <div class="music-collect-item loading-music-collect-item">
    <div class="music-collect-item-wrapper">
      <div class="music-collect-item-header">
        <span v-show="isList"></span>
      </div>
      <div class="music-collect-item-body">
        <p class="tbw-box"></p>
        <div class="sub-title tbw-box"></div>
      </div>
    </div>
    <div class="music-collect-item-tail">
      <i></i>
      <i></i>
    </div>
  </div>
</template>


<script>
  export default {
    name: "loading-music-collect-item",
    props: {
      needIndex: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      isList() {
        return this.needIndex
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import "./MusicCollectItem.styl"
</style>
