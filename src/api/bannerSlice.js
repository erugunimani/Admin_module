
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {message} from 'antd'
import { keyUri,config } from '../key';

export const initialState = {

    loading: false,
    hasErrors: false,
    banner:[],
    currentBanner:null,
    view:true
}

export const bannerSlice = createSlice({
    name:"banner",
    initialState,
    reducers:{

        getBanner: state =>{
 
            state.loading = true
        },

        getBannerSuccess: (state, {payload}) =>{
            state.loading = false
            state.banner = payload
            
            
        },

        getCurrentBanner: (state, {payload}) =>{
          // console.log({k:payload});

            state.loading = false
            // state.view = false
            state.currentBanner = payload
             
        },
        getBannerFailure: (state, {payload}) =>{

            state.loading = false
            state.banner = payload
            
        },

    }
})

export const {getBanner, getBannerSuccess, getCurrentBanner, getBannerFailure } = bannerSlice.actions
      
export const bannerSelector = state => state.banner
export default bannerSlice.reducer


export const  fetchAllBanner = () => async dispatch =>{
      const key = "banner"
       dispatch(getBanner())
      
    try {

        const {data} = await axios.get(keyUri.BACKEND_URI +`/all-banner`);
         dispatch(getBannerSuccess(data))
    } catch ({response}) {

        dispatch(getBannerFailure())
        response.data && message.error({ content: response.data.msg, key, duration: 2 });

    }
    
}

export const  fetchOneBanner = (id) => async dispatch =>{

    dispatch(getBanner())
    
   try {

      const {data} = await axios.get(keyUri.BACKEND_URI +`/banner/${id}`);
      dispatch(getCurrentBanner(data))

  } catch ({response}) {

      dispatch(getBannerFailure())
    //   response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  createBanner = (values) => async dispatch =>{
  console.log(values);
    const key = "banner"
    dispatch(getBanner())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.post(keyUri.BACKEND_URI +'/banner', values, config);
      setTimeout(() => {

        message.success({ content: data.msg, key, duration: 2 });
      }, 500) 
        dispatch(fetchAllBanner())
// window.location.reload()
 
  } catch ({response}) {
       dispatch(getBannerFailure())
  }
  
}


export const  deleteBanner = (id) => async dispatch =>{
    const key = "banner"
    dispatch(getBanner())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.delete(keyUri.BACKEND_URI +`/banner/${id}`);
      data && message.success({ content: data.msg, key, duration: 2 });
      dispatch(fetchAllBanner(true))

  } catch ({response}) {

      dispatch(getBannerFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  updateBanner = (id, values) => async dispatch =>{
    const key = "banner"
    dispatch(getBanner())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.put(keyUri.BACKEND_URI +`/banner/${id}`, values, config);
      data && message.success({ content: data.msg, key, duration: 2 });
      // window.location.reload()
      dispatch(fetchAllBanner(true))

  } catch ({response}) {

      dispatch(getBannerFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}




