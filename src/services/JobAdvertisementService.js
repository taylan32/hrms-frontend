import axios from "axios";

export default class JobAdvertisementService {


    add(values) {
        return axios.post("http://localhost:8080/api/jobadvertisements/add", values)
    }

    update(values) {
        return axios.post("http://localhost:8080/api/jobadvertisements/update", values)
    }

    delete(values) {
        return axios.post("http://localhost:8080/api/jobadvertisements/delete", values)
    }

    getById(jobAdvertisementId){
        return axios.get(`http://localhost:8080/api/jobadvertisements/getById?jobAdvertisementId=${jobAdvertisementId}`)
    }
    getByEmployerId(employerId) {
        return axios.get(`http://localhost:8080/api/jobadvertisements/getByEmoloyerId?employerId=${employerId}`)
    }

    getByCityId(cityId) {
        return axios.get(`http://localhost:8080/api/jobadvertisements/getByCityId?cityId=${cityId}`)
    }

    getByJobTitleId(jobTitleId) {
        return axios.get(`http://localhost:8080/api/jobadvertisements/getByJobTitleId?jobTitleId=${jobTitleId}`)
    }

    getAllActiveAdvertisements() {
        return axios.get("http://localhost:8080/api/jobadvertisements/getAllActiveAdvertisement")
    }

    getAllWaitingForConfirmation() {
        return axios.get("http://localhost:8080/api/jobadvertisements/getAllWaitingForConfirmation")
    }
    getAllWaitingForConfirmationByEmployerId(employerId){
        return axios.get(`http://localhost:8080/api/jobadvertisements/getAllWaitingForConfirmationByEmployerId?employerId=${employerId}`)
    }

    getAllActiveAdvertisementByEmployerId(employerId) {
        return axios.get(`http://localhost:8080/api/jobadvertisements/getAllActiveAdvertisementByEmployerId?employerId=${employerId}`)
    }

    getAllPassiveAdvertisementByEmployerId(employerId) {
        return axios.get(`http://localhost:8080/api/jobadvertisements/getAllPassiveAdvertisementByEmployerId?employerId=${employerId}`)
    }

    getAllActiveAdvertisementByCityId(cityId) {
        return axios.get(`http://localhost:8080/api/jobadvertisements/getAllActiveAdvertisementByCityId?cityId=${cityId}`)
    }

    getAllActiveAdvertisementByJobTitleId(jodTitleId) {
        return axios.get(`http://localhost:8080/api/jobadvertisements/getAllActiveAdvertisementByJobTitleId?jobTitleId=${jodTitleId}`)
    }

    getAllActiveAdvertisementSortedDESC() {
        return axios.get("http://localhost:8080/api/jobadvertisements/getAllActiveAdvertisementSortedDESC")
    }

    getAllActiveAdvertisementSortedASC() {
        return axios.get("http://localhost:8080/api/jobadvertisements/getAllActiveAdvertisementSortedASC")
    }

    setIsActiveFalse(advertisementId) {
        return axios.get(`http://localhost:8080/api/jobadvertisements/setIsActiveFalse?jobAdvertisementId=${advertisementId}`)
    }

    setIsActiveTrue(advertisementId) {
        return axios.get(`http://localhost:8080/api/jobadvertisements/setIsActiveTrue?jobAdvertisementId=${advertisementId}`)
    }

    getAllActivePageable(pageNo, pageSize) {
        return axios.get(`http://localhost:8080/api/jobadvertisements/getAllActivePageable?pageNo=${pageNo}&pageSize=${pageSize}`)
    }

    getAllActiveAdvertisementSortedDESCTop6() {
        return axios.get("http://localhost:8080/api/jobadvertisements/getAllActiveAdvertisementSortedDESCTop6")
    }

    getAllActiveAdvertisementByEmployerIdSortedDESC(employerId) {
        return axios.get(`http://localhost:8080/api/jobadvertisements/getAllActiveAdvertisementByEmployerIdSortedDESC?employerId=${employerId}`)
    }

    getAllActiveAdvertisementFilteredByCityAndJobTitleAndWorkingTimeAndWorkingType(
        cityId, jobTitleId, workingTimeId, workingTypeId) {
        return axios.get(`http://localhost:8080/api/jobadvertisements/getAllActiveAdvertisementFilteredByCityAndJobTitleAndWorkingTimeAndWorkingType?cityId=${cityId}&jobTitleId=${jobTitleId}&workingTimeId=${workingTimeId}&workingTypeId=${workingTypeId}`)
    }

    getAllActiveAdvertisementPageableFilteredByCityAndJobTitleAndWorkingTimeAndWorkingType(
        cityId, jobTitleId, workingTimeId, workingTypeId, pageNo, pageSize) {
        return axios.get(`http://localhost:8080/api/jobadvertisements/getAllActiveAdvertisementPageableFilteredByCityAndJobTitleAndWorkingTimeAndWorkingType?cityId=${cityId}&jobTitleId=${jobTitleId}&workingTimeId=${workingTimeId}&workingTypeId=${workingTypeId}&pageNo=${pageNo}&pageSize=${pageSize}`)
    }

}