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
    :data="tableBinCBData"
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
        <template slot-scope="scope" v-if="scope.row.low_value!='' && scope.row.low_value>=0">
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
        prop="low_value"
        label="使用状态">
        <template slot-scope="scope" v-if="scope.row.low_value!='' && scope.row.low_value>=0">
          <el-select
          clearable
          @change="stateChange"
          v-model="scope.row.state" >
        <el-option
          v-for="item in stateOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
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
        <template slot-scope="scope" v-if="scope.row.low_value!='' && scope.row.low_value>=0">
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
        prop="low_value"
        label="使用状态">
        <template slot-scope="scope" v-if="scope.row.low_value!='' && scope.row.low_value>=0">
          <el-select
          clearable
          @change="stateChange"
          v-model="scope.row.state" >
        <el-option
          v-for="item in stateOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</div>
</template>

<script> 
import { weighCb } from '@/api/wengh'

export default {
  
  data: function() {
    return {
      tableData: [],
      tableBinCBData: [{
        "tank_name": "1号炭黑罐",
        "masterial_name": "炭黑1",
        "low_value": "1.00",
        "advance_value": "22.00",
        "adjust_value": "1.00",
        "dot_time": "1.00",
        "fast_speed": "1.00",
        "low_speed": "22.00",
        "state": '使用',
      },
      {
        "tank_name": "2号炭黑罐",
        "masterial_name": "炭黑2",
        "low_value": "1.00",
        "advance_value": "22.00",
        "adjust_value": "1.00",
        "dot_time": "1.00",
        "fast_speed": "1.00",
        "low_speed": "22.00",
        "state": '使用',
      },
      {
        "tank_name": "3号炭黑罐",
      },
      {
        "tank_name": "4号炭黑罐",
      },
      {
        "tank_name": "5号炭黑罐",
      },
      {
        "tank_name": "6号炭黑罐",
      },
      {
        "tank_name": "7号炭黑罐",
      },
      {
        "tank_name": "8号炭黑罐",
      },
      {
        "tank_name": "9号炭黑罐",
      },],
      tableBinOilData: [{
        "tank_name": "1号油料罐",
        "masterial_name": "油料1",
        "low_value": "1.00",
        "advance_value": "22.00",
        "adjust_value": "1.00",
        "dot_time": "1.00",
        "state": '使用',
      },
      {
        "tank_name": "2号油料罐",
        "masterial_name": "油料2",
        "low_value": "1.00",
        "advance_value": "22.00",
        "adjust_value": "1.00",
        "dot_time": "1.00",
        "state": '使用',
      },
      {
        "tank_name": "3号油料罐",
      },
      {
        "tank_name": "4号油料罐",
      },
      {
        "tank_name": "5号油料罐",
      },],
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
  },
  methods: {
    async getList(){
      try{
        let data = await weighCb('get')
        this.tableData = data
        console.log(data,'data')
      }catch(e){}
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