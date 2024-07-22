import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const likePost = async (id, likes) => {
    const res = await axios.put(baseUrl + `/${id}`, { likes: likes })

    return res.data
}

const deletePost = async (id) => {
    const config = {
        headers: { Authorization: token },
    }

    const res = await axios.delete(baseUrl + `/${id}`, config)
}

export default { setToken, getAll, create, likePost, deletePost }