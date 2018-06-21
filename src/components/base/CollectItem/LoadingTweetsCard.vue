<template>
  <div class="loading-tweets-card card">
    <div class="tweets-header">
      <div class="tweets-account-avatar">
        <div class="img"></div>
      </div>
      <div class="tweets-header-brief">
        <p class="tweets-account-name"></p>
        <span class="tweets-time"></span>
      </div>
      <div class="tweets-actions"></div>
    </div>
    <div class="tweets-body">
      <div class="tweets-body-brief"></div>
      <div class="tweets-body-content"></div>
    </div>
    <div class="tweets-tail">
      <ul class="tweets-actions">
        <li class="tweets-action tweets-action-thumbup">
          <i></i>
          <span></span>
        </li>
        <li class="tweets-action tweets-action-commits">
          <i></i>
          <span></span>
        </li>
        <li class="tweets-action tweets-action-forward">
          <i></i>
          <span></span>
        </li>
      </ul>
      <div class="tweets-api">
        <span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "loading-tweets-card"
  }
</script>

<style lang="stylus" scoped>
  @import "./TweetsCard.styl"
</style>
