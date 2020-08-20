<template>
  <div>
    <!-- <div>
      <ve-line :data="chartData" :after-set-option="afterSetOption"></ve-line>
    </div>
    <button @click="clickChartData">下载</button> -->
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
  </div>
</template>

<script>
export default {
  data() {
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

<style>
</style>