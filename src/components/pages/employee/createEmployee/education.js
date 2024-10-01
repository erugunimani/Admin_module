import {Form,Input, Select,DatePicker,InputNumber,Button, Collapse} from 'antd';
import moment from 'moment'
import { useDispatch } from 'react-redux';

const {Panel} = Collapse
export default function Education({actionMethod,info}){
    const dispatch = useDispatch();
    const [form] = Form.useForm()

    const onfinishEducation = (values)=>{
         
        
        const educationdata ={
            education:{
                high_school:{
                     hs_institute_name:values.hs_institute_name,
                     hs_board_name:values.hs_board_name,
                     hs_from:moment(values.hs_from).format(),
                     hs_to:moment(values.hs_to).format(),
                     hs_percentage:values.hs_percentage,
                     
                },
                intermediate:{
                     i_institute_name:values.i_institute_name,
                     i_board_name:values.i_board_name,
                     i_specialisation:values.i_specialisation,
                     i_from:moment(values.i_from).format(),
                     i_to:moment(values.i_to).format(),
                     i_percentage:values.i_percentage,
 
                },
                bachelors:{
                     b_institute_name:values.b_institute_name,
                     b_board_name:values.b_board_name,
                     b_specialisation:values.b_specialisation,
                     b_from:moment(values.b_from).format(),
                     b_to:moment(values.b_to).format(),
                     b_percentage:values.b_percentage,
 
                },
 
           },
        }
        console.log(educationdata)
        dispatch(actionMethod())
        dispatch(info(educationdata))
    }
    return(
        <div className="mt-5 mx-5">
        <Form onFinish = {onfinishEducation}
              name ='education'
              form = {form}
              labelCol={{span: 24}}
              wrapperCol={{span : 24}}
              initialValues={{remember:true}}>
        <div className="grid gap-4">
        <Collapse>
        <Panel header="High School" key = "1">
        <div className=' grid grid-cols-2 gap-3'>
        <Form.Item
            label="Institute Name"
            name="hs_institute_name"
            rules={[{ required: true, message: 'High School name is required',whitespace:true}]}>
            <Input placeholder='High school name'/>
        </Form.Item>
        <Form.Item
            label="Name of the board"
            name="hs_board_name"
            rules={[{ required: true, message: 'High School Board is required',whitespace:true}]}>
            <Input placeholder='High school board'/>
        </Form.Item>
        </div>

        <h1>Year of Studying</h1>
        <div className=' grid grid-cols-3 gap-3'>
        <Form.Item
            label="From"
            name="hs_from"
            rules={[{ required: true, message: 'High School Year Started is required'}]}>
            <DatePicker picker='year' placeholder='Studied from'/>
        </Form.Item>
        <Form.Item
            label="To"
            name="hs_to"
            rules={[{ required: true, message: 'High School End Year is required'}]}>
            <DatePicker picker='year' placeholder='Studied till..'/>
        </Form.Item>
        <Form.Item
            label="Percentage"
            name="hs_percentage"
            rules={[{ required: true, message: 'High School Percentage is required',whitespace:true}]}>
            <Input placeholder='High school percentage'/>
        </Form.Item>
        </div>
        </Panel>
        <Panel header="Intermediate" key = "2">
        <div className=' grid grid-cols-3 gap-2'>
        <Form.Item
            label="Institute Name"
            name="i_institute_name"
            rules={[{ required: true, message: 'Intermediate institute name is required',whitespace:true}]}>
            <Input placeholder='College name'/>
        </Form.Item>
        <Form.Item
            label="Name of the board"
            name="i_board_name"
            rules={[{ required: true, message: 'Intermediate Board Name is required',whitespace:true}]}>
            <Input placeholder='College board'/>
        </Form.Item>
        <Form.Item
            label="Specialisation"
            name="i_specialisation"
            rules={[{ required: true, message: 'Intermediate Specialisation is required',whitespace:true}]}>
            <Input placeholder='Specialisation in'/>
        </Form.Item>
        </div>
        <h1>Year of Studying</h1>
        <div className=' grid grid-cols-3 gap-3'>
        <Form.Item
            label="From"
            name="i_from"
            rules={[{ required: true, message: 'required'}]}>
            <DatePicker picker='year' placeholder='Studied from'/>
        </Form.Item>
        <Form.Item
            label="To"
            name="i_to"
            rules={[{ required: true, message: 'required'}]}>
            <DatePicker picker='year' placeholder='Studied till..'/>
        </Form.Item>
        <Form.Item
            label="Percentage"
            name="i_percentage"
            rules={[{ required: true, message: 'required'}]}>
            <Input placeholder='Intermediate percentage'/>
        </Form.Item>
        </div>
        </Panel>
        <Panel header="Bachelors" key = "3">
        <div className=' grid grid-cols-3 gap-3'>
        <Form.Item
            label="Institute Name"
            name="b_institute_name"
            rules={[{ required: true, message: 'Institute name is required',whitespace:true}]}>
            <Input placeholder='Institute name'/>
        </Form.Item>
        <Form.Item
            label="Name of the board"
            name="b_board_name"
            rules={[{ required: true, message: 'Board of Study is required',whitespace:true}]}>
            <Input placeholder='University Board'/>
        </Form.Item>
        <Form.Item
            label="Specialisation"
            name="b_specialisation"
            rules={[{ required: true, message: 'Board Specialisation is required',whitespace:true}]}>
            <Input placeholder='Specialisation in'/>
        </Form.Item>
        </div>
        <h1>Year of Studying</h1>
        <div className=' grid grid-cols-3 gap-3'>
        <Form.Item
            label="From"
            name="b_from"
            rules={[{ required: true, message: 'required'}]}>
            <DatePicker picker='year' placeholder='Studied from'/>
        </Form.Item>
        <Form.Item
            label="To"
            name="b_to"
            rules={[{ required: true, message: 'required'}]}>
            <DatePicker picker='year' placeholder='Studied till..'/>
        </Form.Item>
        <Form.Item
            label="Percentage"
            name="b_percentage"
            rules={[{ required: true, message: 'Percentage is required',whitespace:true}]}>
            <Input placeholder='Bachelors percentage'/>
        </Form.Item>
        </div>
        </Panel>
        </Collapse>  
       </div>
        <div className="mt-4 float-right">
            <Form.Item className="text-right">
            <Button type="primary" htmlType="submit">Next</Button>
            </Form.Item>
        </div>
        </Form>
        </div>
    
    )
}