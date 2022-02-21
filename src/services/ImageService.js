import axios from "axios";

export default class ImageService{
    delete(imageId){
        return axios.post("http://localhost:8080/api/images/delete",imageId)
    }
    getByUserId(userId){
        return axios.get(`http://localhost:8080/api/images/getByUserId?userId=${userId}`)
    }

    upload(formData, userId){
        return axios.post(`http://localhost:8080/api/images/upload?userId=${userId}`,formData)
    }
    
}
