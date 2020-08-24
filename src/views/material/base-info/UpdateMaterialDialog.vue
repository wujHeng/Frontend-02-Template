<template>
  <el-dialog title="编辑原材料基本信息" :visible.sync="dialogVisible">
    <el-form v-model="form">
      <el-form-item :error="formError.material_no" label="原材料编码">
        <el-input v-model="form.material_no" />
      </el-form-item>
      <el-form-item :error="formError.material_name" label="原材料名称">
        <el-input v-model="form.material_name" />
      </el-form-item>
      <el-form-item :error="formError.for_short" label="原材料简称">
        <el-input v-model="form.for_short" />
      </el-form-item>
      <el-form-item :error="formError.used_flag" label="是否启用">
        <el-switch v-model="form.used_flag" />
      </el-form-item>
      <el-form-item :error="formError.material_type" label="原材料类别">
        <el-select
          v-model="form.material_type"
          placeholder="请选择"
        >
          <el-option
            v-for="item in materialTypes"
            :key="item.id"
            :label="item.global_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :error="formError.package_unit" label="包装单位">
        <el-select v-model="form.package_unit" placeholder="请选择">
          <el-option
            v-for="item in packingUnits"
            :key="item.id"
            :label="item.global_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAddMaterialBaseInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateMaterial } from '@/api/material'

export default {
  props: {
    materialTypes: {
      type: Array,
      default() {
        return []
      }
    },
    packingUnits: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {

        material_no: '',
        material_name: '',
        for_short: '',
        used_flag: false,
        material_type: null,
        package_unit: null
      },
      formError: {

        material_no: '',
        material_name: '',
        for_short: '',
        used_flag: '',
        material_type: '',
        package_unit: ''
      }
    }
  },
  methods: {
    clearFormError() {
      this.formError = {

        material_no: '',
        material_name: '',
        for_short: '',
        used_flag: '',
        material_type: '',
        package_unit: ''
      }
    },
    show(material) {
      this.form = material
      this.clearFormError()
      this.dialogVisible = true
    },
    handleAddMaterialBaseInfo() {
      this.clearFormError()
      updateMaterial(this.form, this.form.id).then(response => {
        this.$message('修改成功')
        this.dialogVisible = false
        this.$emit('handleSuccessed')
      }).catch(response => {
        for (const key in this.formError) {
          if (response[key]) { this.formError[key] = response[key].join(',') }
        }
      })
    }
  }
}
</script>
