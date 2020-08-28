<template>
  <div
    v-loading="loading"
    class="report-train-style"
  >
    <el-form :inline="true">
      <el-form-item label="日期">
        <el-date-picker
          v-model="search_date"
          type="daterange"
          range-separator="至"
          :clearable="true"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeSearch"
        />
      </el-form-item>
      <el-form-item label="配方">
        <el-select
          v-model="getParams.product_no"
          placeholder="请选择"
          clearable
          @change="changeSearch"
        >
          <el-option
            v-for="item in formulaList"
            :key="item.stage_product_batch_no"
            :label="item.stage_product_batch_no"
            :value="item.stage_product_batch_no"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="机台">
        <selectEquip
          :equip_no_props.sync="getParams.equip_no"
          @changeSearch="changeSearch"
        />
      </el-form-item>
      <el-form-item label="操作人">
        <el-select
          v-model="getParams.operation_user"
          clearable
          placeholder="请选择"
          @change="changeSearch"
        >
          <el-option
            v-for="item in operatorList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- <el-button @click="showRowTable = true">展示详情</el-button> -->
        <el-button
          v-if="showRowTable"
          @click="showRowTable = false"
        >关闭查看</el-button>

        <!-- <el-button @click="selectRubber">导出批记录</el-button>
        <el-button @click="selectRubber">单页导出</el-button>
        <el-button @click="selectRubber">所有导出</el-button>
        <el-button @click="selectRubber">所有合并</el-button>-->
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      border
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="id"
        label="ID"
      />
      <el-table-column
        prop="equip_no"
        label="机台"
      />
      <el-table-column
        prop="product_no"
        label="配方编号"
      />
      <el-table-column
        prop="plan_classes_uid"
        label="计划编号"
      />
      <el-table-column
        prop="begin_time"
        width="100"
        label="开始时间"
      />
      <el-table-column
        prop="end_time"
        label="结束时间"
        width="100"
      />
      <el-table-column
        prop="plan_trains"
        label="设定车次"
      />
      <el-table-column
        prop="actual_trains"
        label="实际车次"
      />
      <el-table-column
        prop="production_details.控制方式"
        label="本/远控"
      />
      <el-table-column
        prop="production_details.作业方式"
        label="手/自动"
      />
      <el-table-column
        prop="production_details.总重量"
        label="总重量"
      />
      <el-table-column
        prop="production_details.排胶时间"
        label="排胶时间"
      />
      <el-table-column
        prop="production_details.排胶温度"
        label="排胶温度"
      />
      <el-table-column
        prop="production_details.排胶能量"
        label="排胶能量"
      />
      <el-table-column
        prop="production_details.员工代号"
        label="操作人"
      />
      <el-table-column
        prop="production_details.存盘时间"
        label="存盘时间"
        width="100"
      />
      <el-table-column
        prop="production_details.密炼时间"
        label="密炼时间"
      />
      <el-table-column
        prop="production_details.间隔时间"
        label="间隔时间"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="clickView(scope.row,scope.row.id,scope.$index)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <page
      :total="total"
      @currentChange="currentChange"
    />

    <div
      v-if="showRowTable"
      style="overflow-x:scroll;margin-top:20px"
    >
      <el-row
        v-loading="loaddingExal"
        style="min-width:1600px"
      >
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
                <td>{{ item.id }}</td>
                <td>{{ item.物料名称 }}</td>
                <td>{{ item.设定重量 }}</td>
                <td>{{ item.实际重量 }}</td>
                <td>{{ item.秤状态 }}</td>
                <td>{{ item.物料类型 }}</td>
                <td>{{ Math.round((Number(item.设定重量) - Number(item.实际重量))*100)/100 }}</td>
              </tr>
            </table>
            <div
              v-if="weighInformationList.length===0"
              class="noneData"
            >暂无数据</div>

            <div class="train-title">密炼信息</div>
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
                <td>{{ item.id }}</td>
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
            <div
              v-if="mixerInformationList.length===0"
              class="noneData"
            >暂无数据</div>

            <div class="train-title">报警记录</div>
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
              :data="chartData"
              :after-set-option="afterSetOption"
              :settings="chartSettings"
            />
            <!-- <button @click="clickChartData">下载</button> -->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { setDate } from '@/utils/index'
