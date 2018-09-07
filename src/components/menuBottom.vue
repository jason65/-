<!--  -->
<template>
  <div>
    <transition name="slide" mode="in-out">
      <div class="bottom" v-show="menushow" :class="{ hideBoxShadow: showExtra }">
        <div class="bottomRightFlex1">
          <span class="fa fa-navicon" @click="showPart('1')"></span>
        </div>
        <div class="bottomRightFlex2">
          <span class="fa fa-cog" @click="showPart('2')"></span>
        </div>
        <div class="bottomRightFlex3">
          <span class="fa fa-lightbulb-o" @click="showPart('3')"></span>
        </div>
        <div class="bottomRightFlex4">
          <span @click="showPart('4')">A</span>
        </div>
      </div>
    </transition>
    <transition name="slide" mode="in-out">
      <!-- 控制进度条start -->
      <div class="extraArea" v-if="showExtra2">
        <div style="width:100%;padding:20px 40px;">
          <div style="margin:0 auto;" class="rangeDiv"><input type="range" v-model="percent" :style="{backgroundSize:bgSize}" min="0" max="100" step="1" :disabled="!bookAvalible" /></div>
          <p>{{bookAvalible?percent+'%':'加载中'}}</p>
        </div>
      </div>
      <!-- 控制进度条end -->
    </transition>
    <transition name="slide" mode="in-out">
      <!-- 控制主题start -->
      <div class="extraArea" v-if="showExtra3">
        <div v-for="(item , index ) in styleList" :key="index" class="themeCon">
          <div class="theme" @click="changeTheme(item.name)">
            <div :style="{backgroundColor:item.bgColor,color:item.color}"></div>
          </div>
          <div class="themeName" :class="{bolderWeight:item.name===curentTheme}">{{item.name}}</div>
        </div>
      </div>
      <!-- 控制主题end -->
    </transition>
    <transition name="slide" mode="in-out">
      <!-- 控制字体start -->
      <div class="extraArea" v-if="showExtra4">
        <div class="prefixHead" :style="{fontSize:fontSizeList[0].fontSize,marginRight:fontjustment}">A</div>
        <div class="font">
          <div class="settingArea" @click="changeFontSize(item)" v-for="(item,index) in fontSizeList" :key="index">
            <div class="line"></div>
            <div class="point-wrapper">
              <div class="point" v-show="item.fontSize===defaultSize">
                <div class="core"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="prefixTail" :style="{fontSize:fontSizeList[fontSizeList.length-1].fontSize,marginLeft:fontjustment}">A</div>
      </div>
      <!-- 控制字体 end -->
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    showMenu: {
      type: Boolean,
      default: false
    },
    avalible: {
      type: Boolean,
      default: false
    },
    styleList: {
      type: Array
    },
    defaultTheme: {
      type: String
    }
  },
  data() {
    return {
      defaultSize: '16px',
      menushow: this.showMenu,
      fontjustment: '',
      showExtra: false,
      showExtra1: false,
      showExtra2: false,
      showExtra3: false,
      showExtra4: false,
      fontSizeList: [
        { fontSize: '12px' },
        { fontSize: '14px' },
        { fontSize: '16px' },
        { fontSize: '18px' },
        { fontSize: '20px' },
        { fontSize: '22px' },
        { fontSize: '24px' }
      ],
      curentTheme: this.defaultTheme,
      bookAvalible: this.avalible,
      percent: 0,
      progressBar: '0% 50%'
    }
  },

  components: {
  },

  computed: {
    bgSize: function (val) {
      return val.percent + '% 100%'
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      this.$emit('setFontSize', this.defaultSize)
      this.fontjustment = '-' + parseInt((document.body.clientWidth - 136) / this.fontSizeList.length / 2) + 'px'
    })
  },

  methods: {
    showPart(number) {
      this.showExtra = true
      if (number === '1' || number === 1) {
        this.$emit('showChapter')
      } else {
        for (let i = 2; i < 5; i++) {
          if (number === i.toString()) {
            this['showExtra' + i] = true
          } else {
            this['showExtra' + i] = false
          }
        }
      }
    },
    changeFontSize(item) {
      this.defaultSize = item.fontSize
      this.$emit('setFontSize', item.fontSize)
    },
    changeTheme(item) {
      this.curentTheme = item
      this.$emit('theme', item)
    }
  },
  watch: {
    showMenu: function (val) {
      this.menushow = val
      if (!val) {
        this.showExtra = false
        this.showExtra1 = false
        this.showExtra2 = false
        this.showExtra3 = false
        this.showExtra4 = false
      }
    },
    avalible: function (val) {
      this.bookAvalible = val
    },
    percent: function (val) {
      this.$emit('progressChange', val)
    }
  }
}

</script>
<style lang='scss' scoped>
.extraArea .themeCon .bolderWeight {
  font-weight: bolder;
  font-size: 20px;
}
</style>