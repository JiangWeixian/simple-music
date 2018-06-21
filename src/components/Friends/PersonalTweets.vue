<template>
  <div class="personal-tweets" :class="{ 'preview': show }">
    <div class="nav-panel-wrapper">
      <div class="nav-panel">
        <span class="nav-header action-backward" @click="_backward">
          <i class="material-icons md-56 md-light">keyboard_arrow_left</i>
        </span>
        <div class="nav-body panel">
          <p>动态</p>
        </div>
        <div class="nav-tail blank"></div>
      </div>
    </div>
    <img-pre-viewer
      :show="show"
      :index="currentIndex"
      :img-arr="currentImageList"
      :scale="currentImgScale"
      :width="currentWidth"
      :height="currentHeight"
      :offset-x="currentOffsetX"
      :offset-y="currentOffsetY"
      :mid-x="currentMidLineX"
      :mid-y="currentMidLineY"
      @clickit="_previewImg">
    </img-pre-viewer>
    <scroll
      :click="true"
      class="personal-tweets-content"
      @getCurrentY="_getCurrentY"
      :listen-scroll="true">
      <div class="loaded" v-if="!isLoading">
        <li v-for="item in pushTweets"
            is="TweetsCard"
            @getTargetInfo="_getTargetInfo"
            :key="item.tweetsTime"
            :data="item">
        </li>
      </div>
      <div class="loading" v-else>
        <li v-for="item in pushTweets"
            is="LoadingTweetsCard">
        </li>
      </div>
      <div class="blank"></div>
    </scroll>
  </div>
</template>

<script>
  import ImgPreViewer from "../base/Viewer/ImgPreViewer";
  import InfCircleLoader from "../base/Loader/InfCircleLoader";
  import TweetsCard from "../base/CollectItem/TweetsCard";
  import LoadingTweetsCard from "../base/CollectItem/LoadingTweetsCard"
  import Scroll from "../base/Scroll/Scroll";
  import tweets from '../../api/tweets'
  import song from '../../api/song'
  import formatter from 'assets/js/formatter.js'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      Scroll,
      TweetsCard,
      InfCircleLoader,
      LoadingTweetsCard,
      ImgPreViewer},
    name: " PersonalTweets",
    data() {
      return {
        show: false,
        isLoading: true,
        screenWidth: 0,
        screenHeight: 0,
        scrollY: 0,
        pushTweets: [1,2,3],
        currentMidLineX: 0,
        currentMidLineY: 0,
        currentImgScale: 0.5,
        currentWidth: 0,
        currentOffsetX: 0,
        currentHeight: 0,
        currentOffsetY: 0,
        currentIndex: 0,
        currentImageList:[
          { width: 750, type: 'normal', index: 0, url: 'https://raw.githubusercontent.com/JiangWeixian/simple-music/dev/src/assets/img/default_unloadimg.png' },
          { width: 750, type: 'normal', index: 1, url: 'https://raw.githubusercontent.com/JiangWeixian/simple-music/dev/src/assets/img/default_avatar.png' },
          { width: 750, type: 'long', index: 2, url: 'https://raw.githubusercontent.com/JiangWeixian/simple-music/dev/src/assets/img/test_longpics.jpg' },
          { width: 750, type: 'normal', index: 3, url: 'https://raw.githubusercontent.com/JiangWeixian/simple-music/dev/src/assets/img/default_unloadimg.png' },
          { width: 750, type: 'normal', index: 4, url: 'https://raw.githubusercontent.com/JiangWeixian/simple-music/dev/src/assets/img/default_avatar.png' },
          { width: 750, type: 'long', index: 5, url: 'https://raw.githubusercontent.com/JiangWeixian/simple-music/dev/src/assets/img/test_longpics.jpg' },
          { width: 750, type: 'normal', index: 6, url: 'https://raw.githubusercontent.com/JiangWeixian/simple-music/dev/src/assets/img/default_unloadimg.png' },
          { width: 750, type: 'normal', index: 7, url: 'https://raw.githubusercontent.com/JiangWeixian/simple-music/dev/src/assets/img/default_avatar.png' },
          { width: 750, type: 'long', index: 8, url: 'https://raw.githubusercontent.com/JiangWeixian/simple-music/dev/src/assets/img/test_longpics.jpg' }
        ],
        fromPath: '/account',
      }
    },
    watch: {
      // Maybe store preview flag(show) into vuex
      show(val, oldVal) {
        let body = document.querySelector('body')
        if (val) {
          console.log(val)
          body.classList.add('preview')
        }
        else {
          body.classList.remove('preview')
        }
      }
    },
    computed: {
      ...mapGetters(['uId'])
    },
    methods: {
      _backward() {
        this.$router.push({path: this.fromPath, query: {transition: 'slide-left'}})
      },
      _previewImg() {
        this.show = false
      },
      _getCurrentY(y) {
        this.scrollY = y
      },
      _getTargetInfo(payload) {
        if (payload['isImageList']) {
          let midLineX = this.screenWidth / 2,
            midLineY = (this.screenHeight/2 + -this.scrollY)
          this.currentImageList = payload['imageList']
          this.currentWidth = payload['width']
          this.currentOffsetX = payload['left']
          this.currentHeight = payload['height']
          this.currentOffsetY = payload['top']
          this.currentIndex = payload['index']
          this.currentImgScale = payload['scale']
          this.currentMidLineX = midLineX
          this.currentMidLineY = midLineY
          this.show = true
          console.log(payload)
        }

      }
    },
    created() {
      tweets.GetTweets(this.uId)
        .then((res) => {
          // this._formatEvents(res.data.events)
          formatter._formatEvents(res.data.events)
            .then((formattedData)=> {
              this.pushTweets = formattedData
              this.isLoading = false
            })
        })
      this.screenWidth = document.documentElement.offsetWidth || document.body.offsetWidth
      this.screenHeight = document.documentElement.offsetHeight || document.body.offsetHeight
      this.currentMidLineX = this.screenWidth / 2
      this.currentMidLineY = this.screenHeight / 2
    }
  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./PersonalTweets.styl"
</style>
