<template>
  <el-dialog
    width="90%"
    :visible.sync="addPlanVisible"
    title="添加胶料日生产计划"
  >
    <div style="margin-bottom: 15px">
      <el-select v-model="equipIdForAdd" filterable placeholder="请选择机台" style="margin-right: 10px">
        <el-option
          v-for="equip in equips"
          :key="equip.id"
          :label="equip.equip_no"
          :value="equip.id"
        />
      </el-select>
      <el-date-picker
        v-model="day_time"
        style="margin-right: 10px"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        @change="getPlanSchedules"
      />
      <el-select v-model="planScheduleId" filterable placeholder="倒班规则">
        <el-option
          v-for="planSchedule in planSchedules"
          :key="planSchedule.id"
          :label="planSchedule.work_schedule__schedule_name"
          :value="planSchedule.id"
        />
      </el-select>

      <el-button style="float: right" :disabled="!saveEnable" @click="batchSave">保存</el-button>
      <el-button @click="addOnePlan">添加</el-button>
    </div>
    <p style="text-align: right; color: red"> {{ weightError }} </p>
    <p style="text-align: right; color: red"> {{ timeError }} </p>
    <el-table
      :data="plansForAdd"
      border
    >
      <el-table-column fixed prop="equip_.equip_no" label="机台" />
      <el-table-column fixed prop="work_schedule_name" label="倒班规则" />
      <el-table-column fixed prop="day_time" label="日期" width="110" />
      <el-table-column label="胶料配方编码" width="180">
        <template v-if="!scope.row.sum" slot-scope="scope">
          <el-select v-model="scope.row.product_batching" filterable @change="productBatchingChanged(scope.row)">
            <el-option
              v-for="productBatching in scope.row.productBatchings"
              :key="productBatching.id"
              :label="productBatching.stage_product_batch_no"
              :value="productBatching.id"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="batching_weight" label="配料重量（吨）" />
      <el-table-column prop="production_time_interval" label="炼胶时间（秒）" />
      <el-table-column label="当前库存（吨）" />
      <el-table-column label="早班计划">
        <el-table-column label="顺序" width="210">
          <template v-if="!scope.row.sum && scope.row.pdp_product_classes_plan[0].enable" slot-scope="scope">
            <el-input-number
              v-model.number="scope.row.pdp_product_classes_plan[0].sn"
              :precision="0"
              :min="0"
            />
          </template>
        </el-table-column>
        <el-table-column label="车次" width="210">
          <template v-if="scope.row.pdp_product_classes_plan[0].enable" slot-scope="scope">
            <el-input-number
              v-model.number="scope.row.pdp_product_classes_plan[0].plan_trains"
              :precision="0"
              :disabled="scope.row.sum"
              :min="0"
              @change="planTrainsChanged(scope.row, 0)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="pdp_product_classes_plan[0].weight" label="重量" />
        <el-table-column prop="pdp_product_classes_plan[0].time" label="时间" />
      </el-table-column>
      <el-table-column label="中班计划">
        <el-table-column label="顺序" width="210">
          <template v-if="!scope.row.sum && scope.row.pdp_product_classes_plan[1].enable" slot-scope="scope">
            <el-input-number
              v-model.number="scope.row.pdp_product_classes_plan[1].sn"
              :min="0"
              :precision="0"
            />
          </template>
        </el-table-column>
        <el-table-column label="车次" width="210">
          <template v-if="scope.row.pdp_product_classes_plan[1].enable" slot-scope="scope">
            <el-input-number
              v-model.number="scope.row.pdp_product_classes_plan[1].plan_trains"
              :precision="0"
              :disabled="scope.row.sum"
              :min="0"
              @change="planTrainsChanged(scope.row, 1)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="pdp_product_classes_plan[1].weight" label="重量" />
        <el-table-column prop="pdp_product_classes_plan[1].time" label="时间" />
      </el-table-column>
      <el-table-column label="晚班计划">
        <el-table-column label="顺序" width="210">
          <template v-if="!scope.row.sum && scope.row.pdp_product_classes_plan[2].enable" slot-scope="scope">
            <el-input-number
              v-model.number="scope.row.pdp_product_classes_plan[2].sn"
              :min="0"
              :precision="0"
            />
          </template>
        </el-table-column>
        <el-table-column label="车次" width="210">
          <template v-if="scope.row.pdp_product_classes_plan[2].enable" slot-scope="scope">
            <el-input-number
              v-model.number="scope.row.pdp_product_classes_plan[2].plan_trains"
              :precision="0"
              :disabled="scope.row.sum"
              :min="0"
              @change="planTrainsChanged(scope.row, 2)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="pdp_product_classes_plan[2].weight" label="重量" />
        <el-table-column prop="pdp_product_classes_plan[2].time" label="时间" />
      </el-table-column>
      <el-table-column label="操作">
        <template v-if="!scope.row.sum" slot-scope="scope">
          <el-button type="danger" @click="deleteOnePlan(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import {
  equip,
  getRubberMateria,
  getWorkSchedules,
  getPlanSchedules,
  getPlanSchedule,
  postProductDayPlanManyCreate
} from '@/api/plan'

