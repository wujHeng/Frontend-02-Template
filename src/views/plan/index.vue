<template>
  <div style="margin-top: 25px">
    <el-row>
      <el-form style="margin-left: 10px" :inline="true">
        <el-form-item style="float: right">
          <el-button type="info" @click="showFindDialog">查询</el-button>
          <el-button type="info" @click="showAddPlanDialog">新增</el-button>
          <el-button type="info" :disabled="disabled" @click="stopPlan">停止</el-button>
          <el-button type="info" :disabled="disabled" @click="delPlan">删除</el-button>
          <el-button type="info" :disabled="disabled" @click="issuedPlan">下达</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-form style="margin-left: 10px" :inline="true">
        <el-form-item label="机台">
          <el-select
            v-model="equip"
            clearable
            placeholder="请选择"
            @change="equipChange"
          >
            <el-option
              v-for="item in equipOptions"
              :key="item.equip_no"
              :label="item.equip_no"
              :value="item.equip_no"
            />
          </el-select>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="info" :disabled="disabled" @click="upPlan">上调</el-button>
          <el-button type="info" :disabled="disabled" @click="downPlan">下调</el-button>
          <el-button type="info" :disabled="disabled" @click="showAlterTrainNumberDialog">修改车次</el-button>
          <el-button type="info" style="width: 120px" :disabled="disabled" @click="retransmissionpPlan">重传</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <div style="border-radius: 2px">
      <el-row>
        <el-form style="margin-left: 10px" :inline="true">
          <el-form-item label="机台">
            <el-input type="text" disabled />
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-form style="margin-left: 10px" :inline="true">
          <el-form-item label="开始">
            <el-input type="text" style="float: left" disabled />
          </el-form-item>
          <el-form-item label="配方">
            <span style="float: right; margin-left: 30px" />
            <el-input type="text" style="float: right" disabled />
          </el-form-item>
          <el-form-item label="设定车次">
            <el-input type="text" style="float: left" disabled />
          </el-form-item>
          <el-form-item label="状态">
            <el-input type="text" style="float: left" disabled />
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-form style="margin-left: 10px" :inline="true">
          <el-form-item label="结束">
            <el-input type="text" disabled />
          </el-form-item>
          <el-form-item label="当前计划">
            <el-input type="text" disabled />
          </el-form-item>
          <el-form-item label="当前车次">
            <el-input type="text" disabled />
          </el-form-item>
        </el-form>
      </el-row>
    </div>
    <el-table
      :data="tableData"
      border
      highlight-current-row
      :default-sort="{prop: 'sn'}"
      style="width: 100%"
      @current-change="handleCurrentChange"
    >
      <el-table-column

        width="55"
      />
      <el-table-column
        prop="plan_classes_uid"
        label="计划编号"
      />
      <el-table-column
        prop="sn"
        label="序号"
      />
      <el-table-column
        prop="stage_product_batch_no"
        label="配方名称"
      />
      <el-table-column
        prop="begin_time"
        label="开始时间"
      />
      <el-table-column
        prop="end_time"
        label="结束时间"
      />
      <el-table-column
        prop="equip_name"
        label="机台"
      />
      <el-table-column
        prop="classes"
        label="班次"
      />
      <el-table-column
        prop="plan_trains"
        label="设定"
      />
      <el-table-column
        prop="actual_trains"
        label="完成"
      />
      <el-table-column
        prop="operation_user"
        label="操作员"
      />
      <el-table-column
        prop="status"
        label="状态"
      />

    </el-table>
    <page :total="total" @currentChange="currentChange" />
    <el-dialog
      title="查询计划"
      :visible.sync="findDialogVisible"
      width="30%"
    >
      <el-form :inline="true">
        <el-row>
          <el-form-item label="开始时间: ">
            <el-date-picker
              v-model="beginTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="结束时间: ">
            <el-date-picker
              v-model="endTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="班次: ">
            <el-select
              v-model="calss"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in calssOptions"
                :key="item.global_name"
                :label="item.global_name"
                :value="item.global_name"
              />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="配方: ">
            <el-select
              v-model="recipe"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in recipeOptions"
                :key="item.stage_product_batch_no"
                :label="item.stage_product_batch_no"
                :value="item.stage_product_batch_no"
              />
            </el-select>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="findDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="findAlterTrainNumberSubmit">确 定</el-button>
      <!-- <el-button type="primary" @click="handleCreateEquipCate('EquipCateForm')">确 定</el-button> -->
      </div>
    </el-dialog>
    <alter-train-number-dialog
      ref="alterTrainNumberDialog"
      @handleSuccessed="getPlanList"
    />

    <add-plan-dialog
      ref="addPlanDialog"
      @handleSuccessed="getPlanList"
    />

  </div>

