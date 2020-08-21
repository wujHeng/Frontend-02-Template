<template>
  <div>
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
      <el-form-item label="配方">
        <el-select
          v-model="getParams.product_no"
          placeholder="请选择"
          clearable
          @change="changeSearch"
        >
          <el-option
            v-for="item in formulaList"
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
      <el-form-item label="操作人">
        <el-select v-model="getParams.classes" placeholder="请选择">
          <el-option
            v-for="item in operatorList"
            :key="item.id"
            :label="item.classes_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="selectRubber">选择胶料</el-button>
        <el-button @click="selectRubber">导出批记录</el-button>
        <el-button @click="selectRubber">单页导出</el-button>
        <el-button @click="selectRubber">所有导出</el-button>
        <el-button @click="selectRubber">所有合并</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      border
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="equip_no" label="ID"></el-table-column>
      <el-table-column prop="equip_no" label="配方编号"></el-table-column>
      <el-table-column prop="equip_no" label="计划编号"></el-table-column>
      <el-table-column prop="equip_no" label="开始时间"></el-table-column>
      <el-table-column prop="equip_no" label="结束时间"></el-table-column>
      <el-table-column prop="equip_no" label="设定车次"></el-table-column>
      <el-table-column prop="equip_no" label="实际车次"></el-table-column>
      <el-table-column prop="equip_no" label="本/远控"></el-table-column>
      <el-table-column prop="equip_no" label="手/自动"></el-table-column>
      <el-table-column prop="equip_no" label="总重量"></el-table-column>
      <el-table-column prop="equip_no" label="排胶时间"></el-table-column>
      <el-table-column prop="equip_no" label="排胶温度"></el-table-column>
      <el-table-column prop="equip_no" label="排胶能量"></el-table-column>
      <el-table-column prop="equip_no" label="操作人"></el-table-column>
      <el-table-column prop="equip_no" label="存盘时间"></el-table-column>
      <el-table-column prop="equip_no" label="密炼时间"></el-table-column>
      <el-table-column prop="equip_no" label="间隔时间"></el-table-column>
    </el-table>
    <el-row style="margin-top:20px">
      <el-col :span="24" class="trainContentLeft">
        <el-row class="row-border-bottom">
          <el-col :span="2">
            <div class="grid-content bg-purple">页</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">1</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">报表</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple-light">打印时间</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple-light bd-right-none">
              2020/8/3
              20:28:52
            </div>
          </el-col>
        </el-row>
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
            <td>计划编号</td>
            <td>2000002200</td>
            <td>设定车次</td>
            <td>12</td>
            <td>开始</td>
            <td>2020/10/10</td>
            <td>本/遥控</td>
            <td>fds</td>
          </tr>
          <tr class="train-one-tr-banburying">
            <td>计划编号</td>
            <td>2000002200</td>
            <td>设定车次</td>
            <td>12</td>
            <td>开始</td>
            <td>2020/10/10</td>
            <td>本/遥控</td>
            <td>fds</td>
          </tr>
          <tr class="train-one-tr-banburying">
            <td>计划编号</td>
            <td>2000002200</td>
            <td>设定车次</td>
            <td>12</td>
            <td>开始</td>
            <td>2020/10/10</td>
            <td>本/遥控</td>
            <td>fds</td>
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
          <tr class="train-one-tr-banburying" v-for="(item,index) in 4" :key="index">
            <td>ID</td>
            <td>名称</td>
            <td>设定值</td>
            <td>实重</td>
            <td>状态</td>
            <td>种类</td>
            <td>超差</td>
          </tr>
        </table>

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
            <td>计划编号</td>
            <td>计划编号</td>
            <td>计划编号</td>
            <td>计划编号</td>
            <td>计划编号</td>
            <td>计划编号</td>
            <td>计划编号</td>
          </tr>
          <tr class="train-one-tr-banburying" v-for="(item,index) in 10" :key="index">
            <td>ID</td>
            <td>计划编号</td>
            <td>计划编号</td>
            <td>计划编号</td>
            <td>计划编号</td>
            <td>计划编号</td>
            <td>计划编号</td>
            <td>计划编号</td>
            <td>计划编号</td>
          </tr>
        </table>

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
          <tr class="train-one-tr-banburying" v-for="(item,index) in 4" :key="index">
            <td>ID</td>
            <td>名称</td>
            <td>设定值</td>
            <td>实重</td>
            <td>状态</td>
            <td>种类</td>
            <td>超差</td>
          </tr>
        </table>
      </el-col>
      <el-col :span="24" class="trainContentRight">
        <div style="display:flex">
          <div class="police-record">
            <span>排胶能量:XXX</span>
            <span>排胶能量:XXX</span>
            <span>排胶能量:XXX</span>
            <span>排胶能量:XXX</span>
            <span>排胶能量:XXX</span>
            <br />
            <span>排胶能量:XXX</span>
            <span>排胶能量:XXX</span>
            <span>排胶能量:XXX</span>
          </div>
          <div class="right-button">
            <el-button>上一步</el-button>
            <el-button>曲线导出</el-button>
            <br />
            <el-button>下一步</el-button>
            <el-button>打印报表</el-button>
          </div>
        </div>
        <div>
          <ve-line :data="chartData" :after-set-option="afterSetOption" :settings="chartSettings"></ve-line>
          <!-- <button @click="clickChartData">下载</button> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      labelMap: {
        访问用户: "访问用户",
        下单用户: "下单用户",
        下单率: "下单率",
      },
    };
    return {
      search_date: "",
      getParams: {},
      formulaList: [],
      machineList: [],
      operatorList: [],
      tableData: [],
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
        ],
      },
      options: {
        backgroundColor: "#fff",
        toolbox: {
          //show: true,
          itemSize: 20,
          itemGap: 30,
          right: 50,
          feature: {
            // dataView: {show:true},
            saveAsImage: {
              name: "自定义扩展方法1",
              // excludeComponents :['toolbox'],
              pixelRatio: 2,
            },
          },
        },
      },
    };
  },
  methods: {
    changeSearch() {},
    handleSelectionChange() {},
    selectRubber() {},
    clickChartData() {
      createImage(this);
    },
    afterSetOption(chartObj) {
      chartObj.setOption(this.options);
    },
  },
};

function createImage(_this) {
  const canvas = document.getElementsByTagName("canvas")[0];
  let newcanvas = JSON.parse(JSON.stringify(canvas));
  if (!canvas.toDataURL) {
    _this.$message.info("请更新浏览器");
    return;
  }
  let image = canvas.toDataURL({
    type: "png",
    pixelRatio: 2,
  });
  //下载
  downloadFile("测试.png", image);
}
function downloadFile(fileName, content) {
  let aLink = document.createElement("a");
  let blob = base64ToBlob(content); //new Blob([content]);

  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true, view: window })
  ); //兼容火狐
}
function base64ToBlob(code) {
  let parts = code.split(";base64,");
  let contentType = parts[0].split(":")[1];
  let raw = window.atob(parts[1]);
  let rawLength = raw.length;

  let uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}
</script>

<style lang="scss" scoped>
$border-color: #dcdfe6;
$border-weight: 0.5px;
.trainContentLeft {
  border: $border-weight solid $border-color;
  // min-width: 350px;
  text-align: center;
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
    span{
      margin-right:10px;
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
  line-height: 30px;
}
.train-one {
  border-color: $border-color;
  .train-one-tr-banburying {
    td {
      line-height: 25px;
    }
  }
}
</style>