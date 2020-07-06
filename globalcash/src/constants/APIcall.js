import axios from 'axios';

const URL = 'http://103.121.149.77:63003/';
// const URL = 'http://192.168.5.27:63003/';

const APIcall = config => {
  //header authorization
  // if (Auth.user_token) {
  //   const token = Auth.getToken()
  //   config.headers = {
  //     "authorization": token
  //   }
  // }
  //interceptors handle network error
  axios.interceptors.response.use(
    response => {
      return response;
    },
    function(error) {
      if (!error.response) {
        error.response = {
          data: 'net work error',
          status: 500,
        };
      }
      // if(error.response.status===401){
      //   Auth.logout()
      //   jumpTo('/login')
      //   throw error
      // }
      return Promise.reject(error);
    },
  );
  config.baseURL = URL;
  return axios(config);
};
export default APIcall;

// export const login = (email, password) => {
//   const body =
//   {
//     "credential": {
//       "email": email,
//       "password": password
//     }
//   }
//   return serverCall({
//     method: 'POST',
//     url: '/users/login',
//     data: body
//   })
//     .then(res => {
//       Auth.setUserToken(res.data.user_token)
//       return res
//     })
// }

// export const getPaypalToken = () => {
//   return axios({
//     method: 'POST',
//     url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
//     headers: { 'content-type': 'application/x-www-form-urlencoded' },
//     auth: {
//       username: paypalConfig.username,
//       password: paypalConfig.password
//     },
//     data: qs.stringify({ "grant_type": "client_credentials" })
//   })
// }
