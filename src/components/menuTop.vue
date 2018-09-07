<!--  -->
<template>
  <div>
    <transition name="fade" mode="in-out">
      <div class="header" v-show="showMenu">
        <div class="headerLeft">
          <span class="fa fa-chevron-left"></span>
        </div>
        <div class="headerRight">
          <div class="headerRightFlex1">
            <span class="fa fa-cart-plus"></span>
          </div>
          <div class="headerRightFlex2">
            <span class="fa fa-user-circle"></span>
          </div>
          <div class="headerRightFlex3">
            <span class="fa fa-spinner"></span>

          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    showMenu: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {}
}

</script>
<style lang='scss' scoped>

</style>