</template>

<script>
import { equip, palletFeedBacks, delPalletFeedBacks, issuedPlan, stopPlan, retransmissionpPlan, upRegulation, downRegulation, updateTrains, productDayPlanManycreate, globalCodes, productbatching } from '@/api/plan'
import AlterTrainNumberDialog from './AlterTrainNumberDialog'
import AddPlanDialog from './AddPlanDialog'
import page from '@/components/page'

export default {
  components: { page, AlterTrainNumberDialog, AddPlanDialog },
  data: function() {
    return {
      equip: '',
      equipOptions: [],
      params: {
        'page': 1
      },
      tableData: [],
      currentRow: {},
      total: 0,
      page: 1,

      findDialogVisible: false,
      beginTime: '',
      endTime: '',
      recipe: '',
      recipeOptions: [],
      calss: '',
      calssOptions: [],
      findForm: {
      },
      formError: {
      },

      updateTrainsId: '',
      disabled: true
    }
  },
  created() {
    this.getPlanList()
    this.getEquipList()
  },
  methods: {
    async getPlanList() {
      this.params['page'] = this.page
      this.params['equip_no'] = this.equip
      try {
        const Data = await palletFeedBacks('get', { params: this.params })
        this.tableData = Data.results
        this.total = Data.count
      } catch (e) {}
    },

    async getEquipList() {
      try {
        const equipData = await equip('get')
        this.equipOptions = equipData.results
      } catch (e) {}
    },
    equipChange() {
      console.log(this.equip)
      this.params = {},
      this.getPlanList()
    },

    async getClassList() {
      try {
        const classData = await globalCodes('get', { params: { all: 1, class_name: '班次' }})
        this.calssOptions = classData.results
      } catch (e) {}
    },
    async getrecipeList() {
      try {
        const recipeData = await productbatching('get', { params: { all: 1 }})
        this.recipeOptions = recipeData.results
      } catch (e) {}
    },
    clearFindForm() {
      this.beginTime = ''
      this.endTime = ''
      this.calss = ''
      this.recipe = ''
    },
    clearFindFormError() {
      this.formError = {
      }
    },
    showFindDialog() {
      this.clearFindForm()
      this.clearFindFormError()
      this.getClassList()
      this.getrecipeList()
      console.log(this.calssOptions)
      this.findDialogVisible = true
    },
    findAlterTrainNumberSubmit() {
      if (this.beginTime) { this.params['begin_time'] = this.beginTime }
      if (this.endTime) { this.params['end_time'] = this.endTime }
      if (this.calss) { this.params['classes'] = this.beginTcalssime }
      if (this.recipe) { this.params['product_no'] = this.recipe }
      this.getPlanList()
      this.findDialogVisible = false
    },

    delPlan() {
      this.$confirm('此操作将永久删除' + this.currentRow.plan_classes_uid + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delPalletFeedBacks(this.currentRow.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getPlanList()
        })
      })
    },

    upPlan() {
      upRegulation(this.params, this.currentRow.id).then(response => {
        this.$message({
          type: 'success',
          message: '上调成功!'
        })
        this.getPlanList()
      })
    },

    downPlan() {
      try {
        downRegulation(this.params, this.currentRow.id).then(response => {
          this.$message({
            type: 'success',
            message: '下调成功!'
          })
          this.getPlanList()
        })
      } catch (error) {
        this.$message.error(error)
      }
    },

    stopPlan() {
      stopPlan({ id: this.currentRow.id, equip_no: this.equip }).then(response => {
        this.$message({
          type: 'success',
          message: '停止成功!'
        })
        this.getPlanList()
      })
    },

    retransmissionpPlan() {
      retransmissionpPlan({ id: this.currentRow.id, equip_no: this.equip, plan_trains: this.currentRow.plan_trains }).then(response => {
        this.$message({
          type: 'success',
          message: '重传成功!'
        })
        this.getPlanList()
      })
    },

    issuedPlan() {
      issuedPlan(this.currentRow).then(response => {
        this.$message({
          type: 'success',
          message: '下达成功!'
        })
        this.getPlanList()
      })
    },

    showAlterTrainNumberDialog() {
      this.$refs.alterTrainNumberDialog.show(this.currentRow)
    },
    showAddPlanDialog() {
      this.$refs.addPlanDialog.show()
    },
    handleCurrentChange(val) {
      this.currentRow = val
      if (val) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    currentChange(page) {
      this.page = page
      this.getPlanList()
    }
  }
}
</script>

<style scoped>

</style>
