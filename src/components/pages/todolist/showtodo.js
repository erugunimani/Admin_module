import React,{useEffect, useState} from 'react'
import {Select, Table, Tag, Space,Button,DatePicker,message } from 'antd';
import { FaRegTrashAlt,FaCheckCircle,FaHourglassHalf,FaSyncAlt} from 'react-icons/fa';
import DeleteConfirm from '../../shared/deleteConfirm'
import EditConfirm from '../../shared/editConfirm'
import CompletedConfirm from '../../shared/completeConfirm'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import { keyUri, config } from '../../../key'
import {deleteTodo,fetchAllTodo,fetchOneTodo,updateTodo} from '../../../api/todolist'
import { authenticateSelector } from '../../../api/authSlice';
import { fetchAllEmployee,fetchOneEmployee,employeeSelector } from '../../../api/employee';
import SearchComponent from '../../../components/shared/search';
import PayslipTable from '../payslip/datatable'

import moment from 'moment';
 
 


export default function TodolistTable({data}){
    const options = ['High','Medium','Low']
    const status = ['New','in-Progress','Completed']
    const [filter,setFilter] = useState([])
    const [filterdate,setDate] =useState([])
    const [load,setLoad] = useState(false)
    const [dateLoad,setDateLoad] = useState(false)
    const dispatch = useDispatch()
    const {  user} = useSelector(authenticateSelector)
    const {role,token } = useSelector(authenticateSelector)

    const [status_filter, setStatusFilter] = useState("")
    const [employee,setEmployee] = useState()
    const [startdateFilter,setStartDate] = useState("")
    const [enddateFilter,setEndDate] = useState("")

    const { all_employee} = useSelector(employeeSelector) 
 

    useEffect(()=>{
        dispatch(fetchAllEmployee(token)) 
    }, [dispatch])
     
    const cancel = (e)=>{
        return null;
    }
    
    console.log(user?.role == 'admin')
    const editconfirm = (e,id)=>{
        // dispatch(updateTodo(id._id,id.todolist))
        console.log("Inside the edit")
        console.log(id)
        let dated = id.date
        dated = new Date();
       dated = moment(dated).format("YYYY-MM-DD")

        let showPriority = id.priority == 1?"High":id.priority == 2?"Medium":"Low";

        // let current_date = moment(dated).format('DD-MM-YYYY')
        // let current_date = dated.getDate()+"-"+(dated.getMonth()+1)+"-"+ dated.getFullYear();   
        var status = "in-Progress"
        const new_todo = {
            title:id.title,
            status:status,
            priority:id.priority,
            date:id.date,
            enddate:dated, 
            showPriority:showPriority,
            employee:id.employee, 
        }
        dispatch(updateTodo(id._id,new_todo))
        

    }
    const completeconfirm = (e,id)=>{
        console.log("Inside the ")
        console.log(id.status)
         let dated = id.date
         dated = new Date();
         dated = moment(dated).format("YYYY-MM-DD")

        // let current_date = moment(dated).format('DD-MM-YYYY')
        //  let current_date = dated.getDate()+"-"+(dated.getMonth()+1)+"-"+ dated.getFullYear();   
        let showPriority = id.priority == 1?"High":id.priority == 2?"Medium":"Low";

        let status = "Completed"
        const new_todo = {
            title:id.title,
            status:status,
            priority:id.priority,
            date:id.date,
           
            enddate:dated,
            showPriority:showPriority,
            employee:id.employee, 
            
        }
        setFilter(dispatch(updateTodo(id._id,new_todo)))
    }
   

    const handleStatus = (value)=>{
        setLoad(true)
        console.log(value)
        setStatusFilter(value)
    //     axios.get(keyUri.BACKEND_URI +`/todolist/${user?._id}?filter=${value}`).then(({data})=>{
    //     setFilter(data.todolist) 
    //     console.log("The filter is:",filter)  
    //    })      
    }

    const handleEmployee = (value)=>{
        setLoad(true)
        console.log(value)
        setEmployee(value)
        dispatch(fetchOneEmployee(value))
    //     axios.get(keyUri.BACKEND_URI +`/todolist/${value}`).then(({data})=>{
    //     setFilter(data.todolist) 
    //     console.log("The filter is:",filter)  
    //    });
      
    }

 

    const confirm = (e, id) => {
      
        setFilter(dispatch(deleteTodo(id._id, id.todolist)))
   
       
      }

      let startdate ;
      let enddate ;
    const handleDate =(value)=>{
        setDateLoad(true)
        console.log(moment(value[0]).format('YYYY-MM-DD'))
        setStartDate(moment(value[0]).format('YYYY-MM-DD'))
        console.log(startdateFilter)

        setEndDate(moment(value[1]).format('YYYY-MM-DD'))
        //     axios.get(keyUri.BACKEND_URI +`/todolist-datewise/${user?._id}?status=${status_filter}&startdate=${startdateFilter}&enddate=${enddateFilter}`).then(({data})=>{
        //     setDate(data.todolist);
             
        //    });
        
    }

    const searchTodo = (e)=>{
        e.preventDefault()
        console.log(status_filter)
        console.log(startdateFilter)
        console.log(enddateFilter)
            axios.get(keyUri.BACKEND_URI +`/todolist-employee/${user?._id}?status=${status_filter}&startdate=${startdateFilter}&enddate=${enddateFilter}`).then(({data})=>{
                setDate(data.todolist)
                console.log(filterdate)
                message.success(data.msg)
            })

    }
    
    const columns=[
        {
            title:"Title",
            dataIndex:'title',
            key:'title',   
        },
        {
            title:'Priority',
            dataIndex:'showPriority',
            key:'priority',
        },
        {
            title:'Status',
            dataIndex:'status',
            key:'status'
        },
        filter.length == 0  ?{ 
            title:'Action',
            key:'action',
            render:(id) =>(
              <Space size='middle'>
                {
                    id.status === "New"? <EditConfirm confirm={(e)=>editconfirm(e, id)} title="todolist" cancel={cancel} >
                    <FaHourglassHalf style={{cursor:"pointer"}}/>
                    </EditConfirm>
                     : id.status === "in-Progress"?

                    <CompletedConfirm confirm={(e)=>completeconfirm(e, id)} title="todolist" cancel={cancel} >
                     <FaCheckCircle style={{cursor:"pointer"} }/>
                    </CompletedConfirm>  : <p style={{color:"green",textJustify:"center"}}>Well Done!!</p>
                }              
            </Space> 
            )
       } :<h1>Hello</h1>
    ];
  
  
return(
<div className='dropdown'>
 {
    role == 'employee'? 
    <div>
 <Select
       placeholder="select the Status"
       onChange={handleStatus}
       filterOption={(input, option) =>
                   option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
    >
   {
    status.map((item)=>{  
       return <option  key={item._id} value={item} >{item}</option>
   })
   }

 </Select> <DatePicker.RangePicker picker="date" onChange={handleDate} disabledDate={(current) => {
              return current+1 > new Date();
            }}/>
            </div>:


            <div className=' grid grid-cols-4 gap-3 mt-9'>
            <Select
                placeholder="Select the Status"
                onChange={handleStatus}
                filterOption={(input, option) =>
                    option.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {
                        status.map((item)=>{  
                        return <option  key={item._id} value={item} >{item}</option>
                    })}

</Select> 
<DatePicker.RangePicker picker="date" onChange={handleDate} disabledDate={(current) => {
       return current+1 > new Date();
     }}/>
             {/* <Select

                className="shadow" 
                placeholder="Select the Employee"
                onChange={handleEmployee}
                filterOption={(input, option) =>
                                     option.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
        {
              all_employee.map((item)=>{  
                  return <option  key={item._id} value={item._id} >{item.personal?.full_name}</option>
        })
   }

</Select>  */}
<Button onClick={(e)=>{searchTodo(e)}}>Search</Button>

            </div>
            
            }

 
 
 
 
 
          
    
 <Table 
     rowKey={record => record._id}
      columns={columns}
      dataSource={dateLoad?filterdate.length>=0?filterdate:data:load?filter.length>=0?filter:"":data} /> 


        
</div>
// filter.length>=0?filter:
// filterdate.length>=0 ?filterdate:
// filter.length >=0 ? filter:data ||

   
)
}
