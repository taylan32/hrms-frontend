import axios from "axios";
export default class WorkingTypeService{

     add(values){
        return axios.post("http://localhost:8080/api/workingtypes/add",values)
    }

    update(values){
        return axios.post("http://localhost:8080/api/workingtypes/update",values)
    }

    delete(values){
        return axios.post("http://localhost:8080/api/workingtypes/delete",values)
    }

    getAll(){
        return axios.get("http://localhost:8080/api/workingtypes/getAll")
    }

    getById(workingTypeId){
        return axios.get(`http://localhost:8080/api/workingtypes/getById?id=${workingTypeId}`)
    }

}