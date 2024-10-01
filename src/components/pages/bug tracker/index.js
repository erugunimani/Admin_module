import React, { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import Search from 'antd/lib/input/Search'
import { useDebounce } from "use-debounce";

import {PlusOutlined} from '@ant-design/icons';
import { BugTrackerSelector, fetchAllBugTracker } from '../../../api/bugTracker';
import { useSelector } from 'react-redux';
import BugTrackerTable from './datatable'
import axios from 'axios'
import { keyUri } from '../../../key';

function BugTrackerIndex() {
  
  const dispatch = useDispatch()
  const {all_bugTracker}  = useSelector(BugTrackerSelector)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [debouncedText] = useDebounce(search, 1000)
  const [filter,setFilter]=useState([])



  useEffect(()=>{
    axios.get(keyUri.BACKEND_URI +`/bugTracker?search=${debouncedText}`).then(({data})=>{    
    setFilter(data?.bugTracker)
    })
    setLoading(false)
    }, [dispatch, debouncedText])

  const searchDefect = (e) => {
    setLoading(true)
    setSearch(e.target.value)
    
  }
  useEffect(()=>{
    dispatch(fetchAllBugTracker())
  },[])
  return (
    <div>
    <Link style={{float:'right',marginTop:'5px'}} to="/dashboard/create-bug-tracker"><Button onClick={()=><Link></Link>} type="primary" icon={<PlusOutlined/>}>
         Create Issues</Button></Link>
         <Search placeholder="Search Defect" className="mx-3 mt-0 mb-6 float-right"  onChange={searchDefect}   style={{ width: 230 }} enterButton />
         {
          <BugTrackerTable data = {(filter?.length > 0) ? filter : all_bugTracker}/>
         }
              
</div>
  )
}

export default BugTrackerIndex