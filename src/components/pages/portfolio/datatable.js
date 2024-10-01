import React from 'react'
import {Table, Space, Image} from 'antd'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import {useDispatch} from 'react-redux'
import DeleteConfirm from '../../shared/deleteConfirm'
import { deletePortfolio } from '../../../api/portfolio';


export default function Datatable({data, loading}) {

    const dispatch = useDispatch()

const confirm = (e, id) => {

    console.log(id);
  dispatch(deletePortfolio(id))
 
}

const cancel = (e) =>{
    return null
  }
  

    const columns = [

        {
            title:"Portfolio Name",
            dataIndex:"portfolio_title",
            render: (text)=>{
            return <h6 className="m-0 text-capitalize">
            {text}
            </h6>

            }
        },
       
       
        {
            title:"Portfolio image",
            dataIndex:"image",
            render:(image)=>{

            return <Image    
            preview={false}               
            style={{margin:'0px', width:"30px", borderRadius: '0.25rem', display:'block', objectFit:'cover'}}
            src={image}
            // placeholder={ }              
      />   

            }
        },

        {
            title:"Website Link",
            dataIndex:"website_link",
            render:(text)=>{
                return  <a href={text}>{text}</a>
            }
        },


        {

            title:'Action',
    
            render: record =>{
    
             
                return <Space size="middle">
                  
                <h5>

                  <Link to={`/dashboard/edit-portfolio/${record._id}`}>
                  <FaRegEdit onClick={()=><Link></Link>}/>
                  </Link>
                  
                  </h5>
                  <h5 className="text-danger">
                  <DeleteConfirm confirm={(e)=>confirm(e, record._id)} title="blog" cancel={cancel} >
                  <FaRegTrashAlt style={{cursor:"pointer"}} />
                  </DeleteConfirm>
                  </h5>
    
              </Space>
            }
        }
    ]

     return (
        <SDataModelWrap>
             <Table 
             loading={loading}
             dataSource={data}
            columns={columns}
            style={{overflowY:'auto', height:'77vh', overflowX:'hidden' }}

            rowKey = {(record => record._id)}

            // expandable={{
            //     expandedRowRender: record => <p style={{ margin:"0 0 0 3rem" }}>{record.description}</p>,
            //     rowExpandable: record => record.name !== 'Not Expandable',
            //   }}
            /> 
         
        </SDataModelWrap>
    )
}


const SDataModelWrap = styled.div`

`