<!--  -->
<template>
  <div class="chapterDiv">
    <div v-if="bookAvalible" style="height:100%;">
      <ul>
        <li v-for="(item,index) in navigation.toc" :style="{height:(100/navigation.toc.length)+'%'}" :key="item.id">
          <a href="#" @click="gotoChapter(item)">{{(index+1)+" : "+item.label}}</a>
        </li>
      </ul>
    </div>
    <div v-else class="loading">
      加载中……
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navigation: {
      type: Object,
      default: function () {
        return {}
      }
    },
    avalible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bookAvalible: this.avalible
    };
  },

  components: {},

  computed: {},

  mounted() {
  },

  methods: {
    gotoChapter(item) {
      this.$emit('goChapter', item)
    }
  },
  watch: {
    avalible: function (val) {
      this.bookAvalible = val
    }
  }
}

</script>
<style lang='scss' scoped>

</style>