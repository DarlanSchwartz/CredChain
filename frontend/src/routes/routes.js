const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = 'http://localhost:5000';

export const API = {
    postSignUp: API_URL + '/signup',
    postLogin: API_URL + '/login',
    deleteLogout: API_URL + '/logout',
    registerCompany: API_URL + '/register-company',
    getCompanies: API_URL + '/companies',
    getUser: API_URL + '/user',
    getNetworks: API_URL + '/get-network',
    deleteNetwork: API_URL + '/delete-network/',
    postNetwork: API_URL + '/post-network',
    setAcceptedToken: API_URL + '/set-accepted-token',
    releaseLockedTokens: API_URL + '/release-locked-tokens',
    getBalanceOfTokensLockedByUser: API_URL + '/get-balance-of-tokens-locked-by-user',
    getUsedCollateral: API_URL + '/get-used-collateral',
    depositPvt: API_URL + '/deposit-pvt',
    getBalanceOfTokensAvailable: API_URL + '/get-balance-of-tokens-available',
    payCredit: API_URL + '/pay-credit',
    requestCredit: API_URL + '/request-credit'
}

export const DocumentationLink = 'https://docs.google.com/document/d/1YyEb-M9KqqFOmwrARIljKqkO8iHLSctyIYucsDRaTd4/edit';