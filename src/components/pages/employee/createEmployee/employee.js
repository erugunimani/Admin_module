import {DatePicker,message, Button,Form ,Input,Select,InputNumber } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import { useDispatch } from 'react-redux';
import moment from 'moment'
import { useEffect, useLayoutEffect } from 'react';
import { useState } from 'react';



export default function Employee({actionMethod,info}){
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const [dob,setdob] = useState(null)

 

    const onfinishEmployee = (values)=>{
    
        console.log(values.dob);

        var numbers = /^[0-9]+$/;
    // if(!values.phone_number.match(numbers) )
    // {
    //        return message.error("Phone number must be only numbers") 
    // }
    // else{
        
   
        const employeedata = {
            employee:{

                first_name:values.first_name,
                last_name:values.last_name,
                dob:moment(values.dob).format(),
                gender:values.gender,
                nationality:values.nationality,
                phone_number:values.phone_number,
                personal_email:values.personal_email,
                present_address:values.present_address,
                work_location:values.work_location,
                doj:moment(values.doj).format(),
                acceptance_date:moment(values.acceptance_date).format(),
                division:values.division,
                designation:values.designation,
                emp_id:values.emp_id,
                permanent_address:values.permanent_address,
                
            },
            office_email:values.office_email,
        }
        dispatch(actionMethod())
        dispatch(info(employeedata))

        console.log(employeedata)
        // }
        
    }
    useEffect(()=>{

    },[])
   

    return (
        <div className="mt-5 mx-5">
            <Form onFinish={onfinishEmployee}
                  name = 'employee'
                  form = {form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  initialValues={{remember:true}}>
                  <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Form.Item
                        label={<p className=" text-left m-0 w-32">First Name</p>}
                        name ="first_name"
                        rules={[{required:true, message: 'First name required!',whitespace:true}]}>
                        <Input placeholder='First Name'/>
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-left m-0 w-32">Last Name</p>}
                        name ="last_name"
                        rules={[{required:true, message: 'Last name is required!',whitespace:true}]}>
                        <Input placeholder='First Name'/>
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-left m-0 w-32">Date of Birth</p>}
                        name ="dob"
                        rules={[{required:true, message: 'required!'}]}>
                        <DatePicker  picker="date" placeholder='DOB'/>
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-left m-0 w-32">Gender</p>}
                        name ="gender"
                        rules={[{required:true, message: 'required!'}]}>
                        <Select
                           showSearch
                           placeholder="Select Gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-left m-0 w-32">Nationality</p>}
                        name ="nationality"
                        rules={[{required:true, message: 'Nationality is required!',whitespace:true}]}>
                        <Input placeholder='Nationality'/>
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-left m-0 w-32">Phone Number</p>}
                        name ="phone_number"
                        rules={[{required:true}]}>
                        <InputNumber placeholder='Phone Number' maxLength={10}/>
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-left m-0 w-32">Personal Email</p>}
                        name ="personal_email"
                        rules={[{required:true, message: 'Email is required Please Enter Valid Email-id!',type:'email'}]}>
                        <Input placeholder='Personal Email'/>
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-left m-0 w-48">Present Address</p>}
                        name ="present_address"
                        rules={[{required:true, message: 'Present Address is required!',whitespace:true}]}>
                        <TextArea placeholder='Present address'/>
                    </Form.Item>
                    </div>
                    <div>
                    <Form.Item
                        label={<p className=" text-left m-0 w-32">Work Location</p>}
                        name ="work_location"
                        rules={[{required:true, message: 'Work Location is required!',whitespace:true}]}>
                        <Input placeholder='Work Location'/>
                    </Form.Item>
                    
                    <Form.Item
                        label={<p className=" text-left m-0 w-96">Offer Acceptance Date</p>}
                        name ="acceptance_date"
                        rules={[{required:true, message: 'required!'}]}>
                        <DatePicker picker='date' placeholder='Offer accepted date'/>
                    </Form.Item>

                    <Form.Item
                        label={<p className=" text-left m-0 w-32">Joining Date</p>}
                        name ="doj"
                        rules={[{required:true, message: 'required!'}]}>
                        <DatePicker picker="date" placeholder='Joining date'/>
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-left m-0 w-32">Division</p>}
                        name ="division"
                        rules={[{required:true, message: 'Division in which they work is required!',whitespace:true}]}>
                        <Input placeholder='department (eg.,development,design,sales)'/>
                    </Form.Item>   
                    <Form.Item
                        label={<p className=" text-left m-0 w-32">Designation</p>}
                        name ="designation"
                        rules={[{required:true, message: 'Designation is required!',whitespace:true}]}>
                        <Input placeholder='Designation'/>
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-left m-0 w-32">Employee ID</p>}
                        name ="emp_id"
                        rules={[{required:true, message: 'Employee ID required!',whitespace:true}]}>
                        <Input placeholder='Employee ID'/>
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-left m-0 w-32">Office Email</p>}
                        name ="office_email"
                        rules={[{required:true, message: 'Office email is required and Enter a valid email-id!',whitespace:true,type:'email'}]}>
                        <Input placeholder='Office email'/>
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-left m-0 w-96">Parmanent Address</p>}
                        name ="permanent_address"
                        rules={[{required:true, message: 'Parmanent address is required!',whitespace:true}]}>
                        <TextArea placeholder='Permanent address'/>
                    </Form.Item>     
                    </div>
                  </div>
                    <div className="mt-4 float-right">
                    <Form.Item className="text-right">
                        <Button type="primary" htmlType="submit">
                          Next
                        </Button>
                    </Form.Item>
                </div>
                 

            </Form>
        </div>
    )
    
}