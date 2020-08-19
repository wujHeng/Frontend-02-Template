<template>
  <div style="margin-top: 25px">
    <el-form style="margin-left: 10px" :inline="true">
      <el-form-item label="开始时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <br>
      <el-form-item label="机台">
        <el-select />
      </el-form-item>
      <el-form-item label="配方">
        <el-select />
      </el-form-item>
      <el-form-item label="物料类别">
        <el-select />
      </el-form-item>
      <el-form-item style="float: right">
        <el-button>查询</el-button>
        <el-button>导出</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="machine"
        label="机台"
      />
      <el-table-column
        prop="recipe"
        label="配方"
      />
      <el-table-column
        prop="type"
        label="物料类别"
      />
      <el-table-column
        prop="name"
        label="物料名称"
      />
      <el-table-column
        prop="weight"
        label="实际重量"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          machine: '1#密炼机',
          recipe: 'C-MB1-1066-01',
          type: '胶料',
          name: 'C-MB1-1066-01',
          weight: '200.5'
        },
        {
          machine: '2#密炼机',
          recipe: 'C-MB1-1066-01',
          type: '胶料',
          name: 'C-MB1-1066-01',
          weight: '200.5'
        },
        {
          machine: '3#密炼机',
          recipe: 'C-MB1-1066-01',
          type: '胶料',
          name: 'C-MB1-1066-01',
          weight: '200.5'
        },
        {
          machine: '4#密炼机',
          recipe: 'C-MB1-1066-01',
          type: '胶料',
          name: 'C-MB1-1066-01',
          weight: '200.5'
        }
      ]
    }
  }
}
</script>
