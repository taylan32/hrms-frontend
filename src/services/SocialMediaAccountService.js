import axios from "axios";

export default class SocialMediaAccountService{

    add(values) {
        return axios.post("http://localhost:8080/api/socialmediaaccounts/add",values)
    }

    delete(values) {
        return axios.post("http://localhost:8080/api/socialmediaaccounts/delete",values)
    }


    update(values) {
        return axios.post("http://localhost:8080/api/socialmediaaccounts/update",values)
    }

    getAllByCandidateId(candidateId){
        return axios.get(`http://localhost:8080/api/socialmediaaccounts/getAllByCandidateId?candidateId=${candidateId}`)
    }

    getAll(){
        return axios.get("http://localhost:8080/api/socialmediaaccounts/getAll")
    }

    getById(socialMediaAccountId){
        return axios.get(`http://localhost:8080/api/socialmediaaccounts/getById?id=${socialMediaAccountId}`)
    }


}