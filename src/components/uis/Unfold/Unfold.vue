<template>
  <div
    class="unfold"
    data-role="unfold"
  >
    <div
      class="unfold-content"
      data-role="content"
      :style="{ style }"
    >
      <slot>
        测试
      </slot>
    </div>
    <Button
      class-name="unfold-btn"
    >
      {{ _text }}
    </Button>
  </div>
</template>

<script>
import Button from '@/components/uis/Button/Button.vue'
import isBoolean from 'lodash/isBoolean'
import { defaultTexts } from './config'
      // :class="{ more: isMore, less: !isMore && isLongBrief }"

export default {
  name: 'un-fold',
  data () {
    return {
      texts: defaultTexts,
      isFolded: false,
    }
  },
  computed: {
    _text () {
      return this.isFolded ? this.texts[0] : this.texts[1]
    },
    _isFolded () {
      return isBoolean(this.folded) ? this.folded : this.isFolded
    },
  },
  components: {
    Button,
  },
  props: {
    height: {
      type: Number,
      default: 60,
    },
    style: {
      type: Object,
      default: {},
    },
    texts: {
      type: Array,
      default: defaultTexts,
    },
    folded: {
      type: Boolean,
      required: false,
    },
    defaultFolded: {
      type: Boolean,
      default: false,
    },
  },
  created: () => {
    this.texts = this.texts
    this.isFolded = this.defaultFolded
  }
}
</script>

<style lang="stylus" type='text/css' scoped>
  @import './Unfold.styl'
</style>
