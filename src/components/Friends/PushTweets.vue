<template>
  <div class="push-tweets" :class="{ 'preview': show }">
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
      class="push-tweets-content"
      @getCurrentY="_getCurrentY"
      :click="true"
      :listen-scroll="true">
      <div class="pushtweets" v-if="!isLoading">
        <li v-for="item in pushTweets"
            is="TweetsCard"
            @getTargetInfo="_getTargetInfo"
            :key="item.tweetsTime"
            :data="item">
        </li>
      </div>
      <div class="loading" v-if="isLoading">
        <li v-for="item in pushTweets"
            is="LoadingTweetsCard"
            :key="item.tweetsTime">
        </li>
      </div>
      <div class="blank"></div>
    </scroll>
  </div>
</template>

<script>
  import ImgPreViewer from "../base/Viewer/ImgPreViewer";
  import InfCircleLoader from "../base/Loader/InfCircleLoader";
  import LoadingTweetsCard from "../base/CollectItem/LoadingTweetsCard"
  import TweetsCard from "../base/CollectItem/TweetsCard";
  import Scroll from "../base/Scroll/Scroll";
  import formatter from 'assets/js/formatter.js';
  import tweets from '../../api/tweets'
  import song from '../../api/song'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      Scroll,
      LoadingTweetsCard,
      TweetsCard,
      InfCircleLoader,
      ImgPreViewer},
    name: "PushTweets",
    data() {
      return {
        show: false,
        isLoading: true,
        screenWidth: 0,
        screenHeight: 0,
        scrollY: 0,
        pushTweets: [1,2],
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
        ]
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
          console.log(payload, midLineY)
        }
      }
    },
    created() {
      tweets.GetEvent()
        .then((res) => {
          console.log(res)
          // this._formatEvents(res.data.event)
          let events = res.data.event.filter((item)=> {
            return item.type !== 33
          })
          formatter._formatEvents(events)
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
  @import "./PushTweets.styl"
</style>
