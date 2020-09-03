/* eslint-disable handle-callback-err */
/* eslint-disable handle-callback-err */
<template>
  <div
    v-loading="loading"
    class="report-batch-style"
  >
    <el-form :inline="true">
      <el-form-item label="日期">
        <el-date-picker
          v-model="search_date"
          type="daterange"
          range-separator="至"
          :clearable="false"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeSearch"
        />
      </el-form-item>
      <el-form-item label="胶料">
        <productNo-select @productBatchingChanged="productBatchingChanged" />
        <!-- <el-select
          v-model="getParams.product_no"
          placeholder="请选择"
          clearable
          @change="changeSearch"
        >
          <el-option
            v-for="item in glueList"
            :key="item.id"
            :label="item.stage_product_batch_no"
            :value="item.stage_product_batch_no"
          />
        </el-select> -->
      </el-form-item>
      <el-form-item label="机台">
        <selectEquip
          :equip_no_props.sync="getParams.equip_no"
          @changeSearch="changeSearch"
        />
      </el-form-item>
      <el-form-item label="班次">
        <el-select
          v-model="getParams.classes"
          placeholder="请选择"
          clearable
          @change="changeSearch"
        >
          <el-option
            v-for="item in classesList"
            :key="item.id"
            :label="item.work_schedule_name+'--'+item.classes_name"
            :value="item.classes_name"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-table
      border
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="equip_no"
        label="机台"
      />
      <el-table-column
        prop="equip_no"
        label="作业时间"
      >
        <template slot-scope="scope">{{ scope.row.end_time.split(' ')[0] }}</template>
      </el-table-column>
      <el-table-column
        prop="classes"
        label="班次"
      />
      <el-table-column
        prop="class_group"
        label="班组"
      >
        <template slot-scope="scope">{{ scope.row.class_group?scope.row.class_group:'--' }}</template>
      </el-table-column>
      <el-table-column label="生产时间">
        <template slot-scope="scope">{{ scope.row.end_time.split(' ')[1] }}</template>
      </el-table-column>
      <el-table-column
        prop="product_no"
        label="胶料编码"
      >
        <template slot-scope="scope">
          <div
            style="color:#1989fa;cursor:pointer"
            @click="clickProductNo(scope.row)"
          >{{ scope.row.product_no }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="equip_no"
        label="BATNO"
      >
        <template slot-scope="scope">{{ scope.row.begin_trains }}--{{ scope.row.end_trains }}</template>
      </el-table-column>
      <el-table-column
        prop="actual_weight"
        label="生产重量"
      />
      <el-table-column
        prop="equip_no"
        width="150"
        label="有效时间"
      >
        <template slot-scope="scope">{{ scope.row.end_time }} -- {{ setEndTime(scope.row.end_time) }}</template>
      </el-table-column>
      <el-table-column
        prop="lot_no"
        label="LOT NO"
      >
        <template slot-scope="scope">{{ scope.row.lot_no?scope.row.lot_no:'--' }}</template>
      </el-table-column>
      <el-table-column
        prop="operation_user"
        label="作业者"
      />
    </el-table>

    <page
      :total="total"
      @currentChange="currentChange"
    />

    <el-dialog
      title="胶料产出反馈"
      :visible.sync="dialogVisibleRubber"
    >
      <el-form :inline="true">
        <el-form-item label="胶料区分: ">{{ palletFeedObj.hasOwnProperty("stage")?palletFeedObj.stage:'--' }}</el-form-item>
        <el-form-item label="胶料编码: ">{{ palletFeedObj.product_no }}</el-form-item>
        <el-form-item label="班次: ">{{ palletFeedObj.classes }}</el-form-item>
        <el-form-item label="机台: ">{{ palletFeedObj.equip_no }}</el-form-item>
      </el-form>
      <el-table
        :data="palletFeedList"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="lot_no"
          label="LOT"
        >
          <template slot-scope="scope">{{ scope.row.lot_no||'--' }}</template>
        </el-table-column>
        <el-table-column
          prop="product_no"
          label="胶料编码"
        />
        <el-table-column
          prop="equip_no"
          label="机台"
        />

        <el-table-column label="BAT">
          <template slot-scope="scope">
            <div
              style="color:#1989fa;cursor:pointer"
              @click="clickBAT(scope.row)"
            >{{ scope.row.begin_trains }}--{{ scope.row.end_trains }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="actual_weight"
          label="生产重量"
        />
        <el-table-column label="生产时间">
          <template slot-scope="scope">{{ scope.row.end_time.split(' ')[1] }}</template>
        </el-table-column>
        <el-table-column
          prop="classes"
          label="班次"
        />
        <el-table-column
          prop="operation_user"
          label="作业者"
        />
      </el-table>
    </el-dialog>

    <el-dialog
      title="BAT查询"
      :visible.sync="dialogVisibleBAT"
    >
      <div style="position: relative">
        <el-form
          :inline="true"
          style="margin-right: 100px;"
        >
          <el-form-item label="胶料区分: ">{{ BATObj.stage }}</el-form-item>
          <el-form-item label="胶料编码: ">{{ BATObj.product_no }}</el-form-item>
          <el-form-item label="班次: ">{{ BATObj.classes }}</el-form-item>
          <el-form-item label="机台: ">{{ BATObj.equip_no }}</el-form-item>
          <el-form-item label="车次: ">{{ BATObj.begin_trains }} -- {{ BATObj.end_trains }}</el-form-item>
        </el-form>
        <el-button
          style="position: absolute;right:10px;top:0"
          @click="viewGraph"
        >图形</el-button>
      </div>
      <el-table
        :data="BATList"
        style="width: 100%"
      >
        <el-table-column
          prop="equip_no"
          label="机台"
        />
        <el-table-column
          prop="name"
          label="日期"
        >
          <template slot-scope="scope">{{ scope.row.end_time.split(' ')[0] }}</template>
        </el-table-column>
        <el-table-column
          prop="classes"
          label="班次"
        />
        <el-table-column
          prop="product_no"
          label="胶料编码"
        />
        <el-table-column
          prop="actual_trains"
          label="车次"
        />
        <el-table-column
          prop="actual_weight"
          label="胶"
        />
        <el-table-column
          prop="end_time-begin-time"
          label="时间"
        >
          <template slot-scope="scope">{{ scope.row.begin_time }} -- {{ scope.row.end_time }}</template>
        </el-table-column>
        <el-table-column
          prop="equip_status.temperature"
          label="温度"
        />
        <el-table-column
          prop="equip_status.energy"
          label="电量"
        />
        <el-table-column
          prop="equip_status.rpm"
          label="RPM"
        />
      </el-table>
    </el-dialog>

    <el-dialog
      title="分析图表"
      :modal="true"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      width="600px"
      :visible.sync="dialogVisibleGraph"
    >
      <div style="margin: 0 0 20px 5px;">{{ chartData.rows.length>0&&chartData.rows[0].hasOwnProperty('created_date')?chartData.rows[0].created_date.split(" ")[0]:'' }}</div>
      <ve-line
        :data="chartData"
        :settings="chartSettings"
      />
    </el-dialog>
  </div>
</template>

<script>
import { setDate } from '@/utils/index'
import page from '@/components/page'
import selectEquip from '@/components/select_w/equip'
import ProductNoSelect from '@/components/ProductNoSelect'
import {
  reportBatch,
  rubberMaterial,
  classesList,
  palletFeedBacks,
  echartsListUrl,
  productionTrainsFeedbacks
} from '@/api/reportBatch'
export default {
  components: { page, selectEquip, ProductNoSelect },
  data() {
    this.chartSettings = {
      labelMap: {
        created_date_date: '时间',
        temperature: '温度',
        power: '功率',
        energy: '能量',
        pressure: '压力',
        rpm: '转速'
      }
    }
    return {
      // tableDataUrl: "InternalMixerUrl",
      loading: true,
      tableData: [],
      search_date: [],
      getParams: {
        page: 1,
        equip_no: null,
        product_no: null,
        plan_classes_uid: null,
        st: '',
        et: ''
      },
      normsList: [],
      produceList: [],
      groupList: [],
      dialogVisibleRubber: false,
      tableDataRubber: [],
      tableDataBAT: [],
      dialogVisibleBAT: false,
      glueList: [],
      classesList: [],
      // 24小时，转换为时间戳24*60*60*1000
      fixedTime: 24 * 60 * 60 * 1000,
      palletFeedObj: {},
      palletFeedList: [],
      BATObj: {},
      BATList: [],
      dialogVisibleGraph: false,
      chartData: {
        columns: [
          'created_date_date',
          'temperature',
          'power',
          'energy',
          'pressure',
          'rpm'
        ],
        rows: []
      },
      total: 0
    }
  },
  created() {
    this.getList()
    this.getGlueList() // 获取胶料列表
    this.getClassesList() // 获取班次列表

    var _setDateCurrent = setDate()
    this.getParams.st = _setDateCurrent + ' 00:00:00'
    this.getParams.et = _setDateCurrent + ' 23:59:59'
    // this.getParams.st = "2020-06-01" + " 00:00:00";
    // this.getParams.et = '2020-06-01' + ' 23:59:59'
    this.search_date = [this.getParams.st, this.getParams.et]
  },
  methods: {
    getList() {
      var _this = this
      this.loading = true
      reportBatch('get', { params: _this.getParams })
        // eslint-disable-next-line space-before-function-paren
        .then(function(response) {
          _this.tableData = response.results || []

          _this.total = response.count || 0
          _this.loading = false
          // eslint-disable-next-line handle-callback-err
        }).catch((error) => {
          this.loading = false
          // this.$message.error("请求错误");
        })
    },
    getGlueList() {
      var _this = this
      rubberMaterial('get', {
        params: {
          all: 1
        }
      })
        .then(function(response) {
          var glueList = response.results || []
          _this.glueList = glueList
        })
        // eslint-disable-next-line handle-callback-err
        .catch(function(error) { })
    },
    getClassesList() {
      var _this = this
      // eslint-disable-next-line object-curly-spacing
      classesList('get', { params: { schedule_name: '密炼' } })
        .then(function(response) {
          _this.classesList = response.results || []
        })
        // eslint-disable-next-line handle-callback-err
        .catch(function(error) { })
    },
    clickPrint() {
      //          <el-form-item>
      //     <el-button @click="clickPrint">
      //         下载
      //     </el-button>
      // </el-form-item>
      // <el-form-item>
      //     <el-button @click="clickExcel">
      //         Excel
      //     </el-button>
      // </el-form-item>
    },
    clickExcel() { },
    clickProductNo(row) {
      this.dialogVisibleRubber = true
      this.palletFeedObj = row
      this.getRubberCoding()
    },
    getRubberCoding() {
      var _this = this
      palletFeedBacks('get', {
        params: {
          product_no: _this.palletFeedObj.product_no,
          plan_classes_uid: _this.palletFeedObj.plan_classes_uid,
          equip_no: _this.palletFeedObj.equip_no
        }
      })
        .then(function(response) {
          _this.palletFeedList = response.results || []
        })
        // eslint-disable-next-line handle-callback-err
        .catch(function(error) { })
    },
    clickBAT(row) {
      this.dialogVisibleBAT = true
      this.BATObj = row
      this.getBATList()
    },
    getBATList() {
      var _this = this
      productionTrainsFeedbacks('get', {
        params: {
          plan_classes_uid: _this.BATObj.plan_classes_uid,
          equip_no: _this.BATObj.equip_no,
          actual_trains:
            _this.BATObj.begin_trains + ',' + _this.BATObj.end_trains
        }
      })
        .then(function(response) {
          _this.BATList = response.results || []
        })
        // eslint-disable-next-line handle-callback-err
        .catch(function(error) { })
    },
    viewGraph() {
      this.dialogVisibleGraph = true
      this.getEchartsList()
    },
    getEchartsList() {
      var _this = this
      echartsListUrl('get', {
        params: {
          product_no: _this.BATObj.product_no,
          plan_classes_uid: _this.BATObj.plan_classes_uid,
          equip_no: _this.BATObj.equip_no,
          actual_trains:
            _this.BATObj.begin_trains + ',' + _this.BATObj.end_trains
        }
      })
        .then(function(response) {
          var results = response
          results.forEach((element) => {
            element.created_date_date = element.created_date.split(' ')[1]
          })
          _this.chartData.rows = results
        })
        // eslint-disable-next-line handle-callback-err
        .catch(() => { })
    },
    productBatchingChanged(val) {
      this.getParams.product_no = val ? val.stage_product_batch_no : ''

      this.getParams.page = 1
      this.getList()
    },
    changeSearch() {
      if (this.search_date) {
        this.getParams.st = this.search_date[0]
        this.getParams.et = this.search_date[1]
      }

      this.getParams.page = 1
      this.getList()
    },
    setEndTime(val) {
      var end_time = new Date(val).getTime()
      var add = end_time + this.fixedTime
      return setDate(add, true)
    },
    opens() {
      this.$nextTick(() => {
        // echarts.init(this.$refs.main).setOption(this.option1);
      })
    },
    currentChange(page) {
      this.getParams.page = page
      this.getList()
    }
  }
}
</script>

<style scoped>
/* .report-batch-style {
} */
</style>
