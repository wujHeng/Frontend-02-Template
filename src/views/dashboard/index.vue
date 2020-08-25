<template>
  <div class="dashboard" v-loading="loading">
    <div v-if="!loading" style="display:flex;flex-wrap:wrap">
      <div class="dashboard_box" v-for="(item,index) in chartDataList" :key="index">
        <div v-if="item.chartData.rows[0].actual_num||item.chartData.rows[0].plan_num">
          <div class="dashboard_boxTitle" @click="clickBoxTitle(item.chartData.rows[0].id,index)">{{item.equip_no}}#机台</div>
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
            <el-form-item
              label="当前规格:"
            >{{item.chartData.rows[0].product_no?item.chartData.rows[0].product_no:'--'}}</el-form-item>
            <el-form-item label="收皮数量:">{{item.chartData.rows[0].current_trains}}</el-form-item>
            <el-form-item label="设备状态:">{{item.chartData.rows[0].status}}</el-form-item>
            <!-- <el-form-item label="活动名称:">66666</el-form-item> -->
          </el-form>
        </div>
        <div v-else>
          <div class="dashboard_boxTitle">{{item.equip_no}}#机台</div>
          <span class="nodeData">暂无数据</span>
        </div>
      </div>
    </div>
    <div v-if="chartDataList.length===0">暂无数据</div>
    <el-dialog
      :title="chartDataList.length>0?chartDataList[currentIndex].equip_no+'#机台 生产信息统计':''"
      center
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose"
    >
      <div v-loading="dialogLoading">
        <div v-if="!dialogLoading">
          <!-- <div>{{chartDataList[currentIndex].equip_no}}#机台：在线</div> -->
          <!-- <span
            class="visibleTitle"
            style="padding-left:0;"
          >当前规格：{{infoData.product_no_classes.product_no || ''}}</span>
          <span class="visibleTitle">班次：{{infoData.product_no_classes.classes}}</span>
          <span class="visibleTitle">收皮数量：{{infoData.status_current_trains.current_trains}}</span>
          <span class="visibleTitle">
            设备状态：
            <span>{{infoData.status_current_trains.status}}</span>
          </span> -->
        </div>
        <div v-if="!dialogLoading">
          <div style="height:390px;display:flex">
            <div class="visibleLeftBox">
              <div class="visibleTitleLeft">{{infoData.group_name}} 规格别成绩</div>
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
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { equipStatusSlanList, equipDetailedList } from "@/api/dashboard";
export default {
  name: "Dashboard",
  data() {
    this.chartSettings = {
      labelMap: {
        global_name: "班次",
        plan_num: "计划车次",
        actual_num: "实际车次",
      },
    };
    this.chartSettingsLeft = {
      labelMap: {
        pb_day_plan__product_batching__stage_product_batch_no: "班次",
        sum_trains: "计划车次",
        trains_plan: "实际车次",
      },
    };
    return {
      dialogVisible: false,
      form: {},
      chartDataList: [],
      options: {
        grid: {
          y: 30,
          y2: 10,
        },
      },
      //详情
      infoData: {},
      chartDataLeft: {
        columns: [
          "pb_day_plan__product_batching__stage_product_batch_no",
          "sum_trains",
          "trains_plan",
        ],
        rows: [],
      },
      optionsLeft: {
        grid: {
          y: 35,
          y2: 20,
        },
      },
      chartDataRight: {
        columns: ["status", "num"],
        rows: [],
      },
      optionsRight: {
        tooltip: {},
        series: [
          {
            labelLine: {
              show: false,
            },
            label: {
              show: false,
            },
            // label: {
            //   normal: {
            //     position: "inner",
            //     show: false,
            //   },
            // },
          },
        ],
      },
      current_equip_no: "",
      currentIndex: 0,
      loading: true,
      dialogLoading: true,
    };
  },
  async created() {
    await this.getList();
  },
  methods: {
    async getList() {
      try {
        let data = await equipStatusSlanList("get");
        let dataArr = data || [];

        this.loading = false;
        let arr = [];

        for (let key in dataArr) {
          arr.push({
            equip_no: key,
            chartData: {
              columns: ["global_name", "plan_num", "actual_num"],
              rows: dataArr[key],
            },
          });
        }
        this.chartDataList = arr;
      } catch (e) {
        this.loading = false;
      }
    },
    async getEquipDetailedList(id) {
      try {
        this.dialogLoading = true;
        let data = await equipDetailedList("get", { params: { id: id } });
        this.infoData = data || {};

        this.chartDataLeft.rows = this.infoData.group_product;
        this.chartDataRight.rows = this.infoData.statusinfo;

        this.dialogLoading = false;
      } catch (e) {
        this.dialogLoading = false;
      }
    },
    afterSetOption(chartObj) {
      chartObj.setOption(this.options);
    },
    handleClose(done) {
      done();
    },
    clickBoxTitle(id, index) {
      this.dialogVisible = true;
      this.currentIndex = index;
      this.getEquipDetailedList(id);
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
  .nodeData {
    display:inline-block;
    width: 100%;
    margin-top: 100px;
    text-align: center;
  }
}
</style>
