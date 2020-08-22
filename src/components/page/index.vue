<template>
  <div>
    <el-pagination
      layout="total, prev, pager, next"
      :total="pagination.count"
      :page-size="pagination.page_size"
      :current-page.sync="pagination.page"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    currentChange(page) {
      this.$emit("currentChange", page);
    },
  },
};
</script>

<style>
</style>