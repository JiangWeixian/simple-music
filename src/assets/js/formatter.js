import lodashIntersection from 'lodash/intersection'
import song from '@/api/song'

var formatter = {
  _formatCreator(data = {}) {
    return {
      accountName: data ?  data.nickname : '',
      accountId: data ? data.userId : '',
    }
  },
  _formatTweet(data, type) {
    let tweet = JSON.parse(data.json),
      creator = this._formatCreator(data.user)

    return {
      type: type,
      title: tweet.msg,
      creator: creator,
      event: {
        id: creator.accountId,
        avatarUrl: data.user.avatarUrl
      }
    }
  },
  _formatSong(data, type) {
    let title = data.hasOwnProperty('transName')? `${data.name}(${data.transName[0]})`:data.name
    return {
      type: type,
      title: title,
      creator: {
        accountName: data.artists[0].name,
        accountId: data.artists[0].id
      },
      song: {
        id: data.id,
        avatarUrl: data.album.img80x80
      }
    }
  },
  _formatPlayList(data, type) {
    return {
      type: type,
      title: data.name,
      creator: this._formatCreator(data.creator),
      playlist: {
        id: data.id,
        avatarUrl: data.coverImgUrl
      }
    }
  },
  _formatCommit(data, type) {
    let resource = JSON.parse(data.resourceJson),
      creator = this._formatCreator(data.user)
    return {
      type: type,
      title: data.content,
      creator: creator,
      resource: {
        id: resource.id,
        avatarUrl: data.user.avatarUrl
      }
    }
  },
  _formatVideo(data, type) {
    return {
      type: type,
      title: data.title,
      creator: this._formatCreator(data.creator),
      video: {
        id: data.videoId,
        avatarUrl: data.coverUrl
      }
    }
  },
  _formatProgram(data, type) {
    return {
      type: type,
      title: data.name,
      creator: this._formatCreator(data.dj),
      program: {
        avatarUrl: data.coverUrl,
        id: data.id
      }
    }
  },
  _formatShared(tweetsBody) {
    let shareKeys = ["event", "song", "playlist", "video", "resource", "program"],
      keys = Object.keys(tweetsBody),
      intersection = lodashIntersection(keys, shareKeys),
      isShared = intersection.length,
      sharedContent = {}
    if (isShared) {
      let shareType = intersection[0]
      switch(shareType) {
        case "event":
          sharedContent = this._formatTweet(tweetsBody[shareType], shareType)
          break
        case "song":
          sharedContent = this._formatSong(tweetsBody[shareType], shareType)
          break
        case "playlist":
          sharedContent = this._formatPlayList(tweetsBody[shareType], shareType)
          break
        case "resource":
          sharedContent = this._formatCommit(tweetsBody[shareType], shareType)
          break
        case "video":
          sharedContent = this._formatVideo(tweetsBody[shareType], shareType)
          break
        case "program":
          sharedContent = this._formatProgram(tweetsBody[shareType], shareType)
          break
        default:
          break
      }
    }
    return {
      isShared: isShared,
      sharedContent: sharedContent
    }
  },
  _formatPics(data) {
    let pics = [],
      isPics = false,
      screenWidth = this.screenWidth,
      screenHeight = this.screenHeight
    if (data !== []) {
      isPics = true
      data.forEach((pic, index) => {
        let isLong = _isLong(pic.width, pic.height),
          formatPic = {}
        formatPic = {
          type: isLong? 'long':'normal',
          url: pic.originUrl,
          index: index
        }
        pics.push(formatPic)
      })
    }
    function _isLong(w, h) {
      let ratio = w/screenWidth,
        resizeWitdth = h/ratio
      return resizeWitdth > screenHeight
    }
    return {
      isPics: isPics,
      pics: pics
    }
  },
  _formatMv(data) {
    // let isMv = !! data.mv,
    const isMv = false,
      mv = {}
    return Promise.resolve({ isMv: isMv, mv: mv })
    // if (isMv) {
    //   return song.GetMv(data.mv.id)
    //     .then((res) => {
    //       let mvData = res.data.data
    //       mv = {
    //         id: mvData.id,
    //         videoUrls: Object.values(mvData.brs),
    //         duration: mvData.duration,
    //         playCount: mvData.playCount,
    //         title: mvData.desc,
    //         posterSrc: mvData.cover,
    //         artists: mvData.artists,
    //         videoName: mvData.name,
    //         type: 'video/mp4'
    //       }
    //       return Promise.resolve({ isMv: isMv, mv: mv })
    //     })
    // }
    // else {
    //   return Promise.resolve({ isMv: isMv, mv: mv })
    // }
  },
  _formatEvent(item, callback) {
    let tweetBody = JSON.parse(item.json),
      {isShared, sharedContent} = this._formatShared(tweetBody),
      {isPics, pics} = this._formatPics(item.pics),
      pushTweetsEvent = {}
    this._formatMv(tweetBody)
      .then((mv) => {
        pushTweetsEvent = {
          user: {
            accountName: item.user.nickname,
            accountId: item.user.userId,
            avatarUrl: item.user.avatarUrl,
          },
          tweetsTime: item.eventTime,
          actName: item.actName,
          forwardNum: item.forwardCount,
          commitNum: item.info.commentCount,
          thumbupNum: item.info.likedCount,
          msg: tweetBody.msg,
          isPics: isPics,
          pics: pics,
          isMv: mv.isMv,
          mv: mv.mv,
          isShared: isShared,
          shared: sharedContent
        }
        callback(pushTweetsEvent)
      })
  },
  promiseMap(events, callback) {
    return Promise.all(
      events.map((item) => {
        return new Promise((resolve)=> {
          callback.call(this, item, resolve)
        })
      })
    )
  },
  _formatEvents(events) {
    console.log(events)
    return this.promiseMap(events, this._formatEvent)
      .then((formattedTweets)=> {
        return Promise.resolve(formattedTweets)
      })
  }
}

export default formatter
