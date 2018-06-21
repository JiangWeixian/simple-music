<template>
  <div class="comment-card loading-comment-card">
    <div class="comment-header">
      <div class="header-innerwrapper">
        <div class="header-avatar">
        </div>
        <div class="header-body">
          <p class="tbw-box"></p>
          <p class="tbw-box"></p>
        </div>
      </div>
      <div class="header-tail">
        <span></span>
        <i></i>
      </div>
    </div>
    <div class="comment-body">
      <p class="content"></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "loading-commet-card"
  }
</script>

<style lang="stylus" scoped>
  @import "./CommentCard.styl"
</style>
