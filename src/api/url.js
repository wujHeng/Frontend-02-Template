export default {
  LoginUrl: '/api/v1/system/login/',

  GlobalTypesUrl: '/api/v1/basics/global-types/', // 公共代码类别
  GlobalCodesUrl: '/api/v1/basics/global-codes/', // 公共代码
  // 日料罐、称量参数接口
  WeighCbUrl: '/api/v1/production/weigh-cb/', // 炭黑罐、炭黑称量参数
  WeighOilUrl: '/api/v1/production/weigh-oil/', // 油料罐、油料称量参数
  EquipUrl: '/api/v1/basics/equips/', // 机台
  MaterialsUrl: '/api/v1/recipe/materials/', // 原材料

  // 胶料配料标准管理接口
  RubberMaterialUrl: '/api/v1/recipe/product-batching/',
  // 胶料配料标准复制接口
  RubberMaterialCopyUrl: '/api/v1/recipe/product-batching-copy/',
  // 胶料配料步序接口
  RubberProcessStepUrl: '/api/v1/recipe/process-steps/',
  // 设备/机台接口
  EquipAllUrl: '/api/v1/basics/equips/?all=1',
  // 复制配方时：设备/机台接口
  EquipCopyAllUrl: '/api/v1/recipe/batching-equips/?all=1',
  // 产地接口
  SiteUrl: '/api/v1/basics/global-codes/?all=1&class_name=产地',
  // 胶料编号接口
  RecipeNoUrl: '/api/v1/recipe/product-infos/?all=1',
  // 段次接口
  StageUrl: '/api/v1/basics/global-codes/?all=1&class_name=胶料段次',
  // 密炼机类型接口
  DevTypeUrl: '/api/v1/basics/global-codes/?all=1&class_name=炼胶机类型',
  // SITE接口
  GlobalSITEUrl: '/api/v1/basics/global-codes/?all=1&class_name=SITE',
  // 状态接口
  ConditionUrl: '/api/v1/recipe/conditions/?all=1',
  // 动作接口
  ActionUrl: '/api/v1/recipe/actions/?all=1',
  // 原材料类别接口
  MaterialTypelUrl: '/api/v1/basics/global-codes/?all=1&class_name=原材料类别',

  // 用户列表?all=1
  PersonnelsUrl: '/api/v1/system/personnels/',
  // 报表-批次记录
  ClassesListUrl: '/api/v1/basics/classes/',
  ReportBatchUrl: '/api/v1/production/production-record/',
  EchartsListUrl: '/api/v1/production/equip-status/',
  // 批次-胶料编码列表
  ProductionPalletFeedBacksUrl: '/api/v1/production/pallet-feedbacks/',
  // 批次-Bat查询
  ProductionTrainsFeedbacksUrl: '/api/v1/production/trains-feedbacks/',
  // 报表-车次记录-称量信息{id}
  WeighInformationUrl: '/api/v1/production/weigh-information-list/',
  // 报表-车次记录-密炼信息{id}
  MixerInformationUrl: '/api/v1/production/mixer-information-list/',
  // 报表-车次记录-曲线图{id}
  CurveInformationUrl: '/api/v1/production/curve-information-list/',
  // 报表-车次列表
  TrainsFeedbacksUrl: '/api/v1/production/trains-feedbacks-apiview/',

  // 首页
  EquipStatusSlanListUrl: '/api/v1/production/equip-status-plan-list/',
  EquipDetailedListUrl: '/api/v1/production/equip-detailed-list/',
  MaterialStatisticsUrl: '/api/v1/production/material-statistics/',

  // 计划
  PalletFeedBackUrl: '/api/v1/plan/pallet-feed-backs/', // 计划首页展示
  IssuedPlanUrl: '/api/v1/plan/issued-plan/', // 下达
  StopPlanUrl: '/api/v1/plan/stop-plan/', // 停止
  RetransmissionpPlanUrl: '/api/v1/plan/retransmission-plan/', // 重传
  UpRegulationUrl: '/api/v1/plan/up-regulation/', // 上调
  DownRegulationUrl: '/api/v1/plan/down-regulation/', // 下调
  UpdateTrainsUrl: '/api/v1/plan/update-trains/', // 修改车次
  ProductDayPlanManyCreateUrl: '/api/v1/plan/product-day-plan-manycreate/', // 新增
  ProductbatchingUrl: '/api/v1/recipe/product-batching/', // 配方
  // 新增计划

  PlanScheduleUrl: '/api/v1/basics/plan-schedule/',

  WorkSchedulesUrl: '/api/v1/basics/work_schedules/',

  ChildSystemsUrl: '/api/v1/system/child-systems/',

  GroupUrl: '/api/v1/system/group_extension/',

  PermissionUrl: '/api/v1/system/permission/',
  // 当前运行中的计划
  PlanStatusListUrl: '/api/v1/plan/plan-status-list/',

  SynchronizationUrl: '/api/v1/system/synchronization/',

  SynchronizationMesUrl: 'http://10.4.14.4:8000/api/v1/system/synchronization/'
}
