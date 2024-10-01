import React, {useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { authenticateSelector,fetchlogin } from '../../api/authSlice'
import banner from '../../images/menuIcons/office1990.png'
import logo from '../../images/office6.png'
import { useForm } from "react-hook-form";
import { useSelector,useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;



export default function Login31Oct({history}){

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
    };

    const { isAuthenticate,user } = useSelector(authenticateSelector)
    const dispatch = useDispatch()

    const {register,handleSubmit} = useForm();

    const onSubmit = data => dispatch(fetchlogin(data))


    useEffect(()=>{
        if(isAuthenticate){
            window.location.href = '/dashboard/home'
        }else{
            if(user){

                console.log("User is fetched")
                window.location.href = `/newPassword/${user?._id}`
            }
            // history.push('/dashboard/payslip')
            else
             history.push('/')
        }
    },[isAuthenticate,user])


    return(
        <div className=' bg-black'>
        <div className=' flex'>
       <img class="img2" src={banner} style={{height:'100vh'}}/>

        <div class="box ">
        <div>
            
        <form class='form' onSubmit={handleSubmit(onSubmit)}>
        <img class="img1" src={logo} width="100px"/>
        <div class="inputBox">
        <input {...register("email")} type="text" required="Email is required"/>
        <span>Username</span>
        <i></i>
        </div>
        <div class="inputBox">
        <input className=' text-white' {...register("password")} type={passwordShown ? "text" : "password"} required="password is required"/>
        <span>Password</span>
        <i></i>
        <div className = " absolute text-white right-3" onClick={togglePasswordVisiblity}>{eye}</div>{" "}

        </div>
        <div class="links">
        </div>
        <input type="submit" value="Login"/>
       <Link to = "/loginWithPhoneNumber">
        <button style={{color:'white',border:'2px solid white',padding:'5px'}}>Login with OTP</button>
        </Link>
        </form>

        </div>
        </div>
        </div>
        </div>
    )
}
