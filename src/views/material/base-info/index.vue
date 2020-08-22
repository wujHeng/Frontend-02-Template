<template>
  <div style="margin-top: 25px">
    <!-- <el-form style="margin-left: 10px" :inline="true">
      <el-form-item label="原材料类别">
        <el-select />
      </el-form-item>
      <el-form-item style="float: right;">
        <el-button>新建</el-button>
      </el-form-item>
    </el-form> -->
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              size="mini"
            >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
            >删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <page :total="total" @currentChange="currentChange" />
  </div>
</template>

<script>
import { getMaterials } from '@/api/material'
import page from '@/components/page'

export default {
  components: { page },
  data() {
    return {
      tableData: [],
      params: {
        page: 1
      },
      total: '',
      currentPage: 1
    }
  },
  created() {
    this.getMaterialList()
  },
  methods: {

    getMaterialList() {
      getMaterials(this.params).then(response => {
        this.tableData = response.results || []
        this.total = response.count
      })
    },
    formatter: function(row, column) {
      return row.used_flag ? 'Y' : 'N'
    },
    currentChange(page) {
      this.params.page = page
      this.getMaterialList()
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
