<template>
  <div>
    <br />
    <el-form :inline="true">
      <el-form-item label="机台">
        <el-select
          size="mini"
          style="width: 150px"
          clearable
          @change="SelectEquipChange"
          v-model="SelectEquip"
          placeholder="请选择"
        >
          <el-option
            v-for="item in SelectEquipOptions"
            :key="item.id"
            :label="item.global_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          size="mini"
          style="width: 150px"
          clearable
          @change="SelectRecipeStatusChange"
          v-model="SelectRecipeStatus"
          placeholder="请选择"
        >
          <el-option
            v-for="item in SelectRecipeStatusOptions"
            :key="item.id"
            :label="item.global_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产地">
        <el-select
          size="mini"
          style="width: 150px"
          clearable
          @change="SelectSiteChange"
          v-model="SelectSite"
          placeholder="请选择"
        >
          <el-option
            v-for="item in SelectSiteOptions"
            :key="item.id"
            :label="item.global_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="段次">
        <el-select
          size="mini"
          style="width: 150px"
          clearable
          @change="SelectStageChange"
          v-model="SelectStage"
          placeholder="请选择"
        >
          <el-option
            v-for="item in SelectStageOptions"
            :key="item.id"
            :label="item.global_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="胶料编码">
        <el-input
          size="mini"
          style="width: 200px"
          v-model="input_rubber_no"
          v-on:input="input_rubber_noChanged"
        ></el-input>
      </el-form-item>
      <br />
      <el-form-item style="float: right">
        <el-button @click="showAddRubberMaterialDialog">复制新增</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button @click="showAddRubberMaterialDialog">删除</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button @click="showAddRubberMaterialDialog">修改</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button @click="AddRecipeButton">新增</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button @click="showAddRubberMaterialDialog">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
        highlight-current-row
        @current-change="handleCurrentChange"
        :data="tableData"
        border
        style="width: 100%">

      <el-table-column align="center" type="index" width="50" label="No"></el-table-column>
              
        <el-table-column align="center" width="160%" prop="stage_product_batch_no" label="胶料配方编号">
        <template slot-scope="scope">
                <el-link type="primary" @click="recipe_display_change(scope.row)">
                        {{scope.row.stage_product_batch_no}}
                </el-link>
        </template>

        </el-table-column>
      <el-table-column align="center" prop="stage_product_batch_no" label="胶料编码"></el-table-column>
      <el-table-column align="center" prop="product_name" label="胶料名称"></el-table-column>
      <el-table-column align="center" width="100%" prop="equip" label="机台"></el-table-column>
      <el-table-column align="center" width="100%" prop="dev_type_name" label="炼胶机类型"></el-table-column>
      <el-table-column align="center" prop="used_type" label="状态" :formatter="usedTypeFormatter"></el-table-column>
      <el-table-column align="center" prop="batching_weight" label="配料重量"></el-table-column>
      <el-table-column align="center" prop="production_time_interval" label="炼胶时间"></el-table-column>
      <el-table-column align="center" prop="site_name" label="site"></el-table-column>
      <el-table-column align="center" prop="stage_name" label="段次"></el-table-column>
      <el-table-column align="center" prop="sp_num" label="收皮(车/托)"></el-table-column>
      <el-table-column align="center" prop="created_username" label="创建者"></el-table-column>
      <el-table-column align="center" prop="created_date" label="创建时间"></el-table-column>
    </el-table>
    <el-pagination
      @current-change="pagehandleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="tableDataTotal"
      layout="total, prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script>
import { recipe_list } from "@/api/recipe_fun";
import { constantRoutes } from "@/router";
import { dataTool } from "echarts/lib/echarts";

export default {
  data: function () {
    return {
      tableData: [],
      currentRow: {},
      currentPage: 1,
      pageSize: 10,
      tableDataTotal: 0,
    };
  },
  created() {
    this.get_recipe_list();
  },
  methods: {
    async get_recipe_list(val = 1) {
      try {
        let recipe_listData = await recipe_list("get", null, {
          params: { page: val },
        });
        this.tableData = recipe_listData.results;
        this.tableDataTotal = recipe_listData.count;
      } catch (e) {}
    },
    handleCurrentChange: function (val) {
      this.currentRow = val;
    },
    pagehandleCurrentChange: function (val) {
      this.currentRow = val;
      this.get_recipe_list(val);
    },

    usedTypeFormatter: function (row, column) {
      return this.usedTypeChoice(row.used_type);
    },
    usedTypeChoice: function (usedType) {
      switch (usedType) {
        case 1:
          return "编辑";
        case 2:
          return "提交";
        case 3:
          return "校对";
        case 4:
          return "启用";
        case 5:
          return "驳回";
        case 6:
          return "废弃";
      }
    },
    SelectSiteChange: function () {},
    SelectRecipeStatusChange: function () {},
    SelectSiteChange: function () {},
    input_rubber_noChanged: function () {},
    recipe_display_change: function(raw) {
        this.$router.push({name:'RecipeDisplay', params: raw})
        this.$route.params
    },
    AddRecipeButton: function(){
        this.$router.push({name:'RecipeCreate', params: {}})
        this.$route.params
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

