import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message } from 'antd';
import { keyUri, config } from '../key'

const token =  localStorage.getItem('token') ?
localStorage.getItem('token') : null

const initialState = {

    all_admin:[],
    loading:false,
    hasError:false,
    current_admin:[],
    isAuthenticate:token?true:false,
}


export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {

    getadmin: state => {
      state.loading = true;
      state.hasError = false
    },

    getAll_admin_success: (state, {payload})  =>{

        state.loading = false
        state.all_admin = payload

    },


    getCurrentSuccess: (state, {payload}) =>{
        state.loading = false
        state.isAuthenticate = true 
        state.current_admin = payload.admin
    
    },

    get_admin_Failure: (state) => {
      console.log("Inside admin failure")
      state.loading = false
      state.hasError = true
      console.log("The error value is",state.hasError)
    },
    

  },
})


export const { getadmin ,getAll_admin_success, getCurrentSuccess, get_admin_Failure } = adminSlice.actions;



export const adminSelector = state => state.admins;



export const fetchAllAdmin = (id) => async dispatch => {
  dispatch(getadmin())
 
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/all-admin/${id}`)
   console.log(data);
   
   dispatch(getAll_admin_success(data));
    
  } catch (error) {
 
 dispatch(get_admin_Failure())

  }
 };


  

 export const deleteAdmin = (id) => async dispatch => {

  dispatch(getadmin())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.delete(keyUri.BACKEND_URI +`/admin/${id}`)
  data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllAdmin());
    
  } catch (error) {


 dispatch(get_admin_Failure())
 
  }
 };

 export const createAdmin = (id, values) => async dispatch => {

  dispatch(getadmin())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.post(keyUri.BACKEND_URI +`/admin/${id}`, values, config)

   data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllAdmin(id));
    window.location.reload()

  } 
  catch ({response}) {
response.data && message.error({ content: response.data.msg, key, duration: 2 })
 dispatch(get_admin_Failure())

  }
 };



 export const fetchOneAdmin = (id) => async dispatch => {

  dispatch(getadmin())
 console.log(id);
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/admin/${id}`)
  console.log(data);
   dispatch(getCurrentSuccess(data));
  } catch (error) {

 dispatch(get_admin_Failure())
  }
 };


 export const  updateAdminProfile = (id, values) => async dispatch =>{
  const key = "admin"
  dispatch(getadmin())
  message.loading({ content: 'loading...', key })

try {
    const {data} = await axios.put(keyUri.BACKEND_URI +`/admin/${id}`, values, config);
    console.log(data);
    
    data && message.success({ content: data.msg, key, duration: 2 });
    // dispatch(fetchAllAdmin())
    window.location.reload()

} catch ({response}) {
console.log(response.data);
    dispatch(get_admin_Failure())
    // response.data && message.success({ content: response.data.msg, key, duration: 2 });

}
}


export const updateNotify = (id,values) => async dispatch =>{
  console.log("The values are :",values)
     const key = "notification"
     dispatch(getadmin()) 
    //  message.loading({content:`Loading ${key}`})
     try{
      const {data} = await axios.put(keyUri.BACKEND_URI+`/updateNotification/${id}`,values,config)
      console.log(data)
     dispatch(getCurrentSuccess(data));
      
      data && message.success({ content: data.msg, key, duration: 2 });
      // dispatch(fetchAllAdmin());    
      window.location.reload()
     }
     catch(error){
      console.log(error)
     }
}

export const findAdminOTP = (values) =>async dispatch =>{
  console.log(values)
    dispatch(getadmin())
    try{
      const {data} = await axios.get(keyUri.BACKEND_URI+`/findOneAdmin/${values.phone_no}`)
      console.log(data)
      dispatch(getCurrentSuccess(data));
      localStorage.setItem('token', data.accessToken)

      data && message.success({ content: `OTP Sent Succesfully to ${data?.admin?.phone_no}`,duration: 2 });

    }catch(error){
      console.log("Inside catch")
      error && message.error({ content: error.response.data.msg, duration: 5 });
      dispatch(get_admin_Failure())
     }
}
 

export default adminSlice.reducer;
