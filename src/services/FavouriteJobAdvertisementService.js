import axios from "axios";
export default class FavouriteJobAdvertisementService{

    add(value){
        return axios.post("http://localhost:8080/api/favouritejobadvertisements/add",value)
    }

    update(value){
        return axios.post("http://localhost:8080/api/favouritejobadvertisements/update",value)
    }


    delete(value){
        return axios.post("http://localhost:8080/api/favouritejobadvertisements/delete",value)
    }

    getAll(){
        return axios.get("http://localhost:8080/api/favouritejobadvertisements/getAll")
    }

    getById(favouritejobadvertisementId){
        return axios.get(`http://localhost:8080/api/favouritejobadvertisements/getById?id=${favouritejobadvertisementId}`)
    }

    getByCandidateId(candidateId){
        return axios.get(`http://localhost:8080/api/favouritejobadvertisements/getByCandidateId?candidateId=${candidateId}`)
    }

    getByJobAdvertisementId(jobAdvertisementId){
        return axios.get(`http://localhost:8080/api/favouritejobadvertisements/getByAdvertisementId?id=${jobAdvertisementId}`)
    }


}
