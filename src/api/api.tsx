import axios from 'axios';

export const login = async (username: string, password: string) => {
    const payload = {
        username,
        password
    }
    return axios.post('http://127.0.0.1:8000/api/token/', payload).then(
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
    return axios.get('http://127.0.0.1:8000/api/teachers/', {
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
    return axios.post('http://127.0.0.1:8000/api/teachers/', values, {
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
    return axios.delete(`http://127.0.0.1:8000/api/teachers/${teacherId}/`, {
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
    return axios.put(`http://127.0.0.1:8000/api/teachers/${values.id}/`, values, {
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
    return axios.get('http://127.0.0.1:8000/api/students/', {
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