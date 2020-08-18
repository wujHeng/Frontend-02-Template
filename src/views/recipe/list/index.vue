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
        <el-form-item label="状态">
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
        <el-form-item label="产地">
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

        <el-form-item  label="胶料编码">
            <el-input size="mini" style="width: 200px" v-model="stage_product_batch_no" v-on:input="stage_product_batch_noChanged"></el-input>
        </el-form-item>

        <el-form-item style="float: right">
            <el-button  @click="showAddRubberMaterialDialog">查询</el-button>
        </el-form-item>
        <el-form-item style="float: right">
            <el-button  @click="showAddRubberMaterialDialog">新增</el-button>
        </el-form-item>
        <el-form-item style="float: right">
            <el-button  @click="showAddRubberMaterialDialog">修改</el-button>
        </el-form-item>
        <el-form-item style="float: right">
            <el-button  @click="showAddRubberMaterialDialog">删除</el-button>
        </el-form-item>
        <el-form-item style="float: right">
            <el-button  @click="showAddRubberMaterialDialog">复制新增</el-button>
        </el-form-item>


    </el-form>

    <el-table
            highlight-current-row
            @current-change="handleCurrentChange"
            :data="tableData"
            border
            style="width: 100%">
        <el-table-column
                prop="stage_product_batch_no"
                label="胶料编号">
        </el-table-column>
        <el-table-column
                prop="product_name"
                label="配方名称">
        </el-table-column>
        <el-table-column
                prop="dev_type_name"
                label="机台">
        </el-table-column>
        <el-table-column
                prop="dev_type_name"
                label="炼胶机类型">
        </el-table-column>

        <el-table-column
                prop="batching_weight"
                label="状态">
        </el-table-column>
        <el-table-column
                prop="production_time_interval"
                label="配料重量">
        </el-table-column>
        <el-table-column
                prop="production_time_interval"
                label="炼胶时间">
        </el-table-column>
        <el-table-column
                prop="rm_time_interval"
                label="反炼与否">
        </el-table-column>
        <el-table-column
                prop="rm_time_interval"
                label="反炼时间">
        </el-table-column>
        <el-table-column
                prop="rm_time_interval"
                label="创建人员">
        </el-table-column>
        <el-table-column
                prop="created_date"
                label="创建时间">
        </el-table-column>
        <el-table-column
                prop="update_user_name"
                label="更新人员">
        </el-table-column>
        <el-table-column
                prop="last_updated_date"
                label="更新时间">
        </el-table-column>
        <el-table-column
                prop="last_updated_date"
                label="配方来源">
        </el-table-column>

    </el-table>

  </div>
  
</template>
