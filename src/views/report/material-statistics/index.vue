<template>
  <div style="margin-top: 25px">
    <el-form style="margin-left: 10px" :inline="true">
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="params.st"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="params.et"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <br>
      <el-form-item label="机台">
        <equip-select />
      </el-form-item>
      <el-form-item label="配方">
        <el-select />
      </el-form-item>
      <el-form-item label="物料类别">
        <el-select />
      </el-form-item>
      <el-form-item style="float: right">
        <el-button>导出</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="equip_no"
        label="机台"
      />
      <el-table-column
        prop="product_no"
        label="配方"
      />
      <el-table-column
        prop="material_type"
        label="物料类别"
      />
      <el-table-column
        prop="material_name"
        label="物料名称"
      />
      <el-table-column
        prop="actual_weight"
        label="实际重量"
      />
    </el-table>
    <page :total="total" @currentChange="currentChange" />
  </div>
</template>

<script>
import { getMaterialStatistics } from '@/api/material-statistics'
import page from '@/components/page'
import EquipSelect from '@/components/EquipSelect'

export default {
  components: { page, EquipSelect },
  data() {
    return {
      tableData: [],
      total: 0,
      params: {
        page: 1,
        st: null,
        et: null,
        material_type: null,
        equip_no: null,
        product_no: null
      }
    }
  },
  created() {
  },
  methods: {
    getMaterialStatistics() {
      getMaterialStatistics(this.params).then(response => {
        this.tableData = response.results || []
        this.total = response.count
      })
    },
    currentChange(page) {
      this.params.page = page
      this.getMaterialStatistics()
    }
  }
}
</script>
