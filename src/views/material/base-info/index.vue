<template>
  <div style="margin-top: 25px">
    <el-form style="margin-left: 10px" :inline="true">
      <el-form-item label="原材料类别">
        <el-select />
      </el-form-item>
      <el-form-item style="float: right;">
        <el-button>新建</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="material_no"
        label="原材料代码"
        width="100"
      />
      <el-table-column
        prop="material_name"
        label="原材料名称"
        width="100"
      />
      <el-table-column
        prop="for_short"
        label="原材料简称"
        width="100"
      />
      <el-table-column
        prop="material_type_name"
        label="原材料类别"
        width="100"
      />
      <el-table-column
        prop="density"
        label="比重"
        width="50"
      />
      <el-table-column
        prop="package_unit_name"
        label="包装单位"
      />
      <el-table-column
        :formatter="formatter"
        prop="used_flag"
        label="使用与否"
      />
      <el-table-column
        prop="created_user_name"
        label="创建人员"
      />
      <el-table-column
        prop="created_date"
        label="创建时间"
      />
      <el-table-column
        prop="update_user_name"
        label="更新人员"
      />
      <el-table-column
        prop="last_updated_date"
        label="更新时间"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        material_no: '代码01',
        material_name: '原材料名称01',
        for_short: '简称01',
        material_type_name: '天然胶',
        density: 1.56,
        package_unit_name: '块',
        used_flag: true

      }, {
        material_no: '代码01',
        material_name: '原材料名称01',
        for_short: '简称01',
        material_type_name: '天然胶',
        density: 1.56,
        package_unit_name: '块',
        used_flag: true

      }, {
        material_no: '代码01',
        material_name: '原材料名称01',
        for_short: '简称01',
        material_type_name: '天然胶',
        density: 1.56,
        package_unit_name: '块',
        used_flag: true

      }, {
        material_no: '代码01',
        material_name: '原材料名称01',
        for_short: '简称01',
        material_type_name: '天然胶',
        density: 1.56,
        package_unit_name: '块',
        used_flag: true

      }, {
        material_no: '代码01',
        material_name: '原材料名称01',
        for_short: '简称01',
        material_type_name: '天然胶',
        density: 1.56,
        package_unit_name: '块',
        used_flag: true

      }, {
        material_no: '代码01',
        material_name: '原材料名称01',
        for_short: '简称01',
        material_type_name: '天然胶',
        density: 1.56,
        package_unit_name: '块',
        used_flag: true

      }, {
        material_no: '代码01',
        material_name: '原材料名称01',
        for_short: '简称01',
        material_type_name: '天然胶',
        density: 1.56,
        package_unit_name: '块',
        used_flag: true

      }, {
        material_no: '代码01',
        material_name: '原材料名称01',
        for_short: '简称01',
        material_type_name: '天然胶',
        density: 1.56,
        package_unit_name: '块',
        used_flag: true

      }]
    }
  },
  methods: {
    formatter: function(row, column) {
      return row.used_flag ? 'Y' : 'N'
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
