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
    const { data } = await api.get(`/tasks/${listId}`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
    return data
}

export const postATask = async ({listId, taskData}) => {
    const { data } = await api.post(`/tasks/${listId}`, taskData, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })

    return data
}

export const deleteTask = async ({ listId, taskId }) => {
    console.log(listId)
    const { data } = await api.delete(`/tasks/${listId}/${taskId}`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
    console.log(data)
    return data
}