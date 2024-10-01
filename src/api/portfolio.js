
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {message} from 'antd'
import { keyUri, config } from '../key'

export const initialState = {

    loading: false,
    hasErrors: false,
    all_portfolio:[],
    current_portfolio:null,
}

export const portfolioSlice = createSlice({
    name:"portfolio",
    initialState,
    reducers:{

        getPortfolio: state =>{

            state.loading = true
        },

        getPortfolioSuccess: (state, {payload}) =>{
             state.loading = false
            state.all_portfolio = payload
            console.log(payload)
            
        },

        getCurrentPortfolio: (state, {payload}) =>{
            state.loading = false
            state.current_portfolio = payload
   
            
        },
        getPortfolioFailure: (state, {payload}) =>{

            state.loading = false
            // state.portfolio = payload
            
        },

    }
})

export const {getPortfolio, getPortfolioSuccess, getCurrentPortfolio, getPortfolioFailure } = portfolioSlice.actions
      
export const portfolioSelector = state => state.portfolio
export default portfolioSlice.reducer






export const  fetchAllPortfolio = () => async dispatch =>{
      const key = "portfolio"
      dispatch(getPortfolio())
      
    try {

        const {data} = await axios.get(keyUri.BACKEND_URI +'/portfolio');
        dispatch(getPortfolioSuccess(data))
 
    } catch ({response}) {
        dispatch(getPortfolioFailure())
        response.data && message.error({ content: response.data.msg, key, duration: 2 });

    }
    
}

export const  fetchOnePortfolio = (id) => async dispatch =>{

 
    dispatch(getPortfolio())
    
  try {

      const {data} = await axios.get(keyUri.BACKEND_URI +`/portfolio/${id}`);
       dispatch(getCurrentPortfolio(data))

 
  } catch ({response}) {

      dispatch(getPortfolioFailure())
    //   response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  createPortfolio = (values) => async dispatch =>{
  console.log(values);
    const key = "portfolio"
    dispatch(getPortfolio())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.post(keyUri.BACKEND_URI +'/portfolio', values, config);
      setTimeout(() => {

        message.success({ content: data.msg, key, duration: 2 });
      }, 500) 
        dispatch(fetchAllPortfolio())

  } catch ({response}) {
       dispatch(getPortfolioFailure())
  }
  
}


export const  deletePortfolio = (id) => async dispatch =>{
    const key = "portfolio"
    dispatch(getPortfolio())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.delete(keyUri.BACKEND_URI +`/portfolio/${id}`);
      data && message.success({ content: data.msg, key, duration: 2 });
      dispatch(fetchAllPortfolio())

  } catch ({response}) {

      dispatch(getPortfolioFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  updatePortfolio = (id, values) => async dispatch =>{
    const key = "portfolio"
    dispatch(getPortfolio())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.put(keyUri.BACKEND_URI +`/portfolio/${id}`, values, config);
      data && message.success({ content: data.msg, key, duration: 2 });
      dispatch(fetchAllPortfolio())
      window.location.reload()

  } catch ({response}) {

      dispatch(getPortfolioFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}




