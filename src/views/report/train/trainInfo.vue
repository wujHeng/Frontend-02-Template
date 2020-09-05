<template>
  <div
    v-loading="loading"
    class="trainInfo"
    style="overflow-x:scroll;"
  >
    <!-- style="overflow-x:scroll;margin-top:20px" -->
    <el-row style="min-width:1600px">
      <el-col
        :span="11"
        class="trainContentLeft"
      >
        <div
          style="margin-right:10px"
          class="trainContentLeftBox"
        >
          <el-row class="row-border-bottom">
            <el-col :span="2">
              <div class="grid-content bg-purple">页</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">{{ currentIndex + 1 }}</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">报表</div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple-light">打印时间</div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple-light bd-right-none">{{ currentTime }}</div>
            </el-col>
          </el-row>
          <div class="train-title">基础信息</div>
          <table
            class="train-one"
            width="100%"
            cellspacing="0"
            border="1"
            cellpadding="1"
            style="border-collapse:collapse"
            frame="hsides"
          >
            <tr class="train-one-tr-banburying">
              <td>计划编号</td>
              <td>{{ rowInfo.plan_classes_uid ||'--' }}</td>
              <td>设定车次</td>
              <td>{{ rowInfo.plan_trains ||'--' }}</td>
              <td class="begin_time_width">开始</td>
              <td>{{ rowInfo.begin_time ||'--' }}</td>
              <td>本/遥控</td>
              <td>{{ rowInfo.production_details.控制方式 ||'--' }}</td>
            </tr>
            <tr class="train-one-tr-banburying">
              <td>名称</td>
              <td>{{ rowInfo.product_no ||'--' }}</td>
              <td>完成</td>
              <td>{{ rowInfo.actual_trains ||'--' }}</td>
              <td class="begin_time_width">结束</td>
              <td>{{ rowInfo.end_time ||'--' }}</td>
              <td>状态</td>
              <td>{{ rowInfo.status ||'--' }}</td>
            </tr>
            <tr class="train-one-tr-banburying">
              <td>排胶温度</td>
              <td>{{ rowInfo.production_details.排胶温度 ||'--' }}</td>
              <td>排胶能量</td>
              <td>{{ rowInfo.production_details.排胶能量 ||'--' }}</td>
              <td class="begin_time_width">时间</td>
              <td>{{ rowInfo.production_details.排胶时间 ||'--' }}</td>
              <td>总重</td>
              <td>{{ rowInfo.production_details.总重量 ||'--' }}</td>
            </tr>
          </table>

          <div class="train-title">称量信息</div>
          <div class="weighInforStyle">
            <table
              class="train-one"
              width="100%"
              cellspacing="0"
              border="1"
              cellpadding="1"
              style="border-collapse:collapse"
              frame="hsides"
            >
              <tr class="train-one-tr-banburying">
                <td>ID</td>
                <td>名称</td>
                <td>设定值</td>
                <td>实重</td>
                <td>状态</td>
                <td>种类</td>
                <td>超差</td>
              </tr>
              <tr
                v-for="(item,index) in weighInformationList"
                :key="index"
                class="train-one-tr-banburying"
              >
                <td>{{ item.序号 }}</td>
                <td>{{ item.物料名称 }}</td>
                <td>{{ item.设定重量 }}</td>
                <td>{{ item.实际重量 }}</td>
                <td>{{ item.秤状态 }}</td>
                <td>{{ item.物料类型 }}</td>
                <td>{{ Math.round((Number(item.设定重量) - Number(item.实际重量))*100)/100 }}</td>
              </tr>
            </table>
          </div>
          <page
            style="text-align: right;"
            :total="totalWeighing"
            @currentChange="ChangePageWeighing"
          />
          <div
            v-if="weighInformationList.length===0"
            class="noneData"
          >暂无数据</div>

          <div class="train-title train-title-border">密炼信息</div>
          <div class="mixerInforStyle">
            <table
              class="train-one"
              width="100%"
              cellspacing="0"
              border="1"
              cellpadding="1"
              style="border-collapse:collapse"
              frame="hsides"
            >
              <tr class="train-one-tr-banburying">
                <td>ID</td>
                <td>条件名称</td>
                <td>时间</td>
                <td>温度</td>
                <td>功率</td>
                <td>能量</td>
                <td>动作名称</td>
                <td>速度</td>
                <td>压力</td>
              </tr>
              <tr
                v-for="(item,index) in mixerInformationList"
                :key="index"
                class="train-one-tr-banburying"
              >
                <td>{{ item.序号 }}</td>
                <td>{{ item.条件 }}</td>
                <td>{{ item.时间 }}</td>
                <td>{{ item.温度 }}</td>
                <td>{{ item.功率 }}</td>
                <td>{{ item.能量 }}</td>
                <td>{{ item.动作 }}</td>
                <td>{{ item.转速 }}</td>
                <td>{{ item.压力 }}</td>
              </tr>
            </table>
          </div>
          <page
            style="text-align: right;"
            :total="totalMixer"
            @currentChange="ChangePageMixer"
          />
          <div
            v-if="mixerInformationList.length===0"
            class="noneData"
          >暂无数据</div>

          <div class="train-title train-title-border">报警记录</div>
          <table
            class="train-one"
            width="100%"
            cellspacing="0"
            border="1"
            cellpadding="1"
            style="border-collapse:collapse"
            frame="hsides"
          >
            <tr class="train-one-tr-banburying">
              <td>ID</td>
              <td>名称</td>
              <td>设定值</td>
              <td>实重</td>
              <td>状态</td>
              <td>种类</td>
              <td>超差</td>
            </tr>
            <tr
              v-for="(item,index) in alarmRecordList"
              :key="index"
              class="train-one-tr-banburying"
            >
              <td>ID</td>
              <td>名称</td>
              <td>设定值</td>
              <td>实重</td>
              <td>状态</td>
              <td>种类</td>
              <td>超差</td>
            </tr>
          </table>
          <div
            v-if="alarmRecordList.length===0"
            class="noneData"
          >暂无数据</div>
        </div>
      </el-col>
      <el-col
        :span="13"
        class="trainContentRight"
      >
        <div style="display:flex">
          <div class="police-record">
            <span>排胶能量: {{ rowInfo.production_details.排胶能量 ||'--' }}</span>
            <span>设定: {{ rowInfo.plan_trains ||'--' }}</span>
            <span>时间: {{ rowInfo.begin_time || '--' }} 至 {{ rowInfo.end_time|| '--' }}</span>
            <br>
            <span>排胶温度: {{ rowInfo.production_details.排胶温度||'--' }}</span>
            <span>完成: {{ rowInfo.actual_trains || '--' }}</span>
            <span>排胶时间: {{ rowInfo.production_details.排胶时间||'--' }}</span>
            <span>名称: {{ rowInfo.product_no ||'--' }}</span>
            <span>总量: {{ rowInfo.production_details.总重量 || '--' }}</span>
          </div>
          <div class="right-button">
            <!-- <el-button>上一步</el-button>
              <el-button>曲线导出</el-button>
              <br />
              <el-button>下一步</el-button>
              <el-button>打印报表</el-button>-->
          </div>
        </div>
        <div>
          <ve-line
            height="700px"
            :data="chartData"
            :after-set-option="afterSetOption"
            :settings="chartSettings"
          />
          <!-- <button @click="clickChartData">下载</button> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import page from '@/components/page'
