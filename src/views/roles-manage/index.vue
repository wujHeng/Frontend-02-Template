<template>
  <div
    v-loading="loading"
    class="roles-manage"
  >
    <el-form :inline="true">
      <el-form-item label="角色">
        <el-input
          v-model="getParams.group_code"
          @input="groupCodeChanged"
        />
      </el-form-item>
      <el-form-item label="角色名">
        <el-input
          v-model="getParams.name"
          @input="nameChanged"
        />
      </el-form-item>
      <el-form-item style="float: right">
        <el-button @click="showCreateGroupDialog">新建</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loadingTable"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="序"
        width="50"
      />
      <el-table-column
        prop="group_code"
        label="角色代码"
      />
      <el-table-column
        prop="name"
        label="角色名称"
      />
      <el-table-column
        prop="use_flag"
        label="使用"
        width="80"
        :formatter="formatter"
      />
      <el-table-column
        prop="created_username"
        label="创建人"
      />
      <el-table-column
        prop="created_date"
        label="创建日期"
      />
      <el-table-column label="操作" width="140">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              size="mini"
              @click="showEditGroupDialog(scope.row)"
            >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleGroupDelete(scope.row)"
            >删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <page
      :total="count"
      @currentChange="changePage"
    />
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogEditGroupVisible"
      :close-on-click-modal="false"
      width="800px"
    >
      <el-form
        ref="groupForm"
        :model="groupForm"
      >
        <el-form-item
          :error="groupFormError.group_code"
          label="角色代码"
        >
          <el-input v-model="groupForm.group_code" />
        </el-form-item>
        <el-form-item
          :error="groupFormError.name"
          label="角色名称"
        >
          <el-input v-model="groupForm.name" />
        </el-form-item>
        <!-- <el-form-item
          :error="groupFormError.use_flag"
          label="是否使用"
        >
          <el-switch v-model="groupForm.use_flag" />
        </el-form-item> -->
        <el-form-item
          label="权限"
          size="medium"
        >
          <el-transfer
            v-model="groupForm.permissions"
            :render-content="renderFunc"
            :titles="['可用 权限', '选中的 权限']"
            :props="{key: 'id', label: 'name'}"
            :data="permissions"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogEditGroupVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleEditGroup('groupForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { roles } from '@/api/roles-manage'
import { permissions } from '@/api/permission'
import page from '@/components/page'

export default {
  components: { page },
  data() {
    return {
      getParams: {},
      tableData: [],
      count: 0,
      group_code: '',
      name: '',
      groupForm: {
        name: '',
        group_code: '',
        use_flag: true
      },
      groupFormError: {
        name: '',
        group_code: '',
        use_flag: ''
      },
      permissions: [],
      dialogEditGroupVisible: false,
      dialogTitle: '新增角色',
      loading: true,
      loadingTable: false
    }
  },
  created() {
    this.currentChange()
    permissions('get', null).then(response => {
      this.permissions = response.results
      // eslint-disable-next-line handle-callback-err
    }).catch(error => {
    })
  },
  methods: {
    renderFunc(h, option) {
      return <span title={option.name}>{option.name}</span>
    },
    currentChange() {
      this.loadingTable = true
      //   this.tableData = []
      roles('get', null, {
        params: this.getParams
      }).then(response => {
        this.loading = false
        this.loadingTable = false
        this.count = response.count || 0
        this.tableData = response.results || []
        // eslint-disable-next-line handle-callback-err
      }).catch(error => {
        this.loading = false
        this.loadingTable = false
      })
    },
    formatter: function(row, column) {
      return row.use_flag ? 'Y' : 'N'
    },
    changePage(page) {
      this.getParams['page'] = page
      this.currentChange()
    },
    groupCodeChanged() {
      this.getParams['page'] = 1
      this.currentChange()
    },
    nameChanged() {
      this.getParams['page'] = 1
      this.currentChange()
    },
    clearGroupForm() {
      this.groupForm = {
        name: '',
        group_code: '',
        use_flag: true
      }
    },
    clearGroupFormError() {
      this.groupFormError = {
        name: '',
        group_code: '',
        use_flag: ''
      }
    },
    showCreateGroupDialog() {
      this.clearGroupForm()
      this.clearGroupFormError()
      this.dialogTitle = '新增角色'
      this.dialogEditGroupVisible = true
    },
    handleEditGroup() {
      this.clearGroupFormError()
      const type = this.groupForm.id ? 'put' : 'post'
      const id = this.groupForm.id ? this.groupForm.id : ''
      // eslint-disable-next-line object-curly-spacing
      roles(type, id, { data: { ...this.groupForm } })
        .then(response => {
          this.dialogEditGroupVisible = false
          this.$message.success(this.groupForm.name + this.groupForm.id ? '编辑成功' : '创建成功')
          this.currentChange()
          // eslint-disable-next-line handle-callback-err
        }).catch(error => {

        })
    },
    showEditGroupDialog(group) {
      this.groupForm = JSON.parse(JSON.stringify(group))
      this.clearGroupFormError()
      this.dialogTitle = '编辑角色'
      this.dialogEditGroupVisible = true
    },
    handleGroupDelete(group) {
      this.$confirm('此操作将永久删除' + group.name + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        roles('delete', group.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          //   if (this.tableData.length === 1 && this.getParams.page !== 1) {
          //     this.getParams.page = this.getParams.page - 1
          //   }
          this.currentChange()
        })
      })
    }
  }
}
</script>
<style lang="scss">
  .roles-manage{
    .el-transfer__buttons{
      padding: 0 15px;
    }
    .el-transfer-panel{
      width: 240px;
    }
    .el-checkbox{
      margin-right: 5px;
    }
  }
</style>
