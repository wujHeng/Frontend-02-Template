<template>
<div style="margin-top: 25px">
  <el-row>
  <el-form style="margin-left: 10px" :inline="true">
    <el-form-item style="float: right">
      <el-button type="info" @click="dialogVisibleFind = true">查询</el-button>
      <el-button type="info">新增</el-button>
      <el-button type="info">停止</el-button>
      <el-button type="info">删除</el-button>
      <el-button type="info">下达</el-button>
    </el-form-item>
  </el-form>
  </el-row>
  <el-row>
  <el-form style="margin-left: 10px" :inline="true">
    <el-form-item label="机台">
      <el-select
          clearable
          @change="equipChange"
          v-model="equip" placeholder="请选择">
        <el-option
          v-for="item in equipOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item style="float: right">
      <el-button type="info">上调</el-button>
      <el-button type="info">下调</el-button>
      <el-button type="info" @click="dialogVisibleAlterTrainNumber = true">修改车次</el-button>
      <el-button type="info" style="width: 120px">重传</el-button>
    </el-form-item>
  </el-form>
  </el-row>
  <div style="border-radius: 2px">
    <el-row>
      <el-form style="margin-left: 10px" :inline="true">
        <el-form-item label="机台">
          <el-input type="text" v-model="equip" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-form style="margin-left: 10px" :inline="true">
        <el-form-item label="开始">
          <el-input type="text" v-model="currentRow.start_name" style="float: left"></el-input>
        </el-form-item>
        <el-form-item label="配方">
          <span style="float: right; margin-left: 30px"></span>
          <el-input type="text" v-model="currentRow.recipe_name" style="float: right"></el-input>
        </el-form-item>
        <el-form-item label="设定车次">
          <el-input type="text" v-model="currentRow.setting" style="float: left"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input type="text" v-model="currentRow.state" style="float: left"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-form style="margin-left: 10px" :inline="true">
        <el-form-item label="结束">
          <el-input type="text" v-model="currentRow.end_time"></el-input>
        </el-form-item>
        <el-form-item label="当前计划">
          <el-input type="text" v-model="currentRow.plan_no"></el-input>
        </el-form-item>
        <el-form-item label="当前车次">
          <el-input type="text" v-model="currentRow.finish"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
  <el-table
    :data="tableData"
    border
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%">
    <el-table-column

      width="55">
    </el-table-column>
    <el-table-column
      prop="plan_no"
      label="计划编号">
    </el-table-column>
    <el-table-column
      prop="sno"
      label="序号">
    </el-table-column>
    <el-table-column
      prop="recipe_name"
      label="配方名称">
    </el-table-column>
    <el-table-column
      prop="start_name"
      label="开始时间">
    </el-table-column>
    <el-table-column
      prop="end_time"
      label="结束时间">
    </el-table-column>
    <el-table-column
      prop="equip"
      label="机台">
    </el-table-column>
    <el-table-column
      prop="calsses"
      label="班次">
    </el-table-column>
    <el-table-column
      prop="setting"
      label="设定">
    </el-table-column>
    <el-table-column
      prop="finish"
      label="完成">
    </el-table-column>
    <el-table-column
      prop="used_name"
      label="操作员">
    </el-table-column>
    <el-table-column
      prop="state"
      label="状态">
    </el-table-column>

  </el-table>
  <el-dialog
    title="查询计划"
    :visible.sync="dialogVisibleFind"
    width="30%">
    <el-form :inline="true">
      <el-row>
      <el-form-item label="开始时间: ">
        <el-date-picker
          v-model="startDateTime"
          type="datetime"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item label="结束时间: ">
        <el-date-picker
          v-model="endDateTime"
          type="datetime"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item label="班次: ">
        <el-select
          clearable
          v-model="calsses" placeholder="请选择">
          <el-option
            v-for="item in calssesOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item label="配方: ">
          <el-select
          clearable
          v-model="recipe" placeholder="请选择">
          <el-option
            v-for="item in recipeOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleFind = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisibleAlterTrainNumber = false">确 定</el-button>
      <!-- <el-button type="primary" @click="handleCreateEquipCate('EquipCateForm')">确 定</el-button> -->
    </div>
  </el-dialog>
  <el-dialog
    title="查询计划"
    :visible.sync="dialogVisibleAlterTrainNumber"
    width="30%">
    <el-form :inline="true">
      <el-row>
      <el-form-item label="计划编号: ">
        <el-input type="text" v-model="currentRow.plan_no" :disabled="true"></el-input>
      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item label="配方名称: ">
        <el-input type="text" v-model="currentRow.recipe_name" :disabled="true"></el-input>
      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item label="原设定车次: ">
        <el-input type="text" v-model="currentRow.setting" :disabled="true"></el-input>
      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item label="修改后车次: ">
        <el-input type="text" v-model="currentRow.finish"></el-input>
      </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleAlterTrainNumber = false">取 消</el-button>
      <el-button type="primary" @click="alterTrainNumberSubmit">确 定</el-button>
      <!-- <el-button type="primary" @click="handleCreateEquipCate('EquipCateForm')">确 定</el-button> -->
    </div>
  </el-dialog>
</div>

</template>

<script>
export default {

  data: function() {
    return {
      equip: '1#密炼机',
      equipOptionsUrl: '',
      equipOptions: ['1#密炼机','2#密炼机','3#密炼机',],
      start:'',
      tableData: [{
        plan_no: 1,
        sno: 1,
        recipe_name: '配方1',
        start_name: '2020/01/01 10:00',
        end_time: '2020/01/01 17:00',
        equip: '1#密炼机',
        calsses: '早班',
        setting: 40,
        finish: 40,
        used_name: '张三',
        state: '完成',
      },
      {
        plan_no: 1,
        sno: 1,
        recipe_name: '配方1',
        start_name: '2020/01/01 10:00',
        end_time: '2020/01/01 17:00',
        equip: '1#密炼机',
        calsses: '早班',
        setting: 40,
        finish: 40,
        used_name: '张三',
        state: '完成',
      },
      {
        plan_no: 1,
        sno: 1,
        recipe_name: '配方1',
        start_name: '2020/01/01 10:00',
        end_time: '2020/01/01 17:00',
        equip: '1#密炼机',
        calsses: '早班',
        setting: 40,
        finish: 20,
        used_name: '张三',
        state: '运行中',
      },],
      dialogVisibleFind: false,
      recipe: '',
      calsses: '',
      dialogVisibleAlterTrainNumber: false,
      AlterTrainNumberFrom: {
        plan_no: '',
        recipe_name: '',
        setting: ''
      },
      currentRow: {}
    }
  },
  methods: {
    // clickUpdateTrainnum() {
    //   this.dialogVisibleAlterTrainNumber = true;
    //   console.log(this.currentRow);
    // },
    alterTrainNumberSubmit(){
      
    },
    handleCurrentChange(val) {
        this.currentRow = val;
      }
  }
}
</script>

<style scoped>
    
</style>