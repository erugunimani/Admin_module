import Logo from '../../images/office6.png'
 
import data from './data'
import {message } from 'antd'
import { HiOutlineClock } from 'react-icons/hi';
import React, {useEffect,useState} from 'react'
import { authenticateSelector,updateAdminPassword } from '../../api/authSlice'
import banner from '../../images/menuIcons/office1990.png'
import logo from '../../images/office6.png'
import { useForm } from "react-hook-form";
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOneAdmin } from '../../api/admin';
import { adminSelector } from '../../api/admin';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;




export default function NewPassword() {

    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown,setConfirmPasswordShown] = useState(false)
    const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
    };
    const toggleConfirmPasswordVisiblity = ()=>{
        setConfirmPasswordShown(confirmPasswordShown ? false :true)
    }



    const {id} = useParams()

    const {user,current_user} = useSelector(authenticateSelector)
    const {current_admin} = useSelector(adminSelector)
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm();


    useEffect(()=>{
        console.log("fetchOne cALLING....")
        dispatch(fetchOneAdmin(id))
    },[id])
    
    
const onSubmit = data => {
    console.log(current_admin)
    console.log(data)
    if(data.confirm_password != data.password)
    message.error("Passwords does not match")
   
   else {

    console.log("else",current_admin,data)
    const updateData = {
        new_password:data.password,
        email:current_admin?.email,
        name:current_admin?.name,
        role:current_admin?.role,
        notifications:current_admin?.notifications,

    }
    console.log("data is",updateData)
    dispatch(updateAdminPassword(id,updateData))
    console.log("after dispatch")
    }
}

  return (
    <div className=' bg-white'>

        {/* <div className='w-full bg-zinc-100 fixed top-0 bg-white'>
        <div className='max-w-screen-xl  mx-auto h-20 2xl:h-24 px-10 flex justify-start items-center'>
            <img src={Logo} alt='Logo' style={{ width: "auto", height: '38px', display: 'block', }}/>
        </div>
        </div> */}

 
            
<form class='form' onSubmit={handleSubmit(onSubmit)}>
        <img class="img1" src={logo} width="100px"/>
      
        <div class="inputBox">
        <input className = "text-white"  {...register("password")} type={passwordShown ? "text" : "password"} required="required"/>
        <span>New Password</span>
         <div className = "text-white right-3" onClick={togglePasswordVisiblity}>{eye}</div>{" "}

        </div>
        <div class="inputBox">
        <input className = "text-white" {...register("confirm_password")} type={confirmPasswordShown ? "text" : "password"} required="required"/>
        <span>Confirm Password</span>
         <div className = "text-white right-3" onClick={toggleConfirmPasswordVisiblity}>{eye}</div>{" "}
        </div>
        <div class="links">
        </div>
        <input className=' w-96' type="submit" value="Reset Password"/>
        </form>

  
    </div>
  )
}