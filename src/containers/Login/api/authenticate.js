// import FetchUtils from '../../../utils/fetchUtils';
const firebase = require('firebase');

export const registerAccount = (name, email, password) =>
{
  return firebase.auth()
  .createUserAndRetrieveDataWithEmailAndPassword(email,password).then(
    () => {
       firebase.auth().currentUser.updateProfile({
        displayName : name
      }).then(() => {
        firebase.auth().currentUser.sendEmailVerification().then(() => {
          let user = firebase.auth().currentUser;
          let name, email, photoUrl, uid, emailVerified;
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          emailVerified = user.emailVerified;
          uid = user.uid;
          firebase.database().ref(`/users/${uid}`).set({
            displayName : name,
            email,
            photoUrl,
            emailVerified
          }).then(
            () => {
              localStorage.setItem('accessToken',user.toJSON().stsTokenManager.accessToken);
              localStorage.setItem('refreshToken',user.toJSON().stsTokenManager.refreshToken);
              localStorage.setItem('expirationTime',user.toJSON().stsTokenManager.expirationTime);
              localStorage.setItem('email',user.toJSON().email);
              localStorage.setItem('uid',user.toJSON().uid);
              localStorage.setItem('displayName',user.toJSON().displayName);
            }
          );
        });
      });
     return "Ok";
    }
  ).catch((error) => {return error});
};
export const Login = (email, password) => {
  return firebase.auth()
    .signInAndRetrieveDataWithEmailAndPassword(email,password).then((user) => {
      console.log("====> ",user.user.toJSON());
      localStorage.setItem('accessToken',user.user.toJSON().stsTokenManager.accessToken);
      localStorage.setItem('refreshToken',user.user.toJSON().stsTokenManager.refreshToken);
      localStorage.setItem('expirationTime',user.user.toJSON().stsTokenManager.expirationTime);
      localStorage.setItem('email',user.user.toJSON().email);
      localStorage.setItem('uid',user.user.toJSON().uid);
      localStorage.setItem('displayName',user.user.toJSON().displayName);
      return "Ok";
    }).catch((err) => {
      console.log(err.toJSON());
      const mess = err.toJSON().message;
      return mess;
    })
};