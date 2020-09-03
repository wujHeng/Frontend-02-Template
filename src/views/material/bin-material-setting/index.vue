<template>
  <div style="margin-top: 25px; margin:25px auto auto auto">
    <el-form style="margin-left: 10px" :inline="true">
      <el-form-item label="机台">
        <el-select v-model="equip" clearable placeholder="请选择" @change="equipChange" @visible-change="equipVisibleChange">
          <el-option
            v-for="item in equipOptions"
            :key="item.equip_no"
            :label="item.equip_no"
            :value="item.equip_no"
          />
        </el-select>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="info" @click="save">保存并下载</el-button>
        <el-button type="info">返回</el-button>
      </el-form-item>
    </el-form>
    <el-form style="margin-left: 10px" :inline="true">
      <el-form-item label="当前机台">
        <el-input v-model="equip" type="text" :disabled="true" />
      </el-form-item>
    </el-form>
    <el-table :data="tableBinCbData" border style="width: 80%">
      <el-table-column label="炭黑称">
        <el-table-column prop="tank_name" label="炭黑罐" />
        <el-table-column prop="material_name" label="物料名称">
          <template slot-scope="scope">
            <el-select
              v-if="scope.row.use_flag"
              v-model="scope.row.material_name"
              @change="masterialChange"
            >
              <el-option
                v-for="item in cbOptions"
                :key="item.material_name"
                :label="item.material_name"
                :value="item.material_name"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="use_flag" label="使用状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.use_flag"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启用"
              inactive-text="停用"
            />
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-table :data="tableBinOilData" border style="width: 80%">
      <el-table-column label="油料称">
        <el-table-column prop="tank_name" label="油料罐" />
        <el-table-column prop="material_name" label="物料名称">
          <template slot-scope="scope">
            <el-select
              v-if="scope.row.use_flag"
              v-model="scope.row.material_name"
              @change="masterialChange"
            >
              <el-option v-for="item in oilOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="use_flag" label="使用状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.use_flag"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启用"
              inactive-text="停用"
            />
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  weighCb,
  weighOil,
  materials,
  equip
} from '@/api/weigh'

export default {
  data: function() {
    return {
      tableBinCbData: [],
      tableBinOilData: [],
      equip: '',
      equipOptions: [],
      materialsTypeId: '',
      cbOptions: [],
      oilOptions: []
    }
  },
  created() {
    this.getCbList()
    this.getOilList()
    this.getMaterialsCbList()
    this.getMaterialsOilList()
    this.getEquip()
  },
  methods: {
    async getEquip() {
      const equipData = await equip('get')
      this.equip = equipData.results[0].equip_no
    },
    async getCbList() {
      try {
        const cbData = await weighCb('get', { params: { equip_no: this.equip }})
        this.tableBinCbData = cbData.results
      // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    async getOilList() {
      try {
        const oilData = await weighOil('get', {
          params: { equip_no: this.equip }
        })
        this.tableBinOilData = oilData.results
      // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    async putCbList() {
      try {
        await weighCb('put', { data: this.tableBinCbData })
        this.$message({
          showClose: true,
          message: '炭黑罐保存成功',
          type: 'success',
          center: true
        })
      // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    async putOilList() {
      try {
        await weighOil('put', { data: this.tableBinOilData })
        this.$message({
          showClose: true,
          message: '油料罐保存成功',
          type: 'success',
          center: true
        })
      // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    async getEquipList() {
      try {
        const equipData = await equip('get')
        this.equipOptions = equipData.results
      // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    async getMaterialsCbList() {
      try {
        const materialsData = await materials('get', {
          params: { material_type_name: '炭黑', all: 1 }
        })
        this.cbOptions = materialsData.results
      // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    async getMaterialsOilList() {
      try {
        const materialsData = await materials('get', {
          params: { material_type_name: '油料', all: 1 }
        })
        this.oilOptions = materialsData.results
      // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    formatter: function(row, column) {
      return row.use_flag ? '使用' : '停用'
    },
    equipVisibleChange(bool) {
      if (bool) {
        this.getEquipList()
      }
    },
    equipChange() {
      this.getCbList()
      this.getOilList()
    },
    masterialChange() {},
    stateChange() {},
    save() {
      this.putCbList()
      this.putOilList()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
