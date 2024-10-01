import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllSubscriber, subscribeSelector } from '../../../api/subscribe'
import Datatable from './datatable'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import ExportExcel from './exportExcel'

export default function Index() {
    const dispatch = useDispatch()
    const {subscribe} = useSelector(subscribeSelector)


    useEffect(()=>{
        dispatch(fetchAllSubscriber())
    },[dispatch])
  return (
    <>
    <div className="mb-4 float-right ">
    <div className="mx-3">

{/* <Search placeholder="Search Events" className="mx-3" style={{ width: 230 }} enterButton /> */}
   
    <ExportExcel excel = {subscribe}/>
    
</div>
</div>
{

 <Datatable data ={subscribe}/>

}
    </>
  )
}

 