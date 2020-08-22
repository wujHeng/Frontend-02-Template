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
                v-for="item in cbOptions"
                :key="item.material_name"
                :label="item.material_name"
                :value="item.material_name">
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
                v-for="item in oilOptions"
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
import { weighCb, weighOil, globalTypes, globalCodes, materials, equip} from '@/api/weigh'

export default {
  
  data: function() {
    return {
      tableBinCbData: [],
      tableBinOilData: [],
      equip: '',
      equipOptions: [],
      materialsTypeId: '',
      cbOptions: [],
      oilOptions: [],

    }
  },
  created() {
    this.getCbList()
    this.getOilList()
    this.getEquipList()
    this.getMaterialsCbList()
    this.getMaterialsOilList()
    
  },
  methods: {
    async getCbList(){
      try{
        let cbData = await weighCb('get', {params: {equip_no: this.equip}})
        this.tableBinCbData = cbData.results
      }catch(e){}
    },
    async getOilList(){
      try{
        let oilData = await weighOil('get', {params: {equip_no: this.equip}})
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
    async getMaterialsCbList(){
      try{
        let materialsData = await materials('get',  {params: {material_type_id: 10, page_size: 10000}})
        this.cbOptions = materialsData.results
      }catch(e){}
    },
    async getMaterialsOilList(){
      try{
        let materialsData = await materials('get',  {params: {material_type_id: 57, page_size: 10000}})
        this.oilOptions = materialsData.results
      }catch(e){}
    },
    formatter: function (row, column) {
        return row.used_flag ? "使用" :  "停用"
      },
    equipChange() {
      this.getCbList()
      this.getOilList()
    },
    masterialChange() {
      
    },
    stateChange() {
      
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