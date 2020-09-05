/* eslint-disable vue/attribute-hyphenation */
/* eslint-disable object-curly-spacing */
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
        <productNo-select
          :is-stage-productbatch-no-remove="true"
          @productBatchingChanged="productBatchingChanged"
        />
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
      <!-- <el-form-item> -->
      <!-- <el-button @click="selectRubber">导出批记录</el-button>
        <el-button @click="selectRubber">单页导出</el-button>
        <el-button @click="selectRubber">所有导出</el-button>
        <el-button @click="selectRubber">所有合并</el-button>-->
      <!-- </el-form-item> -->
    </el-form>
    <el-table
      ref="multipleTable"
      v-loading="loadingTable"
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
        width="140"
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
  </div>
</template>

<script>
import { setDate } from '@/utils/index'
import {
  trainsFeedbacks,
  rubberMaterial
} from '@/api/reportBatch'
import { personnelsUrl } from '@/api/user'
import page from '@/components/page'
import selectEquip from '@/components/select_w/equip'
import ProductNoSelect from '@/components/ProductNoSelect'
export default {
  components: { page, selectEquip, ProductNoSelect },
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
      loading: true,
      loadingTable: false,
      loaddingExal: true,
      total: 0,
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
        const data = await trainsFeedbacks('get', { params: this.getParams })
        this.tableData = data.results || []
        // this.tableData = [
        //   {
        //     id: 1,
        //     equip_no: 111,
        //     product_no: 222,
        //     plan_classes_uid: 20200620081020,
        //     begin_time: '2020-06-20 8:30:30',
        //     end_time: '2020-06-20 8:30:33',
        //     plan_trains: 200,
        //     actual_trains: 300,
        //     production_details: {
        //       控制方式: '远控',
        //       作业方式: '自动',
        //       总重量: '26.2',
        //       排胶时间: '111',
        //       排胶温度: '135',
        //       排胶能量: '15',
        //       员工代号: '张三',
        //       存盘时间: '2020-06-20 10:20:30',
        //       密炼时间: 126,
        //       间隔时间: 16
        //     }
        //   }
        // ]

        this.total = data.count || 0

        this.tableData.forEach((D) => {
          D.begin_time = setDate(D.begin_time, true)
          D.end_time = setDate(D.end_time, true)
        })
        this.loading = false
        this.loadingTable = false
      } catch (e) {
        this.loading = false
        this.loadingTable = false
      }
    },
    async getFormulaList() {
      try {
        const data = await rubberMaterial('get', {
          params: { all: 1 }
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
          params: { all: 1 }
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
    productBatchingChanged(val) {
      this.getParams.product_no = val ? val.stage_product_batch_no : ''

      this.getParams.page = 1
      this.getList()
    },
    changeSearch() {
      this.loadingTable = true
      this.getParams.begin_time = this.search_date ? this.search_date[0] : ''
      this.getParams.end_time = this.search_date ? this.search_date[1] : ''

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
    async clickView(row, id, index) {
      this.currentIndex = index
      // 整条行详情
      this.rowInfo = row
      Object.assign(this.rowInfo, { currentIndex: index })
      // eslint-disable-next-line object-curly-spacing
      this.$router.push({ name: 'trainStatisticsReportInfo', params: { id: id, rowInfo: this.rowInfo } })
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
