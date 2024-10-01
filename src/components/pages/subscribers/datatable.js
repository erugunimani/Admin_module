import React from 'react'
import { Table } from 'antd'

export default function Datatable({data}) {

    console.log({data})
    const columns = [
        {
            title:"Email",
            dataIndex:"email"
        }
    ]
  return (
        <>
           <Table
           dataSource = {data}
           columns={columns}
           rowKey = {(record => record._id)}
           style={{overflowY:'auto', height:'77vh', overflowX:'hidden' }}
           
           >

           </Table> 
        </>
  )
}

 