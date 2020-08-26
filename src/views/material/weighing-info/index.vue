<template>
  <div style="margin-top: 25px">
    <el-form style="margin-left: 10px" :inline="true">
      <el-form-item label="机台">
        <el-select v-model="equip" clearable placeholder="请选择" @change="equipChange">
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
    <el-table :data="tableBinCbData" border style="width: 100%">
      <el-table-column label="炭黑称">
        <el-table-column prop="tank_name" label="炭黑罐" />
        <el-table-column prop="material_name" label="物料名称">
          <template v-if="scope.row.used_flag" slot-scope="scope">{{ scope.row.material_name }}</template>
        </el-table-column>
        <el-table-column prop="low_value" label="慢称值">
          <template v-if="scope.row.used_flag" slot-scope="scope">
            <el-input v-model="scope.row.low_value" type="number" min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="advance_value" label="提前量">
          <template v-if="scope.row.used_flag" slot-scope="scope">
            <el-input v-model="scope.row.advance_value" type="number" min="0" />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="（单位0.1S）">
        <el-table-column prop="adjust_value" label="调整值">
          <template v-if="scope.row.used_flag" slot-scope="scope">
            <el-input v-model="scope.row.adjust_value" type="number" min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="dot_time" label="点动时间">
          <template v-if="scope.row.used_flag" slot-scope="scope">
            <el-input v-model="scope.row.dot_time" type="number" min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="fast_speed" label="快称速度">
          <template v-if="scope.row.used_flag" slot-scope="scope">
            <el-input v-model="scope.row.fast_speed" type="number" min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="low_speed" label="慢称速度">
          <template v-if="scope.row.used_flag" slot-scope="scope">
            <el-input v-model="scope.row.low_speed" type="number" min="0" />
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-table :data="tableBinOilData" border style="width: 75%">
      <el-table-column label="油料称">
        <el-table-column prop="tank_name" label="油料罐" />
        <el-table-column prop="material_name" label="物料名称">
          <template v-if="scope.row.used_flag" slot-scope="scope">{{ scope.row.material_name }}</template>
        </el-table-column>
        <el-table-column prop="low_value" label="慢称值">
          <template v-if="scope.row.used_flag" slot-scope="scope">
            <el-input v-model="scope.row.low_value" type="number" min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="advance_value" label="提前量">
          <template v-if="scope.row.used_flag" slot-scope="scope">
            <el-input v-model="scope.row.advance_value" type="number" min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="adjust_value" label="调整值">
          <template v-if="scope.row.used_flag" slot-scope="scope">
            <el-input v-model="scope.row.adjust_value" type="number" min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="dot_time" label="点动时间">
          <template v-if="scope.row.used_flag" slot-scope="scope">
            <el-input v-model="scope.row.dot_time" type="number" min="0" />
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
  equip
} from '@/api/weigh'
export default {
  data: function() {
    return {
      tableBinCbData: [],
      tableBinOilData: [],
      equip: '',
      equipOptions: []
    }
  },
  created() {
    this.getCbList()
    this.getOilList()
    this.getEquipList()
  },
  methods: {
    async getCbList() {
      try {
        const cbData = await weighCb('get', {
          params: { equip_no: this.equip, all: 1 }
        })
        this.tableBinCbData = cbData.results
      // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    async getOilList() {
      try {
        const oilData = await weighOil('get', {
          params: { equip_no: this.equip, all: 1 }
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
    equipChange() {
      this.getCbList()
      this.getOilList()
    },
    save() {
      this.putCbList()
      this.putOilList()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
