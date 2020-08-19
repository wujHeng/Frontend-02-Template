<template>
  <div>
    <br>
    <el-form :inline="true">
        <el-form-item label="机台">
            <el-select
                    size="mini"
                    style="width: 150px"
                    clearable
                    @change="RubberStateChange"
                    v-model="RubberState" placeholder="请选择">
                <el-option
                        v-for="item in RubberStateOptions"
                        :key="item.id"
                        :label="item.global_name"
                        :value="item.id">
                </el-option>
            </el-select>
            
        </el-form-item>
        <el-form-item label="产地">
            <el-select
                    size="mini"
                    style="width: 150px"
                    clearable
                    @change="RubberSiteChange"
                    v-model="RubberSite" placeholder="请选择">
                <el-option
                        v-for="item in RubberSiteOptions"
                        :key="item.id"
                        :label="item.global_name"
                        :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="胶料编号">
            <el-select
                    size="mini"
                    style="width: 150px"
                    clearable
                    @change="RubberStageChange"
                    v-model="RubberStage" placeholder="请选择">
                <el-option
                        v-for="item in RubberStageOptions"
                        :key="item.id"
                        :label="item.global_name"
                        :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="段次">
            <el-select
                    size="mini"
                    style="width: 150px"
                    clearable
                    @change="RubberStageChange"
                    v-model="RubberStage" placeholder="请选择">
                <el-option
                        v-for="item in RubberStageOptions"
                        :key="item.id"
                        :label="item.global_name"
                        :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="密炼机类型">
            <el-select
                    size="mini"
                    style="width: 150px"
                    clearable
                    @change="RubberStageChange"
                    v-model="RubberStage" placeholder="请选择">
                <el-option
                        v-for="item in RubberStageOptions"
                        :key="item.id"
                        :label="item.global_name"
                        :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item style="float: right">
            <el-button  @click="showAddRubberMaterialDialog">生成</el-button>
        </el-form-item>

    </el-form>
    <el-form>
    <br>
    机台: <el-input size="mini" v-model="xx" :disabled="true" style="width: 20%" ></el-input>
    配方编号: <el-input size="mini" v-model="xx" :disabled="true" style="width: 20%" ></el-input>
    配方名称: <el-input size="mini" v-model="xx" :disabled="true" style="width: 20%" ></el-input>
    <el-form-item style="float: right">
        <el-button  @click="xx">保存退出</el-button>
    </el-form-item>
    </el-form>
    <br>
    超温最短时间: <el-input size="mini" v-model="xx"  style="width: 70px" ></el-input>
    进胶最低温度: <el-input size="mini" v-model="xx"  style="width: 70px" ></el-input>
    超温温度: <el-input size="mini" v-model="xx"  style="width: 70px" ></el-input>
    胶料总误差: <el-input size="mini" v-model="xx"  style="width: 70px" ></el-input>
    转子水温: <el-input size="mini" v-model="xx"  style="width: 70px" ></el-input>
    卸料门水温: <el-input size="mini" v-model="xx"  style="width: 70px" ></el-input>
    侧壁水温: <el-input size="mini" v-model="xx"  style="width: 70px" ></el-input>
    <br>
    炼胶超时时间: <el-input size="mini" v-model="xx"  style="width: 70px" ></el-input>
    进胶最高温度: <el-input size="mini" v-model="xx"  style="width: 70px" ></el-input>
    回收时间:<el-input size="mini" v-model="xx"  style="width: 70px" ></el-input>
    是否回收: 
    <label class="radio-inline"><input type="radio" name="is_cycle" value="1" checked><font size="2">是</font></label>
    <label class="radio-inline"><input type="radio" name="is_cycle" disabled value="0"><font size="2">否</font></label>
    <el-radio v-model="radio" label="1">三区水温启动</el-radio>
    <el-radio v-model="radio" label="2">三区水温停用</el-radio>
    <el-checkbox v-model="checked">配方停用</el-checkbox>

    <br><br>
    <el-row :gutter="20">
      <el-col :span="10"><div class="grid-content bg-purple">
    
      胶料称量
      <el-table
              highlight-current-row
              @current-change="handleCurrentChange"
              :data="tableData"
              border
              style="width: 100%">
          <el-table-column
                  prop="stage_product_batch_no"
                  label="序号">
          </el-table-column>
          <el-table-column
                  prop="product_name"
                  label="胶料名称">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="设定值(kg)">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="误差值(kg)">
          </el-table-column>
      </el-table>

      炭黑称量
      <el-table
              highlight-current-row
              @current-change="handleCurrentChange"
              :data="tableData"
              border
              style="width: 100%">
          <el-table-column
                  prop="stage_product_batch_no"
                  label="序号">
          </el-table-column>
          <el-table-column
                  prop="product_name"
                  label="动作">
          </el-table-column>
          <el-table-column
                  prop="product_name"
                  label="炭黑名称">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="设定值(kg)">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="误差值(kg)">
          </el-table-column>
      </el-table>


      油料称量
      <el-table
              highlight-current-row
              @current-change="handleCurrentChange"
              :data="tableData"
              border
              style="width: 100%">
          <el-table-column
                  prop="stage_product_batch_no"
                  label="序号">
          </el-table-column>
          <el-table-column
                  prop="product_name"
                  label="动作">
          </el-table-column>
          <el-table-column
                  prop="product_name"
                  label="油脂名称">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="设定值(kg)">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="误差值(kg)">
          </el-table-column>
      </el-table>





      </div></el-col>








      <el-col :span="14"><div class="grid-content bg-purple">
        密炼规程
        <el-table
              highlight-current-row
              @current-change="handleCurrentChange"
              :data="tableData"
              border
              style="width: 100%">
          <el-table-column
                  prop="stage_product_batch_no"
                  label="序号">
          </el-table-column>
          <el-table-column
                  prop="product_name"
                  label="条件">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="时间">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="温度">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="能量">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="功率">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="动作">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="压力">
          </el-table-column>
          <el-table-column
                  prop="dev_type_name"
                  label="转速">
          </el-table-column>


      </el-table>
      </div></el-col>
    </el-row>

  </div>
</template>
