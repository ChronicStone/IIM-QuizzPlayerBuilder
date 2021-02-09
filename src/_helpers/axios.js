import axios from 'axios'
// import jwt from "jsonwebtoken"
const api = axios.create({
    baseURL: process.env.REACT_APP_QUIZZ_API
})

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('player') ? JSON.parse(localStorage.getItem('player')).accessToken : null
        console.log({token})
        config.headers['x-access-token'] = token || "_no_user"
        config.headers['Content-Type'] = 'application/json'

        // const decoded = jwt.decode(token)
        // const timestampNow = Date.now()
        // const timestampExp = decoded.exp * 1000
        // const diff = timestampExp - timestampNow

        // if (diff < 0) {
        //     localStorage.removeItem('accessToken')
        // }

        return config
    }, error => {
        Promise.reject(error)
    }
)

export default api
