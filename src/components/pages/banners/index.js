import React, {useEffect,useState} from 'react'
// import {fetchAllBanner, bannerSelector} from '../../api/bannerSlice'
// import {loginSelector} from '../../api/authSlice'
// import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../shared/loader'
import DataTable from './datatable'
import { Button, Form } from 'antd'
import { Link } from 'react-router-dom'
import { Input  } from 'antd';
import { useDebounce } from "use-debounce";
import { useDispatch, useSelector } from 'react-redux'
import { bannerSelector, fetchAllBanner } from '../../../api/bannerSlice'
 



export default function Banner() {

  const dispatch = useDispatch()
  const {banner,view } = useSelector(bannerSelector)
//   const [view,setView] = useState(true)

console.log(view)
 
 
useEffect(()=>{
dispatch(fetchAllBanner(view))
}, [dispatch])

const { Search } = Input;




    return (<>
<div className="mb-4 float-right ">
    <div className="mx-3">

{/* <Search placeholder="Search Banner" className="mx-3"  style={{ width: 230 }} enterButton /> */}
    <Button type="primary">
        <Link to="/dashboard/create-banner">Add Banner</Link>
    </Button> 
</div>
</div>
{

 <DataTable 
 data ={banner}
 />

}
    </>
       )
}  







