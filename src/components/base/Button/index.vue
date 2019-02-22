<template>
  <div class="flat-button" @click="_emitStatus">
    <span class="button" :class="[buttonClass, buttonSize]">{{ buttonName }}</span>
  </div>
</template>

<script>
  import isBoolean from 'lodash/isBoolean'
  const defaultStatus = false
  export default {
    name: "flat-button",
    data() {
      return {
        isClicked: defaultStatus,
      }
    },
    props: {
      size: {
        type: String,
        required: true
      },
      status: {
        type: Boolean,
        default: false,
        required: false,
      },
      defaultStatus: {
        type: Boolean,
        default: defaultStatus,
        required: false
      },
      buttonColor: {
        type: String
      },
    },
    computed: {
      getClickStauts () {
        return this.status || this.isClicked
      },
      buttonName() {
        return this.isClicked? this.buttonNameList[1]:this.buttonNameList[0]
      },
      buttonClass() {
        return `${this.buttonColor}-flat-button`
      }
    },
    methods: {
      _handleClick () {
        this.isClicked = !this.isClicked
        this._emitStatus(this.isClicked)
      },
      _emitStatus() {
        this.$emit('onClick', this.isClicked)
      }
    },
    created() {
      this.isClicked = this.buttonStatus
    }
  }
</script>

<style type="text/stylus" rel="stylesheet/stylus" lang="stylus" scoped>
  @import './FlatButton.styl'
</style>
