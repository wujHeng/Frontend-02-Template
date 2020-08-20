<template>
  <div class="dashboard">
    <div class="dashboard_box" v-for="(item,index) in 10" :key="index">
      <div class="dashboard_boxTitle" @click="clickBoxTitle">1#机台</div>
      <div style="height:300px">
        <ve-histogram
          width="100%"
          height="100%"
          :data="chartData"
          :settings="chartSettings"
          :after-set-option="afterSetOption"
        ></ve-histogram>
      </div>
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="活动名称:">66666</el-form-item>
        <el-form-item label="活动名称:">66666</el-form-item>
        <el-form-item label="活动名称:">66666</el-form-item>
        <el-form-item label="活动名称:">66666</el-form-item>
      </el-form>
    </div>
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
export default {
  name: "Dashboard",
  data() {
    this.chartSettings = {
      labelMap: {
        访问用户: "",
        下单用户: "",
      },
    };
    this.chartSettingsLeft = {};
    return {
      dialogVisible: false,
      form: {},
      chartData: {
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
      options: {
        grid: {
          y: 20,
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
    };
  },
  created() {},
  methods: {
    afterSetOption(chartObj) {
      chartObj.setOption(this.options);
    },
    handleClose(done) {
      done();
    },
    clickBoxTitle() {
      this.dialogVisible = true;
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
    background:rgba(239,239,239,0.5);
    padding: 5px;
    margin-right: 20px;
  }
  .visibleRightBox {
    display: inline-block;
    width: 40%;
    background: rgba(239,239,239,0.5);
    padding: 5px;
  }
}
</style>
