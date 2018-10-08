// import FetchUtils from '../../../utils/fetchUtils';
const firebase = require('firebase');

export const registerAccount = (name, email, password) =>
{
  return firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email,password).then(
    (User) => {
       firebase.auth().currentUser.updateProfile({
        displayName : name
      });
       console.log(User);
      return "OK";
    }
  ).catch((error) => {return error});
};
