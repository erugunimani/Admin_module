import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import Datatable from './datatable'
import { useDispatch, useSelector } from 'react-redux'
import {designportfolioSelector, fetchAllDesignPortfolio} from '../../../api/designPortfolio'
import { useEffect } from 'react'


export default function DesignPortfolioIndex(){
    const dispatch = useDispatch()
    const {all_designportfolio} = useSelector(designportfolioSelector)

   useEffect(()=>{
        dispatch(fetchAllDesignPortfolio())
   },[dispatch])
   
    return(
        <>
        <div className='float-right'>
            <Button type='primary'>
                <Link className=' hover:no-underline text-white' style={{textDecoration:'none'}} to ="/dashboard/create-design-portfolio">Add Design Portfolio</Link>
            </Button>
        </div>
            <Datatable data={all_designportfolio}/>
        </>
        
    )
}