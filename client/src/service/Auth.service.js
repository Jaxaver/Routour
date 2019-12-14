import axios from 'axios'

export default class AuthServices {

    constructor() {
        this._service = axios.create({
            baseURL: 'http://localhost:3000/api/auth',
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

    signup = (username, password) => this._service.post('/signup', { username, password })
    login = (username, password) => this._service.post('/login', { username, password })
    logout = () => this._service.post('/logout')
    loggedin = () => this._service.get('/loggedin')
}