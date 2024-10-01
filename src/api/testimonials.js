
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {message} from 'antd'
import { keyUri,config } from '../key';

export const initialState = {

    loading: false,
    hasErrors: false,
    testimonial:[],
    currentTestimonial:null,
}

export const testimonialSlice = createSlice({
    name:"testimonial",
    initialState,
    reducers:{

        getTestimonial: state =>{

            state.loading = true
        },

        getTestimonialSuccess: (state, {payload}) =>{
            state.loading = false
            state.testimonial = payload
            
        },

        getCurrentTestimonial: (state, {payload}) =>{
            state.loading = false
            state.currentTestimonial = payload
            
        },
        getTestimonialFailure: (state, {payload}) =>{

            state.loading = false
            state.testimonial = payload
            
        },

    }
})

export const {getTestimonial, getTestimonialSuccess, getCurrentTestimonial, getTestimonialFailure } = testimonialSlice.actions
      
export const testimonialSelector = state => state.testimonial
export default testimonialSlice.reducer


 



export const  fetchAllTestimonial = () => async dispatch =>{
      const key = "testimonial"
      dispatch(getTestimonial())
      
    try {

        const {data} = await axios.get(keyUri.BACKEND_URI +'/testimonial');
        console.log(data)
        dispatch(getTestimonialSuccess(data))

    } catch ({response}) {

        dispatch(getTestimonialFailure())
        response.data && message.error({ content: response.data.msg, key, duration: 2 });

    }
    
}

export const  fetchOneTestimonial = (id) => async dispatch =>{

    dispatch(getTestimonial())
    
  try {

      const {data} = await axios.get(keyUri.BACKEND_URI +`/testimonial/${id}`);
      dispatch(getCurrentTestimonial(data))

  } catch ({response}) {

      dispatch(getTestimonialFailure())
    //   response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  createTestimonial = (values) => async dispatch =>{
  console.log(values);
    const key = "testimonial"
    dispatch(getTestimonial())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.post(keyUri.BACKEND_URI +'/testimonial', values, config);
      setTimeout(() => {

        message.success({ content: data.msg, key, duration: 2 });
      }, 500) 
        dispatch(fetchAllTestimonial())

  } catch ({response}) {
       dispatch(getTestimonialFailure())
  }
  
}


export const  deleteTestimonial = (id) => async dispatch =>{
    const key = "testimonial"
    dispatch(getTestimonial())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.delete(keyUri.BACKEND_URI +`/testimonial/${id}`);
      data && message.success({ content: data.msg, key, duration: 2 });
      dispatch(fetchAllTestimonial())

  } catch ({response}) {

      dispatch(getTestimonialFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  updateTestimonial = (id, values) => async dispatch =>{
    const key = "testimonial"
    dispatch(getTestimonial())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.put(keyUri.BACKEND_URI +`/testimonial/${id}`, values, config);
      data && message.success({ content: data.msg, key, duration: 2 });
      window.location.reload()
      dispatch(fetchAllTestimonial())

  } catch ({response}) {

      dispatch(getTestimonialFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}




