<template>
<el-dialog
            width="90%"
            :visible.sync="addPlanDialog"
            title="添加胶料日生产计划">
        <div style="margin-bottom: 15px">
            <el-select placeholder="请选择机台" style="margin-right: 10px" v-model="equipIdForAdd">
                <el-option
                        :key="equip.id"
                        :label="equip.equip_no"
                        :value="equip.id"
                        v-for="equip in equips">
                </el-option>
            </el-select>
            <el-date-picker
                    style="margin-right: 10px"
                    @change="getPlanSchedules"
                    v-model="day_time"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
            </el-date-picker>
            <el-select v-model="planScheduleId" placeholder="倒班规则">
                <el-option
                        :key="planSchedule.id"
                        :label="planSchedule.work_schedule_name"
                        :value="planSchedule.id"
                        v-for="planSchedule in planSchedules">
                </el-option>
            </el-select>

            <el-button style="float: right" @click="batchSave">保存</el-button>
            <el-button @click="addOnePlan">添加</el-button>
        </div>
        <el-table
                :data="plansForAdd"
                border>
            <el-table-column prop="equip_.equip_no" label="机台" width="150">
            </el-table-column>
            <el-table-column label="胶料配方编码" width="180">
                <template v-if="!scope.row.sum" slot-scope="scope">
                    <el-select @change="productBatchingChanged(scope.row)" v-model="scope.row.product_batching">
                        <el-option
                                :key="productBatching.id"
                                :label="productBatching.stage_product_batch_no"
                                :value="productBatching.id"
                                v-for="productBatching in productBatchings">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="batching_weight" label="配料重量（吨）"></el-table-column>
            <el-table-column prop="production_time_interval" label="炼胶时间（分钟）"></el-table-column>
            <el-table-column label="当前库存（吨）"></el-table-column>
            <el-table-column label="早班计划">
                <el-table-column label="顺序" width="210">
                    <template v-if="!scope.row.sum && scope.row.pdp_product_classes_plan[0].enable" slot-scope="scope">
                        <el-input-number v-model.number="scope.row.pdp_product_classes_plan[0].sn"
                                         :min="0"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column label="车次" width="210">
                    <template v-if="scope.row.pdp_product_classes_plan[0].enable" slot-scope="scope">
                        <el-input-number :disabled="scope.row.sum" @change="planTrainsChanged(scope.row, 0)"
                                         v-model.number="scope.row.pdp_product_classes_plan[0].plan_trains"
                                         :min="0"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column prop="pdp_product_classes_plan[0].weight" label="重量"></el-table-column>
                <el-table-column prop="pdp_product_classes_plan[0].time" label="时间"></el-table-column>
            </el-table-column>
            <el-table-column label="中班计划">
                <el-table-column label="顺序" width="210">
                    <template v-if="!scope.row.sum && scope.row.pdp_product_classes_plan[1].enable" slot-scope="scope">
                        <el-input-number v-model.number="scope.row.pdp_product_classes_plan[1].sn"
                                         :min="0"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column label="车次" width="210">
                    <template v-if="scope.row.pdp_product_classes_plan[1].enable" slot-scope="scope">
                        <el-input-number :disabled="scope.row.sum" @change="planTrainsChanged(scope.row, 1)"
                                         v-model.number="scope.row.pdp_product_classes_plan[1].plan_trains"
                                         :min="0"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column prop="pdp_product_classes_plan[1].weight" label="重量"></el-table-column>
                <el-table-column prop="pdp_product_classes_plan[1].time" label="时间"></el-table-column>
            </el-table-column>
            <el-table-column label="晚班计划">
                <el-table-column label="顺序" width="210">
                    <template v-if="!scope.row.sum && scope.row.pdp_product_classes_plan[2].enable" slot-scope="scope">
                        <el-input-number v-model.number="scope.row.pdp_product_classes_plan[2].sn"
                                         :min="0"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column label="车次" width="210">
                    <template v-if="scope.row.pdp_product_classes_plan[2].enable" slot-scope="scope">
                        <el-input-number :disabled="scope.row.sum" @change="planTrainsChanged(scope.row, 2)"
                                         v-model.number="scope.row.pdp_product_classes_plan[2].plan_trains"
                                         :min="0"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column prop="pdp_product_classes_plan[2].weight" label="重量"></el-table-column>
                <el-table-column prop="pdp_product_classes_plan[2].time" label="时间"></el-table-column>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script>
