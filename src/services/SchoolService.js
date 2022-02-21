import axios from "axios";

export default class SchoolService{

    add(value){
        return axios.post("http://localhost:8080/api/schools/add",value)
    }
    delete(value){
        return axios.post("http://localhost:8080/api/schools/delete",value)
    }
    update(value){
        return axios.post("http://localhost:8080/api/schools/update",value)
    }

    getById(schoolId){
        return axios.get(`http://localhost:8080/api/schools/getById?schoolId=${schoolId}`)
    }

    getByCandidateId(candidateId){
        return axios.get(`http://localhost:8080/api/schools/getByCandidateId?candidateId=${candidateId}`)
    }

    getByCandidateIdSorted(candidateId){
        return axios.get(`http://localhost:8080/api/schools/getByCandidateIdSorted?candidateId=${candidateId}`)
    }

}