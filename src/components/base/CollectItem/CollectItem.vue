<template>
  <div class="collect-item" :class="collectItemClassName">
    <p class="collect-item-header" v-if="itemType === 'icon'"><i class="material-icons md-48">{{ headerIconName }}</i></p>
    <div class="collect-item-body">
      <p>{{ itemName }}</p>
      <span class="badge" v-if="badgeNum">{{ badgeNum }}</span>
    </div>
    <p class="collect-item-tail"><i class="material-icons md-48">{{ tailIconName }}</i></p>
  </div>
</template>

<script>
    export default {
      name: "collect-item",
      props: {
        headerIconName: {
          type: String,
        },
        itemName: {
          type: String,
          required: true
        },
        tailIconName: {
          type: String
        },
        badgeNum: {
          type: String,
          default: '5'
        },
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

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./CollectItem.styl"
</style>


