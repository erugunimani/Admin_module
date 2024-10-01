
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {message} from 'antd'
import { keyUri, config } from '../key'

export const initialState = {

    loading: false,
    hasErrors: false,
    all_designportfolio:[],
    current_designportfolio:null,
}

export const designPortfolioSlice = createSlice({
    name:"Designportfolio",
    initialState,
    reducers:{

        getDesignPortfolio: state =>{

            state.loading = true
        },

        getDesignPortfolioSuccess: (state, {payload}) =>{
            state.loading = false
            state.all_designportfolio = payload
            console.log(payload)
            
        },

        getDesignCurrentPortfolio: (state, {payload}) =>{
            state.loading = false
            state.current_designportfolio = payload
   
            
        },
        getDesignPortfolioFailure: (state, {payload}) =>{

            state.loading = false
            // state.portfolio = payload
            
        },

    }
})

export const {getDesignPortfolio, getDesignPortfolioSuccess, getDesignCurrentPortfolio, getDesignPortfolioFailure } = designPortfolioSlice.actions
      
export const designportfolioSelector = state => state.Designportfolio
export default designPortfolioSlice.reducer






export const  fetchAllDesignPortfolio = () => async dispatch =>{
      const key = "design portfolio"
      dispatch(getDesignPortfolio())
      
    try {

        const {data} = await axios.get(keyUri.BACKEND_URI +'/design-portfolio');
        dispatch(getDesignPortfolioSuccess(data))
 
    } catch ({response}) {
        dispatch(getDesignPortfolioFailure())
        response.data && message.error({ content: response.data.msg, key, duration: 2 });

    }
    
}

export const  fetchOneDesignPortfolio = (id) => async dispatch =>{

 
    dispatch(getDesignPortfolio())
    
  try {

      const {data} = await axios.get(keyUri.BACKEND_URI +`/design-portfolio/${id}`);
       dispatch(getDesignCurrentPortfolio(data))

 
  } catch ({response}) {

      dispatch(getDesignPortfolioFailure())
    //   response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  createDesignPortfolio = (values) => async dispatch =>{
  console.log(values);
    const key = "design portfolio"
    dispatch(getDesignPortfolio())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.post(keyUri.BACKEND_URI +'/design-portfolio', values, config);
      setTimeout(() => {

        message.success({ content: data.msg, key, duration: 2 });
      }, 500) 
        dispatch(fetchAllDesignPortfolio())

  } catch ({response}) {
       dispatch(getDesignPortfolioFailure())
  }
  
}


export const  deleteDesignPortfolio = (id) => async dispatch =>{
    const key = "portfolio"
    dispatch(getDesignPortfolio())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.delete(keyUri.BACKEND_URI +`/design-portfolio/${id}`);
      data && message.success({ content: data.msg, key, duration: 2 });
      dispatch(fetchAllDesignPortfolio())

  } catch ({response}) {

      dispatch(getDesignPortfolioFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  updateDesignPortfolio = (id, values) => async dispatch =>{
    const key = "portfolio"
    dispatch(getDesignPortfolio())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.put(keyUri.BACKEND_URI +`/design-portfolio/${id}`, values, config);
      data && message.success({ content: data.msg, key, duration: 2 });
      dispatch(fetchAllDesignPortfolio())
      window.location.reload()

  } catch ({response}) {

      dispatch(getDesignPortfolioFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}




