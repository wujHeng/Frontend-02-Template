<template>
  <div>
    <br>
    <el-form :inline="true">
      <el-form-item label="机台">
        <el-select
          v-model="SelectEquip"
          size="mini"
          style="width: 150px"
          clearable
          placeholder="请选择"
          @change="SelectEquipChange"
        >
          <el-option
            v-for="item in SelectEquipOptions"
            :key="item.id"
            :label="item.equip_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="SelectRecipeStatus"
          size="mini"
          style="width: 150px"
          clearable
          placeholder="请选择"
          @change="SelectRecipeStatusChange"
        >
          <el-option
            v-for="item in SelectRecipeStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="产地">
        <el-select
          v-model="SelectSite"
          size="mini"
          style="width: 150px"
          clearable
          placeholder="请选择"
          @change="SelectSiteChange"
        >
          <el-option
            v-for="item in SelectSiteOptions"
            :key="item.id"
            :label="item.global_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="段次">
        <el-select
          v-model="SelectStage"
          size="mini"
          style="width: 150px"
          clearable
          placeholder="请选择"
          @change="SelectStageChange"
        >
          <el-option
            v-for="item in SelectStageOptions"
            :key="item.id"
            :label="item.global_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="胶料编码">
        <el-input
          v-model="input_rubber_no"
          size="mini"
          style="width: 200px"
          @input="input_rubber_noChanged"
        />
      </el-form-item>
      <br>
      <el-form-item style="float: right">
        <el-button :disabled="currentRow.product_name === null" @click="CopyRecipeButton">复制新增</el-button>
      </el-form-item>
      <!-- <el-form-item style="float: right">
        <el-button>删除</el-button>
      </el-form-item> -->
      <el-form-item style="float: right">
        <el-button @click="AddRecipeButton">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      highlight-current-row
      :data="tableData"
      border
      style="width: 100%"
      @row-click="handleCurrentChange"
    >

      <el-table-column align="center" type="index" width="50" label="No" />

      <el-table-column align="center" width="160%" prop="stage_product_batch_no" label="胶料配方编号">
        <template slot-scope="scope">
          <el-link type="primary" @click="recipe_display_change(scope.row)">
            {{ scope.row.stage_product_batch_no }}
          </el-link>
        </template>

      </el-table-column>
      <el-table-column align="center" prop="stage_product_batch_no" label="胶料编码" />
      <el-table-column align="center" prop="product_name" label="胶料名称" />
      <el-table-column align="center" width="100%" prop="equip_no" label="机台编号" />
      <el-table-column v-if="false" align="center" width="100%" prop="equip" label="机台id" />
      <el-table-column v-if="false" align="center" width="100%" prop="equip_name" label="机台名称" />
      <el-table-column align="center" width="100%" prop="dev_type_name" label="炼胶机类型" />
      <el-table-column align="center" prop="used_type" label="状态" :formatter="usedTypeFormatter" />
      <el-table-column align="center" label="审核">
        <template slot-scope="scope">
          <el-button-group>
            <el-button v-if="scope.row.used_type === 1" size="mini" @click="status_true(scope.row)">
              提交
            </el-button>
            <el-button v-if="scope.row.used_type === 2" size="mini" @click="status_true(scope.row)">
              校对
            </el-button>
            <el-button v-if="scope.row.used_type === 3" size="mini" @click="status_true(scope.row)">
              启用
            </el-button>
            <el-button v-if="scope.row.used_type === 2 | scope.row.used_type === 3" size="mini" @click="status_false(scope.row)">
              驳回
            </el-button>
            <el-button v-if="scope.row.used_type === 4" size="mini" @click="status_false(scope.row)">
              废弃
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="batching_weight" label="配料重量" />
      <el-table-column align="center" prop="production_time_interval" label="炼胶时间" />
      <el-table-column align="center" prop="site_name" label="site" />
      <el-table-column align="center" prop="stage_name" label="段次" />
      <el-table-column align="center" prop="sp_num" label="收皮(车/托)" />
      <el-table-column align="center" prop="created_username" label="创建者" />
      <el-table-column align="center" prop="created_date" label="创建时间" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" @click="ModifyRecipeButton(scope.row)">修改</el-button>
            <!-- <el-button size="mini" type="danger" @click="handleRecipeDelete(scope.row)">删除</el-button> -->
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="tableDataTotal"
      layout="total, prev, pager, next"
      @current-change="pagehandleCurrentChange"
    />

    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="30%"
      title="复制新增配方"
      :visible.sync="dialogCopyRecipeSync"
    >

      <el-form :inline="true">
        <el-form-item label="选择机台">
          <el-select
            v-model="CopySelectEquip"
            size="mini"
            clearable
            style="width: 300px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in SelectCopyEquipOptions"
              :key="item.id"
              :label="item.equip_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogCopyRecipeSync = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="CopyRecipeConfirm">确 定</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import { recipe_list, recipe_copy_list, equip_url, site_url, stage_url } from '@/api/recipe_fun'
import { constantRoutes } from '@/router'
import { dataTool } from 'echarts/lib/echarts'

