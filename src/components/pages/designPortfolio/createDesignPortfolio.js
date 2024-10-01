import React from 'react'
import { Form,Input,Upload,message,Image,Row,Col,Button,Select} from 'antd'
import { useState } from 'react';
import storage from '../../shared/storage';
import { MdDelete} from 'react-icons/md'
import styled from 'styled-components'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Loader from '../../shared/loader';
import { useDispatch } from 'react-redux';
import { createDesignPortfolio } from '../../../api/designPortfolio';
import { useHistory } from 'react-router-dom';

const Layout = {
    labelCol:{
        span:4,
    },
    wrapperCol:{
        span:16,
    },
}
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};


  export default function CreateDesignPortfolio() {

    const [designImage,setDesignImage] = useState([])
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [noError,setError] = useState(false)
    const [fileList, setFileList] = useState([])
    const dispatch = useDispatch()
    const [designPortfolioCatergory,setDesignPortfolio] = useState("")

    const designPortfolioCategories = [
      {label:'Logo Design',value:'Logo Design'},
      {label:'Brochures & flyers', value:'Brochures & flyers'},
      {label:'Hoardings',value:'Hoardings'},
      {label:'Corporate Identity',value:'Corporate Identity'},
      {label:'UI/UX',value:'UI/UX'},
      {label:'Packaging designs',value:'Packaging designs'},
      {label:'3D renders',value:'3D renders'},
      {label:'Event Designs',value:'Event Designs'}
    ]

    const setectdesignPortfolio = (value)=>{
      console.log(value)
      setDesignPortfolio(value)
    }


    const submitDesignPortfolio = (values)=>{
       if(designImage.length < 1){
        message.warning({content:'Blog Image is required',duration:2})
      }
      else{
        const data = {
          portfolio_title:values.portfolio_title,
          images :designImage,
          category:designPortfolioCatergory


        }
        console.log(data)
        dispatch(createDesignPortfolio(data))
        history.goBack()
      }
    }

   const beforeImageUpload=(file)=> {
        console.log(file)
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
        }
        const isLt1M = file.size / (1024*1024) < 1;
        if (!isLt1M) {
        message.error('Image must be smaller than 1MB!');
        }
        setError(isJpgOrPng && isLt1M)
    return isJpgOrPng && isLt1M;
  }

    const uploadImageURLToArray = (uploadImagefile)=>{
      setError(false)
        console.log(uploadImagefile)
        storage.ref("designImages/"+uploadImagefile.file.name).put(uploadImagefile.file.originFileObj).then(snapshot=>{
            
            return snapshot.ref.getDownloadURL()
        }).then(url=>{
          setDesignImage([...designImage, url]);
          message.success('Image uploaded successfully');
          
        }).catch(error=>{
            console.log({error})
        })

    }

    const remove = (e, url) =>{
        console.log(url)
    
        setDesignImage(prev => prev.filter(item => item !== url))
        
        }

     const uploadButton = (
      <div>
      { loading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div style={{ marginTop: 8, fontSize:"14px" }}>{loading ? "uploading" :""}</div>
    </div>
      );

  return (
    <div>
        <FormWrap>
        <Form {...Layout} name = "Design Portfolio" initialValues={{remember:true}} onFinish={submitDesignPortfolio}
        className='mt-4'>
        <Form.Item
             label = "Design Portfolio Title"
             name = "portfolio_title"
             rules={[{required:true,message:"Design Portfolio Title is required",whitespace:true}]}>
        <Input className= "text-capitalize"/>
        </Form.Item>
        <Form.Item
            label= "Design Images"
            name = "images">
                <Row glutter = {12}>
                    <Col span={5}>
                {
                  designImage?.map((image,i)=>{
                    return <div className=" imglist" style={{height:'100px'}}>
                    <Image 
                    key={i}
                    preview={false} 
                    style={{height:"100%", width:"100%", borderRadius: '0.25rem', display:'block', objectFit:'cover'}}
                    src={image}
                    placeholder={<Loader/>}/>
                  <h2 onClick={(e)=>remove(e, image)} className=" text-white  "> <MdDelete/></h2> 

                    </div>
                  })   
                }
                </Col>
                <Upload       
                        listType="picture-card"
                        fileList={fileList}
                        onChange={noError && uploadImageURLToArray}
                        beforeUpload = {beforeImageUpload}
                        // multiple={true}
                        style={{marginLeft:'0.5rem'}}
                        >
                            {uploadButton}
                     
                </Upload>
                <p>(<span className=' text-red-500'>*</span> Image size should be less than 1MB)</p>
              </Row>

        </Form.Item>


        <Form.Item
          label = 'Portfolio Category'
          name = "category">

            <Select onChange={setectdesignPortfolio} options={designPortfolioCategories}>

            </Select>

        </Form.Item>
        
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
        </Form>
        </FormWrap>
    </div>
  )
}


const FormWrap = styled.div`
position: relative;

.imglist {
overflow: hidden;
background-color: #f1f1f1;
text-align: center;


h2 { opacity : 0;
display:none;
position: absolute;
margin: 0;
bottom: 1%;
background-color: rgba(0,0,0,0.5);
cursor: pointer;
transition: 0.1s;

&:hover {

font-size: 1.5rem;
}

}

&:hover h2 {

opacity : 1;
display:block
}
}
`