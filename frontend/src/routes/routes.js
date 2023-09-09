const API_URL = process.env.REACT_APP_API_URL;
//const API_URL = 'http://localhost:5000';

export const backendroute = {
    postSignUp: API_URL + '/signup',
    postLogin: API_URL + '/login',
    deleteLogout: API_URL + '/logout',
    registerCompany: API_URL + '/register-company',
    getCompanies: API_URL + '/companies',
    getUser: API_URL + '/user',
}