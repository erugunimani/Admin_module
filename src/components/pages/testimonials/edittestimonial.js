import { Button, Col, Form, Image, Input, Row, Upload,message } from 'antd'
import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import styled from 'styled-components'
import Loader from '../../shared/loader';
import storage from '../../shared/storage';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchOneTestimonial, testimonialSelector, updateTestimonial } from '../../../api/testimonials';

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




function EditTestmonials() {

    const [imgurl, setImgurl] = useState([])
    const [loading1, setLoading1] = useState(false)
    const [fileList, setFileList] = useState([])
    const [testimonials, setTestimonials] = useState("");
    const {currentTestimonial}=useSelector(testimonialSelector)
    const [noError,setError] = useState(false)
    const [form]= Form.useForm()
    const history=useHistory()

    const dispatch=useDispatch()
    const {id}=useParams()
    

    useEffect(()=>{
        dispatch(fetchOneTestimonial(id))
    },[dispatch])

    useEffect(()=>{
        setImgurl([currentTestimonial && currentTestimonial?.image])
        setTestimonials(currentTestimonial && currentTestimonial?.description)
        form.setFieldsValue({
            title: currentTestimonial && currentTestimonial.title,     
            author:currentTestimonial && currentTestimonial.author,
            description: currentTestimonial && currentTestimonial.description,
          })
    },[currentTestimonial])

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
              message.success('Image uploaded successfully');
              setLoading1(false)
            })
            .catch(error => {
              console.log({error});
            });
        
          };

    const onFinish=(value)=>{
        console.log(value)
        if(imgurl.length <1){
          message.warning({content:'Please attach Testimonial image',duration:2})
        }
        else{

          const data = {
              title:value.title,
              image: imgurl.length>=1 ? imgurl[0] : null,
              sub_title:value.sub_title , 
              author:value.author ,
              description:value.description,
          }
          dispatch(updateTestimonial(id,data))
          history.goBack()
        }

     }
    
     const onFinishFailed=(errorInfo)=>{
        console.log('error: ' + errorInfo)
     }

     const remove = (e, url) =>{
    
        setImgurl(prev => prev.filter(item => item !== url))
        
        }

        const uploadButton = (
            <div>
              { loading1 ? <LoadingOutlined  /> : <PlusOutlined />}
              <div style={{ marginTop: 8, fontSize:"14px" }}>{loading1 ? "uploading" :""}</div>
            </div>
          );

          const modules = {
            toolbar: [
              [{ 'font': [] }],
              [{size: []}],
              ['bold', 'italic', 'underline','strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image'],
              ['clean']
            ],
          }
        
          const formats = [
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
          ]

  return (
    <FormWrap>

      <Form
      {...layout}
  
      name="basic"
      initialValues={{ remember: true }}
      form={form}    
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="mt-4"
    >


<Form.Item
        label="Title"
        name="title"
      >
        <Input className=" text-capitalize"  />

      </Form.Item>


      <Form.Item
            label={<p className="text-left m-0 ml-2 ">Blog Image</p>}
            name="image"
            // rules={[{ required: true, message: 'required!' }]}
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
                        beforeUpload={beforeImageUpload}
                        multiple={true}
                        style={{marginLeft:'0.5rem'}}
                        >
                        {imgurl.length >= 1 ? null : uploadButton}
                        </Upload>
                </Row>

        </Form.Item>       
      <Form.Item
        label="Author"
        name="author"
      >
        <Input className=" text-capitalize"  />

      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{required: true,message: 'Author review is required!', whitespace:true}]}
      >
         <Input.TextArea rows={5}/>

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

export default EditTestmonials

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