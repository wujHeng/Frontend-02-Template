<template>
  <div
    v-loading="loading"
    class="dashboard"
  >
    <div
      v-if="!loading"
      style="display:flex;flex-wrap:wrap"
    >
      <div
        v-for="(item,index) in chartDataList"
        :key="index"
        class="dashboard_box"
      >
        <div v-if="item.chartData.rows.length>0&&(item.chartData.rows[0].actual_num||item.chartData.rows[0].plan_num)">
          <div
            class="dashboard_boxTitle"
            @click="clickBoxTitle(item,index)"
          >{{ item.equip_no }}#机台</div>
          <div style="height:300px">
            <ve-histogram
              width="100%"
              height="100%"
              :data="item.chartData"
              :settings="chartSettings"
              :after-set-option="afterSetOption"
            />
          </div>
          <el-form
            ref="form"
            :model="form"
            label-width="90px"
          >
            <el-form-item label="当前规格:">{{ setRetVal(item.chartData.rows,0) }}
              <!-- item.chartData.rows[0]&&item.chartData.rows[0].product_no?item.chartData.rows[0].product_no:'--'  -->
            </el-form-item>
            <el-form-item label="收皮数量:">{{ setRetVal(item.chartData.rows,1) }}</el-form-item>
            <el-form-item label="设备状态:">{{ setRetVal(item.chartData.rows,2) }}</el-form-item>
            <!-- <el-form-item label="活动名称:">66666</el-form-item> -->
          </el-form>
        </div>
        <div v-else>
          <div class="dashboard_boxTitle">{{ item.equip_no }}#机台</div>
          <span class="nodeData">暂无数据</span>
        </div>
      </div>
    </div>
    <div v-if="chartDataList.length===0">暂无数据</div>
    <el-dialog
      :title="chartDataList.length>0?chartDataList[currentIndex].equip_no+'#机台 生产信息统计':''"
      center
      :visible.sync="dialogVisible"
      style="min-width:900px"
      width="70%"
    >
      <div v-loading="dialogLoading">
        <div v-if="!dialogLoading&&JSON.stringify(infoData)!=='{}'">
          <span
            class="visibleTitle"
            style="padding-left:0;"
          >当前规格：{{ setRetVal(currentEquipInfo,0) }}</span>
          <span class="visibleTitle">班次：{{ infoData.classes_name || '--' }}</span>
          <span class="visibleTitle">收皮数量：{{ setRetVal(currentEquipInfo,1) }}</span>
          <span class="visibleTitle">
            设备状态：
            <span>{{ setRetVal(currentEquipInfo,2) }}</span>
          </span>
        </div>
        <div style="height:390px;display:flex">
          <div class="visibleLeftBox">
            <div v-if="!dialogLoading&&chartDataLeft.rows.length>0">
              <div class="visibleTitleLeft">{{ infoData.classes_name }} 规格别成绩</div>
              <div style="height:350px">
                <ve-histogram
                  height="100%"
                  :data="chartDataLeft"
                  :settings="chartSettingsLeft"
                  :after-set-option="afterSetOptionLeft"
                />
              </div>
            </div>
            <div
              v-else
              class="nodeData"
            >暂无数据</div>
          </div>
          <div class="visibleRightBox">
            <div v-if="!dialogLoading&&chartDataRight.rows.length>0">
              <div class="visibleTitleLeft">设备运行时间统计</div>
              <ve-ring
                :data="chartDataRight"
                :after-set-option="afterSetOptionRight"
              />
            </div>
            <div
              v-else
              class="nodeData"
            >暂无数据</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { equipStatusSlanList, equipDetailedList } from '@/api/dashboard'
export default {
  name: 'Dashboard',
  data() {
    this.chartSettings = {
      labelMap: {
        global_name: '班次',
        plan_num: '计划车次',
        actual_num: '实际车次'
      }
    }
    this.chartSettingsLeft = {
      labelMap: {
        product_no: '班次',
        sum_plan_trains: '计划车次',
        actual_trains: '实际车次'
      }
    }
    return {
      dialogVisible: false,
      form: {},
      chartDataList: [],
      options: {
        grid: {
          y: 30,
          y2: 10
        }
      },
      // 详情
      infoData: {},
      chartDataLeft: {
        columns: [
          'product_no',
          'sum_plan_trains',
          'actual_trains'
        ],
        rows: []
      },
      optionsLeft: {
        grid: {
          y: 35,
          y2: 20
        }
      },
      chartDataRight: {
        columns: ['status', 'count_status'],
        rows: []
      },
      optionsRight: {
        tooltip: {},
        series: [
          {
            labelLine: {
              show: false
            },
            label: {
              show: false
            }
            // label: {
            //   normal: {
            //     position: "inner",
            //     show: false,
            //   },
            // },
          }
        ]
      },
      current_equip_no: '',
      currentIndex: 0,
      loading: true,
      dialogLoading: true,
      currentEquipInfo: {}
    }
  },
  async created() {
    await this.getList()
  },
  methods: {
    async getList() {
      try {
        const data = await equipStatusSlanList('get')
        const dataArr = data || {}
        this.loading = false
        const arr = []

        for (const key in dataArr) {
          const newdataArr = dataArr[key]
          // 早中晚按classes_id排序
          // dataArr[key].sort(compare('classes_id'))
          arr.push({
            equip_no: key,
            chartData: {
              columns: ['global_name', 'plan_num', 'actual_num'],
              rows: newdataArr
            }
          })
        }
        this.chartDataList = arr
      } catch (e) {
        this.loading = false
      }
    },
    async getEquipDetailedList(id, product_no) {
      try {
        this.chartDataLeft.rows = []
        this.chartDataRight.rows = []
        this.dialogLoading = true
        // eslint-disable-next-line object-curly-spacing
        const data = await equipDetailedList('get', { params: { equip_no: id, product_no: product_no } })
        this.infoData = data || {}

        this.chartDataLeft.rows = this.infoData.product_list || []
        this.chartDataRight.rows = this.infoData.status_list || []

        this.dialogLoading = false
      } catch (e) {
        this.dialogLoading = false
      }
    },
    setRetVal(rowArr, currentIndex) {
      let a = ''
      for (let i = 0; i < rowArr.length; i++) {
        a = rowArr[i].ret[currentIndex]
        if (a && a !== '--') break
      }
      return a || '--'
      // let arr = []
      // let i = -1
      // rowArr.forEach((element, index) => {
      //   // if (element.ret.length > 0) {
      //   //   i = index
      //   // }
      // })
      // arr = i > -1 ? rowArr[i].ret : []
      // if (i === -1 || arr.length === 0) return '--'
      // return arr[currentIndex] ? arr[currentIndex] : '--'
    },
    afterSetOption(chartObj) {
      chartObj.setOption(this.options)
    },
    clickBoxTitle(row, index) {
      this.dialogVisible = true
      this.currentIndex = index
      this.currentEquipInfo = row.chartData.rows
      let product_no = this.setRetVal(row.chartData.rows, 0)
      product_no = !product_no || product_no === '--' ? '' : product_no
      this.getEquipDetailedList(row.equip_no, product_no)
    },
    afterSetOptionLeft(chartObj) {
      chartObj.setOption(this.optionsLeft)
    },
    afterSetOptionRight(chartObj) {
      chartObj.setOption(this.optionsRight)
    }
  }
}
// function compare(property) {
//   return function(a, b) {
//     var value1 = a[property]
//     var value2 = b[property]
//     return value1 - value2
//   }
// }
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
