
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {message} from 'antd'
 
import { keyUri, config } from '../key'
export const initialState = {

    loading: false,
    hasErrors: false,
    subscribe:[],
    currentmails:null,
}

export const subscribeSlice = createSlice({
    name:"subscribe",
    initialState,
    reducers:{

        getSubscriber: state =>{

            state.loading = true
        },

        getSubscriberSuccess: (state, {payload}) =>{
            state.loading = false
            state.subscribe = payload
            
        },

        getCurrentSubscriber: (state, {payload}) =>{
          console.log({k:payload});

            state.loading = false
            state.currentsubscribe = payload
            
        },
        getSubscribeFailure: (state, {payload}) =>{

            state.loading = false
            state.subscribe = payload
            
        },

    }
})

export const {getSubscriber, getSubscriberSuccess, getCurrentSubscriber, getSubscribeFailure } = subscribeSlice.actions
      
export const subscribeSelector = state => state.subscribe
export default subscribeSlice.reducer




  export const  fetchAllSubscriber = () => async dispatch =>{
    const key = "mails"
    dispatch(getSubscriber())
    
  try {

      const {data} = await axios.get(keyUri.BACKEND_URI +'/mail');
      console.log(data)
      dispatch(getSubscriberSuccess(data))

  } catch ({response}) {

      dispatch(getSubscribeFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}

 


export const  createSubscribe = (values) => async dispatch =>{
  console.log(values);
    const key = "subscribe"
    dispatch(getSubscriber())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.post(keyUri.BACKEND_URI +'/mail', values, config);
      console.log(data)
      setTimeout(() => {

        message.success({ content: data.msg, key, duration: 2 });
      }, 500) 
        dispatch(fetchAllSubscriber())

  } catch ({response}) {
       dispatch(getSubscribeFailure())
  }
  
}




 


 




