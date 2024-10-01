import React from 'react'
import { Table,Space } from 'antd'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DeleteConfirm from '../../shared/deleteConfirm';
import { deleteDesignPortfolio } from '../../../api/designPortfolio';
import { useDispatch } from 'react-redux';

function DesignDatatable({data}) {

    const dispatch = useDispatch()

    const cancel = ()=>{
        return null
    }
    const confirmDelete = (id) =>{
        console.log(id)
        dispatch(deleteDesignPortfolio(id))
        
    }
    console.log(data)
    const columns = [
        {
            title:"Design Name",
            dataIndex:"portfolio_title",
            render:(text)=>{
                return <p>{text}</p>
            }

        },
        {
            title:'Category',
            dataIndex:"category",
            render:(text)=>{
                return <p>{text}</p>
            }
        },
        {
            title:"Action",
            render: record =>{
                return <Space size = "middle"> <Link to= {`/dashboard/edit-design-portfolio/${record?._id}`}>
                    <FaRegEdit onClick = {()=><Link></Link>}/>
                </Link>
                <div>
                <DeleteConfirm confirm={(e)=>confirmDelete(record._id)} title='Design Portfolio' cancel = {cancel}>
                <FaRegTrashAlt style={{cursor:"Pointer",color:'red'}}/>
                </DeleteConfirm>
                </div>
                </Space>
            }
        }

    ]
  return (
    <Table dataSource={data} columns= {columns}>

    </Table>
  )
}

export default DesignDatatable