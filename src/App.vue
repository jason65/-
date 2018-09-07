<template>
  <div id="app">
    <ebook></ebook>
  </div>
</template>

<script>
import ebook from './ebook.vue'

export default {
  name: 'app',
  data() {
    return {
      windowWidth: document.body.clientWidth
    }
  },
  components: {
    ebook
  },
  mounted() {
    let self = this
    self.setHtmlFontSize()

    window.onresize = function (e) {
      self.windowWidth = e.currentTarget.innerWidth
      self.setHtmlFontSize()
    }
  },
  methods: {
    setHtmlFontSize() {
      let $html = document.querySelector('html')
      $html.style.fontSize = this.windowWidth / 100 + 'px'
    }
  },
  watch: {
  }
}
</script>
