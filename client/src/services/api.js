import axios from "axios"

const api = axios.create({ // o baseURL eh a URL com a porta onde o server esta rodando
    baseURL: 'http://localhost:3000'
})

export default api