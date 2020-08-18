<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  created() {
    // let aaa = [
    //   {
    //     path: "/example",
    //     component: () => import("@/layout"),
    //     meta: { title: "Example", icon: "el-icon-s-help" },
    //     children: [
    //       {
    //         path: "table",
    //         name: "Table",
    //         component: () => import("@/views/table/index"),
    //         meta: { title: "Table", icon: "table", roles: ["admin"] },
    //       },
    //     ],
    //   }
    // ];
    //  this.$router.addRoutes(aaa)
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
