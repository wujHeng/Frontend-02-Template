/* eslint-disable prefer-const */
<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="工号">
        <el-input
          v-model.number="getParams.num"
          @input="numChanged"
        />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input
          v-model="getParams.username"
          @input="numChanged"
        />
      </el-form-item>
      <el-form-item style="float: right">
        <el-button @click="showCreateUserDialog">新建</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="序"
        width="50"
      />
      <el-table-column label="工号">
        <template slot-scope="scope">
          {{ scope.row.num?scope.row.num:'--' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
      />
      <el-table-column label="组织">
        <template slot-scope="scope">
          {{ scope.row.section?scope.row.section:'--' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="is_leave"
        label="离职与否"
        width="80"
        :formatter="formatter"
      />
      <el-table-column label="创建人">
        <template slot-scope="scope">
          {{ scope.row.created_user?scope.row.created_user:'--' }}
        </template>
      </el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="scope">
          {{ scope.row.created_time?scope.row.created_time:'--' }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="140"
      >
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              size="mini"
              @click="showEditUserDialog(scope.row)"
            >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleUserDelete(scope.row)"
            >
              {{ scope.row.is_active?'停用':'启用' }}
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
      title="添加用户"
      :visible.sync="dialogCreateUserVisible"
      :before-close="handleClose"
    >
      <el-form
        ref="userForm"
        :model="userForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item
          v-if="!userForm.id"
          label="密码"
          prop="password"
        >
          <el-input
            v-model="userForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          v-if="!userForm.id"
          label="确认密码"
          prop="checkPass"
        >
          <el-input
            v-model="userForm.checkPass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="工号"
          prop="num"
        >
          <el-input v-model.number="userForm.num" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogCreateUserVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="btnloading"
          @click="handleCreateUser('userForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { personnelsUrl } from '@/api/user'
import page from '@/components/page'
// import { setDate } from '@/utils/index'
export default {
  components: { page },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error('请输入6~16位长度的密码'))
      } else {
        if (this.userForm.checkPass !== '') {
          this.$refs.userForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      btnloading: false,
      getParams: {
        num: '',
        username: ''
      },
      currentPage: 1,
      dialogCreateUserVisible: false,
      userForm: {},
      tableData: [],
      count: 0,
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请填写工号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.currentChange()
  },
  methods: {
    currentChange() {
      this.tableData = []
      const app = this
      personnelsUrl('get', null, {
        params: this.getParams
      }).then((response) => {
        this.count = response.count || 0
        app.tableData = response.results || []
        // eslint-disable-next-line handle-callback-err
      }).catch((error) => {
      })
    },
    numChanged() {
      this.getParams['page'] = 1
      this.currentChange()
    },
    userNameChanged() { },
    showCreateUserDialog() {
      this.clearUserForm()
      if (this.$refs['userForm']) { this.$refs['userForm'].resetFields() }
      this.dialogCreateUserVisible = true
    },
    clearUserForm() {
      this.userForm = {
        username: '',
        password: '',
        checkPass: '',
        num: null
      }
    },
    showEditUserDialog(row) {
      this.userForm = {
        username: '',
        num: null
      }
      this.userForm.id = row.id
      this.userForm.username = row.username
      this.userForm.num = row.num
      this.dialogCreateUserVisible = true
    },
    handleUserDelete(row) {
      var boolStr = row.is_active ? '停用' : '启用'
      var app = this
      this.$confirm('确定' + boolStr + row.username + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // eslint-disable-next-line no-undef
        personnelsUrl('delete', row.id)
          .then((response) => {
            app.$message({
              type: 'success',
              message: '操作成功!'
            })
            app.currentChange()
          }).catch(() => {
          })
      }).catch(() => {
      })
    },
    changePage(page) {
      this.getParams['page'] = page
      this.currentChange()
    },
    handleCreateUser(formName) {
      var app = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnloading = true
          // eslint-disable-next-line prefer-const
          let type = app.userForm.id ? 'put' : 'post'
          // eslint-disable-next-line prefer-const
          let paramsId = app.userForm.id ? app.userForm.id : ''
          // eslint-disable-next-line object-curly-spacing
          personnelsUrl(type, paramsId, { data: { ...app.userForm } })
            .then((response) => {
              app.dialogCreateUserVisible = false
              app.$message.success(app.userForm.username + '创建成功')
              app.currentChange()
              this.btnloading = false
            }).catch(() => {
              this.btnloading = false
            })
        } else {
          return false
        }
      })
    },
    handleClose(done) {
      this.$refs['userForm'].resetFields()
      done()
    },
    formatter(row, column) {
      return row.is_leave ? 'Y' : 'N'
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input{
  width:auto;
}
</style>
