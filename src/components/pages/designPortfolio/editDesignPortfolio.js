import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Loader from '../../shared/loader';
import storage from '../../shared/storage';
import { MdDelete} from 'react-icons/md'
import { Form,Button,Upload,Image,Col,Row,Input,message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {fetchOneDesignPortfolio,designportfolioSelector, updateDesignPortfolio} from '../../../api/designPortfolio'
import { useEffect,useState } from 'react'


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

function EditDesignPortfolio() {
    const [form] = Form.useForm()
    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const {current_designportfolio} = useSelector(designportfolioSelector)
    const [designImages,setDesignImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [fileList, setFileList] = useState([]) 
    const [noError,setError] = useState(false)

    
    useEffect(()=>{
        dispatch(fetchOneDesignPortfolio(id))
    },[id])
    
     useEffect(()=>{
        setDesignImages(current_designportfolio?.images)
        form.setFieldsValue({
            portfolio_title:current_designportfolio && current_designportfolio?.portfolio_title,
        })
    },[current_designportfolio])


    console.log(current_designportfolio)

    const submitEditDesignPortfolio = (values)=>{
        if(designImages.length < 1){
         message.warning({content:'Blog Image is required',duration:2})
       }
       else{
         const data = {
           portfolio_title:values.portfolio_title,
           images :designImages,
 
         }
         console.log(data)
         dispatch(updateDesignPortfolio(id,data))
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
  
    const uploadImageURLToArray = info => {
        setLoading(true)
        setError(false)
           
            storage
            .ref("images/" + info.file.name)
            .put(info.file.originFileObj)
            .then(snapshot => {
              return snapshot.ref.getDownloadURL();
            })
            .then(url => {
              console.log(url);
              setDesignImages([...designImages, url])
              message.success('Image uploaded successfully');
              setLoading(false)
        
            })
            .catch(error => {
              console.log(error);
            });
        
          }
          
    const remove = (e,url) =>{
        console.log(url)
        e.preventDefault()
    
        setDesignImages(prev => prev.filter(item => item !== url))
        
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
        <Form {...Layout}  form = {form} name = "Design Portfolio" initialValues={{remember:true}} onFinish={submitEditDesignPortfolio}
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
                  designImages?.map((image,i)=>{
                    return <div className=" imglist" style={{height:'100px'}}>
                    <Image 
                    key={i}
                    preview={false} 
                    style={{height:"100%", width:"100%", borderRadius: '0.25rem', display:'block', objectFit:'cover'}}
                    src={image}
                    placeholder={<Loader/>}/>
                  <h2 onClick={(e)=>remove(e,image)} className=" text-white  "> <MdDelete/></h2> 

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

export default EditDesignPortfolio