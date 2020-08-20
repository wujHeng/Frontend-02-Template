<template>
  <div class="report-batch-style">
    <el-form :inline="true">
      <el-form-item label="日期">
        <el-date-picker
          @change="changeSearch"
          v-model="search_date"
          type="daterange"
          range-separator="至"
          :clearable="false"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="胶料">
        <el-select
          v-model="getParams.product_no"
          placeholder="请选择"
          clearable
          @change="changeSearch"
        >
          <el-option
            v-for="item in glueList"
            :key="item.product_name"
            :label="item.product_name"
            :value="item.product_name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="机台">
        <el-select v-model="getParams.equip_no" @change="changeSearch" clearable placeholder="请选择">
          <el-option
            v-for="item in machineList"
            :key="item.equip_no"
            :label="item.equip_no"
            :value="item.equip_no"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班次">
        <el-select v-model="getParams.classes" placeholder="请选择">
          <el-option
            v-for="item in classesList"
            :key="item.id"
            :label="item.classes_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column prop="equip_no" label="机台"></el-table-column>
      <el-table-column prop="equip_no" label="作业时间">
        <template slot-scope="scope">{{ scope.row.end_time.split(' ')[0]}}</template>
      </el-table-column>
      <el-table-column prop="classes" label="班次"></el-table-column>
      <el-table-column prop="class_group" label="班组">
        <template slot-scope="scope">{{ scope.row.class_group?scope.row.class_group:'--' }}</template>
      </el-table-column>
      <el-table-column label="生产时间">
        <template slot-scope="scope">{{ scope.row.end_time.split(' ')[1]}}</template>
      </el-table-column>
      <el-table-column prop="product_no" label="胶料编码">
        <template slot-scope="scope">
          <div
            style="color:#1989fa;cursor:pointer"
            @click="clickProductNo(scope.row)"
          >{{ scope.row.product_no }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="equip_no" label="BATNO">
        <template slot-scope="scope">{{ scope.row.begin_trains }}--{{ scope.row.end_trains }}</template>
      </el-table-column>
      <el-table-column prop="actual_weight" label="生产重量"></el-table-column>
      <el-table-column prop="equip_no" width="150" label="有效时间">
        <template
          slot-scope="scope"
        >{{ scope.row.end_time }} -- {{ setEndTime(scope.row.end_time) }}</template>
      </el-table-column>
      <el-table-column prop="lot_no" label="LOT NO">
        <template slot-scope="scope">{{ scope.row.lot_no?scope.row.lot_no:'--' }}</template>
      </el-table-column>
      <el-table-column prop="operation_user" label="作业者"></el-table-column>
    </el-table>

    <page @currentChange="currentChange"></page>

    <el-dialog title="胶料产出反馈" :visible.sync="dialogVisibleRubber">
      <el-form :inline="true">
        <el-form-item
          label="胶料区分: "
        >{{ palletFeedObj.hasOwnProperty("stage")?palletFeedObj.stage:'--'}}</el-form-item>
        <el-form-item label="胶料编码: ">{{ palletFeedObj.product_no }}</el-form-item>
        <el-form-item label="班次: ">{{ palletFeedObj.classes }}</el-form-item>
        <el-form-item label="机台: ">{{ palletFeedObj.equip_no }}</el-form-item>
      </el-form>
      <el-table :data="palletFeedList" border style="width: 100%">
        <el-table-column prop="lot_no" label="LOT">
          <template slot-scope="scope">{{ scope.row.LOT||'--' }}</template>
        </el-table-column>
        <el-table-column prop="product_no" label="胶料编码"></el-table-column>
        <el-table-column prop="equip_no" label="机台"></el-table-column>

        <el-table-column label="BAT">
          <template slot-scope="scope">
            <div
              style="color:#1989fa;cursor:pointer"
              @click="clickBAT(scope.row)"
            >{{ scope.row.begin_trains }}--{{ scope.row.end_trains }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="actual_weight" label="生产重量"></el-table-column>
        <el-table-column label="生产时间">
          <template slot-scope="scope">{{ scope.row.end_time.split(' ')[1]}}</template>
        </el-table-column>
        <el-table-column prop="classes" label="班次"></el-table-column>
        <el-table-column prop="operation_user" label="作业者"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="BAT查询" :visible.sync="dialogVisibleBAT">
      <div style="position: relative">
        <el-form :inline="true" style="margin-right: 100px;">
          <el-form-item label="胶料区分: ">{{ BATObj.stage }}</el-form-item>
          <el-form-item label="胶料编码: ">{{ BATObj.product_no }}</el-form-item>
          <el-form-item label="班次: ">{{ BATObj.classes }}</el-form-item>
          <el-form-item label="机台: ">{{ BATObj.equip_no }}</el-form-item>
          <el-form-item label="车次: ">{{ BATObj.begin_trains }} -- {{ BATObj.end_trains }}</el-form-item>
        </el-form>
        <el-button @click="viewGraph" style="position: absolute;right:10px;top:0">图形</el-button>
      </div>
      <el-table :data="BATList" style="width: 100%">
        <el-table-column prop="equip_no" label="机台"></el-table-column>
        <el-table-column prop="name" label="日期">
          <template slot-scope="scope">{{ scope.row.end_time.split(' ')[0] }}</template>
        </el-table-column>
        <el-table-column prop="classes" label="班次"></el-table-column>
        <el-table-column prop="product_no" label="胶料编码"></el-table-column>
        <el-table-column prop="actual_trains" label="车次"></el-table-column>
        <el-table-column prop="actual_weight" label="胶"></el-table-column>
        <el-table-column prop="end_time-begin-time" label="时间">
          <template slot-scope="scope">{{ scope.row.begin_time }} -- {{ scope.row.end_time }}</template>
        </el-table-column>
        <el-table-column prop="equip_status.temperature" label="温度"></el-table-column>
        <el-table-column prop="equip_status.energy" label="电量"></el-table-column>
        <el-table-column prop="equip_status.rpm" label="RPM"></el-table-column>
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
      <div style="margin: 0 0 20px 5px;">2020-12-15</div>
      <ve-line :data="chartData"></ve-line>
    </el-dialog>
    <!-- <button @click="dialogVisibleBAT=true">7777777777</button> -->
  </div>
</template>

<script>
import { setDate } from "@/utils/index";
import page from "@/components/page";
export default {
  components: { page },
  data() {
    return {
      tableDataUrl: "InternalMixerUrl",
      tableData: [],
      search_date: [],
      getParams: {
        page: 1,
        equip_no: null,
        product_no: null,
        plan_classes_uid: null,
        st: "",
        et: "",
      },
      normsList: [],
      produceList: [],
      groupList: [],
      dialogVisibleRubber: false,
      tableDataRubber: [],
      tableDataBAT: [],
      dialogVisibleBAT: false,
      glueList: [],
      machineList: [],
      classesList: [],
      //24小时，转换为时间戳24*60*60*1000
      fixedTime: 24 * 60 * 60 * 1000,
      palletFeedObj: {},
      palletFeedList: [],
      BATObj: {},
      BATList: [],
      dialogVisibleGraph: false,
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
      // pagination:{}
    };
  },
  created() {
    // this.getList();
    // this.getGlueList(); //获取胶料列表
    // this.getMachineList(); //获取机台列表
    // this.getClassesList(); //获取班次列表

    var _setDateCurrent = setDate();
    this.getParams.st = _setDateCurrent + " 00:00:00";
    this.getParams.et = _setDateCurrent + " 23:59:59";
    // this.getParams.st = '2020-06-01' + " 00:00:00"
    // this.getParams.et = '2020-06-01' + ' 23:59:59'
    this.search_date = [this.getParams.st, this.getParams.et];
  },
  methods: {
    getList() {
      var _this = this;
      axios
        .get(_this.tableDataUrl, {
          params: _this.getParams,
        })
        .then(function (response) {
          _this.tableData = response.data.results || [];
          if (_this.tableDataTotal !== response.data.count) {
            _this.tableDataTotal = response.data.count;
          }
        })
        .catch(function (error) {
          this.$message.error("请求错误");
        });
    },
    getGlueList() {
      var _this = this;
      axios
        .get(RubberMaterialUrl, {
          params: {
            page_size: 10000000,
          },
        })
        .then(function (response) {
          var glueList = response.data.results || [];
          //去重
          var obj = {};
          var newArr = glueList.reduce(function (item, next) {
            obj[next.product_name]
              ? " "
              : (obj[next.product_name] = true && item.push(next));
            return item;
          }, []);
          _this.glueList = newArr;
        })
        .catch(function (error) {});
    },
    getMachineList() {
      var _this = this;
      axios
        .get(EquipUrl, { params: { page_size: 1000000 } })
        .then(function (response) {
          _this.machineList = response.data.results || [];
        })
        .catch(function (error) {});
    },
    getClassesList() {
      var _this = this;
      axios
        .get(ClassesListUrl)
        .then(function (response) {
          _this.classesList = response.data.results || [];
        })
        .catch(function (error) {});
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
    clickExcel() {},
    clickProductNo(row) {
      this.dialogVisibleRubber = true;
      this.palletFeedObj = row;
      this.getRubberCoding();
    },
    getRubberCoding() {
      var _this = this;
      axios
        .get(PalletFeedBacksUrl, {
          params: {
            product_no: _this.palletFeedObj.product_no,
            plan_classes_uid: _this.palletFeedObj.plan_classes_uid,
            equip_no: _this.palletFeedObj.equip_no,
          },
        })
        .then(function (response) {
          _this.palletFeedList = response.data.results || [];
        })
        .catch(function (error) {});
    },
    clickBAT(row) {
      this.dialogVisibleBAT = true;
      this.BATObj = row;
      this.getBATList();
    },
    getBATList() {
      var _this = this;
      axios
        .get(TrainsFeedbacksUrl, {
          params: {
            plan_classes_uid: _this.BATObj.plan_classes_uid,
            equip_no: _this.BATObj.equip_no,
            actual_trains:
              _this.BATObj.begin_trains + "," + _this.BATObj.end_trains,
          },
        })
        .then(function (response) {
          _this.BATList = response.data.results || [];
        })
        .catch(function (error) {});
    },
    viewGraph() {
      this.dialogVisibleGraph = true;
      this.getEchartsList();
    },
    getEchartsList() {
      var _this = this;
      axios
        .get(EchartsListUrl, {
          params: {
            product_no: _this.BATObj.product_no,
            plan_classes_uid: _this.BATObj.plan_classes_uid,
            equip_no: _this.BATObj.equip_no,
            actual_trains:
              _this.BATObj.begin_trains + "," + _this.BATObj.end_trains,
          },
        })
        .then(function (response) {
          var results = response.data.results;
          results.forEach(function (D) {
            var created_date = D.created_date.split(" ")[1];
            echartsTime.push(created_date);
            echartsTemprature.push(D.temperature);
            echartsPower.push(D.power);
            echartsEnergy.push(D.energy);
            echartsPressure.push(D.pressure);
            echartsRpm.push(D.rpm);
          });
        })
        .catch(function (error) {});
    },
    changeSearch() {
      if (this.search_date) {
        this.getParams.st = this.search_date[0];
        this.getParams.et = this.search_date[1];
      }

      this.getParams.page = 1;
      this.getList();
    },
    setEndTime(val) {
      var end_time = new Date(val).getTime();
      var add = end_time + this.fixedTime;
      return setDate(add, true);
    },
    opens() {
      this.$nextTick(() => {
        // echarts.init(this.$refs.main).setOption(this.option1);
      });
    },
    currentChange(page){
      console.log(page)
    }
  },
};
</script>

<style scoped>
.report-batch-style {
}
</style>