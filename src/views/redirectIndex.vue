<template>
  <div />
</template>

<script>
export default {
  beforeCreate() {
    const { query } = this.$route
    const { path } = query
    this.$router.replace({ path: path })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>

<style>

</style>
