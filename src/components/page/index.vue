<template>
  <div>
    <el-pagination
      layout="total, prev, pager, next"
      :total="pagination.total"
      :page-size="pagination.pageSize"
      :current-page.sync="pagination.currentPage"
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
        return {
          total: 50,
          pageSize: 10,
          currentPage: 1
        };
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