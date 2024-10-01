import React, {useState, useEffect} from 'react'
import { Layout, Affix } from 'antd';
import styled from 'styled-components'
import SideBar from './sidebar'
import Header from './header'
import {  Route, Switch, useRouteMatch,Link } from 'react-router-dom';


import Loader from '../components/shared/loader'
import {fetchAdminProfile, authenticateSelector} from '../api/authSlice'




// import Home from './pages/dashboard'
import Employee from './pages/employee';
import EditEmployee from './pages/employee/editemployee/index';
import Payslip from './pages/payslip';
import {useDispatch, useSelector} from 'react-redux';

import Todolist from './pages/todolist';
import EmpProfile from './pages/empProfile';
import Home from './pages/home/index'
import Leave from './pages/leave'
import Client from './pages/client'
import CredentialHome from './pages/credential'
import CreateCredential from './pages/credential/create-credential';
import ShowCredentials from './pages/credential/show_credentials'
import CreateEmployee from './pages/employee/createEmployee/index'


import {AnimatePresence} from 'framer-motion'
import CreateClient from './pages/client/createclient';
import EditClient from './pages/client/editclient';
import Projects from './pages/projects/index';

import CreateProject from './pages/projects/createproject';
import ShowProject from './pages/projects/show-project';
import EditProject from './pages/projects/editProject/index';

import Blog from './pages/blog'
import CreateBlog from './pages/blog/createblog'
import EditBlog from './pages/blog/editblog'
 

import {notification} from 'antd'
import socket from '../socket'
import ShowLeave from './pages/leave/show-leave';
import ShowNotification from './shared/showNotifcation'

import EmployeeTodolist from './pages/employeeTodolist/index'
import BugTracker from './pages/bug tracker/index'
import CreateBugTracker from './pages/bug tracker/createBugTracker'
import EditBugTracker from './pages/bug tracker/editbugtracker';

import Portfolio from './pages/portfolio/index'
import CreatePortfolio from './pages/portfolio/createPortfolio'
import EditPortfolio from './pages/portfolio/editportfolio'

import Subscriber from './pages/subscribers/index'


import Banners from './pages/banners'
import CreateBanner from './pages/banners/createbanner'
import EditBanner from './pages/banners/editbanner'



import Testionials from './pages/testimonials'
import CreateTestionials from './pages/testimonials/createtestimonials'
import EditTestionials from './pages/testimonials/edittestimonial'
import Newpaassword from './auth/newPaassword';


import DesignPortfolio from './pages/designPortfolio/index'
import CreateDesignPortfolio from './pages/designPortfolio/createDesignPortfolio'
import EditDesignPortfolio from './pages/designPortfolio/editDesignPortfolio'





const {  Content} = Layout;
 

