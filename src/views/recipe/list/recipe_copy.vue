<template>
  <div class="recipe_modify">
    <br>
    <el-form :inline="true">
      <!-- <el-form-item v-show="!!equip_name" label="机台">
        <el-input v-model="equip_name" size="mini" :disabled="true" style="width: 100%" />
      </el-form-item> -->
      <el-form-item label="机台">
        <el-select
          v-model="equip_name"
          size="mini"
          style="width: 100%"
          clearable
          :disabled="equip_display_bool"
        >
          <el-option
            v-for="item in SelectEquipOptions"
            :key="item.id"
            :label="item.equip_name"
            :value="item.id"
          />
        </el-select>
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
      <el-form-item style="float: right">
        <el-button @click="recipe_save_return">确定复制</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button @click="modify_material_button">修改配料</el-button>
      </el-form-item>

    </el-form>

    <el-form :inline="true">
      <br>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <el-form-item label="超温最短时间">
              <el-input-number v-model="mini_time" :step="1" step-strictly :min="0" controls-position="right" size="mini" style="width: 70px" />
            </el-form-item>
            <el-form-item label="进胶最低温度">
              <el-input-number v-model="mini_temp" :step="1" step-strictly :min="1" controls-position="right" size="mini" style="width: 70px" />
            </el-form-item>
            <el-form-item label="超温温度">
              <el-input-number v-model="over_temp" :step="1" step-strictly :min="1" controls-position="right" size="mini" style="width: 70px" />
            </el-form-item>
            <el-form-item label="胶料总误差">
              <el-input-number v-model="batching_error" :precision="3" :step="0.1" :min="0" controls-position="right" size="mini" style="width: 70px" />
            </el-form-item>
            <el-form-item label="转子水温">
              <el-input-number v-model="zz_temp" :step="1" step-strictly :min="1" controls-position="right" size="mini" style="width: 70px" />
            </el-form-item>
            <el-form-item label="卸料门水温">
              <el-input-number v-model="xlm_temp" :step="1" step-strictly :min="1" controls-position="right" size="mini" style="width: 70px" />
            </el-form-item>
            <el-form-item label="侧壁水温">
              <el-input-number v-model="cb_temp" :step="1" step-strictly :min="1" controls-position="right" size="mini" style="width: 70px" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="0">
          <div class="grid-content bg-purple" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <el-form-item label="炼胶超时时间">
              <el-input-number v-model="over_time" :step="1" step-strictly :min="0" controls-position="right" size="mini" style="width: 70px" />
            </el-form-item>
            <el-form-item label="进胶最高温度">
              <el-input-number v-model="max_temp" :step="1" step-strictly :min="1" controls-position="right" size="mini" style="width: 70px" />
            </el-form-item>
            <el-form-item v-show="reuse_flag" label="回收时间">
              <el-input-number v-model="reuse_time" :step="1" step-strictly :min="1" controls-position="right" size="mini" style="width: 70px" />
            </el-form-item>
            <el-form-item label="是否回收">
              <template>
                <el-radio v-model="reuse_flag" :label="true">是</el-radio>
                <el-radio v-model="reuse_flag" :label="false">否</el-radio>
              </template>
            </el-form-item>
            <el-form-item label=" ">
              <el-radio v-model="temp_use_flag" :label="true">三区水温启动</el-radio>
              <el-radio v-model="temp_use_flag" :label="false">三区水温停用</el-radio>
            </el-form-item>
            <el-form-item label="收皮" prop="SelectEquip">
              <el-select v-model="sp_num" size="mini" style="width: 85px" placeholder="请选择">
                <el-option
                  v-for="item in sp_num_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="车/托" />
            <el-form-item v-show="false" label="配方停用">
              <el-checkbox v-model="use_flag" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="0">
          <div class="grid-content bg-purple" />
        </el-col>
      </el-row>

    </el-form>

    <br>
    <el-row :gutter="20">
      <el-col :span="9">
        <div class="grid-content bg-purple">
          <span class="font_custom">胶料称量</span>
          <el-table
            highlight-current-row
            :data="rubber_tableData"
            border
            style="width: 100%"
          >
            <el-table-column align="center" width="50%" prop="sn" label="序号" />
            <!-- <el-table-column prop="auto_flag" label="自动与否" /> -->
            <el-table-column align="center" prop="material_name" label="胶料名称" />
            <el-table-column align="center" width="90%" prop="actual_weight" label="设定值(kg)" />
            <el-table-column align="center" width="90%" prop="standard_error" label="误差值(kg)" />
          </el-table>
          <span class="font_custom">炭黑称量</span>
          <el-table
            highlight-current-row
            :data="carbon_tableData"
            border
            style="width: 100%"
          >
            <el-table-column align="center" width="50%" prop="sn" label="序号" />
            <el-table-column align="center" width="60%" prop="action_name" label="动作">投料</el-table-column>
            <!-- <el-table-column prop="auto_flag" label="自动与否" /> -->
            <el-table-column align="center" prop="material_name" label="炭黑名称" />
            <el-table-column align="center" width="90%" prop="actual_weight" label="设定值(kg)" />
            <el-table-column align="center" width="90%" prop="standard_error" label="误差值(kg)" />
          </el-table>
          <span class="font_custom">油料称量</span>
          <el-table
            highlight-current-row
            :data="oil_tableData"
            border
            style="width: 100%"
          >
            <el-table-column align="center" width="50%" prop="sn" label="序号" />
            <el-table-column align="center" width="60%" prop="action_name" label="动作">投料</el-table-column>
            <!-- <el-table-column prop="auto_flag" label="自动与否" /> -->
            <el-table-column align="center" prop="material_name" label="油脂名称" />
            <el-table-column align="center" width="90%" prop="actual_weight" label="设定值(kg)" />
            <el-table-column align="center" width="90%" prop="standard_error" label="误差值(kg)" />
          </el-table>
        </div>
      </el-col>

      <el-col :span="15">
        <div class="grid-content bg-purple">
          <span class="font_custom">密炼规程</span>
          <!-- <el-button size="mini"  @click="delete_recipe_step">删除一行</el-button> -->
          <table
            class="table table-bordered"
            border="1"
            bordercolor="#ebeef4"
            style="width: 100%; color: #909399; font-size: 14px; border-collapse:collapse"
          >
            <thead>
              <tr>
                <th style="text-align: center; height: 48px">序号</th>
                <th style="text-align: center; height: 48px">条件</th>
                <th style="text-align: center; height: 48px">时间</th>
                <th style="text-align: center; height: 48px">温度</th>
                <td style="text-align: center; height: 48px">能量</td>
                <td style="text-align: center; height: 48px">功率</td>
                <th style="text-align: center; height: 48px">动作</th>
                <th style="text-align: center; height: 48px">压力</th>
                <th style="text-align: center; height: 48px">转速</th>
                <th style="text-align: center; height: 48px">操作</th>
              </tr>
            </thead>
            <tbody style="color: #606266;">
              <tr v-for="(step_ele, index) in RecipeMaterialList" :key="index">
                <td style="text-align: center; height: 48px">{{ index + 1 }}</td>
                <td style="text-align: center; height: 48px">
                  <el-select v-model="step_ele.condition" size="mini" style="width: 100px" clearable placeholder="请选择">
                    <el-option
                      v-for="item in SelectConditionOptions"
                      :key="item.id"
                      :label="item.condition"
                      :value="item.id"
                    />
                  </el-select>

                </td>
                <td style="text-align: center; height: 48px">
                  <el-input-number v-model="step_ele.time" :step="1" step-strictly :min="0" style="width: 60px" size="mini" controls-position="right" />
                </td>
                <td style="text-align: center; height: 48px">
                  <el-input-number v-model="step_ele.temperature" :step="1" step-strictly :min="0" style="width: 60px" size="mini" controls-position="right" />
                </td>
                <td style="text-align: center; height: 48px">
                  <el-input-number v-model="step_ele.energy" :precision="1" :step="0.1" :min="0.0" style="width: 60px" size="mini" controls-position="right" />
                </td>
                <td style="text-align: center; height: 48px">
                  <el-input-number v-model="step_ele.power" :precision="1" :step="0.1" :min="0.0" style="width: 60px" size="mini" controls-position="right" />
                </td>
                <td style="text-align: center; height: 48px">

                  <el-select v-model="step_ele.action" size="mini" style="width: 100px" clearable placeholder="请选择">
                    <el-option
                      v-for="item in SelectActionOptions"
                      :key="item.id"
                      :label="item.action"
                      :value="item.id"
                    />
                  </el-select>

                </td>
                <td style="text-align: center; height: 48px">
                  <el-input-number v-model="step_ele.pressure" :precision="1" :step="0.1" :min="0.0" style="width: 60px" size="mini" controls-position="right" />
                </td>
                <td style="text-align: center; height: 48px">
                  <el-input-number v-model="step_ele.rpm" :step="1" step-strictly :min="0" style="width: 60px" size="mini" controls-position="right" />
                </td>
                <td style="text-align: center; height: 48px">
                  <el-button size="mini" @click="del_recipe_step_row(step_ele, index)">删除</el-button>
                </td>
              </tr>

            </tbody>
          </table>
          <el-form>
            <el-form-item style="text-align: center">
              <el-button size="mini" @click="insert_recipe_step">插入一行</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="90%"
      title="胶料配料标准"
      :visible.sync="dialogRubberMaterialStandard"
    >

      <el-form :inline="true">
        <el-form-item label="预计炼胶时间">
          <el-input-number v-model="production_time_interval" :step="1" step-strictly :min="0" controls-position="right" size="mini" style="width: 100%" />
        </el-form-item>
        <el-form-item style="float: right">
          <el-button @click="saveMaterialClicked">确定</el-button>
        </el-form-item>
      </el-form>
      <br>

      <table
        class="table table-bordered"
        border="1"
        bordercolor="#ebeef4"
        style="width: 100%; color: #909399; font-size: 14px; border-collapse:collapse"
      >
        <thead>
          <tr>
            <th style="text-align: center; height: 48px">No</th>
            <th style="text-align: center; height: 48px">类别</th>
            <!-- <th style="text-align: center; height: 48px">自动与否</th> -->
            <th style="text-align: center ; height: 48px">原材料</th>
            <td style="text-align: center ; height: 48px">设定值(kg)</td>
            <td style="text-align: center; height: 48px">误差值(kg)</td>
            <th style="text-align: center; height: 48px">操作</th>
          </tr>
        </thead>
        <tbody style="color: #606266;">
          <tr v-for="(material_ele, index) in ProductRecipe" :key="index">
            <!--<td>{{ new_material_ele.sn }}</td>-->
            <td v-show="false">{{ material_ele.material }}</td>
            <td style="text-align: center; height: 48px">{{ index + 1 }}</td>
            <td style="text-align: center; height: 48px">{{ material_ele.material_type }}</td>
            <!-- <td style="text-align: center; height: 48px">
              <template>
                <el-radio v-model="material_ele.auto_flag" :label="1">自动</el-radio>
                <el-radio v-model="material_ele.auto_flag" :label="2">手动</el-radio>
                <el-radio v-model="material_ele.auto_flag" :label="0">其他</el-radio>
              </template>
            </td> -->
            <td style="text-align: center; height: 48px">
              <!-- <div style="margin-top: 12px;"> -->
              <el-input v-model="material_ele.material_name" size="mini" style="width: 70%" class="input-with-select" :disabled="true">
                <el-button slot="append" icon="el-icon-search" @click="pop_up_raw_material(material_ele, index)" />
              </el-input>
              <!-- </div> -->
            </td>
            <td style="text-align: center; height: 48px">
              <el-input-number v-model.number="material_ele.actual_weight" :precision="2" :step="0.1" :min="0.01" size="mini" controls-position="right" />
            </td>
            <td style="text-align: center; height: 48px">
              <el-input-number v-model.number="material_ele.standard_error" :precision="2" :step="0.1" :min="0" size="mini" controls-position="right" />
            </td>
            <td style="text-align: center; height: 48px">
              <el-button size="mini" @click="del_material_row(material_ele, index)">删除</el-button>
            </td>
          </tr>

        </tbody>

      </table>
      <el-form>
        <el-form-item style="text-align: center">
          <el-button @click="insert_material_changed">插入一行</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="70%"
      title="原材料选择"
      :visible.sync="dialogRawMaterialSync"
    >

      <el-form :inline="true">
        <el-form-item label="原材料类别">
          <el-select
            v-model="materialType"
            clearable
            placeholder="请选择"
            @change="materialTypeChange"
          >
            <el-option
              v-for="item in materialTypeOptions"
              :key="item.id"
              :label="item.global_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        原材料编号:<el-input v-model="search_material_no" style="width: 20%" @input="search_material_no_Change" />
        原材料名称:<el-input v-model="search_material_name" style="width: 20%" @input="search_material_name_Change" />
      </el-form>

      <el-table
        highlight-current-row
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          align="center"
          label="S"
          width="30"
        />
        <el-table-column
          align="center"
          prop="material_no"
          label="原材料代码"
        />
        <el-table-column
          align="center"
          prop="material_name"
          label="原材料名称"
        />
        <el-table-column
          align="center"
          prop="material_type_name"
          label="原材料类别"
        />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                size="mini"
                @click="handleMaterialSelect(scope.row)"
              >选中
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="tableDataTotal"
        layout="total, prev, pager, next"
        @current-change="pagehandleCurrentChange"
      />

    </el-dialog>

  </div>
