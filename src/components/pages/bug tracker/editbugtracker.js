import React,{useEffect}from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useHistory,useParams } from 'react-router-dom'
import {Form,Select,Input,Button} from 'antd'
import { fetchAllProject, projectSelector } from '../../../api/project'
import TextArea from 'antd/lib/input/TextArea'
import { employeeSelector, fetchAllEmployee } from '../../../api/employee'
import { BugTrackerSelector, createBugTracker, fetchOneBugTracker, updateBugTracker } from '../../../api/bugTracker'
import { authenticateSelector } from '../../../api/authSlice'



const {Option} = Select

function EditBugTracker() {
    const dispatch = useDispatch()
    const {id} = useParams();

    const history = useHistory()
    const [form] = Form.useForm()

    const {token} = useSelector(authenticateSelector)
    const {currentBugTracker} = useSelector(BugTrackerSelector)
    const {all_projects}  = useSelector(projectSelector)
    const {all_employee} = useSelector(employeeSelector)
    console.log(currentBugTracker)

    useEffect(()=>{
            dispatch(fetchOneBugTracker(id))
            dispatch(fetchAllProject())
            dispatch(fetchAllEmployee(token))
            
    },[id])
    useEffect(()=>{
       
        form.setFieldsValue({
            bug_priority:currentBugTracker && currentBugTracker?.bug_priority,
            employee_assigned_to:currentBugTracker && currentBugTracker?.employee_assigned_to?._id,
            issue_description: currentBugTracker && currentBugTracker?.issue_description,
            issue_type:createBugTracker && currentBugTracker?.issue_type,
            project:currentBugTracker && currentBugTracker?.project?._id,
            project_module:currentBugTracker && currentBugTracker?.project_module,
            bug_status : currentBugTracker && currentBugTracker?.bug_status
            

        })
    },[currentBugTracker])

    const onFinish = (value) =>{
        console.log(value)
        const data = {
            bug_priority:value.bug_priority,
            employee_assigned_to:value.employee_assigned_to,
            issue_description:value.issue_description,
            issue_type:value.issue_type,
            project:value.project,
            project_module:value.project_module,
            remarks:currentBugTracker?.remarks,
             bug_status:value.bug_status,

        }
        console.log(data)
        dispatch(updateBugTracker(id,data))
        history.goBack()

    }
  return (
        <div>
            <Form
                form = {form}
                onFinish= {onFinish}>
                <Form.Item label= "Project Name" name = "project"
                rules={[{required:true,message:'required'}]}>
                    <Select placeholder= "Select Project Name" disabled>
                        {
                            all_projects?.map((item)=>{
                                return <option key = {item?._id} value = {item._id}>{item?.project_name}</option>
                            })
                        }
                    </Select>
                </Form.Item>

                <Form.Item label= "Project Module" name = "project_module" rules={[{message:'project module is required ',required:true,whitespace:true}]}>
                    <Input placeholder='Module where there is an error'/>
                </Form.Item>

                <Form.Item label= "Type" name = "issue_type" rules={[{message:'Defect type is required ',required:true,whitespace:true}]}>
                    <Select placeholder="Select the type">
                        <Option value = "defect">Defect</Option>
                        <Option value="new function">New Function</Option>
                    </Select>
                </Form.Item>

                <Form.Item label= "Issue Description" name = "issue_description" rules={[{message:'Issue description is required ',required:true,whitespace:true}]}>
                    <TextArea placeholder='Write your description'/>
                </Form.Item> 

                <Form.Item label= "Priority" name = "bug_priority" rules={[{message:'Priority is required ',required:true,whitespace:true}]}>
                    <Select placeholder="Select the priority">
                        <Option value = "high">High</Option>
                        <Option value = "medium">Medium</Option>
                        <Option value = "low">Low</Option>
                    </Select>
                </Form.Item> 

                <Form.Item label="Assigned To" name = "employee_assigned_to" rules={[{message:'Employee Assigned To.. is required ',required:true,whitespace:true}]}>
                    <Select>
                        {
                            all_employee?.map((item)=>{
                                return <option key = {item?._id} value= {item?._id}>{item?.personal?.full_name}</option>
                            })
                        }
                    </Select>
                </Form.Item>
                <div>
{

                currentBugTracker?.bug_status =='fixed' || currentBugTracker?.bug_status == 're-test' ||currentBugTracker?.bug_status == "not-an-issue" ?<Form.Item label= "Defect-Status"  name = "bug_status" rules={[{message:'Defect Status is required ',required:true,whitespace:true}]}>
                    <Select placeholder="Select the Bug Status">
                        <Option value = "re-test">Re-test</Option>
                        <Option value = "re-open">Re-Open</Option>
                        <Option value = "completed">Completed</Option>      
                    </Select>
                </Form.Item> :""
}
                
                </div>
                
                <Form.Item wrapperCol={{ span: 20, offset: 9}}>
                    <Button type="primary" htmlType="submit">Assign Issue</Button>
                </Form.Item>
                
               
            </Form>
        </div>
  )
}

export default EditBugTracker