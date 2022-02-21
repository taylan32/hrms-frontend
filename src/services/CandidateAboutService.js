import axios from "axios"

export default class CandidateAboutService {

    add(value) {
        return axios.post("http://localhost:8080/api/candidateabouts/add", value)
    }

    delete(value) {
        return axios.post("http://localhost:8080/api/candidateabouts/delete", value)
    }

    update(value) {
        return axios.post("http://localhost:8080/api/candidateabouts/update", value)
    }

    getOne(candidateId) {
        return axios.get(`http://localhost:8080/api/candidateabouts/getOne?candidateId=${candidateId}`)
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/candidateabouts/getById?id=${id}`)
    }
}
