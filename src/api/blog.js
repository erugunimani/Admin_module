
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {message} from 'antd'
import { keyUri, config } from '../key'


const token =  localStorage.getItem('token') ?
localStorage.getItem('token') : null

export const initialState = {

    loading: false,
    hasErrors: false,
    all_blog:[],
    current_blog:null,
    error_blog:null,
    isAuthenticate:  token? true : false,

}

export const blogSlice = createSlice({
    name:"blog",
    initialState,
    reducers:{

        getBlog: state =>{

            state.loading = true
        },

        getBlogSuccess: (state, {payload}) =>{
             state.loading = false
            state.all_blog = payload
            console.log(payload)
            
        },

        getCurrentBlog: (state, {payload}) =>{
            state.loading = false
            state.current_blog = payload
   
            
        },
        getBlogFailure: (state, {payload}) =>{

            state.hasErrors = true
            console.log(payload)
            state.error_blog = payload
            
        },

        isAuthenticateError: (state) =>{

          state.hasErrors = true;
          state.loading = false;
          state.isAuthenticate = false
   
  
        },

    }
})

export const {getBlog, getBlogSuccess, getCurrentBlog, getBlogFailure,isAuthenticateError } = blogSlice.actions
      
export const blogSelector = state => state.blog
export default blogSlice.reducer


export const logOut = () => async dispatch =>{
  // const key = 'logOut';

  try {
             
      localStorage.removeItem('token');
      
      window.location.reload();
      // message.error('Authentication Failure.Session Out');

  } catch (error) {

      dispatch(isAuthenticateError('User Not Authorised'))

  }

}




export const  fetchAllBlog = () => async dispatch =>{
      const key = "blog"
      dispatch(getBlog())
      
    try {

        const {data} = await axios.get(keyUri.BACKEND_URI +'/blog');
        dispatch(getBlogSuccess(data))
 
    } catch ({response}) {

      console.log("inside error",response)
        // dispatch(getBlogFailure(response.data.message))
        response.data && message.error({ content: response.data.message, key, duration: 10 });
        dispatch(logOut())

    }
    
}

export const  fetchOneBlog = (id) => async dispatch =>{

 
    dispatch(getBlog())
    
  try {

      const {data} = await axios.get(keyUri.BACKEND_URI +`/blog/${id}`);
       dispatch(getCurrentBlog(data))

 
  } catch ({response}) {

      dispatch(getBlogFailure())
    //   response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  createBlog = (values) => async dispatch =>{
  console.log(values);
    const key = "blog"
    dispatch(getBlog())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.post(keyUri.BACKEND_URI +'/blog', values, config);
      setTimeout(() => {

        message.success({ content: data.msg, key, duration: 2 });
      }, 500) 
        dispatch(fetchAllBlog())

  } catch ({response}) {
       dispatch(getBlogFailure())
  }
  
}


export const  deleteBlog = (id) => async dispatch =>{
    const key = "blog"
    dispatch(getBlog())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.delete(keyUri.BACKEND_URI +`/blog/${id}`);
      data && message.success({ content: data.msg, key, duration: 2 });
      dispatch(fetchAllBlog())

  } catch ({response}) {

      dispatch(getBlogFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  updateBlog = (id, values) => async dispatch =>{
    const key = "blog"
    dispatch(getBlog())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.put(keyUri.BACKEND_URI +`/blog/${id}`, values, config);
      data && message.success({ content: data.msg, key, duration: 3 });
      window.location.reload()
      dispatch(fetchAllBlog())

  } catch ({response}) {

      dispatch(getBlogFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}




