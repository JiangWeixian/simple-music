<template>
  <div class="tweets" :class="{ 'preview': show }">
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
      class="tweets-content"
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
      <div class="loading">
        <li v-for="item in pushTweets"
            is="LoadingTweetsCard">
        </li>
      </div>
      <div class="blank"></div>
    </scroll>
  </div>
</template>

<script>
  import ImgPreViewer from "@/components/base/Viewer/ImgPreViewer";
  import TweetsCard from "@/components/base/CollectItem/TweetsCard";
  import LoadingTweetsCard from '@/components/base/CollectItem/LoadingTweetsCard'
  import Scroll from "@/components/base/Scroll/Scroll";
  import login from '../../api/login'
  import tweets from '../../api/tweets'
  import formatter from 'assets/js/formatter.js'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      Scroll,
      LoadingTweetsCard,
      TweetsCard,
      ImgPreViewer},
    name: "Tweets",
    data() {
      return {
        show: false,
        isLoading: true,
        screenWidth: 0,
        screenHeight: 0,
        scrollY: 0,
        pushTweets: [1, 2],
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
            midLineY = (this.screenHeight / 2 + -this.scrollY)
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
      function promiseCallBack(arr, data) {
        return new Promise((resolve, reject) => {
          arr = arr.concat(data)
          resolve(arr)
        })
      }
      login.GetFollowsData(this.uId)
        .then((res) => {
          let followers = res.data.follow,
            followersId = followers.map((item) => { return item.userId })
          tweets.GetFollowerTweets(followersId, promiseCallBack)
            .then((data) => {
              // this._formatEvents(data)
              formatter._formatEvents(data)
                .then((formattedData)=> {
                  this.pushTweets = formattedData
                  this.isLoading = false
                })
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
  @import "./Tweets.styl"
</style>
