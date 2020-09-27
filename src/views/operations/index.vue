<template>
  <div style="margin-top: 25px">
    <el-row>
      <el-form
        style="margin-left: 10px"
        :inline="true"
      >
        <el-form-item label="日期">
          <el-date-picker
            v-model="search_date"
            type="datetimerange"
            range-separator="至"
            :clearable="true"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeSearch"
          />
        </el-form-item>
        <el-form-item label="用户">
          <el-input
            v-model="username"
            type="text"
            style="float: left"
            clearable
            @input="changeSearch"
          />
        </el-form-item>
        <el-form-item label="操作">
          <el-input
            v-model="operation"
            type="text"
            style="float: left"
            clearable
            @input="changeSearch"
          />
        </el-form-item>
      </el-form>
    </el-row>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="No"
        width="55"
      />
      <el-table-column
        prop="username"
        label="用户名"
      />
      <el-table-column
        prop="operation"
        label="操作"
      />
      <el-table-column
        :formatter="formatter"
        prop="results"
        label="结果"
      />
      <!-- <el-table-column prop="reasons" label="原因" /> -->
      <el-table-column
        prop="create_time"
        label="存入时间"
      />
    </el-table>
    <page
      :total="total"
      :current-page="page"
      @currentChange="currentChange"
    />
  </div>
</template>

<script>
import { GetOperations } from '@/api/operations'
import page from '@/components/page'
// import { mapGetters } from 'vuex'
export default {
  components: { page },
  data: function() {
    return {
      tableData: [],
      search_date: [],
      params: {
      },
      username: '',
      operation: '',
      total: 0,
      page: 1
    }
  },
  //   computed: {
  //     ...mapGetters(['permission'])
  //   },
  created() {
    this.getTableList()
  },
  methods: {
    async getTableList() {
      this.params['page'] = this.page
      try {
        const Data = await GetOperations(this.params)
        this.tableData = Data.results
        this.total = Data.count
        // eslint-disable-next-line no-empty
      } catch (e) { }
    },
    changeSearch() {
      this.params['username'] = this.username
      this.params['st'] = this.search_date ? this.search_date[0] : ''
      this.params['et'] = this.search_date ? this.search_date[1] : ''
      this.params['operation'] = this.operation
      this.page = 1
      this.getTableList()
    },
    formatter: function(row, column) {
      return row.results ? '成功' : '失败'
    },
    currentChange(page) {
      this.page = page
      this.getTableList()
    }
  }
}
</script>

<style lang="scss">
</style>
