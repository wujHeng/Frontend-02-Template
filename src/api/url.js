export default {
  LoginUrl: '/api/v1/system/login/',
  // UserInfoUrl: '/api/v1/system/user-permissions/',
  globalTypesUrl: '/api/v1/basics/global-types/',
  globalCodesUrl: '/api/v1/basics/global-codes/',
  weighCbUrl: '/api/v1/production/weigh-cb/',
  weighOilUrl: '/api/v1/production/weigh-oil/',
  weighUrl: '/api/v1/production/weigh-cb/',
  materialsUrl: '/api/v1/recipe/materials/',

  loginUrl: '/api/v1/docs/login',
  GlobalTypesUrl: '/api/v1/basics/global-types/', // 公共代码类别
  GlobalCodesUrl: '/api/v1/basics/global-codes/', // 公共代码
  WeighCbUrl: '/api/v1/production/weigh-cb/', // 炭黑罐、炭黑称量参数
  WeighOilUrl: '/api/v1/production/weigh-oil/', // 油料罐、油料称量参数
  WeighUrl: '/api/v1/production/weigh-cb/', // 炭黑罐、炭黑称量参数
  EquipUrl: '/api/v1/basics/equips/', // 机台
  MaterialsUrl: '/api/v1/recipe/materials/', // 原材料

  // 胶料配料标准管理接口
  RubberMaterialUrl: '/api/v1/recipe/product-batching/',
  // 胶料配料步序接口
  RubberProcessStepUrl: '/api/v1/recipe/process-steps/',
  // 设备/机台接口
  EquipUrl: '/api/v1/basics/equips/?all=1',
  // 产地接口
  SiteUrl: '/api/v1/basics/global-codes/?class_name=产地',
  // 胶料编号接口
  RecipeNoUrl: '/api/v1/recipe/product-infos/?all=1',
  // 段次接口
  StageUrl: '/api/v1/basics/global-codes/?class_name=胶料段次',
  // 密炼机类型接口
  DevTypeUrl:'/api/v1/basics/global-codes/?class_name=炼胶机类型',
  // SITE接口
  GlobalSITEUrl:'/api/v1/basics/global-codes/?class_name=SITE',
  // 状态接口
  ConditionUrl:'/api/v1/recipe/conditions/',
  // 动作接口
  ActionUrl:'/api/v1/recipe/actions/',
  // 原材料类别接口
  MaterialTypelUrl: '/api/v1/basics/global-codes/?class_name=原材料类别',

  // 报表-批次记录
  ClassesListUrl: '/api/v1/basics/classes/',
  ReportBatchUrl: '/api/v1/production/production-record/',
  EchartsListUrl: '/api/v1/production/equip-status/',
  // 报表-车次记录-操作人列表
  PersonnelsUrl: '/api/v1/system/personnels/',
  // 报表-车次记录-称量信息{id}
  WeighInformationUrl: '/api/v1/production/weigh-information-list/',
  // 报表-车次记录-密炼信息{id}
  MixerInformationUrl: '/api/v1/production/mixer-information-list/',
  // 报表-车次记录-曲线图{id}
  CurveInformationUrl: '/api/v1/production/curve-information-list/',

  // 密炼实绩
  PalletFeedBacksUrl: '/api/v1/production/pallet-feedbacks/',
  TrainsFeedbacksUrl: '/api/v1/production/trains-feedbacks/',

  // 首页
  EquipStatusSlanListUrl: '/api/v1/production/equip-status-plan-list/',
  EquipDetailedListUrl: '/api/v1/production/equip-detailed-list/',
  EquipDetailedList: '/api/v1/production/equip-detailed-list/',

  MaterialStatisticsUrl: '/api/v1/production/material-statistics/'
}
