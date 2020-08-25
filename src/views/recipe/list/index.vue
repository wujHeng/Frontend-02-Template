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
            :label="item.equip_name"
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
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
        <el-button>复制新增</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button>删除</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button :disabled="currentRow.equip === null"  @click="ModifyRecipeButton">修改</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button @click="AddRecipeButton">新增</el-button>
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
      <el-table-column align="center" width="100%" prop="equip_no" label="机台编号"></el-table-column>
      <el-table-column align="center" width="100%" prop="equip" label="机台id" v-if='false'></el-table-column>
      <el-table-column align="center" width="100%" prop="equip_name" label="机台名称" v-if='false'></el-table-column>
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
import { recipe_list, equip_url, site_url, stage_url } from "@/api/recipe_fun";
import { constantRoutes } from "@/router";
import { dataTool } from "echarts/lib/echarts";

export default {
  data: function () {
    return {
      SelectEquipOptions:[],
      SelectRecipeStatusOptions: [{
        value: 1, label: '编辑'
      }, {
        value: 2, label: '提交'
      }, {
        value: 3, label: '校对'
      }, {
        value: 4, label: '启用'
      }, {
        value: 5, label: '驳回'
      }, {
        value: 6, label: '废弃'
      }],
      SelectSiteOptions:[],
      SelectStageOptions:[],
      SelectEquip:null,
      SelectRecipeStatus:null,
      SelectSite:null,
      SelectStage:null,
      input_rubber_no:null,
      tableData: [],
      currentRow: {
        equip:null
      },
      currentPage: 1,
      pageSize: 10,
      tableDataTotal: 0,
    };
  },
  created() {
    this.get_recipe_list();
    this.equip_list();
    this.site_list();
    this.stage_list();
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
    async search_recipe_list(obj) {
      try {
        let search_recipe_list = await recipe_list("get", null, obj);
        this.tableData = search_recipe_list.results;
        this.tableDataTotal = search_recipe_list.count;
      } catch (e) {}
    },

    async equip_list() {
      try {
        let equip_list = await equip_url("get", {
          params: { },
        });
        this.SelectEquipOptions = equip_list.results
      } catch (e) {}
    },
    async site_list() {
      try {
        let site_list = await site_url("get", {
          params: { },
        });
        this.SelectSiteOptions = site_list.results
      } catch (e) {}
    },
    async stage_list() {
      try {
        let stage_list = await stage_url("get", {
          params: { },
        });
        this.SelectStageOptions = stage_list.results
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

    getList() {
        var v_SelectEquip = this.SelectEquip?this.SelectEquip:''
        var v_SelectRecipeStatus = this.SelectRecipeStatus?this.SelectRecipeStatus:''
        var v_SelectSite = this.SelectSite?this.SelectSite:''
        var v_SelectStage = this.SelectStage?this.SelectStage:''
        var v_input_rubber_no = this.input_rubber_no?this.input_rubber_no:''
        this.search_recipe_list({params:{
          equip_id:v_SelectEquip,
          used_type:v_SelectRecipeStatus,
          factory_id:v_SelectSite,
          stage_id:v_SelectStage,
          stage_product_batch_no:v_input_rubber_no
        }})
    },

    SelectEquipChange: function () {
      this.getList()
    },
    SelectRecipeStatusChange: function () {
      this.getList()
    },
    SelectSiteChange: function () {
      this.getList()
    },
    SelectStageChange: function() {
      this.getList()
    },
    input_rubber_noChanged: function () {
      this.getList()
    },



    recipe_display_change: function(raw) {
        this.$router.push({name:'RecipeDisplay', params: raw})
        this.$route.params
    },
    AddRecipeButton: function(){
        this.$router.push({name:'RecipeCreate', params: {}})
        this.$route.params
    },
    ModifyRecipeButton: function(){
      console.log('-------------')
      console.log(this.currentRow)
      this.$router.push({name:'RecipeModify', params: this.currentRow})
      this.$route.params
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

