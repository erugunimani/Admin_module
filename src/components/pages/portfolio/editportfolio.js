import React, {useEffect, useState} from 'react'
import {Form, InputNumber, message, Button, Input, Upload, Image, Row, Col} from 'antd'
import { createBlog } from '../../../api/blog';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import storage from '../../shared/storage'
import Loader from '../../shared/loader';
import {MdClose, MdDelete} from 'react-icons/md'
import styled from 'styled-components'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {useHistory, useParams} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import { createPortfolio, fetchOnePortfolio, portfolioSelector, updatePortfolio } from '../../../api/portfolio';

const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };


export default function EditPortfolio() {

    const {current_portfolio} = useSelector(portfolioSelector)
    const {id} = useParams()
    const history = useHistory();
    const dispatch = useDispatch();
    const [imgurl, setImgurl] = useState([])
    const [loading1, setLoading1] = useState(false)
    const [fileList, setFileList] = useState([])
    const [blog, setBlog] = useState("");
    const [form] = Form.useForm();
    const [noError,setError] = useState(false)


    useEffect(()=>{
      dispatch(fetchOnePortfolio(id))
    },[id])
    
    
    useEffect(()=>{
      setImgurl([current_portfolio?.image])

    form.setFieldsValue({
        website_link:current_portfolio && current_portfolio?.website_link,
        portfolio_title:current_portfolio && current_portfolio?.portfolio_title,
    })

    },[current_portfolio])

    
    console.log(current_portfolio)
    const onFinish = (values) => {
      if(imgurl.length < 1){
          message.warning({content:"Image is required",duration:2})
      }
      else{
        const data = {
          portfolio_title:values.portfolio_title,
          image: imgurl[0],
          website_link:values.website_link , 
        }
        console.log({data});
        dispatch(updatePortfolio(id,data))
        history.goBack()
      }
    };
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

      const handleChange = info => {
        setLoading1(true)
        setError(false)
           
            storage
            .ref("images/" + info.file.name)
            .put(info.file.originFileObj)
            .then(snapshot => {
              return snapshot.ref.getDownloadURL();
            })
            .then(url => {
              setImgurl([...imgurl, url])
              setLoading1(false)
            })
            .catch(error => {
              console.log({error});
            });
        
          };



          const remove = (e, url) =>{
    
            setImgurl(prev => prev.filter(item => item !== url))
            
            }
        
          const uploadButton = (
            <div>
              { loading1 ? <LoadingOutlined  /> : <PlusOutlined />}
              <div style={{ marginTop: 8, fontSize:"14px" }}>{loading1 ? "uploading" :""}</div>
            </div>
          );
            

         
      
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
     
      const onChange = (value)=> {
        console.log(`selected ${value}`)
    
      }
    

     
        

    return (
      <FormWrap>

      <Form
      {...layout}
      form = {form}
      name="basic"
      initialValues={{ remember: true }}
    
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="mt-4"
    >


<Form.Item
        label="Portfolio Title"
        name="portfolio_title"
        rules={[{ required: true, message: 'Portfolio Title is required!',whitespace:true }]}

      >
        <Input className=" text-capitalize"  />

      </Form.Item>


      <Form.Item
            label={<p className="text-left m-0 ml-2 ">Portfolio Image</p>}
            name="image"
            // rules={[{ required: true, message: 'Image required!',whitespace:true }]}
          >
                          <Row gutter={10}>
            <Col span={5}>
                {

                imgurl.map((img, i)=>{

                  return <div className=" imglist " style={{height:"100px"}}>
                   
                  <Image    
                   preview={false}               
                   key={i}
                   style={{height:"100%", width:"100%", borderRadius: '0.25rem', display:'block', objectFit:'cover'}}
                   src={img}
                   placeholder={<Loader/> }              
                 />   

                  <h2 onClick={(e)=>remove(e, img)} className=" text-white  "> <MdDelete/></h2> 

                    </div>
                })
              }
              </Col>

                <Upload       
                        listType="picture-card"
                        fileList={fileList}
                        onChange={noError && handleChange}
                        beforeUpload = {beforeImageUpload}
                        multiple={true}
                        style={{marginLeft:'0.5rem'}}
                        >
                        {imgurl.length >= 1 ? null : uploadButton}
                        </Upload>
                <p>(<span className=' text-red-500'>*</span> Image size should be less than 1MB)</p>

                </Row>

        </Form.Item>

        <Form.Item
        label="Link"
        name="website_link"
        rules={[{ required: true, message: 'Website link is required!',whitespace:true }]}>
        <Input  />
      </Form.Item>


      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
   </FormWrap>
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