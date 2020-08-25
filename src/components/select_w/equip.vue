<template>
  <div>
    <!-- 机台下拉框 -->
    <el-select v-model="_equip_no" @change="changeSearch" clearable placeholder="请选择机台">
      <el-option
        v-for="item in machineList"
        :key="item.equip_no"
        :label="item.equip_no"
        :value="item.equip_no"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { equip } from "@/api/reportBatch";
export default {
  props: {
    equip_no_props: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      machineList: [],
    };
  },
  computed: {
    _equip_no: {
      get() {
        return this.equip_no_props;
      },
      set(equip_no) {
        this.$emit("update:equip_no_props", equip_no);
      },
    },
  },
  created() {
    this.getMachineList();
  },
  methods: {
    getMachineList() {
      var _this = this;
      equip("get", { params: { page_size: 100000000 } })
        .then(function (response) {
          _this.machineList = response.results || [];
        })
        .catch(function (error) {});
    },
    changeSearch(id) {
      this.$emit("changeSearch", id);
    },
  },
};
</script>

<style>
</style>