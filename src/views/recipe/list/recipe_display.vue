<template>
  <div>
    <br>
    <el-form :inline="true">
      <el-form-item label="机台">
        <el-input v-model="equip_name" size="mini" :disabled="true" style="width: 100%" />
      </el-form-item>
      <el-form-item label="配方编号">
        <el-input v-model="stage_product_batch_no" size="mini" :disabled="true" style="width: 100%" />
      </el-form-item>
      <el-form-item label="配方名称">
        <el-input v-model="product_name" size="mini" :disabled="true" style="width: 100%" />
      </el-form-item>

      <el-form-item style="float: right">
        <el-button @click="recipe_return_list">返回</el-button>
      </el-form-item>

    </el-form>

    <el-form :inline="true">
      <br>
      <el-form-item label="超温最短时间">
        <el-input v-model="mini_time" size="mini" style="width: 70px" />
      </el-form-item>
      <el-form-item label="进胶最低温度">
        <el-input v-model="mini_temp" size="mini" style="width: 70px" />
      </el-form-item>
      <el-form-item label="超温温度">
        <el-input v-model="over_temp" size="mini" style="width: 70px" />
      </el-form-item>
      <el-form-item label="胶料总误差">
        <el-input v-model="batching_error" size="mini" style="width: 70px" />
      </el-form-item>
      <el-form-item label="转子水温">
        <el-input v-model="zz_temp" size="mini" style="width: 70px" />
      </el-form-item>
      <el-form-item label="卸料门水温">
        <el-input v-model="xlm_temp" size="mini" style="width: 70px" />
      </el-form-item>
      <el-form-item label="侧壁水温">
        <el-input v-model="cb_temp" size="mini" style="width: 70px" />
      </el-form-item>

      <br>

      <el-form-item label="炼胶超时时间">
        <el-input v-model="over_time" size="mini" style="width: 70px" />
      </el-form-item>
      <el-form-item label="进胶最高温度">
        <el-input v-model="max_temp" size="mini" style="width: 70px" />
      </el-form-item>
      <el-form-item label="回收时间">
        <el-input v-model="reuse_time" size="mini" style="width: 70px" />
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
        <el-input v-model="sp_num" size="mini" style="width: 70px" />
      </el-form-item>
      <el-form-item label="配方停用">
        <el-checkbox v-model="used_flag" />
      </el-form-item>
    </el-form>

    <br>
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <span class="font_custom">胶料称量</span>
          <el-table
            highlight-current-row
            :data="rubber_tableData"
            border
            style="width: 100%"
          >
            <el-table-column width="60%" prop="sn" label="序号" />
            <el-table-column width="80%" prop="auto_flag" label="自动与否" />
            <el-table-column prop="material_name" label="胶料名称" />
            <el-table-column prop="actual_weight" label="设定值(kg)" />
            <el-table-column prop="standard_error" label="误差值(kg)" />
          </el-table>
          <span class="font_custom">炭黑称量</span>
          <el-table
            highlight-current-row
            :data="carbon_tableData"
            border
            style="width: 100%"
          >
            <el-table-column width="60%" prop="sn" label="序号" />
            <el-table-column width="60%" prop="action_name" label="动作">投料</el-table-column>
            <el-table-column prop="auto_flag" label="自动与否" />
            <el-table-column prop="material_name" label="炭黑名称" />
            <el-table-column prop="actual_weight" label="设定值(kg)" />
            <el-table-column prop="standard_error" label="误差值(kg)" />
          </el-table>
          <span class="font_custom">油料称量</span>
          <el-table
            highlight-current-row
            :data="oil_tableData"
            border
            style="width: 100%"
          >
            <el-table-column width="60%" prop="stage_product_batch_no" label="序号" />
            <el-table-column width="60%" prop="action_name" label="动作">投料</el-table-column>
            <el-table-column prop="auto_flag" label="自动与否" />
            <el-table-column prop="product_name" label="油脂名称" />
            <el-table-column prop="actual_weight" label="设定值(kg)" />
            <el-table-column prop="standard_error" label="误差值(kg)" />
          </el-table>
        </div>
      </el-col>

      <el-col :span="14"><div class="grid-content bg-purple">
        <span class="font_custom">密炼规程</span>
        <el-table
          highlight-current-row
          :data="process_step_tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="sn"
            label="序号"
          />
          <el-table-column
            prop="condition_name"
            label="条件"
          />
          <el-table-column
            prop="time"
            label="时间"
          />
          <el-table-column
            prop="temperature"
            label="温度"
          />
          <el-table-column
            prop="energy"
            label="能量"
          />
          <el-table-column
            prop="power"
            label="功率"
          />
          <el-table-column
            prop="action_name"
            label="动作"
          />
          <el-table-column
            prop="pressure"
            label="压力"
          />
          <el-table-column
            prop="rpm"
            label="转速"
          />

        </el-table>
      </div></el-col>
    </el-row>

  </div>
