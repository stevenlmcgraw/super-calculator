import axios from 'axios';

//const LOCAL_API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9191';
const CLOUD_API_URL = 'http://saturn-hotdog-super-calculator-backend.cfapps.io';

const apiClient = axios.create({
    baseURL: CLOUD_API_URL,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
  });

//check username and email availability
export function checkUsernameAvailability(username: string | null) {
    return apiClient.get('/auth/getUsernameAvailability', 
    { params: {
        username,
    }})
}

export function checkEmailAvailability(email: string | null) {
    return apiClient.get('/auth/getEmailAvailability', 
    { params: {
        email,
    }})
}

//register(sign up) new SiteUser
export function registerNewSiteUser(newUser: any) {
    return apiClient.post('/auth/register', newUser);
}