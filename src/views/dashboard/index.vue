<template>
  <div class="dashboard">
    <div class="dashboard_box" v-for="(item,index) in chartDataList" :key="index">
      <div class="dashboard_boxTitle" @click="clickBoxTitle(item.id)">{{index+1}}#机台</div>
      <div style="height:300px">
        <ve-histogram
          width="100%"
          height="100%"
          :data="item.chartData"
          :settings="chartSettings"
          :after-set-option="afterSetOption"
        ></ve-histogram>
      </div>
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="当前规格:">{{item.product_no?item.product_no:'--'}}</el-form-item>
        <el-form-item label="收皮数量:">{{item.current_trains}}</el-form-item>
        <el-form-item label="设备状态:">{{item.status}}</el-form-item>
        <!-- <el-form-item label="活动名称:">66666</el-form-item> -->
      </el-form>
    </div>
    <div v-if="chartDataList.length===0">暂无数据</div>
    <el-dialog
      title="1#机台 生产信息统计"
      center
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose"
    >
      <div>
        <div>1#机台：在线</div>
        <span class="visibleTitle" style="padding-left:0;">当前规格：C-MB1-1060-01</span>
        <span class="visibleTitle">班次：C-MB1-1060-01</span>
        <span class="visibleTitle">收皮数量：50</span>
        <span class="visibleTitle">
          设备状态：
          <span>运行中</span>
        </span>
      </div>
      <div>
        <div style="height:390px;display:flex">
          <div class="visibleLeftBox">
            <div class="visibleTitleLeft">甲班 规格别成绩</div>
            <div style="height:350px">
              <ve-histogram
                height="100%"
                :data="chartDataLeft"
                :settings="chartSettingsLeft"
                :after-set-option="afterSetOptionLeft"
              ></ve-histogram>
            </div>
          </div>
          <div class="visibleRightBox">
            <div class="visibleTitleLeft">设备运行时间统计</div>
            <ve-ring :data="chartDataRight" :after-set-option="afterSetOptionRight"></ve-ring>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { equipStatusSlanList,equipDetailedList } from "@/api/dashboard";
export default {
  name: "Dashboard",
  data() {
    this.chartSettings = {
      labelMap: {
        global_name: "班次",
        plan_sum: "计划车次",
        actual_trains: "实际车次",
      },
    };
    this.chartSettingsLeft = {};
    return {
      dialogVisible: false,
      form: {},
      chartDataList: [
        {
          equip_no: "115A01",
          id: 1,
          status: "运行",
          current_trains: 123,
          product_no: null,
          group_name_list: [
            {
              global_name: "a班",
              plan_sum: 48,
              actual_trains: 652,
            },
            {
              global_name: "c班",
              plan_sum: 12,
              actual_trains: 321,
            },
          ],
        },
      ],
      options: {
        grid: {
          y: 30,
          y2: 10,
        },
      },
      chartDataLeft: {
        columns: ["日期", "访问用户", "下单用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293 },
        ],
      },
      optionsLeft: {
        grid: {
          y: 35,
          y2: 20,
        },
      },
      chartDataRight: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
        ],
      },
      optionsRight: {
        series: [
          {
            labelLine: {
              show: false,
            },
            label: {
              show: false,
            },
          },
        ],
      },
      current_equip_no:''
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      try {
        let data = await equipStatusSlanList("get");
        // console.log(data.results, "data");
        // this.chartDataList = data.results || [];
        this.chartDataList.forEach((D) => {
          D.chartData = {
            columns: ["global_name", "plan_sum", "actual_trains"],
            rows: D.group_name_list,
          };
        });
        this.chartDataList.splice()
      } catch (e) {}
    },
    async getEquipDetailedList(id){
        try {
        let data = await equipDetailedList("get",{params:{id:id}});
        
      } catch (e) {
      }
    },
    afterSetOption(chartObj) {
      chartObj.setOption(this.options);
    },
    handleClose(done) {
      done();
    },
    clickBoxTitle(id) {
      this.dialogVisible = true;
      this.getEquipDetailedList(id)
    },
    afterSetOptionLeft(chartObj) {
      chartObj.setOption(this.optionsLeft);
    },
    afterSetOptionRight(chartObj) {
      chartObj.setOption(this.optionsRight);
    },
  },
};
</script>

<style lang="scss">
.dashboard {
  padding: 20px;
  &_box {
    width: 250px;
    min-height: 400px;
    border: 2px solid #eee;
    display: inline-block;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  &_boxTitle {
    text-align: center;
    line-height: 29px;
    color: rgb(64, 158, 255);
    cursor: pointer;
  }
  .el-form-item__label,
  .el-form-item__content {
    line-height: 24px !important;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .visibleTitle {
    padding: 12px;
    display: inline-block;
  }
  .visibleTitleLeft {
    margin: 5px 0;
    text-align: center;
    font-weight: 700;
  }
  .visibleLeftBox {
    display: inline-block;
    width: 60%;
    background: rgba(239, 239, 239, 0.5);
    padding: 5px;
    margin-right: 20px;
  }
  .visibleRightBox {
    display: inline-block;
    width: 40%;
    background: rgba(239, 239, 239, 0.5);
    padding: 5px;
  }
}
</style>
