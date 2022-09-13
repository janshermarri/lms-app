import axios from 'axios';

const API_URL = 'https://lms-main.herokuapp.com/api';
// const API_URL = 'http://localhost:8000/api';
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

export const createNewStudent = async (values) => {
    return axios.post(`${API_URL}/students/`, values, {
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


export const deleteStudent = async (studentId) => {
    return axios.delete(`${API_URL}/students/${studentId}/`, {
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

export const editStudent = async (values) => {
    return axios.put(`${API_URL}/students/${values.id}/`, values, {
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

export const getComments = async () => {
    return axios.get(`${API_URL}/comments/`, {
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

export const createNewComment = async (values) => {
    return axios.post(`${API_URL}/comments/`, values, {
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


export const deleteComment = async (commentId) => {
    return axios.delete(`${API_URL}/comments/${commentId}/`, {
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

export const editComment = async (values) => {
    return axios.put(`${API_URL}/comments/${values.id}/`, values, {
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

export const getSessions = async () => {
    return axios.get(`${API_URL}/sessions/`, {
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

export const createNewSession = async (values) => {
    return axios.post(`${API_URL}/sessions/`, values, {
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


export const deleteSession = async (sessionId) => {
    return axios.delete(`${API_URL}/sessions/${sessionId}/`, {
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

export const editSession = async (values) => {
    return axios.put(`${API_URL}/sessions/${values.id}/`, values, {
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



export const isUserValid = () => {
    return localStorage.getItem('token') !== null
}