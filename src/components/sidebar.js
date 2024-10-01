import React  from 'react'
import styled from 'styled-components'
import { Button, Layout, Menu } from 'antd';
import logo123 from '../images/1990logo.png'
import {authenticateSelector} from '../api/authSlice'
import { useSelector} from 'react-redux'
import {Link, useLocation} from 'react-router-dom'



import {
    ProjectOutlined,
    AppstoreOutlined,
    TeamOutlined ,
    SendOutlined,
    CheckCircleOutlined,
    DollarOutlined,
    CarryOutOutlined, 
    KeyOutlined,
    BugOutlined,
    ReadOutlined,
    ContainerOutlined,
    PictureOutlined,
    StarOutlined
  } from '@ant-design/icons';

const {  Sider } = Layout;
const {SubMenu} = Menu;

export default function Sidemenu({ collapsed }) {

const {pathname} = useLocation()
console.log(pathname);
 

const { role } = useSelector(authenticateSelector)
 


    return (
   <SideMenuWrap >
            
             <Sider width={250}    trigger={null} collapsible collapsed={collapsed}>
             <div className="pt-1 " >
            {
              collapsed ? <img src={logo123} className="d-block mx-auto" width="70px" alt="logo"/> :
              <img src={logo123} style={{marginLeft:"2rem",marginTop:"2rem"  }} className="d-block mx-auto py-0" width="150px" alt="logo"/>
            }
            </div>


         
        
          <Menu
           theme='light'
           mode="inline"
           defaultSelectedKeys={[pathname]}
           className="menu"
          >

   
          
           
          <Menu.Item key="/dashboard/home" icon={<AppstoreOutlined />} >   
           <Link to="/dashboard/home">Dashboard</Link> 
          </Menu.Item>

           
            {(role === 'admin' || role === 'hr') &&<Menu.Item key="/dashboard/employee" icon={<TeamOutlined />}>
           <Link to="/dashboard/employee">Employee</Link> 
          </Menu.Item>}


          {(role === 'admin' || role === 'hr') &&<Menu.Item key="/dashboard/payslip" icon={<DollarOutlined /> } >   
           <Link to="/dashboard/payslip">Payslip</Link> 
          </Menu.Item>}

          {(role === 'admin') &&<Menu.Item key="/dashboard/todolist" icon={<CheckCircleOutlined /> } >   
           <Link to="/dashboard/todolist">My TodoList</Link> 
          </Menu.Item>}
          
          {(role === 'admin') &&<Menu.Item key="/dashboard/employee-todolist" icon={<CarryOutOutlined /> } >   
           <Link to="/dashboard/employee-todolist">Employee TodoList</Link> 
          </Menu.Item>}

          {(role === 'admin') &&<Menu.Item key="/dashboard/leaverequest" icon={<SendOutlined  />} >   
           <Link to="/dashboard/leaverequest">Leave Request</Link> 
          </Menu.Item>}

          {/* {(role === 'admin') &&<Menu.Item key="/dashboard/clients" icon={<TeamOutlined />} >   
           <Link to="/dashboard/clients">Clients</Link> 
          </Menu.Item>}

          {(role === 'admin') &&<Menu.Item key="/dashboard/credential-manager" icon={<KeyOutlined /> } >   
           <Link to="/dashboard/credential-manager" style={{fontSize:'15px'}}>Credential Manager</Link> 
          </Menu.Item>}

          {(role === 'admin') &&<Menu.Item key="/dashboard/projects" icon={<ProjectOutlined />} >   
           <Link to="/dashboard/projects" style={{fontSize:'15px'}}>Projects</Link> 
          </Menu.Item>}


           {(role === 'admin' || role === 'tester') &&<Menu.Item key="/dashboard/bug-tracker" icon={<BugOutlined />} >   
           <Link to="/dashboard/bug-tracker" style={{fontSize:'15px'}}>Defect Tracker</Link> 
           
          </Menu.Item>}

          {(role === 'admin')&&<Menu.Item key="dashboard/blog" icon={<ReadOutlined />} >
          <Link style={{ textDecoration: 'none' }} to="/dashboard/blog">Blogs</Link>
            </Menu.Item>} */}


            {/* {(role === 'admin') &&<SubMenu title="Portfolio" style={{backgroundColor:'#07070700 !important',color:'#6565BF !important'}}>

            {(role === 'admin') && <Menu.Item key="dashboard/website-portfolio" icon={<ContainerOutlined />} >
          <Link style={{ textDecoration: 'none' }} to="/dashboard/website-portfolio">Website Portfolio</Link>

          
            </Menu.Item>}
            {(role === 'admin') && <Menu.Item key="dashboard/design-portfolio" icon={<PictureOutlined/>} >
          <Link style={{ textDecoration: 'none' }} to="/dashboard/design-portfolio">Design Portfolio</Link>

          
            </Menu.Item>}
            </SubMenu>} */}

          


            {/* {(role === 'admin')&&<Menu.Item key="dashboard/banners" icon={<PictureOutlined />}>
          <Link style={{ textDecoration: 'none' }} to="/dashboard/banners">Banner</Link>
            </Menu.Item>}

            
          {(role === 'admin')&&<Menu.Item key="dashboard/testimonials" icon={<StarOutlined /> }>
            <Link to='/dashboard/testimonials'>Testimonials</Link>
          </Menu.Item>}
           
           {(role === 'admin') &&<Menu.Item key="dashboard/subscribe" icon={<TeamOutlined />} >
            <Link to="/dashboard/subscribers">Subscribers</Link>
            </Menu.Item>}
          
          {(role === 'admin') &&<Menu.Item key="/dashboard/versioncontrol" >
           <Link className=' absolute bottom-0' to={`/version-release`} target="_blank">Version Release</Link>
           </Menu.Item>} */}
           
           </Menu>
          


         
        </Sider>
        </SideMenuWrap>
      
    )
}


const SideMenuWrap = styled.div`
.ant-menu:not(.ant-menu-horizontal) 
margin:5px ;


.ant.menu-submenu-selected {
  background-color: white !important;
    border-radius: 5px;
    box-shadow: 2px 2px 4px 1px #fff;
    svg{
  color: black !important;
}
}
.ant-menu-submenu:not(.ant-menu-submenu-horizontal) .ant-menu-submenu-item-selected a {
  color: black !important;
  
}

.ant-menu-item-selected {
    background-color: white !important;
    border-radius: 5px;
    box-shadow: 2px 2px 4px 1px #fff;
    svg{
  color: black !important;
}
}
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected a {
  color: black !important;
  
}
.menu{
font-size:1rem;
letter-spacing:0.2px;
margin-top:4rem ;

svg{
  font-size:1.25rem;
  transform:translate(-6px, -4px);
  color:var(--brandColor);
}
}
.mode{
position:absolute;
bottom:5%;
left:10%;
 ${'' /* .ant-switch{
  background-color:${props=>props.color? "grey":"#1890FF"};
}  */}
}
`