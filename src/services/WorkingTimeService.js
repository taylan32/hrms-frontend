import axios from "axios";

export default class WorkingTimeService{

    add(values){
        return axios.post("http://localhost:8080/api/workingtimes/add",values)
    }

    update(values){
        return axios.post("http://localhost:8080/api/workingtimes/update",values)
    }

    delete(values){
        return axios.post("http://localhost:8080/api/workingtimes/delete",values)
    }

    getAll(){
        return axios.get("http://localhost:8080/api/workingtimes/getAll")
    }

    getById(workingTimeId){
        return axios.get(`http://localhost:8080/api/workingtimes/getById?id=${workingTimeId}`)
    }

}