import axios from "axios";

export default class LanguageService{

    add(values){
        return axios.post("http://localhost:8080/api/languages/add",values)
    }

    delete(values){
        return axios.post("http://localhost:8080/api/languages/delete",values)
    }

    update(values){
        return axios.post("http://localhost:8080/api/languages/update",values)
    }

    getAll(candidateId){
        return axios.get(`http://localhost:8080/api/languages/getAllByCandidateId?candidateId=${candidateId}`)
    }

    getById(id) {
        return axios.get(`http://localhost:8080/api/languages/getById?id=${id}`)
    }

}