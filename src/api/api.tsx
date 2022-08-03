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

export const getProjects = async () => {
    axios.post('http://127.0.0.1:8000/api/projects/', {}, {
        headers: { 
        'Authorization': localStorage.getItem('token'),
     },
    }).then(
        function (response) {
            console.log("resp", response);
        }
    )
        .catch(function (error) {
            console.log(error);
        });
}