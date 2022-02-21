import axios from "axios";

export default class EmployerService {

    add(value) {
        return axios.post("http://localhost:8080/api/employers/add", value)
    }
    update(value) {
        return axios.post("http://localhost:8080/api/employers/update", value)
    }
    delete(value) {
        return axios.post("http://localhost:8080/api/employers/delete", value)
    }

    getAll() {
        return axios.get("http://localhost:8080/api/employers/getAll")
    }
    getById(employerId) {
        return axios.get(`http://localhost:8080/api/employers/getById?id=${employerId}`)
    }
    getAllActive() {
        return axios.get("http://localhost:8080/api/employers/getAllActive")
    }
    getAllPassive() {
        return axios.get("http://localhost:8080/api/employers/getAllPassive")
    }

    getByCompanyName(companyName) {
        return axios.get(`http://localhost:8080/api/employers/getByCompanyName?companyName=${companyName}`)
    }
    getByCompanyNameContains(companyName) {
        return axios.get(`http://localhost:8080/api/employers/getByCompanyNameContains?companyName=${companyName}`)
    }

    getByPhoneNumber(phoneNumber) {
        return axios.get(`http://localhost:8080/api/employers/getByPhoneNumber?phoneNumber=${phoneNumber}`)
    }

    getByEmail(email) {
        return axios.get(`http://localhost:8080/api/employers/getByEmail?email=${email}`)
    }

}