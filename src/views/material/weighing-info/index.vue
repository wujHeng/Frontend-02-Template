<template>
  <div style="margin-top: 25px">
    <el-form style="margin-left: 10px" :inline="true">
      <el-form-item label="机台">
        <el-select v-model="equip" placeholder="请选择" @change="equipChange" @visible-change="equipVisibleChange">
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
          <template slot-scope="scope">{{ scope.row.material_name }}</template>
        </el-table-column>
        <el-table-column prop="low_value" label="慢称值">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.low_value" size="medium" :step="0.01" :max="99" :min="0" step-strictly @blur="low_value_change(scope.row, scope.row.low_value)" />
          </template>
        </el-table-column>
        <el-table-column prop="advance_value" label="提前量">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.advance_value" size="medium" :step="0.01" :max="99" :min="0" step-strictly @blur="advance_value_change(scope.row, scope.row.advance_value)" />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="（单位0.1S）">
        <el-table-column prop="adjust_value" label="调整值">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.adjust_value" size="medium" :step="0.01" :max="99" :min="0" step-strictly @blur="adjust_value_change(scope.row, scope.row.adjust_value)" />
          </template>
        </el-table-column>
        <el-table-column prop="dot_time" label="点动时间">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.dot_time" size="medium" :step="1" :max="99" :min="0" step-strictly @blur="dot_time_change(scope.row, scope.row.dot_time)" />
          </template>
        </el-table-column>
        <el-table-column prop="fast_speed" label="快称速度">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.fast_speed" size="medium" :step="1" :max="99" :min="0" step-strictly @blur="fast_speed_change(scope.row, scope.row.fast_speed)" />
          </template>
        </el-table-column>
        <el-table-column prop="low_speed" label="慢称速度">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.low_speed" size="medium" :step="1" :max="99" :min="0" step-strictly @blur="low_speed_change(scope.row, scope.row.low_speed)" />
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-table :data="tableBinOilData" border style="width: 75%">
      <el-table-column label="油料称">
        <el-table-column prop="tank_name" label="油料罐" />
        <el-table-column prop="material_name" label="物料名称">
          <template slot-scope="scope">{{ scope.row.material_name }}</template>
        </el-table-column>
        <el-table-column prop="low_value" label="慢称值">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.low_value" size="medium" :step="0.01" :max="99" :min="0" step-strictly @blur="low_value_change(scope.row, scope.row.low_value)" />
          </template>
        </el-table-column>
        <el-table-column prop="advance_value" label="提前量">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.advance_value" size="medium" :step="0.01" :max="99" :min="0" step-strictly @blur="advance_value_change(scope.row, scope.row.advance_value)" />
          </template>
        </el-table-column>
        <el-table-column prop="adjust_value" label="调整值">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.adjust_value" size="medium" :step="0.01" :max="99" :min="0" step-strictly @blur="adjust_value_change(scope.row, scope.row.adjust_value)" />
          </template>
        </el-table-column>
        <el-table-column prop="dot_time" label="点动时间">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.dot_time" size="medium" :step="1" :max="99" :min="0" step-strictly @blur="dot_time_change(scope.row, scope.row.dot_time)" />
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
    this.getEquip()
  },
  methods: {
    async getEquip() {
      const equipData = await equip('get')
      this.equip = equipData.results[0].equip_no
      this.getCbList()
      this.getOilList()
    },
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
    equipVisibleChange(bool) {
      if (bool) {
        this.getEquipList()
      }
    },
    equipChange() {
      this.getCbList()
      this.getOilList()
    },
    save() {
      this.putCbList()
      this.putOilList()
    },
    low_valuehange(row, value) {
      if (!value) {
        row.low_value = 0
      }
    },
    advance_value_change(row, value) {
      if (!value) {
        row.advance_value = 0
      }
    },
    adjust_value_change(row, value) {
      if (!value) {
        row.adjust_value = 0
      }
    },
    dot_time_change(row, value) {
      if (!value) {
        row.dot_time = 0
      }
    },
    fast_speed_change(row, value) {
      if (!value) {
        row.fast_speed = 0
      }
    },
    low_speed_change(row, value) {
      if (!value) {
        row.low_speed = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
