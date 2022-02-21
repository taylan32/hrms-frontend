import axios from "axios";

export default class EmployerUpdateService {

    add(values) {
        return axios.post("http://localhost:8080/api/employerupdates/add",values)
    }

    update(values) {
        return axios.post("http://localhost:8080/api/employerupdates/update",values)
    }

    delete(values) {
        return axios.post("http://localhost:8080/api/employerupdates/delete",values)
    }

    getAll() {
        return axios.get("http://localhost:8080/api/employerupdates/getAll")
    }

    getById(id) {
        return axios.get(`http://localhost:8080/api/employerupdates/getById?id=${id}`)
        
    }

    getByEmployerId(employerId) {
        return axios.get(`http://localhost:8080/api/employerupdates/getByEmployerId?employerId=${employerId}`)
    }
    
}