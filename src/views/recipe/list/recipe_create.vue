<template>
  <div>
    <el-form :inline="true" :model="generateRecipeForm" :rules="rules" ref="generateRecipeForm">
      <el-form-item label="机台" prop="SelectEquip">
        <el-select
          size="mini"
          style="width: 100px"
          clearable
          v-model="generateRecipeForm.SelectEquip"
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
      <el-form-item label="产地" prop="SelectSite">
        <el-select
          size="mini"
          style="width: 100px"
          clearable
          v-model="generateRecipeForm.SelectSite"
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
      <el-form-item label="SITE" prop="SelectSITE">
        <el-select
          size="mini"
          style="width: 100px"
          clearable
          v-model="generateRecipeForm.SelectSITE"
          placeholder="请选择"
        >
          <el-option
            v-for="item in SelectSITEOptions"
            :key="item.id"
            :label="item.global_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="胶料编号" prop="SelectRecipeNo">
        <el-select
          size="mini"
          style="width: 100px"
          clearable
          v-model="generateRecipeForm.SelectRecipeNo"
          placeholder="请选择"
        >
          <el-option
            v-for="item in SelectRecipeNoOptions"
            :key="item.id"
            :label="item.product_no"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="段次" prop="SelectStage">
        <el-select
          size="mini"
          style="width: 100px"
          clearable
          v-model="generateRecipeForm.SelectStage"
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

      <el-form-item label="版本" prop="version">
              <el-input style="width: 65%" size="mini" v-model="generateRecipeForm.version" placeholder="版本"></el-input>
      </el-form-item> 
      <el-form-item label="方案">
              <el-input style="width: 65%" size="mini" v-model="generateRecipeForm.scheme" placeholder="方案"></el-input>
      </el-form-item>

      <!-- <el-form-item style="float: right">
        <el-button type="primary" @click="generateRecipeButton('generateRecipeForm')">生成</el-button>
      </el-form-item> -->
      <el-form-item style="float: right">
        <el-button type="primary" @click="generateMaterialButton('generateRecipeForm')">配料</el-button>
      </el-form-item>
    </el-form>

    <br />
    <el-form :inline="true">
      <el-form-item label="机台">
        <el-input size="mini" v-model="equip" :disabled="true" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="配方编号">
        <el-input size="mini" v-model="stage_product_batch_no" :disabled="true" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="配方id" v-show='false'>
        <el-input size="mini" v-model="product_batching" :disabled="true" style="width: 100%"></el-input>
      </el-form-item>

      <el-form-item style="float: right">
        <el-button @click="AddRecipeInfoStep">保存退出</el-button>
      </el-form-item>
    </el-form>

    <el-form :inline="true">
      <br />
      <el-form-item label="超温最短时间">
        <el-input size="mini" v-model="mini_time" style="width: 70px"></el-input>
      </el-form-item>
      <el-form-item label="进胶最低温度">
        <el-input size="mini" v-model="mini_temp" style="width: 70px"></el-input>
      </el-form-item>
      <el-form-item label="超温温度">
        <el-input size="mini" v-model="over_temp" style="width: 70px"></el-input>
      </el-form-item>
      <el-form-item label="胶料总误差">
        <el-input size="mini" v-model="batching_error" style="width: 70px"></el-input>
      </el-form-item>
      <el-form-item label="转子水温">
        <el-input size="mini" v-model="zz_temp" style="width: 70px"></el-input>
      </el-form-item>
      <el-form-item label="卸料门水温">
        <el-input size="mini" v-model="xlm_temp" style="width: 70px"></el-input>
      </el-form-item>
      <el-form-item label="侧壁水温">
        <el-input size="mini" v-model="cb_temp" style="width: 70px"></el-input>
      </el-form-item>

      <br />

      <el-form-item label="炼胶超时时间">
        <el-input size="mini" v-model="over_time" style="width: 70px"></el-input>
      </el-form-item>
      <el-form-item label="进胶最高温度">
        <el-input size="mini" v-model="max_temp" style="width: 70px"></el-input>
      </el-form-item>
      <el-form-item label="回收时间">
        <el-input size="mini" v-model="reuse_time" style="width: 70px"></el-input>
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
        <el-form-item label="收皮" prop="SelectEquip">
                <el-select size="mini" style="width: 85px" v-model="sp_num" placeholder="请选择">
                        <el-option
                        v-for="item in sp_num_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                </el-select>
        </el-form-item>

      <el-form-item label="配方停用">
        <el-checkbox v-model="used_flag"></el-checkbox>
      </el-form-item>
    </el-form>

    <br />
    <br />
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="grid-content bg-purple">
          胶料称量
          <el-table
            highlight-current-row
            :data="rubber_tableData"
            border
            style="width: 100%"
          >
            <el-table-column prop="sn" label="序号"></el-table-column>
            <el-table-column prop="material_name" label="胶料名称"></el-table-column>
            <el-table-column prop="actual_weight" label="设定值(kg)"></el-table-column>
            <el-table-column prop="standard_error" label="误差值(kg)"></el-table-column>
          </el-table>炭黑称量
          <el-table
            highlight-current-row
            :data="carbon_tableData"
            border
            style="width: 100%"
          >
            <el-table-column prop="sn" label="序号"></el-table-column>
            <el-table-column prop="action_name" label="动作"></el-table-column>
            <el-table-column prop="material_name" label="炭黑名称"></el-table-column>
            <el-table-column prop="actual_weight" label="设定值(kg)"></el-table-column>
            <el-table-column prop="standard_error" label="误差值(kg)"></el-table-column>
          </el-table>油料称量
          <el-table
            highlight-current-row
            :data="oil_tableData"
            border
            style="width: 100%"
          >
            <el-table-column prop="stage_product_batch_no" label="序号"></el-table-column>
            <el-table-column prop="action_name" label="动作"></el-table-column>
            <el-table-column prop="product_name" label="油脂名称"></el-table-column>
            <el-table-column prop="actual_weight" label="设定值(kg)"></el-table-column>
            <el-table-column prop="standard_error" label="误差值(kg)"></el-table-column>
          </el-table>
        </div>
      </el-col>

      <el-col :span="14">
        <div class="grid-content bg-purple">
          密炼规程
          <table class="table table-bordered"
               style="width: 100%; color: #909399; font-size: 14px;">
            <thead>
            <tr>
                <th style="text-align: center">序号</th>
                <th style="text-align: center">条件</th>
                <th style="text-align: center">时间</th>
                <th style="text-align: center">温度</th>
                <td style="text-align: center">能量</td>
                <td style="text-align: center">功率</td>
                <th style="text-align: center">动作</th>
                <th style="text-align: center">压力</th>
                <th style="text-align: center">转速</th>
            </tr>
            </thead>
                <tbody style="color: #606266;">
                <tr v-for="(step_ele, index) in RecipeMaterialList" :key="index">
                        <td style="text-align: center">{{ index + 1 }}</td>
                        <td style="text-align: center">
                        
                        <el-select size="mini" style="width: 100px" clearable v-model="step_ele.condition" placeholder="请选择">
                        <el-option
                        v-for="item in SelectConditionOptions"
                        :key="item.id"
                        :label="item.condition"
                        :value="item.id"
                        ></el-option>
                        </el-select>
                        
                        </td>
                        <td style="text-align: center">
                        <el-input size="mini" controls-position="right" v-model="step_ele.time"></el-input>
                        </td>
                        <td style="text-align: center">
                        <el-input size="mini" controls-position="right" v-model="step_ele.temperature"></el-input>
                        </td>
                        <td style="text-align: center">
                        <el-input size="mini" controls-position="right" v-model="step_ele.energy"></el-input>
                        </td>
                        <td style="text-align: center">
                        <el-input size="mini" controls-position="right" v-model="step_ele.power"></el-input>
                        </td>
                        <td style="text-align: center">
                                
                  
                        <el-select size="mini" style="width: 100px" clearable v-model="step_ele.action" placeholder="请选择">
                        <el-option
                        v-for="item in SelectActionOptions"
                        :key="item.id"
                        :label="item.action"
                        :value="item.id"
                        ></el-option>
                        </el-select>
                        
                                
                        </td>
                        <td style="text-align: center">
                        <el-input size="mini" controls-position="right" v-model="step_ele.pressure"></el-input>
                        </td>
                        <td style="text-align: center">
                        <el-input size="mini" controls-position="right" v-model="step_ele.rpm"></el-input>
                        </td>
                </tr>

                </tbody>
        </table>
        <el-form>
            <el-form-item style="text-align: center">
                <el-button  @click="insert_recipe_step">插入一行</el-button>
            </el-form-item>
        </el-form>
        
        </div>
      </el-col>
    </el-row>


    <el-dialog
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="90%" title="胶料配料标准" :visible.sync="dialogRubberMaterialStandard">

        <el-form :inline="true">
            <el-form-item style="float: right">
                <el-button @click="saveMaterialClicked">保存</el-button>
            </el-form-item>
        </el-form>
        <br>


        <table class="table table-bordered"
               style="width: 100%; color: #909399; font-size: 14px;">
            <thead>
            <tr>
                <th style="text-align: center">No</th>
                <th style="text-align: center">类别</th>
                <th style="text-align: center">自动与否</th>
                <th style="text-align: center">原材料</th>
                <td style="text-align: center">设定值(kg)</td>
                <td style="text-align: center">误差值(kg)</td>
            </tr>
            </thead>
                <tbody style="color: #606266;">
                <tr v-for="(material_ele, index) in ProductRecipe" :key="index">
                        <!--<td>{{ new_material_ele.sn }}</td>-->
                        <td v-show='false'>{{ material_ele.material }}</td>
                        <td style="text-align: center">{{ index + 1 }}</td>
                        <td style="text-align: center">{{ material_ele.material_type }}</td>
                        <td style="text-align: center">
                        <template>
                                <el-radio v-model="material_ele.auto_flag" :label="true">自动</el-radio>
                                <el-radio v-model="material_ele.auto_flag" :label="false">手动</el-radio>
                        </template>
                        </td>
                        <td style="text-align: center">
                        <div style="margin-top: 12px;">
                                <el-input v-model="material_ele.material_name" size="mini" style="width: 70%" class="input-with-select" :disabled="true">
                                <el-button slot="append" icon="el-icon-search" v-on:click="pop_up_raw_material(material_ele, index)"></el-button>
                                </el-input>
                        </div>
                        </td>
                        <td style="text-align: center">
                        <el-input-number size="mini" controls-position="right" v-model.number="material_ele.actual_weight"></el-input-number>
                        </td>
                        <td style="text-align: center">
                        <el-input-number size="mini" controls-position="right" v-model.number="material_ele.standard_error"></el-input-number>
                        </td>
                </tr>

                </tbody>

        </table>
        <el-form>
            <el-form-item style="text-align: center">
                <el-button  @click="insert_material_changed">插入一行</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>


    <el-dialog
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="70%" title="原材料选择" :visible.sync="dialogRawMaterialSync">

        <el-form :inline="true">
            <el-form-item label="原材料类别">
                <el-select
                        clearable
                        @change="materialTypeChange"
                        v-model="materialType" placeholder="请选择">
                    <el-option
                            v-for="item in materialTypeOptions"
                            :key="item.id"
                            :label="item.global_name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            原材料编号:<el-input  v-model="search_material_no" v-on:input="search_material_no_Change" style="width: 20%" ></el-input>
            原材料名称:<el-input  v-model="search_material_name" v-on:input="search_material_name_Change" style="width: 20%" ></el-input>
        </el-form>


        <el-table
            highlight-current-row
            @current-change="handleCurrentChange"
            :data="tableData"
            border
            style="width: 100%">
        <el-table-column
                align="center"
                label="S"
                width="30">
        </el-table-column>
        <el-table-column
                align="center"
                prop="material_no"
                label="原材料代码">
        </el-table-column>
        <el-table-column
                align="center"
                prop="material_name"
                label="原材料名称">
        </el-table-column>
        <el-table-column
                align="center"
                prop="material_type_name"
                label="原材料类别">
        </el-table-column>
        <el-table-column align="center" label="操作">
            <template slot-scope="scope">
                <el-button-group>
                    <el-button
                            size="mini"
                            @click="handleMaterialSelect(scope.row)">选中
                    </el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination
      @current-change="pagehandleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="tableDataTotal"
      layout="total, prev, pager, next"
    ></el-pagination>

    </el-dialog>

  </div>
