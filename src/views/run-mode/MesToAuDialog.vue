<template>
  <el-dialog width="80%" title="MES系统与上辅机群控系统的数据同步" :visible.sync="dialogVisible">
    <el-table :data="tableData">
      <el-table-column
        label="MES系统"
      >
        <el-table-column prop="mes_data_type" label="数据类别" />
        <el-table-column prop="mes_data_no" label="数据编号" />
      </el-table-column>

      <el-table-column
        label="同步"
      >
        <el-table-column width="80">
          <template slot="header" slot-scope="scope">
            <el-checkbox>全选</el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-checkbox />
          </template>
        </el-table-column>
        <el-table-column prop="sync_data_no" label="数据编号" />
        <el-table-column width="80">
          <template slot="header" slot-scope="scope">
            <el-checkbox>全选</el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-checkbox />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="上辅机群控系统"
      >
        <el-table-column prop="au_data_type" label="数据类别" />
        <el-table-column prop="au_data_no" label="数据编号" />
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { Synchronization, SynchronizationMes } from '@/api/synchronization'

export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      synchronizationData: null,
      lost_time: null,
      plan_classes_uid_by_row: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.tableData = []
      Synchronization().then(response => {
        this.synchronizationData = response
        const appsData = this.synchronizationData['Upper auxiliary machine group control system']
        for (const appName of Object.keys(appsData)) {
          if (appName !== 'lost_time') {
            for (const tableName of Object.keys(appsData[appName])) {
              for (const plan_classes_uid of Object.keys(appsData[appName][tableName])) {
                const tableRow = {
                  au_data_type: appName,
                  au_data_no: plan_classes_uid
                }
                this.tableData.push(tableRow)
                this.plan_classes_uid_by_row[plan_classes_uid] = tableRow
              }
            }
          } else {
            this.lost_time = appsData[appName]
          }
        }
        if (this.lost_time) {
          SynchronizationMes(this.lost_time).then(response => {
            console.log(response)
            const appsData = response.data['MES系统']
            for (const appName of Object.keys(appsData)) {
              if (appName !== 'lost_time') {
                for (const tableName of Object.keys(appsData[appName])) {
                  for (const plan_classes_uid of Object.keys(appsData[appName][tableName])) {
                    let tableRow = this.plan_classes_uid_by_row[plan_classes_uid]
                    if (!tableRow) {
                      tableRow = {}
                      this.tableData.push(tableRow)
                      this.plan_classes_uid_by_row[plan_classes_uid] = tableRow
                    }
                    tableRow['mes_data_type'] = appName
                    tableRow['mes_data_no'] = plan_classes_uid
                  }
                }
              }
            }
          })
        }
      })
    },
    show() {
      this.dialogVisible = true
    }
  }
}
</script>
