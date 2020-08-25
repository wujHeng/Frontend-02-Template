<template>
  <div>
    <br>
    <el-form :inline="true">
        <el-form-item label="机台">
                <el-input size="mini" v-model="equip" :disabled="true" style="width: 100%" ></el-input>
        </el-form-item>
        <el-form-item label="配方编号">
            <el-input size="mini" v-model="stage_product_batch_no" :disabled="true" style="width: 100%" ></el-input>
        </el-form-item>
        <el-form-item label="配方名称">
            <el-input size="mini" v-model="product_name" :disabled="true" style="width: 100%" ></el-input>
        </el-form-item>

        <el-form-item style="float: right">
            <el-button  @click="recipe_return_list">返回</el-button>
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
        <el-input size="mini" v-model="batching_error"  style="width: 70px" ></el-input>
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
        <el-input size="mini" v-model="over_time"  style="width: 70px" ></el-input>
    </el-form-item>
    <el-form-item label="进胶最高温度">
        <el-input size="mini" v-model="max_temp"  style="width: 70px" ></el-input>
    </el-form-item>
    <el-form-item label="回收时间">
        <el-input size="mini" v-model="reuse_time"  style="width: 70px" ></el-input>
    </el-form-item>
    <el-form-item label="是否回收">
        <template>
                <el-radio v-model="reuse_flag" :label="true">是</el-radio>
                <el-radio v-model="reuse_flag" :label="false">否</el-radio>
        </template>
    </el-form-item>
    <el-form-item>
        <el-radio v-model="temp_use_flag" :label="true">三区水温启动</el-radio>
        <el-radio v-model="temp_use_flag" :label="false">三区水温停用</el-radio>
    </el-form-item>
    <el-form-item label="收皮">
        <el-input size="mini" v-model="sp_num"  style="width: 70px" ></el-input>
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
        // 机台、配方编号、配方名称
        equip:null,
        stage_product_batch_no:null,
        product_name:null,
        // 超温最短时间、进胶最低温度...
        mini_time:null,
        mini_temp:null,
        over_temp:null,
        batching_error:null,
        zz_temp:null,
        xlm_temp:null,
        cb_temp:null,
        // 炼胶超时时间、进胶最高温度...
        over_time:null,
        max_temp:null,
        reuse_time:null,
        reuse_flag:true,
        temp_use_flag:true,
        sp_num:null,
        used_flag:true
    };
  },
  created() {

        //   rubber_process_url
    console.log('====================')
    console.log(this.$route.params)
        //配方详情界面的三个表格的原材料展示接口访问
    this.recipe_material_list(this.$route.params['id']);
        //配方详情界面的配方信息和密炼步序信息接口访问
    this.recipe_process_step_list(this.$route.params['id'], this.$route.params['equip']);
  },
  methods: {

    async recipe_material_list(id) {
      try {
        let recipe_listData = await recipe_list("get", id, {
          params: { },
        });
        console.log('====================111111111')
        console.log(recipe_listData)
        console.log('====================111111111')
        // 机台、配方编号、配方名称
        this.equip = this.$route.params['equip']
        this.stage_product_batch_no = this.$route.params['stage_product_batch_no']
        this.product_name = this.$route.params['product_name']
        
      } catch (e) {}
    },
    async recipe_process_step_list(id, equip) {
      try {
        let process_step_listData = await rubber_process_url("get", {
          params: { product_batching:id, equip:equip },
        });
        // 超温最短时间、进胶最低温度...
        this.mini_time = process_step_listData.results[0]['mini_time']
        this.mini_temp = process_step_listData.results[0]['mini_temp']
        this.over_temp = process_step_listData.results[0]['over_temp']
        this.batching_error = process_step_listData.results[0]['batching_error']
        this.zz_temp = process_step_listData.results[0]['zz_temp']
        this.xlm_temp = process_step_listData.results[0]['xlm_temp']
        this.cb_temp = process_step_listData.results[0]['cb_temp']
        // 炼胶超时时间、进胶最高温度...
        this.over_time = process_step_listData.results[0]['over_time']
        this.max_temp = process_step_listData.results[0]['max_temp']
        this.reuse_time = process_step_listData.results[0]['reuse_time']
        this.reuse_flag = process_step_listData.results[0]['reuse_flag']
        this.temp_use_flag = process_step_listData.results[0]['temp_use_flag']
        this.sp_num = process_step_listData.results[0]['sp_num']
        this.used_flag = process_step_listData.results[0]['used_flag']
        console.log('====================2222')
        console.log(process_step_listData.results)
        console.log('====================2222')
      } catch (e) {}
    },




  },
};
</script>

<style lang="scss" scoped>
</style>
