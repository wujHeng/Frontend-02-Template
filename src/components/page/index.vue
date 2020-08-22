<template>
  <div>
    <el-pagination
      layout="total,prev,pager,next"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      default() {
        return {}
      }
    },
    total: {
      type: Number,
      default: 100
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    currentChange(page) {
      this.$emit('currentChange', page)
    }
  }
}
</script>

<style>
</style>