// import dayjs from 'dayjs'

export default {
  data() {
    return {
      addPlanVisible: false,
      equipIdForAdd: null,
      equips: [],
      equipById: {},
      day_time: '',
      planScheduleId: null,
      planSchedules: [],
      workSchedules: [],
      plansForAdd: [],
      productBatchingById: {},
      saveEnable: false,
      weightError: '',
      timeError: ''
    }
  },
  watch: {
    plansForAdd: {
      handler(plans) {
        this.saveEnable = true
        this.weightError = ''
        this.timeError = ''
        plans.forEach(plan => {
          if (!plan.sum) {
            plan.pdp_product_classes_plan.forEach(class_plan => {
              if (class_plan.weight > 99999) {
                this.saveEnable = false
                this.weightError = '计划重量过大'
              }
              if (class_plan.time > 999999.99) {
                this.saveEnable = false
                this.timeError = '计划时间过大'
              }
            })
          }
        })
      },
      deep: true
    }
  },
  created() {
    this.getEquipList()
    this.getRubberMateria()
    this.getWorkSchedules()
  },
  methods: {
    show() {
      this.plansForAdd = []
      this.addPlanVisible = true
    },
    async getEquipList() {
      try {
        const equipData = await equip('get', { params: { all: 1, category_name: '密炼设备' }})
        this.equips = equipData.results
        this.equips.forEach(equip => {
          this.equipById[equip.id] = equip
        })
      // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    async getRubberMateria() {
      try {
        const rubberMateriaData = await getRubberMateria({
          all: 1,
          used_type: 4
        })
        this.productBatchings = rubberMateriaData.results
        rubberMateriaData.results.forEach(function(batching) {
          this.productBatchingById[batching.id] = batching
        })
      // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    async getWorkSchedules() {
      try {
        const workSchedulesData = await getWorkSchedules({ all: 1 })
        this.workSchedules = workSchedulesData.results
      // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    async getPlanSchedules() {
      try {
        this.planSchedules = []
        this.planScheduleId = null
        if (this.day_time) {
          const planSchedulesData = await getPlanSchedules({
            all: 1,
            day_time: this.day_time
          })
          this.planSchedules = planSchedulesData.results
        }
      // eslint-disable-next-line no-empty
      } catch (e) {}
    },

    batchSave() {
      if (!this.plansForAdd.length) {
        this.$alert('请添加计划', '错误', {
          confirmButtonText: '确定'
        })
        return
      }
      var app = this
      var plansForAdd_ = []
      this.plansForAdd.forEach(plan => {
        if (!plan.sum) {
          var plan_ = JSON.parse(JSON.stringify(plan))
          if (!plan_.product_batching) {
            this.$alert('请选择所有胶料配方编码', '错误', {
              confirmButtonText: '确定'
            })
            return
          }
          plan_.pdp_product_classes_plan = []
          if (plan.pdp_product_classes_plan.filter(class_plan => {
            return class_plan.plan_trains > 0
          }).length === 0) {
            this.$alert('至少一个班次的车次大于0', '错误', {
              confirmButtonText: '确定'
            })
            return
          }
          for (var i = 0; i < plan.pdp_product_classes_plan.length; i++) {
            if (plan.pdp_product_classes_plan[i].enable) {
              plan_.pdp_product_classes_plan.push(
                plan.pdp_product_classes_plan[i]
              )
            }
          }
          plansForAdd_.push(plan_)
        }
      })
      if (!plansForAdd_.length) return

      postProductDayPlanManyCreate(plansForAdd_)
        .then(response => {
          app.addPlanVisible = false
          app.$message('创建成功')
          app.$emit('handleSuccessed')
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
        })
    },
    async addOnePlan() {
      if (!this.equipIdForAdd || !this.planScheduleId) {
        this.$alert('请选择机台和排班规则', '错误', {
          confirmButtonText: '确定'
        })
        return
      }
      const planSchedule = await getPlanSchedule(this.planScheduleId)
      var workSchedule = this.workSchedules.find(workSchedule => {
        return workSchedule.id === planSchedule.work_schedule
      })
      if (!planSchedule.work_schedule_plan.length) {
        this.$alert(planSchedule.work_schedule_name + '无排班', '错误', {
          confirmButtonText: '确定'
        })
        return
      }
      var classesdetail_set_ = workSchedule.classesdetail_set
      var init_class_plan = {
        plan_trains: 0,
        sn: 0,
        unit: '吨',
        time: '',
        weight: '',
        classes: null,
        enable: false
      }
      var pdp_product_classes_plan = [init_class_plan, init_class_plan, init_class_plan]
      for (var i = 0; i < 3; i++) {
        var enable = !!planSchedule.work_schedule_plan[i]
        var classes = enable ? classesdetail_set_[i].classes : null
        var class_plan = {
          plan_trains: 0,
          sn: 0,
          unit: '吨',
          time: enable ? 0 : '',
          weight: enable ? 0 : '',
          classes,
          enable
        }
        if (enable && planSchedule.work_schedule_plan[i].classes_name === '早班') {
          pdp_product_classes_plan[0] = class_plan
        } else if (enable && planSchedule.work_schedule_plan[i].classes_name === '中班') {
          pdp_product_classes_plan[1] = class_plan
        } else if (enable && planSchedule.work_schedule_plan[i].classes_name === '晚班') {
          pdp_product_classes_plan[2] = class_plan
        }
      }
      var plan = {
        equip_: this.equipById[this.equipIdForAdd],
        equip: this.equipIdForAdd,
        plan_schedule: this.planScheduleId,
        pdp_product_classes_plan,
        day_time: planSchedule.day_time,
        work_schedule_name: planSchedule.work_schedule_name
      }
      const rubberMateriaData = await getRubberMateria({
        all: 1,
        used_type: 4,
        // dev_type: this.equipById[this.equipIdForAdd].category
        equip_id: this.equipIdForAdd
      })
      this.$set(plan, 'productBatchings', rubberMateriaData.results)
      rubberMateriaData.results.forEach(batching => {
        this.productBatchingById[batching.id] = batching
      })
      if (this.equipFirstIndexInPlansForAdd() === -1) {
        this.plansForAdd.push(plan)
        var planForSum = JSON.parse(JSON.stringify(plan))
        planForSum['sum'] = true
        planForSum['equip_'].equip_no = '小计'
        planForSum['day_time'] = planForSum['work_schedule_name'] = null
        this.plansForAdd.push(planForSum)
      } else {
        var lastIndex = this.equipLastIndexInPlansForAdd()
        this.plansForAdd.splice(lastIndex, 0, plan)
      }
    },
    equipLastIndexInPlansForAdd() {
      for (var i = 0; i < this.plansForAdd.length; i++) {
        if (this.plansForAdd[i].equip_.id === this.equipIdForAdd) {
          var last = true
          for (var j = i + 1; j < this.plansForAdd.length; j++) {
            if (this.plansForAdd[j] === this.equipIdForAdd) { last = false }
          }
          if (last) { return i }
        }
      }
      return -1
    },
    equipFirstIndexInPlansForAdd() {
      for (var i = 0; i < this.plansForAdd.length; i++) {
        if (this.plansForAdd[i].equip_.id === this.equipIdForAdd) { return i }
      }
      return -1
    },
    productBatchingChanged(planForAdd) {
      planForAdd['batching_weight'] = this.productBatchingById[planForAdd.product_batching].batching_weight
      planForAdd['production_time_interval'] = this.productBatchingById[planForAdd.product_batching].production_time_interval
      for (var i = 0; i < 3; i++) {
        this.planTrainsChanged(planForAdd, i, false)
      }
      this.statistic()
    },
    planTrainsChanged(planForAdd, columnIndex, sum = true) {
      if (!planForAdd['pdp_product_classes_plan'][columnIndex].enable) { return }

      planForAdd['pdp_product_classes_plan'][columnIndex]['time'] =
                    (planForAdd['production_time_interval'] *
                        planForAdd['pdp_product_classes_plan'][columnIndex]['plan_trains']).toFixed(2)

      planForAdd['pdp_product_classes_plan'][columnIndex]['weight'] =
                    (planForAdd['batching_weight'] *
                        planForAdd['pdp_product_classes_plan'][columnIndex]['plan_trains']).toFixed(2)
      if (sum) { this.statistic() }
    },
    async statistic() {
      var plansByEquip = {}
      var planSumByEquipId = {}
      this.plansForAdd.forEach(plan => {
        if (!plan.sum) {
          if (!plansByEquip[plan.equip]) {
            plansByEquip[plan.equip] = []
          }
          plansByEquip[plan.equip].push(plan)
        } else {
          planSumByEquipId[plan.equip] = plan
        }
      })
      for (var equipId in plansByEquip) {
        var plans = plansByEquip[equipId]
        var batching_weight = 0
        var production_time_interval = 0
        var pdp_product_classes_plan = []
        for (var j = 0; j < 3; j++) {
          pdp_product_classes_plan.push({
            plan_trains: 0,
            weight: 0,
            time: 0
          })
        }
        for (var k = 0; k < plans.length; k++) {
          var plan = plans[k]
          const res = await getPlanSchedule(plan.plan_schedule)
          const planSchedule = res.data
          batching_weight += Number(plan.batching_weight)
          production_time_interval += Number(plan.production_time_interval)
          for (var i = 0; i < 3; i++) {
            var class_plan = plan.pdp_product_classes_plan[i]
            pdp_product_classes_plan[i].plan_trains += Number(class_plan.plan_trains)
            pdp_product_classes_plan[i].weight += Number(class_plan.weight)
            pdp_product_classes_plan[i].time += Number(class_plan.time)
            // var workSchedulePlanTimeSpan =
            //                     dayjs(planSchedule.work_schedule_plan[i].end_time).diff(
            //                       dayjs(planSchedule.work_schedule_plan[i].start_time), 'minute')
            // if (pdp_product_classes_plan[i].time > workSchedulePlanTimeSpan) {
            //   this.$alert('机台' + plan.equip_.equip_no +
            //                         planSchedule.work_schedule_plan[i].classes_name +
            //                         '计划时间大于排班时间' + '(计划时间' + pdp_product_classes_plan[i].time + '分钟' +
            //                         ' 排班时间' + workSchedulePlanTimeSpan + '分钟' +
            //                         ')', '警告', {
            //     confirmButtonText: '确定'
            //   })
            // }
          }
        }
        // for (i = 0; i < 3; i++) {
        //
        //     pdp_product_classes_plan[i].weight = pdp_product_classes_plan[i].weight.toFixed(2);
        //     pdp_product_classes_plan[i].time = pdp_product_classes_plan[i].time.toFixed(2);
        // }

        batching_weight = batching_weight.toFixed(3)
        production_time_interval = production_time_interval.toFixed(2)
        planSumByEquipId[equipId].batching_weight = batching_weight
        planSumByEquipId[equipId].production_time_interval = production_time_interval
        planSumByEquipId[equipId].pdp_product_classes_plan = pdp_product_classes_plan
      }
    },
    deleteOnePlan(plan) {
      this.plansForAdd.splice(this.plansForAdd.indexOf(plan), 1)
      var plans = this.plansForAdd.filter(plan_ => {
        return plan_.equip === plan.equip
      })
      if (plans.length === 1 && plans[0].sum) {
        this.plansForAdd.splice(this.plansForAdd.indexOf(plans[0]), 1)
      }
      this.statistic()
    }
  }
}
</script>