import {
  trainsFeedbacks,
  rubberMaterial,
  weighInformation,
  mixerInformation,
  curveInformation
} from '@/api/reportBatch'
import { personnelsUrl } from '@/api/user'
import page from '@/components/page'
import selectEquip from '@/components/select_w/equip'
export default {
  components: { page, selectEquip },
  data() {
    this.chartSettings = {
      // labelMap: {},
    }
    return {
      search_date: [],
      getParams: {
        page: 1
      },
      // 配方
      formulaList: [],
      operatorList: [],
      tableData: [],
      chartData: {
        columns: ['时间', '温度', '功率', '转速', '压力'],
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
            // dataView: {show:true},
            saveAsImage: {
              name: '自定义扩展方法1',
              // excludeComponents :['toolbox'],
              pixelRatio: 2
            }
          }
        }
      },
      loading: true,
      loaddingExal: true,
      total: 0,
      showRowTable: false,
      rowInfo: {},
      currentIndex: 1,
      alarmRecordList: [],
      weighInformationList: [],
      mixerInformationList: [],
      curveInformationList: []
    }
  },
  created() {
    this.getList()
    this.getFormulaList()
    this.getOperatorList()

    this.currentTime = setDate('', true)
    const _setDateCurrent = setDate()
    this.getParams.begin_time = _setDateCurrent + ' 00:00:00'
    this.getParams.end_time = _setDateCurrent + ' 23:59:59'

    this.search_date = [this.getParams.begin_time, this.getParams.end_time]
  },
  methods: {
    async getList() {
      try {
        this.loading = true
        const data = await trainsFeedbacks('get', { params: this.getParams })
        this.tableData = data.results || []

        this.total = data.count || 0

        this.tableData.forEach((D) => {
          D.begin_time = setDate(D.begin_time, true)
          D.end_time = setDate(D.end_time, true)
        })
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    async getFormulaList() {
      try {
        const data = await rubberMaterial('get', {
          params: { page_size: 10000000 }
        })
        const formulaList = data.results || []
        // 去重
        var obj = {}
        var newArr = formulaList.reduce((item, next) => {
          obj[next.stage_product_batch_no]
            ? ' '
            : (obj[next.stage_product_batch_no] = true && item.push(next))
          return item
        }, [])
        this.formulaList = newArr || []
        // eslint-disable-next-line no-empty
      } catch (e) { }
    },
    async getOperatorList() {
      try {
        // groups: 91,
        const data = await personnelsUrl('get', null, {
          params: { page_size: 100000000, all: 1 }
        })
        const operators = data.results || []
        // 去重
        var obj = {}
        var newArr = operators.reduce((item, next) => {
          obj[next.username]
            ? ' '
            : (obj[next.username] = true && item.push(next))
          return item
        }, [])
        this.operatorList = newArr
      } catch (e) {
        // console.log(e,88877)
      }
    },
    changeSearch() {
      this.getParams.begin_time = this.search_date[0]
      this.getParams.end_time = this.search_date[1]

      this.getParams.page = 1
      this.getList()
    },
    handleSelectionChange() { },
    selectRubber() { },
    clickChartData() {
      createImage(this)
    },
    afterSetOption(chartObj) {
      chartObj.setOption(this.options)
    },
    currentChange(page) {
      this.getParams.page = page
      this.getList()
    },
    async getWeighInformation(id) {
      try {
        // eslint-disable-next-line prefer-const
        let data = await weighInformation('get', { params: { id: id }})
        // const test = [
        //   {
        //     id: 1,
        //     物料名称: 'abshjfh',
        //     设定重量: 400,
        //     实际重量: 400.3,
        //     秤状态: 0,
        //     物料类型: 'P'
        //   }
        // ]
        // return test
        return data.weigh_info || []
        // eslint-disable-next-line no-empty
      } catch (e) { }
    },
    async getMixerInformation(id) {
      try {
        // eslint-disable-next-line prefer-const
        let data = await mixerInformation('get', { params: { id: id }})
        // const test = [
        //   {
        //     id: 1,
        //     条件: '',
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
        return data.mixer_info || []
        // eslint-disable-next-line no-empty
      } catch (e) { }
    },
    async getCurveInformation(id) {
      try {
        // eslint-disable-next-line prefer-const
        let data = await curveInformation('get', { params: { id: id }})
        // const test = [
        //   {
        //     id: 1,
        //     时间: '20',
        //     温度: 97,
        //     功率: 38,
        //     转速: 34,
        //     压力: 10
        //   },
        //   {
        //     id: 2,
        //     时间: '30',
        //     温度: 50,
        //     功率: 40,
        //     转速: 80,
        //     压力: 68
        //   },
        //   {
        //     id: 3,
        //     时间: '40',
        //     温度: 85,
        //     功率: 42,
        //     转速: 36,
        //     压力: 88
        //   }
        // ]
        // return test
        return data.curve_info || []
        // eslint-disable-next-line no-empty
      } catch (e) { }
    },
    async clickView(row, id, index) {
      this.currentIndex = index
      // 整条行详情
      this.rowInfo = row
      try {
        const arr = await Promise.all([
          this.getWeighInformation(id),
          this.getMixerInformation(id),
          this.getCurveInformation(id)
        ])
        this.weighInformationList = arr[0] || []
        this.mixerInformationList = arr[1] || []
        this.curveInformationList = arr[2] || []

        this.chartData.rows = this.curveInformationList
        // console.log(this.chartData.row, 99999);
        this.loaddingExal = false
        this.showRowTable = await true
        // console.log(arr, 88888)
      } catch (e) {
        this.loaddingExal = false
      }
    }
  }
}

function createImage(_this) {
  const canvas = document.getElementsByTagName('canvas')[0]
  // eslint-disable-next-line no-unused-vars
  const newcanvas = JSON.parse(JSON.stringify(canvas))
  if (!canvas.toDataURL) {
    _this.$message.info('请更新浏览器')
    return
  }
  const image = canvas.toDataURL({
    type: 'png',
    pixelRatio: 2
  })
  // 下载
  downloadFile('测试.png', image)
}
function downloadFile(fileName, content) {
  const aLink = document.createElement('a')
  const blob = base64ToBlob(content) // new Blob([content]);

  const evt = document.createEvent('HTMLEvents')
  evt.initEvent('click', true, true) // initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
  aLink.dispatchEvent(
    new MouseEvent('click', { bubbles: true, cancelable: true, view: window })
  ) // 兼容火狐
}
function base64ToBlob(code) {
  const parts = code.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length

  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uInt8Array], { type: contentType })
}
</script>

<style lang="scss" scoped>
$border-color: #dcdfe6;
$border-weight: 0.5px;
.report-train-style {
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
}
</style>
