<template>
  <div class="followers">
    <div class="nav-panel-wrapper">
      <div class="nav-panel">
        <span class="nav-header action-backward" @click="_backward">
          <i class="material-icons md-56 md-light">keyboard_arrow_left</i>
        </span>
        <div class="nav-body panel">
          <p>关注</p>
        </div>
        <div class="nav-tail blank"></div>
      </div>
    </div>
    <scroll
      :click="true"
      class="followers-content">
      <div class="loaded" v-if="!isLoading">
        <img-collect-item
          v-for="item in followerData"
          @getClickStatus="_link(item.userId)"
          :key="item.nickname"
          :img-url="item.avatarUrl"
          :item-name="item.nickname"
          :item-intro="item.signature"
          item-type="fans">
        </img-collect-item>
      </div>
      <div class="loading" v-else>
        <loading-img-collect-item
          v-for="item in followerData"
          item-type="fans">
        </loading-img-collect-item>
      </div>
      <div class="blank"></div>
    </scroll>
  </div>
</template>

<script>
  import ImgCollectItem from "../base/CollectItem/ImgCollectItem";
  import LoadingImgCollectItem from "../base/CollectItem/LoadingImgCollectItem";
  import Scroll from "../base/Scroll/Scroll"
  import api from "../../api/login"
  import { mapGetters } from "vuex"

  export default {
    components: {
      ImgCollectItem,
      LoadingImgCollectItem,
      Scroll},
    name: "followers",
    data() {
      return {
        isLoading: false,
        tailIconName: 'more_horiz',
        fromPath: '/account',
        followerData: [1,2,3,4,5,6,7,8]
      }
    },
    computed: {
      ...mapGetters(['uId'])
    },
    methods: {
      _backward() {
        this.$router.push({path: this.fromPath, query: {transition: 'slide-left'}})
      },
      _formatFollowData(followers) {
        this.followerData = followers
        this.isLoading = false
      },
      _link(id) {
        this.$router.push({path: `/user/${id}`, query: {transition: 'slide-right'}})
      }
    },
    created() {
      api.GetFollowsData(this.uId)
        .then((res) => {
          this._formatFollowData(res.data.follow)
        })
    }
  }
</script>

<style type="text/stylus" rel="stylesheet/stylus" lang="stylus" scoped>
  @import "./Followers.styl"
</style>