</template>


<script>
import { recipe_list, rubber_process_url, equip_url, site_url, recipe_no_url, stage_url, dev_type_url, global_SITE_url, raw_material_url, material_type_url, condition_url, action_url } from "@/api/recipe_fun";
import { constantRoutes } from "@/router";
import { dataTool } from "echarts/lib/echarts";

export default {
  data: function () {
    return {
        SelectEquipOptions:[],
        SelectSiteOptions:[],
        SelectSITEOptions:[],
        SelectRecipeNoOptions:[],
        SelectStageOptions:[],
        SelectConditionOptions:[],
        SelectActionOptions:[],
        materialTypeOptions:[],
        materialType:null,
        search_material_no:null,
        search_material_name:null,
        sp_num_options:[{
          value: '1',
          label: '1车/托'
        }, {
          value: '2',
          label: '2车/托'
        }, {
          value: '3',
          label: '3车/托'
        }, {
          value: '4',
          label: '4车/托'
        }, {
          value: '5',
          label: '5车/托'
        }],
        generateRecipeForm:{
                SelectEquip:"",
                SelectSite:"",
                SelectSITE:"",
                SelectRecipeNo:"",
                SelectStage:"",
                version:"",
                scheme:"",
        },
        rules: {
                    SelectEquip: [{ required: true, message: '请选择机台', trigger: 'change' }],
                    SelectSite: [{ required: true, message: '请选择产地', trigger: 'change' }],
                    SelectSITE: [{ required: true, message: '请选择SITE', trigger: 'change' }],
                    SelectRecipeNo: [{ required: true, message: '请选择胶料编码', trigger: 'change' }],
                    SelectStage: [{ required: true, message: '请选择段次', trigger: 'change' }],
                    version: [{ required: true, message: '请输入版本', blur: 'change' }],
                },
        generateRecipeFormError:{
                SelectEquip:"",
                SelectSite:"",
                SelectSITE:"",
                SelectRecipeNo:"",
                SelectStage:"",
                version:"",
                scheme:"",
        },
        // 配料弹框
        dialogRubberMaterialStandard:false,
        ProductRecipe:[],
        RecipeMaterialList:[],
        raw_material_index:null,
        // 原材料弹框
        dialogRawMaterialSync:false,
        tableData: [],
        rubber_tableData:[],
        carbon_tableData:[],
        oil_tableData:[],
        currentRow: {},
        currentPage: 1,
        pageSize: 10,
        tableDataTotal: 0,
        // 机台、配方编号
        equip:null,
        stage_product_batch_no:null,
        product_batching:null,
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
        this.equip_list();
        this.site_list();
        this.equip_no_list();
        this.stage_list();
        this.dev_type_list();
        this.global_SITE_list();
        this.raw_material_list();
        this.condition_list();
        this.action_list();
        this.material_type_list();
  },
  methods: {
        //   以下6个函数用于初始化下拉框的接口(密炼机类型暂时不用)
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
    async equip_no_list() {
      try {
        let equip_no_list = await recipe_no_url("get", {
          params: { },
        });
        this.SelectRecipeNoOptions = equip_no_list.results
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
    async dev_type_list() {
      try {
        let dev_type_list = await dev_type_url("get", {
          params: { },
        });
        this.RubberStageOptions = dev_type_list.results
      } catch (e) {}
    },
    async global_SITE_list() {
      try {
        let global_SITE_list = await global_SITE_url("get", {
          params: { },
        });
        this.SelectSITEOptions = global_SITE_list.results
      } catch (e) {}
    },
    async condition_list() {
      try {
        let condition_list = await condition_url("get", {
          params: { },
        });
        this.SelectConditionOptions = condition_list.results
      } catch (e) {}
    },
    async action_list() {
      try {
        let action_list = await action_url("get", {
          params: { },
        });
        this.SelectActionOptions = action_list.results
      } catch (e) {}
    },

    //   原材料接口
    async raw_material_list(val = 1) {
      try {
        let raw_material_list = await raw_material_url("get", null, {
          params: { page: val },
        });
        this.tableData = raw_material_list.results;
        this.tableDataTotal = raw_material_list.count;
      } catch (e) {}
    },
    async search_raw_material_list(obj) {
      try {
        let search_raw_material_list = await raw_material_url("get", null, obj);
        this.tableData = search_raw_material_list.results;
        this.tableDataTotal = search_raw_material_list.count;
      } catch (e) {}
    },
    async material_type_list() {
      try {
        let material_type_list = await material_type_url("get", {
          params: { },
        });
        this.materialTypeOptions = material_type_list.results
      } catch (e) {}
    },
    async post_recipe_list(obj) {
        try {
                let recipe_listData = await recipe_list("post", null,obj);
                return recipe_listData
        } catch (e) {}
        },
    async post_recipe_info_step_list(obj) {
        try {
                let recipe_info_step_list = await rubber_process_url("post", null, obj);
                console.log(recipe_info_step_list)
        } catch (e) {}
        },
    handleCurrentChange: function (val) {
      this.currentRow = val;
    },
    pagehandleCurrentChange: function (val) {
      this.currentRow = val;
      this.raw_material_list(val);
    },
        handleMaterialSelect(row) {
                var app = this;
                //胶料配料post
                console.log(row, '==================')
                app.ProductRecipe[app.raw_material_index].material_name = row.material_name;
                app.ProductRecipe[app.raw_material_index].material = row.id;
                app.ProductRecipe[app.raw_material_index].material_type = row.material_type_name;
                app.dialogRawMaterialSync = false;
        },

        saveMaterialClicked: async function () {
                var app = this;
                var batching_details_list = [];
                //循环整个表格
                for (var i = 0; i < this.ProductRecipe.length; ++i) {
                    //只有原材料和实际重量两个必选项都填写时，才能往batching_details_list中push
                    if(app.ProductRecipe[i].material_name && app.ProductRecipe[i].actual_weight && app.ProductRecipe[i].standard_error){
                        var now_stage_material = {
                            sn: i+1,
                            auto_flag: app.ProductRecipe[i].auto_flag,
                            material:app.ProductRecipe[i].material,
                            actual_weight:app.ProductRecipe[i].actual_weight,
                            standard_error:app.ProductRecipe[i].standard_error,
                        };
                        batching_details_list.push(now_stage_material);
                    }
                    else {
                    }
                }
                var post_material_Data = await this.post_recipe_list(
                        {data:{
                                "factory": this.generateRecipeForm['SelectSite'],
                                "site": this.generateRecipeForm['SelectSITE'],
                                "product_info": this.generateRecipeForm['SelectRecipeNo'],
                                "precept": this.generateRecipeForm['scheme'],
                                "stage_product_batch_no": this.stage_product_batch_no,
                                "stage": this.generateRecipeForm['SelectStage'],
                                "versions": this.generateRecipeForm['version'],
                                "batching_details": batching_details_list,
                                "equip":this.generateRecipeForm['SelectEquip']
                        }}
                )
                this.dialogRubberMaterialStandard = false
                console.log('=====================xxx')
                console.log(post_material_Data)
                // 新建的配方的id，用于密炼步序的保存
                this.product_batching = post_material_Data['id']
                for(var j=0; j < post_material_Data['batching_details'].length; ++ j){
                        if(post_material_Data['batching_details'][j]['material_type'] == '炭黑'){
                                this.carbon_tableData.push({
                                        sn:this.carbon_tableData.length +1,
                                        material_name:post_material_Data['batching_details'][j]['material_name'],
                                        actual_weight:post_material_Data['batching_details'][j]['actual_weight'],
                                        standard_error:post_material_Data['batching_details'][j]['standard_error'],
                                })
                        }else if(post_material_Data['batching_details'][j]['material_type'] == '油料'){
                                this.oil_tableData.push({
                                        sn:this.oil_tableData.length +1,
                                        action_name:"投料",
                                        material_name:post_material_Data['batching_details'][j]['material_name'],
                                        actual_weight:post_material_Data['batching_details'][j]['actual_weight'],
                                        standard_error:post_material_Data['batching_details'][j]['standard_error'],

                                })
                        }else{
                                this.rubber_tableData.push({
                                        sn:this.rubber_tableData.length +1,
                                        action_name:"投料",
                                        material_name:post_material_Data['batching_details'][j]['material_name'],
                                        actual_weight:post_material_Data['batching_details'][j]['actual_weight'],
                                        standard_error:post_material_Data['batching_details'][j]['standard_error'],
                                })
                        }
                }




                

        },


        generateRecipeButton(formName) {
                this.$refs[formName].validate((valid) => {
                        if (valid) {
                                // 点击生成之后要显示的信息
                                for(var j=0; j< this.SelectEquipOptions.length; ++j){
                                        console.log(this.SelectEquipOptions[j]['id'], this.generateRecipeForm['SelectEquip'])
                                        if(this.SelectEquipOptions[j]['id'] == this.generateRecipeForm['SelectEquip']){
                                                this.equip = this.SelectEquipOptions[j]['equip_name']
                                        }
                                }
                                var SITE_name = "";
                                var stage_name = "";
                                var product_name = "";
                                for(var i=0; i< this.SelectSITEOptions.length; ++i){
                                        if(this.SelectSITEOptions[i]['id'] == this.generateRecipeForm['SelectSITE']){
                                                SITE_name = this.SelectSITEOptions[i]['global_name']
                                        }
                                }
                                for(var m=0; m< this.SelectStageOptions.length; ++m){
                                        if(this.SelectStageOptions[m]['id'] == this.generateRecipeForm['SelectStage']){
                                                stage_name = this.SelectStageOptions[m]['global_name']
                                        }
                                }
                                for(var n=0; n< this.SelectRecipeNoOptions.length; ++n){
                                        if(this.SelectRecipeNoOptions[n]['id'] == this.generateRecipeForm['SelectRecipeNo']){
                                                product_name = this.SelectRecipeNoOptions[n]['product_no']
                                        }
                                }
                                this.stage_product_batch_no = SITE_name + '-' + stage_name +'-'+ product_name+'-' + this.generateRecipeForm['version']


                        } else {
                        console.log('error submit!!');
                        return false;
                        }
                });

        },
        generateMaterialButton(formName) {
                this.$refs[formName].validate((valid) => {
                        if (valid) {
                                this.dialogRubberMaterialStandard = true
                                for(var j=0; j< this.SelectEquipOptions.length; ++j){
                                        console.log(this.SelectEquipOptions[j]['id'], this.generateRecipeForm['SelectEquip'])
                                        if(this.SelectEquipOptions[j]['id'] == this.generateRecipeForm['SelectEquip']){
                                                this.equip = this.SelectEquipOptions[j]['equip_name']
                                        }
                                }
                                var SITE_name = "";
                                var stage_name = "";
                                var product_name = "";
                                for(var i=0; i< this.SelectSITEOptions.length; ++i){
                                        if(this.SelectSITEOptions[i]['id'] == this.generateRecipeForm['SelectSITE']){
                                                SITE_name = this.SelectSITEOptions[i]['global_name']
                                        }
                                }
                                for(var m=0; m< this.SelectStageOptions.length; ++m){
                                        if(this.SelectStageOptions[m]['id'] == this.generateRecipeForm['SelectStage']){
                                                stage_name = this.SelectStageOptions[m]['global_name']
                                        }
                                }
                                for(var n=0; n< this.SelectRecipeNoOptions.length; ++n){
                                        if(this.SelectRecipeNoOptions[n]['id'] == this.generateRecipeForm['SelectRecipeNo']){
                                                product_name = this.SelectRecipeNoOptions[n]['product_no']
                                        }
                                }
                                this.stage_product_batch_no = SITE_name + '-' + stage_name +'-'+ product_name+'-' + this.generateRecipeForm['version']

                        } else {
                        console.log('error submit!!');
                        return false;
                        }
                });

        },
        get_material_List() {
                var v_materialType = this.materialType?this.materialType:''
                var v_search_material_no = this.search_material_no?this.search_material_no:''
                var v_search_material_name = this.search_material_name?this.search_material_name:''

                this.search_raw_material_list({params:{
                  material_type_id:v_materialType,
                  material_no:v_search_material_no,
                  material_name:v_search_material_name
                }})
        },
        materialTypeChange: function(){
          this.get_material_List()
        },
        search_material_no_Change: function(){
          this.get_material_List()
        },
        search_material_name_Change: function(){
          this.get_material_List()
        },

        insert_material_changed: function() {
                this.ProductRecipe.push({
                    material:"",
                    material_type:"",
                    auto_flag:true,
                    material_name:"",
                    actual_weight:"",
                    standard_error:""

                });
        },
        insert_recipe_step: function() {
                this.RecipeMaterialList.push({
                    sn:"",
                //     condition:"",
                    time:"",
                    temperature:"",
                    energy:"",
                    power:"",
                //     action:"",
                    pressure:"",
                    rpm:""
                });
        },
        pop_up_raw_material: function(material_ele, index){
                var app = this;
                app.raw_material_index = index;
                app.dialogRawMaterialSync = true;
            },
        AddRecipeInfoStep: async function(){
                if(this.equip && this.stage_product_batch_no){
                  if(this.mini_time && this.mini_temp && this.over_temp && this.batching_error && this.zz_temp 
                    && this.xlm_temp && this.cb_temp && this.over_time && this.max_temp && this.reuse_time && this.reuse_flag && this.temp_use_flag
                    && this.sp_num){
                        var step_details_list = [];
                        //循环整个表格
                        for (var i = 0; i < this.RecipeMaterialList.length; ++i) {
                        //只有步序的所有字段都填时，才能往step_details_list中push
                        if(this.RecipeMaterialList[i].condition && this.RecipeMaterialList[i].time && this.RecipeMaterialList[i].temperature && this.RecipeMaterialList[i].energy && this.RecipeMaterialList[i].power && this.RecipeMaterialList[i].action && this.RecipeMaterialList[i].pressure && this.RecipeMaterialList[i].rpm){
                                var now_recipe_step = {
                                sn: i+1,
                                condition: this.RecipeMaterialList[i].condition,
                                time:this.RecipeMaterialList[i].time,
                                temperature:this.RecipeMaterialList[i].temperature,
                                energy:this.RecipeMaterialList[i].energy,
                                power: this.RecipeMaterialList[i].power,
                                action: this.RecipeMaterialList[i].action,
                                pressure: this.RecipeMaterialList[i].pressure,
                                rpm: this.RecipeMaterialList[i].rpm
                                };
                                step_details_list.push(now_recipe_step);
                        }
                        else {
                                this.$message({
                                message: "密炼步序字段不能为空",
                                type: 'error'
                                });
                        }
                        }

                        await this.post_recipe_info_step_list(
                          {data:{
                                  // 配方基础信息中第一行
                                  "mini_time":this.mini_time,
                                  "mini_temp":this.mini_temp,
                                  "over_temp":this.over_temp,
                                  "batching_error":this.batching_error,
                                  "zz_temp":this.zz_temp,
                                  "xlm_temp":this.xlm_temp,
                                  "cb_temp":this.cb_temp,
                                  // 配方基础信息中第二行
                                  "over_time":this.over_time,
                                  "max_temp":this.max_temp,
                                  "reuse_time":this.reuse_time,
                                  "reuse_flag":this.reuse_flag,
                                  "temp_use_flag":this.temp_use_flag,
                                  "sp_num":this.sp_num,
                                  "used_flag":this.used_flag,
                                  // 密炼步序list
                                  "process_details":step_details_list,
                                  // 设备id与配方id
                                  "equip":this.generateRecipeForm['SelectEquip'],
                                  "product_batching":this.product_batching

                          }},
                          this.$message({
                                  message: this.stage_product_batch_no + "配方步序添加成功",
                                  type: 'success'
                          }),
                          this.$router.push({name:'RecipeList'})
                        )
                    }else{
                      this.$message({
                                  message: "配方基本信息不能为空",
                                  type: 'error'
                          })
                    }
                }else{
                        this.$message({
                        message: "请先进行配料",
                        type: 'error'
                    });
                }
        }



  },
};
</script>

<style lang="scss" scoped>
</style>