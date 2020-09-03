<template>
  <el-dialog title="修改车次" :visible.sync="dialogVisible" width="30%">
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
        <el-form-item label="修改后车次: " :error="formError[0]">
          <el-input-number v-model.number="trains" :precision="1" :min="0" />
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
      trains: null,
      dialogVisible: false,
      formError: []
    }
  },
  methods: {
    show(currentRow) {
      this.currentRow = currentRow
      this.trains = null
      this.dialogVisible = true
    },
    alterTrainNumberSubmit() {
      if (this.trains >= 0) {
        this.putUpdateTrains()
      } else {
        this.formError = []
        this.formError.push('*不能为空')
      }
      // this.putUpdateTrains()
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
