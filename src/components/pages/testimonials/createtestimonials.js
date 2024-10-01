import React, {useState} from 'react'
import {Form, message, Button, Input, Upload, Image, Row, Col} from 'antd'

import storage from '../../shared/storage'
import Loader from '../../shared/loader';
import {MdClose, MdDelete} from 'react-icons/md'
import styled from 'styled-components'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { createTestimonial } from '../../../api/testimonials';

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


export default function CreateTestimonials() {
  const history = useHistory();
    const dispatch = useDispatch();
    const [imgurl, setImgurl] = useState([])
    const [loading1, setLoading1] = useState(false)
    const [fileList, setFileList] = useState([])
    const [noError,setError] = useState(false)
 

    const onFinish = (values) => {

      if(imgurl.length<1){
        message.warning({content:'Please attach the image'})
      }
      else{

        const data = {
    
          title:values.title,
          image: imgurl[0],
          sub_title:values.sub_title , 
          description:values.description ,
          author:values.author ,
    
        }
        console.log({data});
            dispatch(createTestimonial(data))
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
    
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="mt-4"
    >


      <Form.Item
        label="Title"
        name="title"
        rules={[{required: true,message: 'Testimonial Title is required!', whitespace:true}]}>
        <Input className=" text-capitalize"  />
      </Form.Item>


      <Form.Item
            label={<p className="text-left m-0 ml-2 ">Testimonial Image</p>}
            name="image"
            rules={[{required: true,message: 'Testimonial Image is required!', whitespace:true}]}>
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
                <p>(<span className=' text-red-500'>*</span> Image size should be less than 1MB)</p>

                </Row>

        </Form.Item>       
      <Form.Item
        label="Author"
        name="author"
        rules={[{required: true,message: 'Testimonial Name is required!', whitespace:true}]}>
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