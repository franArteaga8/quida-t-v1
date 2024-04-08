import api from "./config";

export const getAllMyTasks = async () => {
    const { data } = await api.get('/tasks/', {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
    return data
}

export const getTasksFromList = async (listId) => {
    const { data } = await api.get(`/${listId}`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
    console.log(data)
    return data
}