</template>

<script>
import { recipe_list, equip_url, rubber_process_url, raw_material_url, material_type_url, condition_url, action_url } from '@/api/recipe_fun'
import { constantRoutes } from '@/router'
import { dataTool } from 'echarts/lib/echarts'

export default {
  data: function() {
    return {
      // 机台、配方编号、配方名称
      equip_name: null,
      equip_display_bool: null,
      stage_product_batch_no: null,
      product_name: null,
      // 超温最短时间、进胶最低温度...
      mini_time: undefined,
      mini_temp: undefined,
      over_temp: undefined,
      batching_error: undefined,
      zz_temp: undefined,
      xlm_temp: undefined,
      cb_temp: undefined,
      // 炼胶超时时间、进胶最高温度...
      over_time: undefined,
      max_temp: undefined,
      reuse_time: undefined,
      reuse_flag: true,
      temp_use_flag: true,
      sp_num: undefined,
      use_flag: true,
      production_time_interval: undefined,
      // 密炼步序字段
      time: null,
      temperature: null,
      energy: null,
      power: null,
      pressure: null,
      rpm: null,
      condition: null,
      standard_error: null,
      SelectEquipOptions: [],
      rubber_tableData: [],
      carbon_tableData: [],
      oil_tableData: [],
      RecipeMaterialList: [],
      ProductRecipe: [],
      SelectConditionOptions: [],
      SelectActionOptions: [],
      materialTypeOptions: [],
      sp_num_options: [{
        value: 1,
        label: '1'
      }, {
        value: 2,
        label: '2'
      }, {
        value: 3,
        label: '3'
      }, {
        value: 4,
        label: '4'
      }, {
        value: 5,
        label: '5'
      }],
      materialType: null,
      search_material_no: null,
      search_material_name: null,
      dialogRubberMaterialStandard: false,
      dialogRawMaterialSync: false,
      tableData: [],
      currentRow: {},
      currentPage: 1,
      pageSize: 10,
      tableDataTotal: 0,
      recipe_step_id: null,
      auto_flag: 0,
      batching_details_list: [],
      confirm_recipe_list: []
    }
  },
  created() {
    //   rubber_process_url
    // 配方详情界面的三个表格的原材料展示接口访问
    this.recipe_material_list(this.$route.params['id'])
    // 配方详情界面的配方信息和密炼步序信息接口访问（已废弃）
    // this.recipe_process_step_list(this.$route.params['id'], this.$route.params['equip'])
    this.condition_list()
    this.action_list()
    this.material_type_list()
    this.equip_list()
  },
  methods: {
    async equip_list() {
      try {
        const equip_list = await equip_url('get', {
          params: { }
        })
        this.SelectEquipOptions = equip_list.results
      } catch (e) { throw new Error(e) }
    },
    async post_recipe_list(obj) {
      try {
        const recipe_listData = await recipe_list('post', null, obj)
        return recipe_listData
      } catch (e) {
        throw new Error(e)
      }
    },

    async recipe_material_list(id) {
      try {
        const recipe_listData = await recipe_list('get', id, {
          params: { }
        })
        // 机台、配方编号、配方名称
        console.log('===============xxxx=========')
        console.log(this.$route.params, recipe_listData)
        console.log('==============xxxx===========')
        this.equip_name = this.$route.params['copy_equip_id']
        if (this.equip_name == null) {
          this.equip_display_bool = false
        } else {
          this.equip_display_bool = true
        }
        this.stage_product_batch_no = this.$route.params['stage_product_batch_no']
        this.product_name = this.$route.params['product_name']
        this.confirm_recipe_list = recipe_listData
        for (var j = 0; j < recipe_listData['batching_details'].length; ++j) {
          var v_auto_falg = ''
          if (recipe_listData['batching_details'][j]['auto_flag'] === 1) {
            v_auto_falg = '自动'
          } else if (recipe_listData['batching_details'][j]['auto_flag'] === 2) {
            v_auto_falg = '手动'
          } else {
            v_auto_falg = '其他'
          }
          if (recipe_listData['batching_details'][j]['material_type'] === '炭黑') {
            this.carbon_tableData.push({
              sn: this.carbon_tableData.length + 1,
              auto_flag: v_auto_falg,
              material_name: recipe_listData['batching_details'][j]['material_name'],
              actual_weight: recipe_listData['batching_details'][j]['actual_weight'],
              standard_error: recipe_listData['batching_details'][j]['standard_error']
            })
          } else if (recipe_listData['batching_details'][j]['material_type'] === '油料') {
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
        console.log('----------------------get--------------------')
        console.log(recipe_listData)
        this.recipe_step_id = recipe_listData['processes']['id']
        // 超温最短时间、进胶最低温度...
        this.mini_time = recipe_listData['processes']['mini_time']
        this.mini_temp = recipe_listData['processes']['mini_temp']
        this.over_temp = recipe_listData['processes']['over_temp']
        this.batching_error = recipe_listData['processes']['batching_error']
        this.zz_temp = recipe_listData['processes']['zz_temp']
        this.xlm_temp = recipe_listData['processes']['xlm_temp']
        this.cb_temp = recipe_listData['processes']['cb_temp']
        // 炼胶超时时间、进胶最高温度...
        this.over_time = recipe_listData['processes']['over_time']
        this.max_temp = recipe_listData['processes']['max_temp']
        this.reuse_time = recipe_listData['processes']['reuse_time']
        this.reuse_flag = recipe_listData['processes']['reuse_flag']
        this.temp_use_flag = recipe_listData['processes']['temp_use_flag']
        this.sp_num = recipe_listData['processes']['sp_num']
        this.use_flag = recipe_listData['processes']['use_flag']
        for (var i = 0; i < recipe_listData['process_details'].length; ++i) {
          this.RecipeMaterialList.push({
            sn: this.RecipeMaterialList.length + 1,
            condition: recipe_listData['process_details'][i]['condition'],
            time: recipe_listData['process_details'][i]['time'],
            temperature: recipe_listData['process_details'][i]['temperature'],
            energy: recipe_listData['process_details'][i]['energy'],
            power: recipe_listData['process_details'][i]['power'],
            action: recipe_listData['process_details'][i]['action'],
            pressure: recipe_listData['process_details'][i]['pressure'],
            rpm: recipe_listData['process_details'][i]['rpm']
          })
        }
        return recipe_listData
      } catch (e) { throw new Error(e) }
    },
    //   原材料接口
    async raw_material_list(val = 1) {
      try {
        var v_materialType = this.materialType ? this.materialType : ''
        var v_search_material_no = this.search_material_no ? this.search_material_no : ''
        var v_search_material_name = this.search_material_name ? this.search_material_name : ''
        const raw_material_list = await raw_material_url('get', null, {
          params: {
            page: val,
            material_type_id: v_materialType,
            material_no: v_search_material_no,
            material_name: v_search_material_name,
            use_flag: true
          }
        })
        this.tableData = raw_material_list.results
        this.tableDataTotal = raw_material_list.count
      } catch (e) { e }
    },
    async material_type_list() {
      try {
        const material_type_list = await material_type_url('get', {
          params: { }
        })
        this.materialTypeOptions = material_type_list.results
      } catch (e) { throw new Error(e) }
    },
    async condition_list() {
      try {
        const condition_list = await condition_url('get', {
          params: { }
        })
        this.SelectConditionOptions = condition_list.results
      } catch (e) { throw new Error(e) }
    },
    async action_list() {
      try {
        const action_list = await action_url('get', {
          params: { }
        })
        this.SelectActionOptions = action_list.results
      } catch (e) { throw new Error(e) }
    },
    // async recipe_process_step_list(id, equip) {
    //   try {
    //     const process_step_listData = await rubber_process_url('get', null, {
    //       params: { product_batching: id, equip: equip }
    //     })
    //     //
    //     console.log('----------------------get--------------------')
    //     console.log(process_step_listData)
    //     this.recipe_step_id = process_step_listData.results[0]['id']
    //     // 超温最短时间、进胶最低温度...
    //     this.mini_time = process_step_listData.results[0]['mini_time']
    //     this.mini_temp = process_step_listData.results[0]['mini_temp']
    //     this.over_temp = process_step_listData.results[0]['over_temp']
    //     this.batching_error = process_step_listData.results[0]['batching_error']
    //     this.zz_temp = process_step_listData.results[0]['zz_temp']
    //     this.xlm_temp = process_step_listData.results[0]['xlm_temp']
    //     this.cb_temp = process_step_listData.results[0]['cb_temp']
    //     // 炼胶超时时间、进胶最高温度...
    //     this.over_time = process_step_listData.results[0]['over_time']
    //     this.max_temp = process_step_listData.results[0]['max_temp']
    //     this.reuse_time = process_step_listData.results[0]['reuse_time']
    //     this.reuse_flag = process_step_listData.results[0]['reuse_flag']
    //     this.temp_use_flag = process_step_listData.results[0]['temp_use_flag']
    //     this.sp_num = process_step_listData.results[0]['sp_num']
    //     this.use_flag = process_step_listData.results[0]['use_flag']
    //     console.log('====================2222')
    //     console.log(process_step_listData.results)
    //     console.log('====================2222')
    //     for (var i = 0; i < process_step_listData.results[0]['process_details'].length; ++i) {
    //       console.log('====================333333')
    //       console.log(process_step_listData.results[0]['process_details'][i])
    //       this.RecipeMaterialList.push({
    //         sn: this.RecipeMaterialList.length + 1,
    //         condition: process_step_listData.results[0]['process_details'][i]['condition'],
    //         time: process_step_listData.results[0]['process_details'][i]['time'],
    //         temperature: process_step_listData.results[0]['process_details'][i]['temperature'],
    //         energy: process_step_listData.results[0]['process_details'][i]['energy'],
    //         power: process_step_listData.results[0]['process_details'][i]['power'],
    //         action: process_step_listData.results[0]['process_details'][i]['action'],
    //         pressure: process_step_listData.results[0]['process_details'][i]['pressure'],
    //         rpm: process_step_listData.results[0]['process_details'][i]['rpm']
    //       })
    //     }
    //   } catch (e) { e }
    // },

    async popup_material_list(id) {
      try {
        const popup_materialData = await recipe_list('get', id)
        return popup_materialData
      } catch (e) { throw new Error(e) }
    },

    async put_recipe_list(id, obj) {
      try {
        const recipe_listData = await recipe_list('put', id, obj)
        return recipe_listData
      } catch (e) { throw new Error(e) }
    },
    async put_recipe_info_step_list(id, obj) {
      try {
        const recipe_info_step_list = await rubber_process_url('put', id, obj)
        return recipe_info_step_list
      } catch (e) { throw new Error(e) }
    },
    async post_recipe_info_step_list(obj) {
      try {
        const recipe_info_step_list = await rubber_process_url('post', null, obj)
        console.log(recipe_info_step_list)
      } catch (e) { throw new Error(e) }
    },

    modify_material_button: async function() {
      this.dialogRubberMaterialStandard = true
      if (this.confirm_recipe_list['production_time_interval']) {
        this.production_time_interval = this.confirm_recipe_list['production_time_interval']
      } else {
        this.production_time_interval = undefined
      }
      this.ProductRecipe = []
      for (var i = 0; i < this.confirm_recipe_list['batching_details'].length; ++i) {
        this.ProductRecipe.push({
          sn: this.ProductRecipe.length + 1,
          material: this.confirm_recipe_list['batching_details'][i]['material'],
          material_type: this.confirm_recipe_list['batching_details'][i]['material_type'],
          auto_flag: this.confirm_recipe_list['batching_details'][i]['auto_flag'],
          material_name: this.confirm_recipe_list['batching_details'][i]['material_name'],
          actual_weight: this.confirm_recipe_list['batching_details'][i]['actual_weight'],
          standard_error: this.confirm_recipe_list['batching_details'][i]['standard_error']
        })
      }
    },
    insert_material_changed: function() {
      this.ProductRecipe.push({
        material: '',
        material_type: '',
        auto_flag: 0,
        material_name: '',
        // actual_weight: '',
        standard_error: null

      })
    },
    del_material_row: function(material_ele, index) {
      this.ProductRecipe.splice(index, 1)
    },

    materialTypeChange: function() {
      this.raw_material_list()
    },
    search_material_no_Change: function() {
      this.raw_material_list()
    },
    search_material_name_Change: function() {
      this.raw_material_list()
    },

    delete_recipe_step: function() {

    },
    pop_up_raw_material: function(material_ele, index) {
      this.raw_material_index = index
      this.dialogRawMaterialSync = true
      this.raw_material_list()
    },
    pagehandleCurrentChange: function(val) {
      this.currentRow = val
      this.raw_material_list(val)
    },
    handleMaterialSelect(row) {
      var app = this
      // 胶料配料post
      console.log(row, '==================')
      app.ProductRecipe[app.raw_material_index].material_name = row.material_name
      app.ProductRecipe[app.raw_material_index].material = row.id
      app.ProductRecipe[app.raw_material_index].material_type = row.material_type_name
      app.dialogRawMaterialSync = false
    },
    saveMaterialClicked: async function() {
      // 循环整个表格
      this.batching_details_list = []
      for (var i = 0; i < this.ProductRecipe.length; ++i) {
        // 只有原材料和实际重量两个必选项都填写时，才能往batching_details_list中push
        if (this.ProductRecipe[i].material_name && this.ProductRecipe[i].actual_weight) {
          var now_stage_material = {
            sn: i + 1,
            // auto_flag: app.ProductRecipe[i].auto_flag,
            auto_flag: 0,
            material: this.ProductRecipe[i].material,
            actual_weight: this.ProductRecipe[i].actual_weight.toFixed(2),
            standard_error: this.ProductRecipe[i].standard_error.toFixed(2),
            material_name: this.ProductRecipe[i].material_name,
            material_type: this.ProductRecipe[i].material_type
          }
          this.batching_details_list.push(now_stage_material)
        } else {
          this.$message({
            message: '必填字段不能为空',
            type: 'error'
          })
          return
        }
      }
      //   console.log('------------------c------------')
      //   console.log(this.ProductRecipe, this.batching_details_list)
      this.dialogRubberMaterialStandard = false
      this.confirm_recipe_list['production_time_interval'] = this.production_time_interval
      this.confirm_recipe_list['batching_details'] = this.batching_details_list
      this.carbon_tableData = []
      this.oil_tableData = []
      this.rubber_tableData = []
      for (var j = 0; j < this.batching_details_list.length; ++j) {
        var v_auto_falg = ''
        if (this.batching_details_list[j]['auto_flag'] === 1) {
          v_auto_falg = '自动'
        } else if (this.batching_details_list[j]['auto_flag'] === 2) {
          v_auto_falg = '手动'
        } else {
          v_auto_falg = '其他'
        }
        if (this.batching_details_list[j]['material_type'] === '炭黑') {
          this.carbon_tableData.push({
            sn: this.carbon_tableData.length + 1,
            auto_flag: v_auto_falg,
            material_name: this.batching_details_list[j]['material_name'],
            actual_weight: this.batching_details_list[j]['actual_weight'],
            standard_error: this.batching_details_list[j]['standard_error']
          })
        } else if (this.batching_details_list[j]['material_type'] === '油料') {
          this.oil_tableData.push({
            sn: this.oil_tableData.length + 1,
            action_name: '投料',
            auto_flag: v_auto_falg,
            material_name: this.batching_details_list[j]['material_name'],
            actual_weight: this.batching_details_list[j]['actual_weight'],
            standard_error: this.batching_details_list[j]['standard_error']
          })
        } else {
          this.rubber_tableData.push({
            sn: this.rubber_tableData.length + 1,
            action_name: '投料',
            auto_flag: v_auto_falg,
            material_name: this.batching_details_list[j]['material_name'],
            actual_weight: this.batching_details_list[j]['actual_weight'],
            standard_error: this.batching_details_list[j]['standard_error']
          })
        }
      }
    },
    // saveMaterialClicked: async function() {
    //   // 循环整个表格
    //   console.log('------------------b------------')
    //   console.log(this.ProductRecipe)
    //   for (var i = 0; i < this.ProductRecipe.length; ++i) {
    //     // 只有原材料和实际重量两个必选项都填写时，才能往batching_details_list中push
    //     if (this.ProductRecipe[i].material_name && this.ProductRecipe[i].actual_weight) {
    //       var now_stage_material = {
    //         sn: i + 1,
    //         // auto_flag: app.ProductRecipe[i].auto_flag,
    //         auto_flag: 0,
    //         material: this.ProductRecipe[i].material,
    //         actual_weight: this.ProductRecipe[i].actual_weight.toFixed(2),
    //         standard_error: this.ProductRecipe[i].standard_error.toFixed(2),
    //         material_name: this.ProductRecipe[i].material_name,
    //         material_type: this.ProductRecipe[i].material_type
    //       }
    //       this.batching_details_list.push(now_stage_material)
    //     } else {
    //       this.$message({
    //         message: '必填字段不能为空',
    //         type: 'error'
    //       })
    //       return
    //     }
    //   }
    //   this.dialogRubberMaterialStandard = false
    //   this.carbon_tableData = []
    //   this.oil_tableData = []
    //   this.rubber_tableData = []
    //   for (var j = 0; j < this.batching_details_list.length; ++j) {
    //     var v_auto_falg = ''
    //     if (this.batching_details_list[j]['auto_flag'] === 1) {
    //       v_auto_falg = '自动'
    //     } else if (this.batching_details_list[j]['auto_flag'] === 2) {
    //       v_auto_falg = '手动'
    //     } else {
    //       v_auto_falg = '其他'
    //     }
    //     if (this.batching_details_list[j]['material_type'] === '炭黑') {
    //       this.carbon_tableData.push({
    //         sn: this.carbon_tableData.length + 1,
    //         auto_flag: v_auto_falg,
    //         material_name: this.batching_details_list[j]['material_name'],
    //         actual_weight: this.batching_details_list[j]['actual_weight'],
    //         standard_error: this.batching_details_list[j]['standard_error']
    //       })
    //     } else if (this.batching_details_list[j]['material_type'] === '油料') {
    //       this.oil_tableData.push({
    //         sn: this.oil_tableData.length + 1,
    //         action_name: '投料',
    //         auto_flag: v_auto_falg,
    //         material_name: this.batching_details_list[j]['material_name'],
    //         actual_weight: this.batching_details_list[j]['actual_weight'],
    //         standard_error: this.batching_details_list[j]['standard_error']
    //       })
    //     } else {
    //       this.rubber_tableData.push({
    //         sn: this.rubber_tableData.length + 1,
    //         action_name: '投料',
    //         auto_flag: v_auto_falg,
    //         material_name: this.batching_details_list[j]['material_name'],
    //         actual_weight: this.batching_details_list[j]['actual_weight'],
    //         standard_error: this.batching_details_list[j]['standard_error']
    //       })
    //     }
    //   }
    // },
    insert_recipe_step: function() {
      this.RecipeMaterialList.push({
        sn: '',
        //     condition:"",
        time: null,
        temperature: null,
        energy: null,
        power: null,
        //     action:"",
        pressure: null,
        rpm: null
      })
    },
    del_recipe_step_row: function(step_ele, index) {
      this.RecipeMaterialList.splice(index, 1)
    },
    recipe_save_return: async function() {
      if (this.equip_name == null) {
        this.$message({
          message: '机台不能不能为空',
          type: 'error'
        })
        return
      }
      if (this.RecipeMaterialList.length === 0) {
        this.$message({
          message: '密炼步序不能为空',
          type: 'error'
        })
        return
      }
      var step_details_list = []
      // 循环整个表格
      for (var i = 0; i < this.RecipeMaterialList.length; ++i) {
        // 只有步序的所有字段都填时，才能往step_details_list中push
        // if (this.RecipeMaterialList[i].temperature && this.RecipeMaterialList[i].energy && this.RecipeMaterialList[i].power && this.RecipeMaterialList[i].action && this.RecipeMaterialList[i].pressure && this.RecipeMaterialList[i].rpm) {
        if (this.RecipeMaterialList[i].action) {
          var now_recipe_step = {
            sn: i + 1,
            condition: this.RecipeMaterialList[i].condition,
            time: this.RecipeMaterialList[i].time,
            temperature: this.RecipeMaterialList[i].temperature,
            energy: this.RecipeMaterialList[i].energy,
            power: this.RecipeMaterialList[i].power,
            action: this.RecipeMaterialList[i].action,
            pressure: this.RecipeMaterialList[i].pressure,
            rpm: this.RecipeMaterialList[i].rpm
          }
          step_details_list.push(now_recipe_step)
        } else {
          this.$message({
            message: '密炼步序动作字段不能为空',
            type: 'error'
          })
          return
        }
      }
      if (this.mini_temp && this.over_temp && this.zz_temp && this.xlm_temp && this.cb_temp && this.max_temp && this.sp_num) {
        try {
          await this.post_recipe_list(
            { data: {
              'factory': this.confirm_recipe_list['factory'],
              'site': this.confirm_recipe_list['site'],
              'product_info': this.confirm_recipe_list['product_info'],
              'precept': this.confirm_recipe_list['precept'],
              'stage_product_batch_no': this.confirm_recipe_list['stage_product_batch_no'],
              'stage': this.confirm_recipe_list['stage'],
              'versions': this.confirm_recipe_list['versions'],
              'production_time_interval': this.confirm_recipe_list['production_time_interval'],
              'batching_details': this.confirm_recipe_list['batching_details'],
              'equip': this.$route.params['copy_equip_id'],
              // 密炼步序list
              'process_details': step_details_list,
              'processes': {
                // 配方基础信息中第一行
                'mini_time': this.mini_time,
                'mini_temp': this.mini_temp,
                'over_temp': this.over_temp,
                'batching_error': this.batching_error,
                'zz_temp': this.zz_temp,
                'xlm_temp': this.xlm_temp,
                'cb_temp': this.cb_temp,
                // 配方基础信息中第二行
                'over_time': this.over_time,
                'max_temp': this.max_temp,
                'reuse_time': this.reuse_time,
                'reuse_flag': this.reuse_flag,
                'temp_use_flag': this.temp_use_flag,
                'sp_num': this.sp_num,
                'use_flag': this.use_flag,
                // 设备id与配方id
                'equip': this.$route.params['copy_equip_id'],
                'product_batching': this.$route.params['id']
              }
            }}
          )
          this.$message({
            message: this.stage_product_batch_no + '配方复制成功',
            type: 'success'
          })
          this.$router.push({ name: 'RecipeList' })
        } catch (e) { e }

        // else {
        //   await this.post_recipe_info_step_list(
        //     { data: {
        //       // 配方基础信息中第一行
        //       'mini_time': this.mini_time,
        //       'mini_temp': this.mini_temp,
        //       'over_temp': this.over_temp,
        //       'batching_error': this.batching_error,
        //       'zz_temp': this.zz_temp,
        //       'xlm_temp': this.xlm_temp,
        //       'cb_temp': this.cb_temp,
        //       // 配方基础信息中第二行
        //       'over_time': this.over_time,
        //       'max_temp': this.max_temp,
        //       'reuse_time': this.reuse_time,
        //       'reuse_flag': this.reuse_flag,
        //       'temp_use_flag': this.temp_use_flag,
        //       'sp_num': this.sp_num,
        //       'use_flag': this.use_flag,
        //       // 密炼步序list
        //       'process_details': step_details_list,
        //       // 设备id与配方id
        //       'equip': this.equip_name,
        //       'product_batching': this.$route.params['id']

        //     }},
        //     this.$message({
        //       message: this.stage_product_batch_no + '配方步序修改成功',
        //       type: 'success'
        //     }),
        //     this.$router.push({ name: 'RecipeList' })
        //   )
        // }
      } else {
        this.$message({
          message: '配方基本信息不能为空',
          type: 'error'
        })
      }
    },
    recipe_return_list: function() {
      this.$router.push({ name: 'RecipeList' })
    },
    sp_numFormatter: function() {
      return this.sp_numChoice(this.sp_num)
    },
    sp_numChoice: function(sp_num_ele) {
      switch (sp_num_ele) {
        case 1:
          return '1车/托'
        case 2:
          return '2车/托'
        case 3:
          return '3车/托'
        case 4:
          return '4车/托'
        case 5:
          return '5车/托'
      }
    }

  }
}
</script>

<style lang="scss">
.recipe_modify{
.font_custom{
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    font-weight: 700;
}
.el-input-number.is-controls-right .el-input__inner {
    padding-left: 0px;
    padding-right: 0px;
}
.el-input-number--mini .el-input-number__decrease, .el-input-number--mini .el-input-number__increase {
    width: 13px;
    font-size: 12px;
}
}

</style>