import { updateTrains, equip, getRubberMateria, getWorkSchedules, getPlanSchedules, postProductDayPlanManyCreate } from '@/api/plan'

export default {
  
  data() {
    return {
        addPlanDialog: false,
        equipIdForAdd: null,
        equips: [],
        equipById: {},
        day_time: '',
        planScheduleId: null,
        planSchedules: [],
        plansForAdd: [],
        productBatchings: [],
        productBatchingById: {},
        workSchedules: [],
    }
  },
  methods: {
    show(){
        this.addPlanDialog = true
        this.getEquipList()
        this.getRubberMateria()
        this.getPlanSchedules()
        this.getWorkSchedules()
    },
    
    async getEquipList(){
      try{
        let equipData = await equip('get')
        this.equips = equipData.results
        this.equips.forEach(function (equip) {
                this.equipById[equip.id] = equip;
            })
      }catch(e){}
    },
    async getRubberMateria(){
        try{
            let rubberMateriaData = await getRubberMateria({ all: 1, used_type: 4 })
            this.productBatchings = rubberMateriaData.results
            response.data.results.forEach(function (batching) {
                this.productBatchingById[batching.id] = batching
            });
        }catch(e){}
       
    },
    async getWorkSchedules(){
        try{
            let workSchedulesData = await getWorkSchedules({ all: 1 })
            this.workSchedules = rubberMateriaData.results
        }catch(e){}
       
    },
    async getPlanSchedules(){
        try{
            let planSchedulesData = await getPlanSchedules({ all: 1, day_time: this.day_time })
            this.planSchedules = planSchedulesData.results
            this.planScheduleId = null
        }catch(e){}
       
    },
    
    batchSave(){
        var app = this;
        var plansForAdd_ = [];
        this.plansForAdd.forEach(function (plan) {

            if (!plan.sum) {

                var plan_ = JSON.parse(JSON.stringify(plan));
                plan_.pdp_product_classes_plan = [];
                for (var i = 0; i < plan.pdp_product_classes_plan.length; i++) {

                    if (plan.pdp_product_classes_plan[i].enable) {
                        plan_.pdp_product_classes_plan.push(plan.pdp_product_classes_plan[i])
                    }
                }
                plansForAdd_.push(plan_)
            }
        });
        if (!plansForAdd_.length)
            return;

        postProductDayPlanManyCreate(plansForAdd_)
            .then(function (response) {

                app.addPlanDialog = false;
                app.$message("创建成功");
                app.$emit('handleSuccessed')
            }).catch(function (error) {

            app.$alert(JSON.stringify(error.response.data.join(",").trim()), '错误', {
                confirmButtonText: '确定',
            });

        });
    },
    addOnePlan(){
        if (!this.equipIdForAdd) {
            return;
        }
        var planSchedule = this.planSchedules.find(planSchedule => {

            return planSchedule.id === this.planScheduleId
        });
        var workSchedule = this.workSchedules.find(workSchedule => {

            return workSchedule.id === planSchedule.work_schedule
        });
        if (!planSchedule.work_schedule_plan.length) {
            this.$alert(planSchedule.work_schedule_name + '无排班', '错误', {
                confirmButtonText: '确定',
            });
            return;
        }
        var classesdetail_set_ = workSchedule.classesdetail_set;
        var pdp_product_classes_plan = [];
        for (var i = 0; i < 3; i++) {

            var enable = !!planSchedule.work_schedule_plan[i];
            pdp_product_classes_plan.push({
                plan_trains: 0,
                sn: 0,
                unit: "吨",
                time: enable ? 0 : '',
                weight: enable ? 0 : '',
                classes: classesdetail_set_[i].classes,
                enable
            })
        }
        var plan =
            {
                equip_: this.equipById[this.equipIdForAdd],
                equip: this.equipIdForAdd,
                plan_schedule: this.planScheduleId,
                pdp_product_classes_plan,
            };
        if (this.equipFirstIndexInPlansForAdd() === -1) {

            this.plansForAdd.push(plan);
            var planForSum = JSON.parse(JSON.stringify(plan));
            planForSum["sum"] = true;
            planForSum["equip_"].equip_no = "小计";
            this.plansForAdd.push(planForSum)
        } else {

            var lastIndex = this.equipLastIndexInPlansForAdd();
            this.plansForAdd.splice(lastIndex, 0, plan)
        }
    },
    equipFirstIndexInPlansForAdd() {

        for (var i = 0; i < this.plansForAdd.length; i++) {

            if (this.plansForAdd[i].equip_.id === this.equipIdForAdd)
                return i
        }
        return -1;
    },
    equipLastIndexInPlansForAdd() {

        for (var i = 0; i < this.plansForAdd.length; i++) {

            if (this.plansForAdd[i].equip_.id === this.equipIdForAdd) {

                var last = true;
                for (var j = i + 1; j < this.plansForAdd.length; j++) {

                    if (this.plansForAdd[j] === this.equipIdForAdd)
                        last = false
                }
                if (last)
                    return i;
            }
        }
        return -1;
    },
    productBatchingChanged(){
         planForAdd["batching_weight"] = this.productBatchingById[planForAdd.product_batching].batching_weight;
                planForAdd["production_time_interval"] = this.productBatchingById[planForAdd.product_batching].production_time_interval;
                for (var i = 0; i < 3; i++) {
                    this.planTrainsChanged(planForAdd, i)
                }
    },
    planTrainsChanged(){
        if (!planForAdd["pdp_product_classes_plan"][columnIndex].enable)
                    return;

        planForAdd["pdp_product_classes_plan"][columnIndex]["time"] =
            (planForAdd["production_time_interval"]
                * planForAdd["pdp_product_classes_plan"][columnIndex]["plan_trains"]).toFixed(2);

        planForAdd["pdp_product_classes_plan"][columnIndex]["weight"] =
            (planForAdd["batching_weight"]
                * planForAdd["pdp_product_classes_plan"][columnIndex]["plan_trains"]).toFixed(2);
        this.statistic();
    },
    statistic() {

        var plansByEquip = {};
        var planSumByEquipId = {};
        this.plansForAdd.forEach(function (plan) {

            if (!plan.sum) {

                if (!plansByEquip[plan.equip]) {

                    plansByEquip[plan.equip] = []
                }
                plansByEquip[plan.equip].push(plan);
            } else {
                planSumByEquipId[plan.equip] = plan;
            }
        });
        for (var equipId in plansByEquip) {

            var plans = plansByEquip[equipId];
            var batching_weight = 0;
            var production_time_interval = 0;
            var pdp_product_classes_plan = [];
            for (var i = 0; i < 3; i++) {

                pdp_product_classes_plan.push({
                    plan_trains: 0,
                    weight: 0,
                    time: 0,
                })
            }
            plans.forEach(function (plan) {

                batching_weight += Number(plan.batching_weight);
                production_time_interval += Number(plan.production_time_interval);
                for (var i = 0; i < 3; i++) {

                    var class_plan = plan.pdp_product_classes_plan[i];
                    pdp_product_classes_plan[i].plan_trains += Number(class_plan.plan_trains);
                    pdp_product_classes_plan[i].weight += Number(class_plan.weight);
                    pdp_product_classes_plan[i].time += Number(class_plan.time);
                }
            });
            for (i = 0; i < 3; i++) {

                pdp_product_classes_plan[i].weight = pdp_product_classes_plan[i].weight.toFixed(2);
                pdp_product_classes_plan[i].time = pdp_product_classes_plan[i].time.toFixed(2);
            }
            batching_weight = batching_weight.toFixed(3);
            production_time_interval = production_time_interval.toFixed(2);
            var equip = this.equipById[equipId];
            planSumByEquipId[equipId].batching_weight = batching_weight;
            planSumByEquipId[equipId].production_time_interval = production_time_interval;
            planSumByEquipId[equipId].pdp_product_classes_plan = pdp_product_classes_plan;
        }
    },
  }
}
</script>
