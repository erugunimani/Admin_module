import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminReducer from './admin'
import employeeReducer from './employee'
import payslipreducer from './payslip'
import todolistReducer from './todolist';
import leaveRequestReducer from './leaveRequest'
import clientReducer from './clients'
import credentialReducer from './credential'
import projectReducer from './project'
import bugTrackerReducer from './bugTracker'
import blogReducer from './blog'
import portfolioReducer from './portfolio'
import subscribeReducer from './subscribe'
import bannerReducer from './bannerSlice'
import testimonialReducer from './testimonials'
import DesignPortfolioReducer from './designPortfolio'




export default configureStore({
  reducer: {

    auth:authReducer,
     admins:adminReducer,
     employee:employeeReducer,
     payslip:payslipreducer,
     todolist:todolistReducer,
     leave:leaveRequestReducer,
     client:clientReducer,
     credential:credentialReducer,
     project:projectReducer,
     BugTracker:bugTrackerReducer,
     blog:blogReducer,
     portfolio:portfolioReducer,
     subscribe:subscribeReducer,
     banner:bannerReducer,
     testimonial:testimonialReducer,
     Designportfolio:DesignPortfolioReducer,


   
  },
});