import axios from 'axios';

export default class JobTitleService{

    add(values){
       return  axios.post("http://localhost:8080/api/jobtitles/add",values)
    }

    update(vaules){
        return axios.post("http://localhost:8080/api/jobtitles/update",vaules)
    }

    delete(values){
        return axios.post("http://localhost:8080/api/jobtitles/delete",values)
    }

    getAll(){
        return axios.get("http://localhost:8080/api/jobtitles/getAll")
    }

    getById(jobTitleId){
        return axios.get(`http://localhost:8080/api/jobtitles/getById?jobTitleId=${jobTitleId}`)
    }

    getByJobTitle(jobTitle){
        return axios.get(`http://localhost:8080/api/jobtitles/getByJobTitle?jobTitle=${jobTitle}`)
    }

}