</template>

<script>
import { recipe_list, rubber_process_url } from '@/api/recipe_fun'
import { constantRoutes } from '@/router'
import { dataTool } from 'echarts/lib/echarts'

export default {
  data: function() {
    return {
      // 机台、配方编号、配方名称
      equip_name: null,
      stage_product_batch_no: null,
      product_name: null,
      // 超温最短时间、进胶最低温度...
      mini_time: null,
      mini_temp: null,
      over_temp: null,
      batching_error: null,
      zz_temp: null,
      xlm_temp: null,
      cb_temp: null,
      // 炼胶超时时间、进胶最高温度...
      over_time: null,
      max_temp: null,
      reuse_time: null,
      reuse_flag: true,
      temp_use_flag: true,
      sp_num: null,
      used_flag: true,
      rubber_tableData: [],
      carbon_tableData: [],
      oil_tableData: [],
      process_step_tableData: []
    }
  },
  created() {
    //   rubber_process_url
    console.log('====================')
    console.log(this.$route.params)
    // 配方详情界面的三个表格的原材料展示接口访问
    this.recipe_material_list(this.$route.params['id'])
    // 配方详情界面的配方信息和密炼步序信息接口访问
    this.recipe_process_step_list(this.$route.params['id'], this.$route.params['equip'])
  },
  methods: {

    async recipe_material_list(id) {
      try {
        const recipe_listData = await recipe_list('get', id, {
          params: { }
        })
        console.log('====================111111111')
        console.log(recipe_listData)
        console.log('====================111111111')
        // 机台、配方编号、配方名称
        this.equip_name = this.$route.params['equip_name']
        this.stage_product_batch_no = this.$route.params['stage_product_batch_no']
        this.product_name = this.$route.params['product_name']
        for (var j = 0; j < recipe_listData['batching_details'].length; ++j) {
          var v_auto_falg = ''
          if (recipe_listData['batching_details'][j]['auto_flag'] == 1) {
            v_auto_falg = '自动'
          } else if (recipe_listData['batching_details'][j]['auto_flag'] == 2) {
            v_auto_falg = '手动'
          } else {
            v_auto_falg = '其他'
          }
          if (recipe_listData['batching_details'][j]['material_type'] == '炭黑') {
            this.carbon_tableData.push({
              sn: this.carbon_tableData.length + 1,
              auto_flag: v_auto_falg,
              material_name: recipe_listData['batching_details'][j]['material_name'],
              actual_weight: recipe_listData['batching_details'][j]['actual_weight'],
              standard_error: recipe_listData['batching_details'][j]['standard_error']
            })
          } else if (recipe_listData['batching_details'][j]['material_type'] == '油料') {
            this.oil_tableData.push({
              sn: this.oil_tableData.length + 1,
              action_name: '投料',
              auto_flag: v_auto_falg,
              material_name: recipe_listData['batching_details'][j]['material_name'],
              actual_weight: recipe_listData['batching_details'][j]['actual_weight'],
              standard_error: recipe_listData['batching_details'][j]['standard_error']
            })
          } else {
            this.rubber_tableData.push({
              sn: this.rubber_tableData.length + 1,
              action_name: '投料',
              auto_flag: v_auto_falg,
              material_name: recipe_listData['batching_details'][j]['material_name'],
              actual_weight: recipe_listData['batching_details'][j]['actual_weight'],
              standard_error: recipe_listData['batching_details'][j]['standard_error']
            })
          }
        }
      } catch (e) {}
    },
    async recipe_process_step_list(id, equip) {
      try {
        const process_step_listData = await rubber_process_url('get', null, {
          params: { product_batching: id, equip: equip }
        })
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
        for (var i = 0; i < process_step_listData.results[0]['process_details'].length; ++i) {
          console.log('====================333333')
          console.log(process_step_listData.results[0]['process_details'][i])
          this.process_step_tableData.push({
            sn: this.process_step_tableData.length + 1,
            condition_name: process_step_listData.results[0]['process_details'][i]['condition_name'],
            time: process_step_listData.results[0]['process_details'][i]['time'],
            temperature: process_step_listData.results[0]['process_details'][i]['temperature'],
            energy: process_step_listData.results[0]['process_details'][i]['energy'],
            power: process_step_listData.results[0]['process_details'][i]['power'],
            action_name: process_step_listData.results[0]['process_details'][i]['action_name'],
            pressure: process_step_listData.results[0]['process_details'][i]['pressure'],
            rpm: process_step_listData.results[0]['process_details'][i]['rpm']
          })
        }
      } catch (e) {}
    },
    recipe_return_list: function() {
      this.$router.push({ name: 'RecipeList' })
    }

  }
}
</script>

<style lang="scss" scoped>
.font_custom{
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    font-weight: 700;
}
</style>
