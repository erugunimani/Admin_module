import React, {useEffect,useState} from 'react'
import {fetchAllBlog, blogSelector} from '../../../api/blog'
 import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../shared/loader'
import DataTable from './datatable'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { Input  } from 'antd';
import { useDebounce } from "use-debounce";


// const {FormItem} = Form
export default function Blog() {

  const dispatch = useDispatch()
const {all_blog,error_blog}    = useSelector(blogSelector)
const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [debouncedText] = useDebounce(search, 1000)

  console.log(all_blog)

useEffect(()=>{
dispatch(fetchAllBlog())
}, [dispatch])

const { Search } = Input;




    return (<>
    {

all_blog.length>0 ? <><div className="mb-4 float-right ">
<div className="mx-3">

{/* <Search placeholder="Search Blog" className="mx-3" style={{ width: 230 }} enterButton /> */}
<Button type="primary">
    <Link className=' text-white' to="/dashboard/create-blog">Add Blog</Link>
</Button> 
</div>
</div>


<DataTable loading={loading}
data ={ all_blog}/> </>

: <h1>{error_blog}</h1>
    }

    </>
       )
}  







