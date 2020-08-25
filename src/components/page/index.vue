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
    // 总页数，需要传进来
    total: {
      type: Number,
      default: 0,
    },
     //统一的当前展示多少页，一般不会用到
    page_size: {
      type: Number,
      default: 10,
    },
    currentPage:{
      type: Number,
      default: 1,
    }
  },
  data() {
    return {
    };
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