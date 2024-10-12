import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux'
import { thunk }  from 'redux-thunk';
import {composeWithDevTools}from 'redux-devtools-extension'
import { getallpostsreducer, likeReducer } from './reducers/postsReducer.js';
import { getuserdetails, loginotp, signup, signupotp, surflogin } from './reducers/authReducer.js';
import { isAvialablereducer, setuserreducer } from './reducers/setProfilereducer.js';
import { changeDPreducer, loadselfReducer } from './reducers/loadprofileReducer.js';
import { editobjReducer } from './reducers/editProfileReducers.js';
import { addApostreducer } from './reducers/makepostReducer.js';
import { AddcommReducer, AddreplyReducer, getcommentsReducer, getrepliesReducer } from './reducers/commentReplyReducer.js';



const rootreducer = combineReducers({
posts: getallpostsreducer,
like: likeReducer,
loginOTP: loginotp,
logined: surflogin,
me: getuserdetails,
signupotp: signupotp,
signupp: signup,
isUsernameAvialable: isAvialablereducer,
setusername: setuserreducer,
displayprofile: loadselfReducer,
changedp: changeDPreducer,
editOBJ: editobjReducer,
addPost: addApostreducer,
Addcomm: AddcommReducer,
getComm: getcommentsReducer,
addReply: AddreplyReducer,
getReply: getrepliesReducer
});


// learn what thunk actually do
const middleware = [thunk];

const Store = createStore(
    rootreducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;