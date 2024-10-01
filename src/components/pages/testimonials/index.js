import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
 import { fetchAllTestimonial, testimonialSelector } from '../../../api/testimonials';
import Datatable from './datatable';

function Testimonials() {

  const [loading, setLoading]=useState(false)
  const dispatch=useDispatch()
  const {testimonial}=useSelector(testimonialSelector)
   console.log(testimonial)

  
  useEffect(()=>{
    dispatch(fetchAllTestimonial())
  },[dispatch])


  const { Search } = Input;

  return (<>
    <div className="mb-4 float-right ">
        <div className="mx-3">
    
    {/* <Search placeholder="Search testimonial" className="mx-3" style={{ width: 230 }} enterButton /> */}
        <Button type="primary">
            <Link to="/dashboard/create-testimonials">Add Reviews</Link>
        </Button> 
    </div>
    </div>
    {
    
     <Datatable loading={loading}
     data ={ testimonial}
     />
    
    }
        </>
           )
}

export default Testimonials