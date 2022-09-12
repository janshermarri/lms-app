import axios from 'axios';

const API_URL = 'https://lms-main.herokuapp.com/api'
export const login = async (username: string, password: string) => {
    const payload = {
        username,
        password
    }
    return axios.post(`${API_URL}/token/`, payload).then(
        function (response) {
            localStorage.setItem('token', `Bearer ${response.data.access}`);
            return response;
        }
    )
        .catch(function (error) {
            console.log("err", error);
            return error.response;
        });
}

export const getTeachers = async () => {
    return axios.get(`${API_URL}/teachers/`, {
        headers: { 
        'Authorization': localStorage.getItem('token'),
     },
    }).then(
        function (response) {
            console.log("resp", response);
            return response.data;
        }
    )
        .catch(function (error) {
            console.log(error);
            return error;
        });
}

export const createNewTeacher = async (values) => {
    return axios.post(`${API_URL}/teachers/`, values, {
        headers: { 
        'Authorization': localStorage.getItem('token'),
     },
    }).then(
        function (response) {
            console.log("resp", response);
            return response;
        }
    )
        .catch(function (error) {
            console.log(error);
            return error;
        });
}

export const deleteTeacher = async (teacherId) => {
    return axios.delete(`${API_URL}/teachers/${teacherId}/`, {
        headers: { 
        'Authorization': localStorage.getItem('token'),
     },
    }).then(
        function (response) {
            console.log("resp", response);
            return response;
        }
    )
        .catch(function (error) {
            console.log(error);
            return error;
        });
}

export const editTeacher = async (values) => {
    return axios.put(`${API_URL}/teachers/${values.id}/`, values, {
        headers: { 
        'Authorization': localStorage.getItem('token'),
     },
    }).then(
        function (response) {
            console.log("resp", response);
            return response;
        }
    )
        .catch(function (error) {
            console.log(error);
            return error;
        });
}


export const getStudents = async () => {
    return axios.get(`${API_URL}/students/`, {
        headers: { 
        'Authorization': localStorage.getItem('token'),
     },
    }).then(
        function (response) {
            return response.data;
        }
    )
        .catch(function (error) {
            console.log(error);
            return error;
        });
}