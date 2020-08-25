import request from '@/utils/request'
import API from '@/api/url'

export function reportBatch(method, data) {
    let obj = {
        url: API.ReportBatchUrl,
        method: method
    }
    Object.assign(obj, data)
    return request(obj)
}
export function rubberMaterial(method, data) {
    let obj = {
        url: API.RubberMaterialUrl,
        method: method
    }
    Object.assign(obj, data)
    return request(obj)
}
export function equip(method, data) {
    let obj = {
        url: API.EquipUrl,
        method: method
    }
    Object.assign(obj, data)
    return request(obj)
}
export function classesList(method, data) {
    let obj = {
        url: API.ClassesListUrl,
        method: method
    }
    Object.assign(obj, data)
    return request(obj)
}
export function palletFeedBacks(method, data) {
    let obj = {
        url: API.PalletFeedBacksUrl,
        method: method
    }
    Object.assign(obj, data)
    return request(obj)
}
export function trainsFeedbacks(method, data) {
    let obj = {
        url: API.TrainsFeedbacksUrl,
        method: method
    }
    Object.assign(obj, data)
    return request(obj)
}

export function echartsListUrl(method, data) {
    let obj = {
        url: API.EchartsListUrl,
        method: method
    }
    Object.assign(obj, data)
    return request(obj)
}

export function operatorList(method, data) {
    let obj = {
        url: API.PersonnelsUrl,
        method: method
    }
    Object.assign(obj, data)
    return request(obj)
}
export function weighInformation(method, data) {
    let obj = {
        url: API.WeighInformationUrl + data.params.id + '/',
        method: method
    }
    Object.assign(obj, data)
    return request(obj)
}
export function mixerInformation(method, data) {
    let obj = {
        url: API.MixerInformationUrl + data.params.id + '/',
        method: method
    }
    Object.assign(obj, data)
    return request(obj)
}
export function curveInformation(method, data) {
    let obj = {
        url: API.CurveInformationUrl + data.params.id + '/',
        method: method
    }
    Object.assign(obj, data)
    return request(obj)
}