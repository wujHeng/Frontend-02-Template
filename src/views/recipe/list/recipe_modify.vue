<template>
  <div>
    <br>
    <el-form :inline="true">
        <el-form-item label="机台">
                <el-input size="mini" v-model="equip_no" :disabled="true" style="width: 100%" ></el-input>
        </el-form-item>
        <el-form-item label="配方编号">
            <el-input size="mini" v-model="stage_product_batch_no" :disabled="true" style="width: 100%" ></el-input>
        </el-form-item>
        <el-form-item label="配方名称">
            <el-input size="mini" v-model="product_name" :disabled="true" style="width: 100%" ></el-input>
        </el-form-item>

        <el-form-item style="float: right">
            <el-button  @click="recipe_return_list">保存退出</el-button>
        </el-form-item>

    </el-form>

    <el-form :inline="true">
    <br>
    <el-form-item label="超温最短时间">
        <el-input size="mini" v-model="mini_time"  style="width: 70px" ></el-input>
    </el-form-item>
    <el-form-item label="进胶最低温度">
        <el-input size="mini" v-model="mini_temp"  style="width: 70px" ></el-input>
    </el-form-item>
    <el-form-item label="超温温度">
        <el-input size="mini" v-model="over_temp"  style="width: 70px" ></el-input>
    </el-form-item>
    <el-form-item label="胶料总误差">
        <el-input size="mini" v-model="xx"  style="width: 70px" ></el-input>
    </el-form-item>
        <el-form-item label="转子水温">
        <el-input size="mini" v-model="zz_temp"  style="width: 70px" ></el-input>
    </el-form-item>
    <el-form-item label="卸料门水温">
        <el-input size="mini" v-model="xlm_temp"  style="width: 70px" ></el-input>
    </el-form-item>
    <el-form-item label="侧壁水温">
        <el-input size="mini" v-model="cb_temp"  style="width: 70px" ></el-input>
    </el-form-item>

    <br>
    
    <el-form-item label="炼胶超时时间">
        <el-input size="mini" v-model="xx"  style="width: 70px" ></el-input>
    </el-form-item>
    <el-form-item label="进胶最高温度">
        <el-input size="mini" v-model="max_temp"  style="width: 70px" ></el-input>
    </el-form-item>
    <el-form-item label="回收时间">
        <el-input size="mini" v-model="reuse_time"  style="width: 70px" ></el-input>
    </el-form-item>
    <el-form-item label="是否回收">
        <template>
                <el-radio v-model="reuse_flag" label="1">是</el-radio>
                <el-radio v-model="reuse_flag" label="2">否</el-radio>
        </template>
    </el-form-item>
    <el-form-item>
        <el-radio v-model="temp_use_flag" label="1">三区水温启动</el-radio>
        <el-radio v-model="temp_use_flag" label="2">三区水温停用</el-radio>
    </el-form-item>
    <el-form-item label="配方停用">
        <el-checkbox v-model="used_flag"></el-checkbox>
    </el-form-item>
</el-form>

    <br><br>
    <el-row :gutter="20">
      <el-col :span="10"><div class="grid-content bg-purple">
    
      胶料称量
      <el-table
              highlight-current-row
              @current-change="handleCurrentChange"
              :data="tableData"
              border
              style="width: 100%">
          <el-table-column
                  prop="stage_product_batch_no"
                  label="序号">
          </el-table-column>
          <el-table-column
                  prop="product_name"
                  label="胶料名称">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="设定值(kg)">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="误差值(kg)">
          </el-table-column>
      </el-table>

      炭黑称量
      <el-table
              highlight-current-row
              @current-change="handleCurrentChange"
              :data="tableData"
              border
              style="width: 100%">
          <el-table-column
                  prop="stage_product_batch_no"
                  label="序号">
          </el-table-column>
          <el-table-column
                  prop="product_name"
                  label="动作">
          </el-table-column>
          <el-table-column
                  prop="product_name"
                  label="炭黑名称">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="设定值(kg)">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="误差值(kg)">
          </el-table-column>
      </el-table>


      油料称量
      <el-table
              highlight-current-row
              @current-change="handleCurrentChange"
              :data="tableData"
              border
              style="width: 100%">
          <el-table-column
                  prop="stage_product_batch_no"
                  label="序号">
          </el-table-column>
          <el-table-column
                  prop="product_name"
                  label="动作">
          </el-table-column>
          <el-table-column
                  prop="product_name"
                  label="油脂名称">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="设定值(kg)">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="误差值(kg)">
          </el-table-column>
      </el-table>





      </div></el-col>








      <el-col :span="14"><div class="grid-content bg-purple">
        密炼规程
        <el-table
              highlight-current-row
              @current-change="handleCurrentChange"
              :data="tableData"
              border
              style="width: 100%">
          <el-table-column
                  prop="stage_product_batch_no"
                  label="序号">
          </el-table-column>
          <el-table-column
                  prop="product_name"
                  label="条件">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="时间">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="温度">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="能量">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="功率">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="动作">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="压力">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="转速">
          </el-table-column>


      </el-table>
      </div></el-col>
    </el-row>

  </div>
</template>

<script>
import { recipe_list, rubber_process_url } from "@/api/recipe_fun";
import { constantRoutes } from "@/router";
import { dataTool } from "echarts/lib/echarts";

export default {
  data: function () {
    return {
      
    };
  },
  created() {

        //   rubber_process_url
    console.log('====================')
    console.log(this.$route.params)
    const recipe_params = this.$route.params
        //配方详情界面的三个表格的原材料展示接口访问
    this.recipe_material_list(recipe_params['id']);
     //配方详情界面的配方信息和密炼步序信息接口访问
    this.recipe_process_step_list(recipe_params['id'], recipe_params['equip_no']);
  },
  methods: {

    async recipe_material_list(id) {
      try {
        let recipe_listData = await recipe_list("get", id, {
          params: { },
        });
        this.tableData = recipe_listData;
      } catch (e) {}
    },
    async recipe_process_step_list(id, equip_no) {
      try {
        let process_step_listData = await rubber_process_url("get", {
          params: { product_batching:id, equip_no:equip_no },
        });
        this.tableData = process_step_listData;
      } catch (e) {}
    },




  },
};
</script>

<style lang="scss" scoped>
</style>
