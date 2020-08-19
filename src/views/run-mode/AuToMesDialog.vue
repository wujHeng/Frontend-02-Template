<template>
  <el-dialog width="80%" title="上辅机群控系统与工作站的数据同步" :visible.sync="dialogVisible">
    <div style="margin-bottom: 15px">
      <el-select placeholder="当前机台" />
      <el-button style="float: right">同步</el-button>
    </div>
    <el-table>
      <el-table-column label="上辅机群控">
        <el-table-column label="数据类别" />
        <el-table-column label="数据类别" />
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
      <el-table-column label="上辅机工作站">
        <el-table-column label="数据类别" />
        <el-table-column label="数据编号" />
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
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

<style scoped>

</style>
