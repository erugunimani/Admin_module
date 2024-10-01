import React, { useEffect } from 'react'
import {Button} from 'antd'
import {Link} from 'react-router-dom'
import DataTable from './datatable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPortfolio, portfolioSelector } from '../../../api/portfolio'


function PortfolioIndex() {

  const {all_portfolio} = useSelector(portfolioSelector)
  const dispatch = useDispatch()

  console.log(all_portfolio)
  useEffect(()=>{
    dispatch(fetchAllPortfolio())
  },[])
  return (<>
    <div className=' float-right'>
        <Button type = "primary">
            <Link className = " hover:no-underline text-white" style={{ textDecoration: 'none' }} to = "/dashboard/create-portfolio">Add Portfolio</Link>
        </Button>
        
    </div>
   {
    <DataTable data ={ all_portfolio} bordered/>
   }
    </>
  )
}

export default PortfolioIndex