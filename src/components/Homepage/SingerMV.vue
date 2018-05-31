<template>
  <div class="singer-mv">
    <div class="loaded" v-if="!isLoading">
      <img-collect-item
        v-for="item in mvs"
        :key="item.id"
        @getClickStatus="_linkMv(item.id)"
        :img-url="item.imgurl"
        :item-badge="item.playCount"
        :item-name="item.name"
        :item-intro="`@${item.artistName}`"
        item-type="mv">
      </img-collect-item>
    </div>
    <div class="loading" v-else>
      <loading-img-collect-item
        v-for="item in mvs"
        item-type="mv">
      </loading-img-collect-item>
    </div>
  </div>
</template>

<script>
  import song from "../../api/song"
  import ImgCollectItem from "../base/CollectItem/ImgCollectItem"
  import LoadingImgCollectItem from "../base/CollectItem/LoadingImgCollectItem"

  export default {
    name: "SingerMV",
    components: {
      ImgCollectItem,
      LoadingImgCollectItem
    },
    props: ['id'],
    data() {
      return {
        mvs: [1,2,3,4,5,6],
        isLoading: true
      }
    },
    watch: {
      id(val, oldVal) {
        song.GetSingerMV(val)
          .then((res) => {
            this._formatMvs(res.data.mvs)
          })
      }
    },
    methods: {
      _formatMvs(data) {
        this.mvs = data
        this.isLoading = false
      },
      _linkMv(id) {
        this.$router.push({path: '/mvh', query: {vid: id, transition: 'slide-right'}})
      }
    },
    created() {
      song.GetSingerMV(this.id)
        .then((res) => {
          this._formatMvs(res.data.mvs)
        })
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus" type="text/stylus" scoped>
  @import "./SingerMV.styl"
</style>