import { setDate } from '@/utils/index'
import {
  weighInformation,
  mixerInformation,
  curveInformation
} from '@/api/reportBatch'
export default {
  components: { page },
  data() {
    this.chartSettings = {
      // labelMap: {},
    }
    //  + this.rowInfo.equip_no + '-' + this.rowInfo.product_no + this.rowInfo.begin_time
    return {
      loading: false,
      rowInfo: {},
      currentIndex: '',
      weighInformationList: [],
      mixerInformationList: [],
      curveInformationList: [],
      alarmRecordList: [],
      chartData: {
        columns: ['存盘时间', '温度', '功率', '转速', '压力'],
        rows: []
      },
      options: {
        backgroundColor: '#fff',
        grid: {
          y: 50
        },
        toolbox: {
          // show: true,
          itemSize: 20,
          itemGap: 30,
          right: 50,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            // dataView: { show: true },
            saveAsImage: {
              name: '222',
              // excludeComponents :['toolbox'],
              pixelRatio: 2
            }
          }
        }
      },
      totalWeighing: 0,
      totalMixer: 0
    }
  },
  created() {
    this.currentTime = setDate('', true)
    this.rowInfo = this.$route.params.rowInfo
    if (this.$route.params.rowInfo) {
      localStorage.setItem('rowInfo',
        JSON.stringify(this.$route.params.rowInfo))
    } else {
      this.rowInfo = JSON.parse(localStorage.getItem('rowInfo'))
    }
    this.options.toolbox.feature.saveAsImage.name = '工艺曲线_' + this.rowInfo.equip_no + '-' + this.rowInfo.product_no + '-' + this.rowInfo.begin_time
    this.getList()
  },
  destroyed() {
    localStorage.removeItem('rowInfo')
  },
  methods: {
    async getList() {
      const id = this.$route.params.id
      try {
        const arr = await Promise.all([
          this.getWeighInformation(id, 1),
          this.getMixerInformation(id, 1),
          this.getCurveInformation(id)
        ])
        this.weighInformationList = arr[0] || []
        this.mixerInformationList = arr[1] || []
        this.curveInformationList = arr[2] || []

        this.chartData.rows = this.curveInformationList
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    async getWeighInformation(id, page) {
      try {
        // eslint-disable-next-line object-curly-spacing
        const data = await weighInformation('get', { params: { feed_back_id: id, page: page } })
        // const test = [
        //   {
        //     序号: 1,
        //     物料名称: 'abshjfh',
        //     设定重量: 400,
        //     实际重量: 400.3,
        //     秤状态: 0,
        //     物料类型: 'P'
        //   }
        // ]
        // return test
        this.totalWeighing = data.count
        return data.results || []
        // eslint-disable-next-line no-empty
      } catch (e) { }
    },
    async getMixerInformation(id, page) {
      try {
        // eslint-disable-next-line object-curly-spacing
        const data = await mixerInformation('get', { params: { feed_back_id: id, page: page } })
        // const test = [
        //   {
        //     序号: 1,
        //     条件: '条件',
        //     时间: 0,
        //     温度: 97,
        //     功率: 38,
        //     能量: 0,
        //     动作: '加胶料',
        //     转速: 34,
        //     压力: 0
        //   }
        // ]
        // return test
        this.totalMixer = data.count
        return data.results || []
        // eslint-disable-next-line no-empty
      } catch (e) { }
    },
    async getCurveInformation(id) {
      try {
        // eslint-disable-next-line object-curly-spacing
        const data = await curveInformation('get', { params: { id: id } })
        // const test = [
        //   {
        //     序号: 3,
        //     存盘时间: '35',
        //     温度: 85,
        //     功率: 42,
        //     转速: 36,
        //     压力: 88
        //   }
        // ]
        // return test
        return data.results || []
        // eslint-disable-next-line no-empty
      } catch (e) { }
    },
    afterSetOption(chartObj) {
      chartObj.setOption(this.options)
    },
    ChangePageWeighing(page) {
      this.weighInformationList = this.getWeighInformation(this.$route.params.id, page) || []
    },
    ChangePageMixer(page) {
      this.mixerInformationList = this.getMixerInformation(this.$route.params.id, page) || []
    }
  }
}
</script>

<style scoped lang="scss">
$border-color: #dcdfe6;
$border-weight: 0.5px;
    .trainInfo{
      *::-webkit-scrollbar {
        width: 3px;
        background-color: #eee;
      }

      .mixerInforStyle{
        max-height: 500px;
        overflow-y: scroll;
      }
      .weighInforStyle{
        max-height: 260px;
        overflow-y: scroll;
      }
        .trainContentLeft {
        // min-width: 350px;
         text-align: center;
          .trainContentLeftBox {
          border: $border-weight solid $border-color;
          }
          .row-border-bottom {
          border-bottom: $border-weight solid $border-color;
          }
        }
         .grid-content {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          border-right: $border-weight solid $border-color;
          flex-wrap: wrap;
        }
        .bg-purple {
          font-size: 24px;
          font-weight: 700;
        }
         .bd-right-none {
          border-right: none;
        }
        .train-title {
          line-height: 36px;
        }
        .train-title-border{
          border-top: $border-weight solid $border-color;
        }
        .train-one {
          border-color: $border-color;
          .train-one-tr-banburying {
            td {
              // line-height: 20px;
              padding: 10px;
            }
          }
        }
        .noneData {
          text-align: center;
          line-height: 50px;
          width: 100%;
          border-bottom: 0.5px solid $border-color;
        }
        .begin_time_width {
          width: 60px;
        }
         .trainContentRight {
          border: $border-weight solid $border-color;
          padding: 15px;
          // display: flex;
          .police-record {
            flex: 1;
            line-height: 30px;
            margin-bottom: 25px;
            span {
              margin-right: 20px;
            }
          }
          .right-button {
            width: 200px;
            button {
              margin-bottom: 5px;
            }
          }
        }
    }
</style>
