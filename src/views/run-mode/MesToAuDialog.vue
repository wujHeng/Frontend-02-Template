<template>
  <el-dialog width="30%" title="MES系统与上辅机群控系统的数据同步" :visible.sync="dialogVisible">
    <span style="font-size: 18px">确定同步</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="synchronize">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Synchronization, ManualSync } from '@/api/synchronization'

export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    synchronize() {
      Synchronization().then(response => {
        ManualSync().then(r => {
          this.$message.success('同步成功')
        })
      })
      this.dialogVisible = false
    },
    show() {
      this.dialogVisible = true
    }
  }
}
</script>
