import axios from "axios";

export default class StaffService {

    add(values) {
        return axios.post("http://localhost:8080/api/staffs/add", values)
    }

    delete(values) {
        return axios.post("http://localhost:8080/api/staffs/delete", values)
    }

    update(values) {
        return axios.post("http://localhost:8080/api/staffs/update", values)
    }

    getAll() {
        return axios.get("http://localhost:8080/api/staffs/getAll")
    }

    getById(id) {
        return axios.get(`http://localhost:8080/api/staffs/getById?id=${id}`)
    }

    confirmAdvertisement(advertisementId) {
        return axios.get(`http://localhost:8080/api/staffs/confirmAdvertisement?advertisementId=${advertisementId}`)
    }
    confirmEmployer(id) {
        return axios.get(`http://localhost:8080/api/staffs/confirmEmployer?employerId=${id}`)
    }

    getByEmail(email) {
        return axios.get(`http://localhost:8080/api/staffs/getByEmail?email=${email}`)
    }

}