export default {
  data: function() {
    return {
      SelectEquipOptions: [],
      SelectCopyEquipOptions: [],
      SelectRecipeStatusOptions: [{
        value: 1, label: '编辑'
      }, {
        value: 2, label: '提交'
      }, {
        value: 3, label: '校对'
      }, {
        value: 4, label: '启用'
      }, {
        value: 5, label: '驳回'
      }, {
        value: 6, label: '废弃'
      }],
      SelectSiteOptions: [],
      SelectStageOptions: [],
      SelectEquip: null,
      CopySelectEquip: null,
      SelectRecipeStatus: null,
      SelectSite: null,
      SelectStage: null,
      input_rubber_no: null,
      tableData: [],
      currentRow: {
        product_name: null
      },
      currentPage: 1,
      pageSize: 10,
      tableDataTotal: 0,

      dialogCopyRecipeSync: false
    }
  },
  created() {
    this.get_recipe_list()
    this.equip_list()
    this.site_list()
    this.stage_list()
  },
  methods: {
    async get_recipe_list(val = 1) {
      try {
        var v_SelectEquip = this.SelectEquip ? this.SelectEquip : ''
        var v_SelectRecipeStatus = this.SelectRecipeStatus ? this.SelectRecipeStatus : ''
        var v_SelectSite = this.SelectSite ? this.SelectSite : ''
        var v_SelectStage = this.SelectStage ? this.SelectStage : ''
        var v_input_rubber_no = this.input_rubber_no ? this.input_rubber_no : ''
        const recipe_listData = await recipe_list('get', null, {
          params: {
            page: val,
            equip_id: v_SelectEquip,
            used_type: v_SelectRecipeStatus,
            factory_id: v_SelectSite,
            stage_id: v_SelectStage,
            stage_product_batch_no: v_input_rubber_no
          }
        })
        this.tableData = recipe_listData.results
        this.tableDataTotal = recipe_listData.count
      } catch (e) {}
    },
    async status_recipe_fun(id, obj) {
      try {
        await recipe_list('patch', id, obj)
      } catch (e) {}
    },
    async delete_recipe_fun(id) {
      try {
        await recipe_list('delete', id, {
          params: { }
        })
      } catch (e) {}
    },
    async copy_recipe_list(obj) {
      try {
        const copy_recipe_listData = await recipe_copy_list('post', null, obj)
        return copy_recipe_listData
      } catch (e) {}
    },
    async equip_list() {
      try {
        const equip_list = await equip_url('get', {
          params: { }
        })
        this.SelectEquipOptions = equip_list.results
      } catch (e) {}
    },
    async equip_copy_list(dev_type_param) {
      try {
        const equip_list = await equip_url('get', {
          params: { dev_type: dev_type_param }
        })
        this.SelectCopyEquipOptions = equip_list.results
      } catch (e) {}
    },
    async site_list() {
      try {
        const site_list = await site_url('get', {
          params: { }
        })
        this.SelectSiteOptions = site_list.results
      } catch (e) {}
    },
    async stage_list() {
      try {
        const stage_list = await stage_url('get', {
          params: { }
        })
        this.SelectStageOptions = stage_list.results
      } catch (e) {}
    },

    handleCurrentChange: function(val) {
      this.currentRow = val
    },
    pagehandleCurrentChange: function(val) {
      this.currentRow = val
      this.get_recipe_list(val)
    },

    usedTypeFormatter: function(row, column) {
      return this.usedTypeChoice(row.used_type)
    },
    usedTypeChoice: function(usedType) {
      switch (usedType) {
        case 1:
          return '编辑'
        case 2:
          return '提交'
        case 3:
          return '校对'
        case 4:
          return '启用'
        case 5:
          return '驳回'
        case 6:
          return '废弃'
      }
    },
    status_true: async function(check_row) {
      await this.status_recipe_fun(check_row['id'], { data: { pass_flag: true }})
      this.$message('状态切换成功')
      this.get_recipe_list(this.currentPage)
    },
    status_false: async function(check_row) {
      await this.status_recipe_fun(check_row['id'], { data: { pass_flag: false }})
      this.$message('状态切换成功')
      this.get_recipe_list(this.currentPage)
    },
    SelectEquipChange: function() {
      this.get_recipe_list()
    },
    SelectRecipeStatusChange: function() {
      this.get_recipe_list()
    },
    SelectSiteChange: function() {
      this.get_recipe_list()
    },
    SelectStageChange: function() {
      this.get_recipe_list()
    },
    input_rubber_noChanged: function() {
      this.get_recipe_list()
    },

    recipe_display_change: function(raw) {
      this.$router.push({ name: 'RecipeDisplay', params: raw })
      this.$route.params
    },
    AddRecipeButton: function() {
      this.$router.push({ name: 'RecipeCreate', params: {}})
      this.$route.params
    },
    ModifyRecipeButton: function(modify_row) {
      console.log(modify_row)
      this.$router.push({ name: 'RecipeModify', params: modify_row })
      this.$route.params
    },
    handleRecipeDelete: function(delete_row) {
      console.log('--------------------------')
      console.log(delete_row)
      this.$confirm('此操作将永久删除' + delete_row['stage_product_batch_no'] + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete_recipe_fun(delete_row['id'])
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.get_recipe_list(this.currentPage)
      }).catch(() => {

      })
    },
    CopyRecipeButton: async function() {
      this.dialogCopyRecipeSync = true
      await this.equip_copy_list(this.currentRow['dev_type'])
    },
    CopyRecipeConfirm: async function() {
      if (this.CopySelectEquip == null) {
        this.$message({
          message: '机台不能为空',
          type: 'error'
        })
        return
      }
      if (this.CopySelectEquip === this.currentRow['equip']) {
        this.$message({
          message: '该机台配方已存在',
          type: 'error'
        })
        return
      }
      await this.copy_recipe_list(
        { data: {
          'product_batching': this.currentRow['id'],
          'equip': this.CopySelectEquip
        }}
      )
      this.dialogCopyRecipeSync = false
      this.get_recipe_list()
      // console.log('----------------------------------------')
      // console.log(this.currentRow)
      // var add_currentRow = Object.assign(this.currentRow, { copy_equip_id: this.CopySelectEquip })
      // console.log(add_currentRow)
      // this.$router.push({ name: 'RecipeCopy', params: add_currentRow })
      // this.$route.params
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

