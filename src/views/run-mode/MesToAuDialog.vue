<template>
  <el-dialog width="80%" title="MES系统与上辅机群控系统的数据同步" :visible.sync="dialogVisible">
    <el-table :data="tableData">
      <el-table-column
        label="MES系统"
      >
        <el-table-column prop="mes_data_type" label="数据类别" />
        <el-table-column prop="mes_data_no" label="数据编号" />
      </el-table-column>

      <el-table-column
        label="同步"
      >
        <el-table-column width="80">
          <template slot="header" slot-scope="scope">
            <el-checkbox>全选</el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-checkbox />
          </template>
        </el-table-column>
        <el-table-column prop="sync_data_no" label="数据编号" />
        <el-table-column width="80">
          <template slot="header" slot-scope="scope">
            <el-checkbox>全选</el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-checkbox />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="上辅机群控系统"
      >
        <el-table-column prop="au_data_type" label="数据类别" />
        <el-table-column prop="au_data_no" label="数据编号" />
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          mes_data_type: '计划',
          mes_data_no: '202123213132',
          sync_data_no: '',
          au_data_type: '计划',
          au_data_no: '202123213132'
        },
        {
          mes_data_type: '配方',
          mes_data_no: '202123213132',
          sync_data_no: '',
          au_data_type: '配方',
          au_data_no: '202123213132'
        }
      ],
      dialogVisible: false
    }
  },

  methods: {
    show() {
      this.dialogVisible = true
    }
  }
}
</script>
