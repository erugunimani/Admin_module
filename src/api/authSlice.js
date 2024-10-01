import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { message } from 'antd';
import { keyUri, config } from '../key'


const token =  localStorage.getItem('token') ?
localStorage.getItem('token') : null


 
const user =  localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo'))  : null

export const initialState = {

    loading:false,
    hasErrors:false,
   isAuthenticate:  token? true : false,
   user:user,
   role:null,
   token:token,
   current:[],
   filter:[],
   current_user:null


}

export const authenticateSlice = createSlice({


    name:"auth",
    initialState,
    reducers:{

      getlogin:state =>{

        state.loading = true;
      },

      getAdmin:(state,{payload})=>{
          state.current_user = payload.user
      },

      getAuthenticate: (state, {payload}) =>{
        console.log(payload)
        state.loading = false;
         state.isAuthenticate = true 
        //  state.user = payload.admin
        //  state.role = payload.admin.role
         state.token = payload.accessToken


      },
      getFilter: (state, {payload}) =>{

        state.loading = false;
        state.current = payload
  
      },
    
      isAuthenticateError: (state,{payload}) =>{

        state.hasErrors = true;
        state.loading = false;
        state.isAuthenticate = false
        state.user = payload


      },
      getUserProfile: (state, {payload})=>{
        console.log({aaa:payload});

        state.loading = false;
        state.user = payload.user;
        state.role = payload.user.role
        state.isAuthenticate = true;

      } ,
      getFilter: (state, {payload}) =>{

        state.loading = false;
        state.filter = payload
  
      },



    }


})


export const {getlogin, getFilter, getAdmin,getUserProfile, getAuthenticate, isAuthenticateError }  = 
authenticateSlice.actions

export const authenticateSelector = state => state.auth
export default authenticateSlice.reducer


 

export const logOut = () => async dispatch =>{
    // const key = 'logOut';

    try {
               
        localStorage.removeItem('token');
        
        window.location.reload();
        // message.error('Authentication Failure.Session Out');

    } catch (error) {

        dispatch(isAuthenticateError())

    }

}


export const fetchlogin = (logindata) => async dispatch =>{
  console.log(logindata);
 
    const key = 'login';
    dispatch(getlogin())
    message.loading({ content: 'loading...', key })

    try {
        
     
        const {data} = await axios.post(keyUri.BACKEND_URI + '/adminAuth', logindata, config)

        console.log(data.accessToken)
        dispatch(getAuthenticate(data))

        localStorage.setItem('token', data.accessToken)
        // localStorage.setItem('userInfo', data.admin)        

        data &&  message.success({ content: data.msg, key, duration: 2 });

    } catch (error) {
      // console.log(error.response.data.admin)
      error && message.error({ content: error.response.data.msg, key, duration: 5 });
       dispatch(isAuthenticateError(error.response.data.user))
    }

}



// export const updateAdmin = (id,values) => async dispatch =>{
//   // console.log("Inside Update admin",id,values)
//   dispatch(getlogin())

//   const {data} = await axios.put(keyUri.BACKEND_URI + `/admin/${id}`,values,config)
// }


export const  updateAdminPassword = (id, values) => async dispatch =>{
  const key = "blog"
  dispatch(getlogin())
  console.log(values)
  message.loading({ content: 'loading...', key })
  
try {

    const {data} = await axios.put(keyUri.BACKEND_URI +`/admin/${id}`, values, config);
    console.log(data)
    data && message.success({ content: data.msg, key, duration: 5 });
    // window.location.reload()
    window.location.href = "/"
    // dispatch(fetchAllBlog())

} catch ({response}) {

    // dispatch(getBlogFailure())
    response.data && message.error({ content: response.data.msg, key, duration: 7 });

}

}

export const fetchAdminProfile = (token) => async dispatch =>{

  const loginConfig  = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  console.log("Token is",token)
  dispatch(getlogin())
 


  try {

    const {data} = await axios.get(keyUri.BACKEND_URI + '/adminProfile',  loginConfig)


    console.log(data)
    dispatch(getUserProfile(data))

  } catch (error) {
    console.log(error)

 
          error && message.error('Authentication Failure.Session Out');
          dispatch(logOut())


  }
}

// this is now an action createor which returns a function
export const fethFilter = (value, filter) => async dispatch =>{
  let a = []
console.log(value);
if(!value ){
 return dispatch(getFilter(a)) 
//  action creator returns action now it is dispatch()

}

  try {
      // now using the axios we make request using the URL
      // and dispatcheds the action
      const {data} = await axios.get(keyUri.BACKEND_URI + `/${value}?search=${filter}`, config)
      dispatch(getFilter(data))


  } catch (error) {

      dispatch(isAuthenticateError())
  }

}

export const  fetchOneAdmin = (id) => async dispatch =>{

 
  dispatch(getlogin())
  
try {

    const {data} = await axios.get(keyUri.BACKEND_URI +`/admin/${id}`);
     dispatch(getAdmin(data))


} catch ({response}) {

    dispatch(isAuthenticateError())
  //   response.data && message.error({ content: response.data.msg, key, duration: 2 });

}

}


