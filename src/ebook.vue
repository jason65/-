<!--  -->
<template>
  <div id="read-wrapper">
    <menu-top :showMenu="showMenu"></menu-top>
    <div id="read"></div>
    <div id="readMask">
      <div class="left" @click="pagePrev"></div>
      <div class="center" @click="menuAppear"></div>
      <div class="right" @click="pageNext"></div>
    </div>
    <div class="outCon">
      <div class="chapterMask" v-show="visibleChapter" @click="clickedChapter">
      </div>
      <transition name="sideslip">
        <book-chapter :avalible="bookAvalible" :navigation="navigation" @goChapter="goChapter" v-show="visibleChapter"></book-chapter>
      </transition>
    </div>
    <menu-bottom :showMenu="showMenu" @showChapter="showChapter" @setFontSize="fontSize" @theme="themeChanged" @progressChange="onProgressChange" :defaultTheme="defaultTheme" :avalible="bookAvalible" :styleList="styleList"></menu-bottom>
  </div>
</template>

<script>
import epubjs from 'epubjs'
const bookUrl = './killBird.epub'
import menuTop from './components/menuTop'
import menuBottom from './components/menuBottom'
import bookChapter from './components/bookChapter'

export default {
  data() {
    return {
      showMenu: false,
      styleList: [
        { name: 'day', bgColor: '#fff', color: '#000' },
        { name: 'night', bgColor: '#000', color: '#fff' },
        { name: 'eye', bgColor: '#8bc34a', color: '#000' }
      ],
      defaultTheme: 'day',
      bookAvalible: false,
      visibleChapter: false,
      navigation: {}
    };
  },

  components: {
    menuTop,
    menuBottom,
    bookChapter
  },

  computed: {},

  mounted() {
    this.display()
  },

  methods: {
    goChapter(item) {
      this.visibleChapter = !this.visibleChapter
      this.showMenu = false
      this.rendition.display(item.href)
    },
    clickedChapter() {
      this.visibleChapter = !this.visibleChapter
    },
    fontSize(fontsize) {
      // let font = parseInt(fontsize.toString())
      if (this.theme) {
        this.theme.fontSize(fontsize)
      }
    },
    // 显示章节
    showChapter() {
      this.visibleChapter = true
    },
    onProgressChange(percent) {
      const percentage = percent / 100
      const locations = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      this.rendition.display(locations)
    },
    display() {
      // 生成book对象
      this.book = epubjs(bookUrl)
      this.rendition = this.book.renderTo('read', {
        width: window.clientWidth,
        height: window.height
      })
      this.rendition.display()
      this.theme = this.rendition.themes
      this._registTheme()
      this.book.ready.then(() => {
        this.navigation = this.book.navigation
        return this.book.locations.generate()
      }).then(() => {
        this.bookAvalible = true
        this.locations = this.book.locations
      })
    },
    _registTheme() {
      this.styleList.forEach(item => {
        this.theme.register(item.name, { body: { color: item.color, background: item.bgColor } })
      })
      this.theme.select(this.styleList[0].name)
    },
    themeChanged(item) {
      this.theme.select(item)
    },
    menuAppear() {
      this.showMenu = !this.showMenu
    },
    pagePrev() {
      if (this.book && this.rendition) {
        this.rendition.prev()
      }
    },
    pageNext() {
      if (this.book && this.rendition) {
        this.rendition.next()
      }
    }
  }
}

</script>