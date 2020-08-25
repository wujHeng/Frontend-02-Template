<template>
<div style="margin-top: 25px">
  <el-form style="margin-left: 10px" :inline="true">
    <el-form-item label="机台">
      <el-select
          clearable
          @change="equipChange"
          v-model="equip" placeholder="请选择">
        <el-option
          v-for="item in equipOptions"
          :key="item.equip_no"
          :label="item.equip_no"
          :value="item.equip_no">
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
    style="width: 100%">
    <el-table-column
      label="炭黑称">
      <el-table-column
        prop="tank_name"
        label="炭黑罐">
      </el-table-column>
      <el-table-column
        prop="material_name"
        label="物料名称">
        <template slot-scope="scope" v-if="scope.row.used_flag">
          {{ scope.row.material_name }}
        </template>
      </el-table-column>
      <el-table-column
        prop="low_value"
        label="慢称值">
        <template slot-scope="scope" v-if="scope.row.used_flag">
          <el-input type="number" min="0" v-model="scope.row.low_value"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="advance_value"
        label="提前量">
        <template slot-scope="scope" v-if="scope.row.used_flag">
          <el-input type="number" min="0" v-model="scope.row.advance_value"></el-input>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column
      label="（单位0.1S）">
      <el-table-column
        prop="adjust_value"
        label="调整值">
        <template slot-scope="scope" v-if="scope.row.used_flag">
          <el-input type="number" min="0" v-model="scope.row.adjust_value"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="dot_time"
        label="点动时间">
        <template slot-scope="scope" v-if="scope.row.used_flag">
          <el-input type="number" min="0" v-model="scope.row.dot_time"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="fast_speed"
        label="快称速度">
        <template slot-scope="scope" v-if="scope.row.used_flag">
          <el-input type="number" min="0" v-model="scope.row.fast_speed"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="low_speed"
        label="慢称速度">
        <template slot-scope="scope" v-if="scope.row.used_flag">
          <el-input type="number" min="0" v-model="scope.row.low_speed"></el-input>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
  <el-table
    :data="tableBinOilData"
    border
    style="width: 75%">
    <el-table-column
      label="油料称">
      <el-table-column
        prop="tank_name"
        label="油料罐">
      </el-table-column>
      <el-table-column
        prop="material_name"
        label="物料名称">
        <template slot-scope="scope" v-if="scope.row.used_flag">
          {{ scope.row.material_name }}
        </template>
      </el-table-column>
      <el-table-column
        prop="low_value"
        label="慢称值">
        <template slot-scope="scope" v-if="scope.row.used_flag">
          <el-input type="number" min="0" v-model="scope.row.low_value"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="advance_value"
        label="提前量">
        <template slot-scope="scope" v-if="scope.row.used_flag">
          <el-input type="number" min="0" v-model="scope.row.advance_value"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="adjust_value"
        label="调整值">
        <template slot-scope="scope" v-if="scope.row.used_flag">
          <el-input type="number" min="0" v-model="scope.row.adjust_value"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="dot_time"
        label="点动时间">
        <template slot-scope="scope" v-if="scope.row.used_flag">
          <el-input type="number" min="0" v-model="scope.row.dot_time"></el-input>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</div>
</template>

<script> 
import { weighCb, weighOil, globalTypes, globalCodes, materials, equip} from '@/api/weigh'
export default {
  
  data: function() {
    return {
      tableBinCbData: [],
      tableBinOilData: [],
      equip: '',
      equipOptions: [],

    }
  },
  created() {
    this.getCbList()
    this.getOilList()
    this.getEquipList()
  },
  methods: {
    async getCbList(){
      try{
        let cbData = await weighCb('get', {params: {equip_no: this.equip, all: 1}})
        this.tableBinCbData = cbData.results
      }catch(e){}
    },
    async getOilList(){
      try{
        let oilData = await weighOil('get', {params: {equip_no: this.equip,  all: 1}})
        this.tableBinOilData = oilData.results
      }catch(e){}
    },
    async putCbList(){
      try{
        await weighCb('put', {data: this.tableBinCbData})
        this.$message({
          showClose: true,
          message: '炭黑罐保存成功',
          type: 'success',
          center: true
        });
      }catch(e){}
    },
    async putOilList(){
      try{
        await weighOil('put', {data: this.tableBinOilData})
        this.$message({
          showClose: true,
          message: '油料罐保存成功',
          type: 'success',
          center: true
        });
      }catch(e){}
    },
    async getEquipList(){
      try{
        let equipData = await equip('get')
        this.equipOptions = equipData.results
      }catch(e){}
    },
    equipChange() {
      this.getCbList()
      this.getOilList()
    },
    save() {
      this.putCbList()
      this.putOilList()
    },
  }
}
</script>

<style lang="scss" scoped>
    
</style>