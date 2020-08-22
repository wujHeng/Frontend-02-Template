<template>
  <div>
    <el-pagination
      layout="total, prev, pager, next"
      :total="total"
      :page-size="page_size"
      :current-page.sync="currentPage"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      default() {
        return {};
      },
    },
    total: {
      type: Number,
      default: 100,
    },
    page_size: {
      type: Number,
      default: 10,
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