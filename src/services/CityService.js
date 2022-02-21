import axios from "axios";

export default class CityService{
    
    add(values){
        return axios.post("http://localhost:8080/api/cities/add",values)
    }

    update(values){
        return axios.post("http://localhost:8080/api/cities/update",values)
    }

    delete(values){
        return axios.post("http://localhost:8080/api/cities/delete",values)
    }

    getById(cityId){
        return axios.get(`http://localhost:8080/api/cities/getById?cityId=${cityId}`)
    }

    getAll(){
        return axios.get("http://localhost:8080/api/cities/getAll")
    }

    getByCityName(cityName){
        return axios.get(`http://localhost:8080/api/cities/getByCityName?cityName=${cityName}`)
    }

}