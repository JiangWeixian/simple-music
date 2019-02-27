<template>
  <div
    data-role="button"
    @click="_emitStatus"
    :class="[ buttonClass, className ]"
  >
    <slot>
      <span>
        按钮
      </span>
    </slot>
  </div>
</template>

<script>
  const defaultStatus = false
  export default {
    name: "button",
    data() {
      return {
        isClicked: defaultStatus,
      }
    },
    props: {
      size: {
        type: String,
        default: 'medium',
        required: false
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
      type: {
        type: String,
        default: 'primary',
        required: false,
      },
      className: {
        type: String,
        require: false,
      },
    },
    computed: {
      getClickStauts () {
        return this.status ||  this.isClicked
      },
      buttonClass() {
        return `btn__${this.type}`
      }
    },
    methods: {
      _handleClick () {
        this.isClicked = !this.isClicked
        this._emitStatus()
      },
      _emitStatus() {
        this.$emit('onClick', this.getClickStauts)
      }
    },
    created() {
      this.isClicked = this.defaultStatus
    }
  }
</script>

<style type="text/stylus" rel="stylesheet/stylus" lang="stylus" scoped>
  @import './Button.styl'
</style>
