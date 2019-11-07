<template>
  <div class="loading">
    <div>{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.loading
  width 100px
  height 100px
  border-radius 10px
  background-color rgba(127,140,141,0.8)
  line-height 100px
  text-align center
</style>