export default function Admin({location}) {
    let { path } = useRouteMatch();
    const [collapsed, setCollapsed] = useState(false)
     

    const dispatch = useDispatch()
    const {loading, token,user} = useSelector(authenticateSelector)
     
    console.log({user})
    const openNotification = (data) => {

      const args = {
        message: data.msg,
        duration: 0,
        btn: <a className = " hover: bg-blue-200 underline" 
        href = {`/dashboard/show-leave/${data.leave._id}`}>View</a>
      };
      notification.success(args);
    };
     

useEffect(()=>{

    
        dispatch(fetchAdminProfile(token))

        socket.on("result",(data)=>{
          console.log(data)

        openNotification(data)

          
        })
}, [])




 


    const  toggle = () => {

        setCollapsed(!collapsed)

      
      };

      const changeTheme = () =>{

        return false
    
    }
 

 

    return (
      <> {

  loading? <Loader/> : <AdminWrap >
        <Layout>
        <Affix offsetTop={0} onChange={affixed => console.log(affixed)}>
     <SideBar collapsed={collapsed} color={false}  click={changeTheme}/>
     </Affix>

        <Layout className="site-layout">
        
        <Header click={toggle} collapsed={collapsed}/>


        <Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 1000,
      }}
    >
          <AnimatePresence exitBeforeEnter initial={false} >

        
        <Switch location={location} key={location.pathname}>


 {/* <Route exact path = {`${path}/newPassword`} component = {version}/> */}
 <Route  exact path={`${path}/home`}  component={Home} />

<Route  exact path={`${path}/employee`}  component={Employee} />
<Route exact path = {`${path}/create-employee`} component ={CreateEmployee}/>
<Route exact path={`${path}/edit-employee/:id`} component={EditEmployee}/>
<Route exact path ={`${path}/userprofile`} component ={EmpProfile}/>


<Route  exact path={`${path}/payslip`}  component={Payslip} /> 
<Route exact path ={`${path}/todolist`} component = {Todolist}/>
<Route exact path ={`${path}/employee-todolist`} component = {EmployeeTodolist}/>

<Route exact path ={`${path}/leaverequest`} component ={Leave}/>
<Route exact path = {`${path}/show-leave/:id`} component = {ShowLeave}/>


<Route exact path ={`${path}/clients`} component ={Client} />
<Route exact path ={`${path}/create-client`} component ={CreateClient}/>
<Route exact path = {`${path}/edit-client/:id`} component ={EditClient}/>
<Route exact path = {`${path}/credential-manager`} component ={CredentialHome}/>
<Route exact path = {`${path}/create-credentials`} component ={CreateCredential}/>
<Route exact path = {`${path}/showCredentials/:id`} component = {ShowCredentials}/>

<Route exact path = {`${path}/projects`} component = {Projects}/>
<Route exact path ={`${path}/create-project`} component ={CreateProject}/>
<Route exact path = {`${path}/showProject/:id`} component = {ShowProject}/>
<Route exact path = {`${path}/edit-project/:id`} component = {EditProject}/>


 <Route exact path = {`${path}/show-notification`} component = {ShowNotification}/>
<Route exact path = {`${path}/bug-tracker`} component = {BugTracker}/>
<Route exact path = {`${path}/create-bug-tracker`} component = {CreateBugTracker}/>
<Route exact path = {`${path}/edit-issues/:id`} component = {EditBugTracker}/>


<Route exact path = {`${path}/blog`} component={Blog}/> 
<Route  exact path={`${path}/create-blog`}  component={CreateBlog} /> 
<Route  exact path={`${path}/edit-blog/:id`}  component={EditBlog} />

<Route exact path = {`${path}/website-portfolio`} component= {Portfolio}/>
<Route exact path = {`${path}/create-portfolio`} component = {CreatePortfolio}/>
<Route  exact path={`${path}/edit-portfolio/:id`}  component={EditPortfolio} />


<Route exact path ={`${path}/subscribers`} component={Subscriber}/>

<Route exact path = {`${path}/banners`} component={Banners}/>
<Route exact path = {`${path}/create-banner`} component={CreateBanner}/>
<Route exact path = {`${path}/banner/:id`} component={EditBanner}/>


<Route exact path = {`${path}/testimonials`} component={Testionials}/>
<Route exact path = {`${path}/create-testimonials`} component={CreateTestionials}/>
<Route exact path = {`${path}/testimonial/:id`} component={EditTestionials}/>


<Route exact path = {`${path}/design-portfolio`} component={DesignPortfolio}/>
<Route exact path = {`${path}/create-design-portfolio`} component ={CreateDesignPortfolio}/>
<Route exact path = {`${path}/edit-design-portfolio/:id`} component={EditDesignPortfolio}/>





 
</Switch>
 </AnimatePresence>
          </Content> 
        </Layout>
      </Layout>
    </AdminWrap>
     
      }
       </>
    )
}


const AdminWrap = styled.div`

.ant-layout {
.ant-layout-sider{
    height: 100vh;
    background:${props => !props.color ? "#001529" : "#FFFFFF"};
}
}

.logo {
height: 32px;
background: rgba(255, 255, 255, 0.2);
margin: 32px;



}
#components-layout-demo-custom-trigger .logo {
height: 32px;

margin: 16px;
}
.site-layout .site-layout-background {
background: #fff;
}
`