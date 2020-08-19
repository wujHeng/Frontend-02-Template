<template>

  <div>
    <div class="table-header el-table--border">MES系统</div>
    <el-table
      :data="mesSystemTableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="system"
        label="MES系统"
        width="110"
      />
      <el-table-column
        prop="ip"
        label="IP地址"
        width="250"
      />
      <el-table-column
        prop="status"
        label="状态"
        width="180"
      />
      <el-table-column
        label="操作(上辅机系统是否联网运行)"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleMesConnect(scope.$index, scope.row)"
          >联网</el-button>
          <el-button
            size="mini"
            type="info"
          >独立</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-header el-table--border">上辅机工作站</div>
    <el-table
      :data="auxiliaryTableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="auxiliary"
        label="上辅机工作站"
        width="110"
      />
      <el-table-column
        prop="ip"
        label="IP地址"
        width="250"
      />
      <el-table-column
        prop="status"
        label="状态"
        width="180"
      />
      <el-table-column
        label="操作(上辅机系统是否联网运行)"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleAuConnect(scope.$index, scope.row)"
          >联网</el-button>
          <el-button
            size="mini"
            type="info"
          >独立</el-button>
        </template>
      </el-table-column>
    </el-table>

    <mes-to-au-dialog ref="mesToAuDialog" />
    <au-to-mes-dialog ref="auToMesDialog" />
  </div>

</template>

<script>
import MesToAuDialog from './MesToAuDialog'
import AuToMesDialog from './AuToMesDialog'

export default {
  components: {
    MesToAuDialog,
    AuToMesDialog
  },
  data() {
    return {
      mesSystemTableData: [
        {
          system: '服务器',
          ip: '192.168.10.1',
          status: '在线'
        }
      ],
      auxiliaryTableData: [
        {
          auxiliary: '1号线',
          ip: '192.168.10.1',
          status: '在线'
        },
        {
          auxiliary: '2号线',
          ip: '192.168.10.1',
          status: '在线'
        },
        {
          auxiliary: '3号线',
          ip: '192.168.10.1',
          status: '在线'
        }
      ]
    }
  },
  methods: {
    handleMesConnect(index, row) {
      this.$refs.mesToAuDialog.show()
    },
    handleAuConnect(index, row) {
      this.$refs.auToMesDialog.show()
    }
  }
}
</script>

<style scoped>
  .table-header {
      padding: 3px;
      color: #909399;
      background-color: lavender;
  }
</style>
