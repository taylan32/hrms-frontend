import axios from "axios";

export default class SkillService {
    
    add(values) { 
        return axios.post("http://localhost:8080/api/skills/add", values)
    }

    update(values) { 
        return axios.post("http://localhost:8080/api/skills/update", values)
    }

    delete(values) { 
        return axios.post("http://localhost:8080/api/skills/delete", values)
    }

    getAll(){
        return axios.get("http://localhost:8080/api/skills/getAll")
    }
    
    getByCandidateId(candidateId){
        return axios.get(`http://localhost:8080/api/skills/getAllByCandidateId?candidateId=${candidateId}`)
    }

    getById(skillId) {
        return axios.get(`http://localhost:8080/api/skills/getById?skillId=${skillId}`)
    }
    

}