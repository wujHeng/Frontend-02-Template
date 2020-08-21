<template>
<div style="margin-top: 25px; margin:25px auto auto auto">
  <el-form style="margin-left: 10px" :inline="true">
    <el-form-item label="机台">
      <el-select
          clearable
          @change="equipChange"
          v-model="equip" placeholder="请选择">
        <el-option
          v-for="item in equipOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item style="float: right">
      <el-button type="info" @click="save">保存并下载</el-button>
      <el-button type="info">返回</el-button>
      
    </el-form-item>
  </el-form>
  <el-form style="margin-left: 10px" :inline="true">
    <el-form-item label="当前机台">
      <el-input type="text" v-model="equip" :disabled="true"></el-input>
    </el-form-item>
  </el-form>
  <el-table
    :data="tableBinCbData"
    border
    style="width: 80%">
    <el-table-column
      label="炭黑称">
      <el-table-column
        prop="tank_name"
        label="炭黑罐">
      </el-table-column>
      <el-table-column
        prop="masterial_name"
        label="物料名称">
        <template slot-scope="scope">
            <el-select
                clearable
                @change="masterialChange"
                v-model="scope.row.masterial_name">
                <el-option
                v-for="item in masterialOptions"
                :key="item"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column
        :formatter="formatter"
        prop="used_flag"
        label="使用状态">
        <template slot-scope="scope">
        <el-switch
          v-model="scope.row.used_flag"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="启用"
          inactive-text="停用">
        </el-switch>
        </template>
        
      </el-table-column>
    </el-table-column>
    
  </el-table>
  <el-table
    :data="tableBinOilData"
    border
    style="width: 80%">
    <el-table-column
      label="油料称">
      <el-table-column
        prop="tank_name"
        label="油料罐">
      </el-table-column>
      <el-table-column
        prop="masterial_name"
        label="物料名称">
        <template slot-scope="scope">
            <el-select
                clearable
                @change="masterialChange"
                v-model="scope.row.masterial_name">
                <el-option
                v-for="item in masterialOptions"
                :key="item"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column
        :formatter="formatter"
        prop="used_flag"
        label="使用状态">
        <template slot-scope="scope">
        <el-switch
          v-model="scope.row.used_flag"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="启用"
          inactive-text="停用">
        </el-switch>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</div>
</template>

<script> 
import { weighCb, weighOil} from '@/api/weigh'

export default {
  
  data: function() {
    return {
      tableBinCbData: [],
      tableBinOilData: [],
      equip: '1#密炼机',
      equipOptionsUrl: '',
      equipOptions: ['1#密炼机','2#密炼机','3#密炼机',],
    //   state: '使用',
      stateOptionsUrl: '',
      stateOptions: ["使用","停用"],
    //   masterial: '炭黑1',
      masterialOptionsUrl: '',
      masterialOptions: ["炭黑1","炭黑2","炭黑3","炭黑4",],

    }
  },
  created() {
    this.getCbList()
    this.getOilList()
  },
  methods: {
    async getCbList(){
      try{
        let cbData = await weighCb('get')
        this.tableBinCbData = cbData .results
      }catch(e){}
    },
    async getOilList(){
      try{
        let oilData = await weighOil('get')
        this.tableBinOilData = oilData.results
      }catch(e){}
    },
    formatter: function (row, column) {
        return row.used_flag ? "使用" :  "停用"
      },
    equipChange() {
      
    },
    masterialChange() {
      
    },
    stateChange() {
      
    },
    save() {
      console.log(this.tableData, 'tableData')
    },
  }
}
</script>

<style lang="scss" scoped>
    
</style>