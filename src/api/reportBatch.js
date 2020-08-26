import request from '@/utils/request'
import API from '@/api/url'

export function reportBatch(method, data) {
  const obj = {
    url: API.ReportBatchUrl,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}

export function rubberList(method, data) {
  const obj = {
    url: API.RubberListUrl,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function rubberMaterial(method, data) {
  const obj = {
    url: API.RubberMaterialUrl,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function equip(method, data) {
  const obj = {
    url: API.EquipUrl,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function classesList(method, data) {
  const obj = {
    url: API.ClassesListUrl,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function palletFeedBacks(method, data) {
  const obj = {
    url: API.ProductionPalletFeedBacksUrl,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function productionTrainsFeedbacks(method, data) {
  const obj = {
    url: API.ProductionTrainsFeedbacksUrl,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function trainsFeedbacks(method, data) {
  const obj = {
    url: API.TrainsFeedbacksUrl,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}

export function echartsListUrl(method, data) {
  const obj = {
    url: API.EchartsListUrl,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}

export function operatorList(method, data) {
  const obj = {
    url: API.PersonnelsUrl,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function weighInformation(method, data) {
  const obj = {
    url: API.WeighInformationUrl + data.params.id + '/',
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function mixerInformation(method, data) {
  const obj = {
    url: API.MixerInformationUrl + data.params.id + '/',
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function curveInformation(method, data) {
  const obj = {
    url: API.CurveInformationUrl + data.params.id + '/',
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
