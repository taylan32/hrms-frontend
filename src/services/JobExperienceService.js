import axios from "axios";

export default class JobExperienceService {

    add(values) {
        return axios.post("http://localhost:8080/api/jobexperiments/add",values)
    }

    delete(values) {
        return axios.post("http://localhost:8080/api/jobexperiments/delete",values)
    }

    update(values) {
        return axios.post("http://localhost:8080/api/jobexperiments/update",values)
    }

    getAll(candidateId){
        return axios.get(`http://localhost:8080/api/jobexperiments/getAll?candidateId=${candidateId}`)
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/jobexperiments/getById?id=${id}`)
    }
}