import React, { useEffect, useState } from 'react'
import { Form, InputNumber,Button,Input } from 'antd'
import "firebase/auth";
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import {findAdminOTP,adminSelector} from '../../api/admin'



const auth = firebase.auth();

function PhoneOTPSignIn() {

  const [flag,setFlag] = useState(true)
  const {hasError,isAuthenticate} = useSelector(adminSelector)
  const [phoneNumber,setPhoneNumber] = useState('')
  const [recaptchaVerifier, setrecaptchaVerifier] = useState({});
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState('');
  
  
  const dispatch = useDispatch()

  const onVerifyPhoneNumber = (values)=>{
    setPhoneNumber("+91"+values.phone_no)
    const data = {
      phone_no:values.phone_no
    }
    dispatch(findAdminOTP(data))

    console.log(phoneNumber)
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    setrecaptchaVerifier(recaptchaVerifier)         
    auth.signInWithPhoneNumber("+91"+values.phone_no,recaptchaVerifier)  
    .then((confirmationResult) => {
    const verificationId = confirmationResult.verificationId;
    setVerificationId(verificationId);
    recaptchaVerifier.clear();         
    })
    .catch((error) => {
    console.log(error);
    });
 }

//  useEffect(()=>{
//   setFlag(true)
//  },[])

//  useEffect(()=>{
//    hasError && setFlag(true)
//  },[hasError])

 console.log(hasError,flag)

 


 const onVerifyOTP = (values) => {

  const OTP = values.verifyOTP
  setOtp(values.verifyOTP)
  console.log(values.verifyOTP)
 console.log('inside handleVerification')   
 console.log(verificationId)
 try {
 const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, values.verifyOTP);
 console.log(credential)
 firebase.auth().signInWithCredential(credential);
 alert('OTP Verified succesfully');
 if(isAuthenticate)
window.location.href = '/dashboard/home'
 setOtp("");
 // redirect to the next page or perform any other action
 } catch (error) {
  //  setButton_name('Resend OTP')
   alert('Invalid OTP. Please try again or resend OTP.');
   setOtp("");
 }
 };

  // const onVerifyOTP = (values)=>{
  //   console.log(values)
  // }
  return (
    <div className='bg-white'><p className='text-center'>OTP Sign in</p>
    <Form onFinish={onVerifyPhoneNumber} style={{display:flag ? "block" :"none"}}>
      <Form.Item label = "Phone Number" name = "phone_no" 
       rules={[{required:true}]}>
        <Input maxLength={10}/>

      </Form.Item>
      <Button type="primary" htmlType="submit">
          Generate OTP
      </Button>
   </Form>
{
  !hasError &&<>
  <div style={{marginLeft:'482px', marginBottom:'20px',}} id="recaptcha-container"></div>
   <Form onFinish={onVerifyOTP} style={{display:flag ? "block" :"none"}}>
      <Form.Item label = "Enter your OTP" name = "verifyOTP"  
       rules={[{required:true}]}>
        <Input maxLength={6}/>

      </Form.Item>
      <Button type="primary"  htmlType="submit">
           Verify
      </Button>
   </Form> 
   </>
}

   

    
    </div>
  )
}

export default PhoneOTPSignIn