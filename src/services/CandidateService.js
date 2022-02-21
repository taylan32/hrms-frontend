import axios from "axios";

export default class CandidateService{

    add(values) {
        return axios.post("http://localhost:8080/api/candidates/add",values)
    }
    delete(values) {
        return axios.post("http://localhost:8080/api/candidates/delete",values)
    }
    update(values) {
        return axios.post("http://localhost:8080/api/candidates/update",values)
    }
    
    getAll(){
        return axios.get("http://localhost:8080/api/candidates/getAll")
    }

    getById(candiateId){
        return axios.get(`http://localhost:8080/api/candidates/getById?candidateId=${candiateId}`)
    }

    getByEmail(email) {
        return axios.get(`http://localhost:8080/api/candidates/getByEmail?email=${email}`)
    }

}