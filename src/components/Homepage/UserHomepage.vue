<template>
  <div class="user-homepage">
    <div class="user-homepage-header nav-panel-wrapper" ref="nav">
      <div class="nav-panel" v-if="!isLoading">
        <span class="nav-header action-backward" @click="_backward">
          <i class="material-icons md-56 md-light">keyboard_arrow_left</i>
        </span>
        <div class="nav-body panel">
          <p v-show="isTitle">{{ userInfo.userName }}</p>
        </div>
        <div class="nav-tail blank"></div>
        <div class="bg" v-show="isCover">
          <img v-lazy="bgObj" alt="background">
        </div>
      </div>
      <div class="nav-panel loading" v-else>
        <span class="nav-header action-backward">
          <i class="material-icons md-56 md-light">keyboard_arrow_left</i>
        </span>
        <div class="nav-body panel"></div>
        <div class="nav-tail blank"></div>
      </div>
    </div>
    <div class="homepage-routerlink" v-show="isShowLinks" :style="routerStyle">
      <router-link class="tab-item" tag="div" :to="musicPath">
        <span class="tab-link">音乐</span>
        <span>{{ userInfo.userPlayListNum }}</span>
      </router-link>
      <router-link class="tab-item" tag="div" :to="tweetsPath">
        <span class="tab-link">动态</span>
        <span>{{ userInfo.userTweetsNum }}</span>
      </router-link>
    </div>
    <div class="user-homepage-body" :class="{'preview': isEndScroll}">
      <section class="homepage-bg" ref="bkg">
        <div class="bg" v-if="!isLoading">
          <img v-lazy="bgObj" alt="background">
        </div>
        <div class="img" v-else></div>
      </section>
      <scroll
        :probeType="3"
        :listenScroll="isListenScroll"
        :isEndScroll="isEndScroll"
        :click="true"
        @scroll="_getCurrentPos"
        class="user-homepage-content">
        <section class="homepage-accountInfo" v-if="!isLoading" ref="account">
          <div class="account-avatar"><img v-lazy="userInfo.userAvatarUrl" alt="account-avatar"></div>
          <div class="account-brief">
            <div class="row account-name">
              <h1>{{ userInfo.userName }}</h1>
            </div>
            <ul class="row account-detail">
              <li class="account-level">
                <p>等级</p>
                <span><i>Lv </i>{{ userInfo.level }}</span>
              </li>
              <li>
                <p>关注</p>
                <span>{{ userInfo.userFollowers }}</span>
              </li>
              <li>
                <p>粉丝</p>
                <span>{{ userInfo.userFans }}</span>
              </li>
            </ul>
            <div class="row account-signature">
              <p class="ellipsis">{{ userInfo.userSignature }}</p>
            </div>
          </div>
        </section>
        <section class="homepage-accountInfo loading" v-else ref="account">
          <div class="account-avatar"></div>
          <div class="account-brief">
            <div class="row account-name">
              <h1 class="tbw-box"></h1>
            </div>
            <ul class="row account-detail">
              <li>
                <p class="tbw-box"></p>
                <span class="tbw-box"></span></li>
              <li>
                <p class="tbw-box"></p>
                <span class="tbw-box"></span></li>
              <li>
                <p class="tbw-box"></p>
                <span class="tbw-box"></span></li>
            </ul>
            <div class="row account-signature tbw-box"></div>
          </div>
        </section>
        <section class="homepage-routerlink" :class="{ 'loading': isLoading }" ref="links">
          <router-link class="tab-item" tag="div" :to="musicPath">
            <span class="tab-link">音乐</span>
            <span>{{ userInfo.userPlayListNum }}</span>
          </router-link>
          <router-link class="tab-item" tag="div" :to="tweetsPath">
            <span class="tab-link">动态</span>
            <span>{{ userInfo.userTweetsNum }}</span>
          </router-link>
        </section>
        <section class="homepage-user-subcount" ref="subcount">
          <div class="homepage-cards">
            <keep-alive>
              <router-view
                :scroll-y="scrollY"
                :viewer-offset-y="accountTop"
                :page-offset-y="subcountTop"
                @getPreviewStatus="_getPreviewStatus">
              </router-view>
            </keep-alive>
          </div>
        </section>
        <div class="blank"></div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import login from '../../api/login'
  import Scroll from "../base/Scroll/Scroll"

  export default {
    name: "UserHomepage",
    components: {
      Scroll
    },
    props: ['id'],
    data() {
      return {
        name: 'UserHomepage',
        isLoading: true,
        fromPath: '/',
        userInfo: {
          level: 9,
          userName: '姜维',
          userFollowers: 18,
          userFans: 5,
          userSignature: '我会努力的',
          userTweetsNum: 14,
          userPlayListNum: 41,
          userAvatarUrl: require("../../assets/img/default_avatar.png"),
        },
        // config for scroll
        isListenScroll: true,
        screenHeight: 0,
        scrollY: 0,
        maxScrollY: 173,
        isEndScroll: false,
        // config for navpanel
        navHeight: 52,
        // config for links
        linksHeight: 0,
        // config for account
        accountTop: 77,
        // config for subcount
        subcountTop: 0
      }
    },
    watch: {
      scrollY(val, oldVal) {
        let maxScrollY = 120
        if (val > 0) {
          let scale = 1 + (val/maxScrollY)
          Velocity(this.$refs.bkg, { scaleX: scale, scaleY: scale }, { duration: 0 })
        }
      },
      id(val, oldVal) {
        login.GetUserDetail(val)
          .then((res) => {
            this._formatUserInfo(res.data)
            this.$router.push({path: `/user/${val}/music`})
          })
      },
      '$route'(to, from) {
        if (this._filter(to, from)) {
          this.fromPath = from.path
        }
      }
    },
    computed: {
      routerStyle() {
        return {
          position: 'fixed',
          zIndex: 1,
          top: `${this.navHeight}px`
        }
      },
      bgObj() {
        return {
          src: this.userInfo.userBgUrl,
          error: require("../../assets/img/default_user_bg.jpg"),
          loading: require("../../assets/img/default_user_bg.jpg")
        }
      },
      musicPath() {
        return `/user/${this.id}/music`
      },
      tweetsPath() {
        return `/user/${this.id}/tweets`
      },
      isTitle() {
        return this.scrollY <= -this.maxScrollY? true:false
      },
      isCover() {
        return this.scrollY <= 0? true:false
      },
      isShowLinks() {
        return -this.scrollY > this.maxScrollY? true:false
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.navHeight = this.$refs.nav.offsetHeight
        this.linksHeight = this.$refs.links.offsetHeight
        this.accountTop = this.$refs.account.offsetTop
        this.subcountTop = this.$refs.subcount.offsetTop
        this.maxScrollY = this.$refs.account.offsetHeight + this.accountTop - this.navHeight
      })
    },
    methods: {
      _filter(to, from) {
        return (to.name && to.name === 'UserHomepageMusic') && (from.name && from.name !== 'UserHomepageMusic' && from.name !== 'UserHomepageTweets')
      },
      _backward() {
        this.$router.push({path: this.fromPath, query: {transition: 'slide-left'}})
      },
      _getPreviewStatus(data) {
        this.isEndScroll = data
      },
      _getCurrentPos(data) {
        this.scrollY = data.y
      },
      _formatUserInfo(data) {
        let userInfo = {
          level: data.level,
          userName: data.profile.nickname,
          userFollowers: data.profile.follows,
          userFans: data.profile.followeds,
          userSignature: data.profile.signature,
          userTweetsNum: data.profile.eventCount,
          userPlayListNum: data.profile.playlistCount,
          userAvatarUrl: data.profile.avatarUrl,
          userBgUrl: data.profile.backgroundUrl
        }
        this.userInfo = userInfo
        this.isLoading = false
      }
    },
    created() {
      login.GetUserDetail(this.id)
        .then((res) => {
          this._formatUserInfo(res.data)
        })
      this.screenHeight = document.documentElement.offsetHeight || document.body.offsetHeight
    }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" type="text/stylus" scoped>
  @import "./UserHomepage.styl"
</style>
