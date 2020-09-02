<template>
  <div style="margin-top: 25px">
    <el-form style="margin-left: 10px" :inline="true">
      <el-select
        v-model="materialType"
        clearable
        placeholder="请选择"
        @change="materialTypeChange"
      >
        <el-option
          v-for="item in materialTypes"
          :key="item.id"
          :label="item.global_name"
          :value="item.id"
        />
      </el-select>
      <el-form-item style="float: right;">
        <el-button @click="showCreateMaterialDialog">新建</el-button>
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
        prop="use_flag"
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
              @click="showUpdateMaterialDialog(scope.row)"
            >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteMaterial(scope.row)"
            >删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <page :total="total" @currentChange="currentChange" />
    <create-material-dialog
      ref="createMaterialDialog"
      :material-types="materialTypes"
      :packing-units="packingUnits"
      @handleSuccessed="getMaterialList"
    />
    <update-material-dialog
      ref="updateMaterialDialog"
      :material-types="materialTypes"
      :packing-units="packingUnits"
      @handleSuccessed="getMaterialList"
    />

  </div>
</template>

<script>
import { getMaterials, getMaterialTypes, getPackingUnits, deleteMaterial } from '@/api/material'
import page from '@/components/page'
import CreateMaterialDialog from './CreateMaterialDialog'
import UpdateMaterialDialog from './UpdateMaterialDialog'

export default {
  components: { page, CreateMaterialDialog, UpdateMaterialDialog },
  data() {
    return {
      tableData: [],
      materialTypes: [],
      materialType: null,
      packingUnits: [],
      params: {
        page: 1,
        material_type_id: null
      },
      total: 0,
      currentPage: 1
    }
  },
  created() {
    this.getMaterialList()
    this.getMaterialTypes()
    this.getPackingUnits()
  },
  methods: {
    showCreateMaterialDialog() {
      this.$refs.createMaterialDialog.show()
    },
    showUpdateMaterialDialog(material) {
      this.$refs.updateMaterialDialog.show(JSON.parse(JSON.stringify(material)))
    },
    deleteMaterial(material) {
      this.$confirm('此操作将永久删除' + material.material_name + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMaterial(material.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getMaterialList()
        })
      })
    },
    getMaterialList() {
      getMaterials(this.params).then(response => {
        this.tableData = response.results || []
        this.total = response.count
      })
    },
    getMaterialTypes() {
      getMaterialTypes().then(response => {
        this.materialTypes = response.results
      })
    },
    getPackingUnits() {
      getPackingUnits().then(response => {
        this.packingUnits = response.results
      })
    },
    materialTypeChange() {
      this.params.material_type_id = this.materialType
      this.params.page = 1
      this.getMaterialList()
    },
    formatter: function(row, column) {
      return row.use_flag ? 'Y' : 'N'
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
