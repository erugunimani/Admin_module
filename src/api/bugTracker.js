
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {message} from 'antd'
import { keyUri, config } from '../key'
export const initialState = {

    loading: false,
    hasErrors: false,
    all_bugTracker:[],
    currentBugTracker:null,
}

export const BugTrackerSlice = createSlice({
    name:"BugTracker",
    initialState,
    reducers:{

        getBugTracker: state =>{

            state.loading = true
        },

        getBugTrackerSuccess: (state, {payload}) =>{
            state.loading = false
            state.all_bugTracker = payload
          
            
        },

        getCurrentBugTracker: (state, {payload}) =>{
            state.loading = false
            state.currentBugTracker = payload
             
        },
        getBugTrackerFailure: (state, {payload}) =>{

            state.loading = false
            state.all_bugTracker = payload
            
        },

    }
})

export const {getBugTracker, getBugTrackerSuccess, getCurrentBugTracker, getBugTrackerFailure } = BugTrackerSlice.actions
      
export const BugTrackerSelector = state => state.BugTracker
export default BugTrackerSlice.reducer

export const  fetchAllBugTracker = () => async dispatch =>{
      const key = "BugTracker"
      dispatch(getBugTracker())
      
    try {

        const {data} = await axios.get(keyUri.BACKEND_URI +'/bugTracker');
        // console.log(data)
        dispatch(getBugTrackerSuccess(data))

    } catch ({response}) {

        dispatch(getBugTrackerFailure())
        response.data && message.error({ content: response.data.msg, key, duration: 2 });

    }
    
}

export const  fetchOneBugTracker = (id) => async dispatch =>{

    dispatch(getBugTracker())
    
  try {

      const {data} = await axios.get(keyUri.BACKEND_URI +`/fetch-onebugTracker/${id}`);
      dispatch(getCurrentBugTracker(data))

  } catch ({response}) {

      dispatch(getBugTrackerFailure())
    //   response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  createBugTracker = (values) => async dispatch =>{
  // console.log(values);
    const key = "BugTracker"
    dispatch(getBugTracker())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.post(keyUri.BACKEND_URI +'/bugTracker', values, config);
      setTimeout(() => {

        message.success({ content: data.msg, key, duration: 2 });
      }, 500) 
        dispatch(fetchAllBugTracker())

  } catch ({response}) {
       dispatch(getBugTrackerFailure())
  }
  
}


export const  deleteBugTracker = (id) => async dispatch =>{
    const key = "BugTracker"
    dispatch(getBugTracker())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.delete(keyUri.BACKEND_URI +`/bugTracker/${id}`);
      data && message.success({ content: data.msg, key, duration: 2 });
      dispatch(fetchAllBugTracker())

  } catch ({response}) {

      dispatch(getBugTrackerFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  updateBugTracker = (id, values) => async dispatch =>{
    const key = "BugTracker"
    dispatch(getBugTracker())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.put(keyUri.BACKEND_URI +`/bugTracker/${id}`, values, config);
      data && message.success({ content: data.msg, key, duration: 2 });
      window.location.reload()
      dispatch(fetchAllBugTracker())

  } catch ({response}) {

      dispatch(getBugTrackerFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}




