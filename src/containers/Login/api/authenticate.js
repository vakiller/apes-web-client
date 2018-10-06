// import FetchUtils from '../../../utils/fetchUtils';

export const getAccessToken = async (body) => {
  try {
    let clientKey = localStorage.getItem('clientKey');
    let response = await FetchUtils.getAccessToken('/oauthservice/oauth/token', clientKey, body);
    return response;
  } catch (error) {
    throw Error(error);
  }
};

export const verifyUsername = async (username) => {
  try {
    console.log("In here, ", username);
    let response = await FetchUtils.post('/oauthservice/login', {username});
    return response;
  } catch (error) {
    throw Error(error);
  }
};
