import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import  {Table,Space,Select,Button} from 'antd'
import { Link } from 'react-router-dom'
import DeleteConfirm from '../../shared/deleteConfirm'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import { fetchAllProject,projectSelector } from '../../../api/project'
import axios from 'axios'
import { keyUri, config } from '../../../key'
import { deleteBugTracker } from '../../../api/bugTracker'


function Datatable({data}) {


    const dispatch = useDispatch()
    const {all_projects} = useSelector(projectSelector)
    const [filter,setFilter] = useState(null)
    const [status,setStatus] = useState(null)
    const [search,setSearch] = useState(null)
    const [projectId,setProjectId] = useState(null)
    const [page,setPage] = useState(1)
    useEffect(()=>{
        dispatch(fetchAllProject())
    },[])

    const filterProject = (value)=>{
         console.log(value)
         setProjectId(value)
    //     axios.get(keyUri.BACKEND_URI +`/bugTracker?filter=${value}`).then(({data})=>{
    //      setFilter(data) 
    // })
}

const filterStatus = (value)=>{
  setStatus(value)
  
}


const submit =(e)=>{
  e.preventDefault()
  console.log("Onclick search")
  axios.get(keyUri.BACKEND_URI +`/bugTracker/${projectId}?status=${status}`).then(({data})=>{
    setSearch(data)
  })


}
const confirm = (e, id) => {
    dispatch(deleteBugTracker(id._id, ))
   
  }
    const cancel = (e) =>{
        return null
      }
    const columns = [
        {
            title:'Defect ID',
            key: 'defect_id',
            render: text => <p>{text.defect_id}</p>
       },
       {
          title:'Type',
          key:'bug_type',
          render: text => <p className="m-0">{text.issue_type}</p>
       },
       {
        title:'Module',
        key:'project_module',
        render: text => <p className="m-0">{text.project_module}</p>
     },
       {
            title:'Issue Description',
            key:'issue_description',
            render: text => <p className="m-0">{text.issue_description}</p>
       },
       {
            title:'Priority',
            key:'bug_priority',
            render: text => <p className="m-0">{text.bug_priority}</p>
       },
       {
            title:'Assigned To',
            key:'employee_assigned_to',
            dataIndex:'employee_assigned_to',
            render: text => <p className="m-0">{text?.employee?.first_name}</p>
            
        },
        {
            title:'Status',
            key:'bug_status',
             render: text =><p>{text?.bug_status}</p>
            
        },
        {
            title:'Remarks',
            key:'bug_remarks',
             render: text => <p className="m-0">{text?.bug_remarks}</p>
            
        },
        {
            title:'Action',
            key:'action',
            render: (id) => (
                <Space size="middle">
                  
                <h5 className="text-secondary" >{
                id?.bug_status != 'completed'?<Link to={`/dashboard/edit-issues/${id._id}`} >
    
                  <FaRegEdit onClick={(e)=>console.log("edit") }className=" bg-color-red text-secondary"  /> 
                   </Link>  :" "           
                  }
                  </h5>
              {/* <h5 className="text-danger">{
                    id?.bug_status != 'completed'? 
                    <DeleteConfirm  confirm={(e)=>confirm(e, id)} title="employee" cancel={cancel} >
                      <FaRegTrashAlt style={{cursor:"pointer",color:"#e43d3d"}} />
                  </DeleteConfirm>:""
                }</h5> */}
              </Space>
              ),
            
        },

    ]
  return (
    <div>
       <Select style={{width:'180px'}} placeholder= "Select Project Name" onChange={filterProject} >
                        {
                            all_projects?.map((item)=>{
                                return <option key = {item?._id} value = {item._id}>{item?.project_name}</option>
                            })
                        }
                    </Select>
        <Select style={{marginLeft:'10px',width:'180px'}} placeholder= "Select Project Status" onChange={filterStatus} >
                         
                                 <option value = "fixed">Fixed</option>
                                 <option value = "New">New</option>
                                 <option value = "completed">Completed</option>
                                 <option value = "in-progress">In-Progress</option>
                                 <option value = "re-test">Re-Test</option>
                                 <option value = "re-open">Re-Open</option>                    
          </Select> <Button onClick={(e)=>submit(e)}>Search</Button>
    <Table rowKey={record => record._id}
           pagination={{
                   onChange(current) {
                   setPage(current);
                 }
            }}
           columns= {columns}
           dataSource = {search ?search: data }bordered 
           > 
    </Table>
    </div>
     )
}

export default Datatable