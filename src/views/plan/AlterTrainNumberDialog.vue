<template>
  <el-dialog title="查询计划" :visible.sync="dialogVisible" width="30%">
    <el-form :inline="true">
      <el-row>
        <el-form-item label="计划编号: ">
          <el-input v-model="currentRow.plan_classes_uid" type="text" :disabled="true" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="配方名称: ">
          <el-input v-model="currentRow.stage_product_batch_no" type="text" :disabled="true" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="原设定车次: ">
          <el-input v-model="currentRow.plan_trains" type="text" :disabled="true" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="修改后车次: ">
          <el-input v-model="trains" type="text" />
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="alterTrainNumberSubmit">确 定</el-button>
      <!-- <el-button type="primary" @click="handleCreateEquipCate('EquipCateForm')">确 定</el-button> -->
    </div>
  </el-dialog>
</template>

<script>
import { updateTrains } from '@/api/plan'

export default {
  data() {
    return {
      currentRow: {},
      trains: '',
      dialogVisible: false,
      form: {},
      formError: {}
    }
  },
  methods: {
    clearForm() {
      this.form = {}
    },
    clearFormError() {
      this.formError = {}
    },
    show(currentRow) {
      this.currentRow = currentRow
      this.clearForm()
      this.clearFormError()
      this.dialogVisible = true
    },
    alterTrainNumberSubmit() {
      this.putUpdateTrains()
    },

    async putUpdateTrains() {
      try {
        updateTrains({ trains: this.trains }, this.currentRow.id).then(
          (response) => {
            this.$message('修改成功')
            this.dialogVisible = false
            this.$emit('handleSuccessed')
          }
        )
      // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }
}
</script>
