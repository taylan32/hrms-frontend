import axios from "axios";

export default class UserService {

    getById(id) {
        return axios.get(`http://localhost:8080/api/users/getById?id=${id}`)
    }
    getAll(){
        return axios.get("http://localhost:8080/api/users/getAll")
    }
    getByEmail(email) {
        return axios.get(`http://localhost:8080/api/users/getByEmail?email=${email}`)
    }

    login(email, password) {
        return axios.get(`http://localhost:8080/api/users/login?email=${email}&password=${password}`)
    }
}