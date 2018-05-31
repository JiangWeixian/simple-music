<template>
  <div class="singer-albums">
    <div v-if="!isLoading">
      <p class="title">按发行日期排序</p>
      <img-collect-item
        v-for="item in sortedAlbums"
        :key="item.id"
        :img-url="item.picUrl"
        :item-name="item.name"
        :item-intro="`${item.publishTime} ${item.size}首`"
        item-type="musiclist">
      </img-collect-item>
    </div>
    <div v-else>
      <p class="title tbw-box"></p>
      <loading-img-collect-item
        v-for="item in albums"
        item-type="musiclist">
      </loading-img-collect-item>
    </div>
  </div>
</template>

<script>
  import song from "../../api/song"
  import ImgCollectItem from "../base/CollectItem/ImgCollectItem"
  import LoadingImgCollectItem from "../base/CollectItem/LoadingImgCollectItem"

  export default {
    name: "SingerAlbums",
    props: ['id'],
    components: {
      ImgCollectItem,
      LoadingImgCollectItem
    },
    data() {
      return {
        isLoading: true,
        albums: [1,2,3,4,5,6,7]
      }
    },
    watch: {
      id(val, oldVal) {
        song.GetSingerAlbums(val)
          .then((res) => {
            this._formatAblums(res.data.hotAlbums)
          })
      }
    },
    computed: {
      sortedAlbums() {
        this.albums.sort((a, b) => {
          return b.publishTime - a.publishTime
        })
        return this.albums.map((item) => {
          let date = new Date(item.publishTime)
          item.publishTime = date.toLocaleDateString().split('/').join('-')
          return item
        })
      }
    },
    methods: {
      _formatAblums(data) {
        this.albums = data
        this.isLoading = false
      }
    },
    created() {
      song.GetSingerAlbums(this.id)
        .then((res) => {
          this._formatAblums(res.data.hotAlbums)
        })
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus" type="text/stylus" scoped>
  @import "./SingerAlbums.styl"
</style>
