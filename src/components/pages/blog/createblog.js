import React, {useState} from 'react'
import {Form, InputNumber, Switch, Button, Input, Upload, Image, Row, Col,message} from 'antd'
import { createBlog } from '../../../api/blog';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import storage from '../../shared/storage'
import Loader from '../../shared/loader';
import {MdClose, MdDelete} from 'react-icons/md'
import styled from 'styled-components'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import { authenticateSelector } from '../../../api/authSlice';


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


export default function CreateBlog() {
  const history = useHistory();
    const dispatch = useDispatch();
    const [imgurl, setImgurl] = useState([])
    const [loading1, setLoading1] = useState(false)
    const [fileList, setFileList] = useState([])
    const [blog, setBlog] = useState("");
    const {user} = useSelector(authenticateSelector)
    const [noError,setError] = useState(false)



    console.log(user)

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




    const onFinish = (values) => {

      if(blog ==='' ){
        message.warning({content:'Please fill description',duration:2})
      }
      else if(imgurl.length < 1){
        message.warning({content:'Blog Image is required',duration:2})
      }
      else{

        const data = {
    
          title:values.title,
          image: imgurl[0],
          sub_title:values.sub_title , 
          description:blog ,
          author:values.author ,
    
        }
        console.log({data});
            dispatch(createBlog(data,user))
            history.goBack()
      }

      
      };




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
    
      const [form] = Form.useForm();
    
      const onChange = (value)=> {
        console.log(`selected ${value}`)
    
      }
    

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
        label="Blog Title"
        name="title"
        rules={[{ required: true, message: 'Blog Title is required!',whitespace:true }]}

      >
        <Input className=" text-capitalize"  />

      </Form.Item>


      <Form.Item
            label={<p className="text-left m-0 ml-2 ">Blog Image</p>}
            name="image"
            rules={[{ required: true, message: 'Blog Image is required!',whitespace:true }]}
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
                        multiple={true}
                        beforeUpload={beforeImageUpload}
                        style={{marginLeft:'0.5rem'}}
                        >
                        {imgurl.length >= 1 ? null : uploadButton}
                        </Upload>
                </Row>

        </Form.Item>

        <Form.Item
        label=" Sub title"
        name="sub_title"
        rules={[{ required: true, message: 'Sub Title is required!',whitespace:true }]}

      >
        <Input className=" text-capitalize"  />

      </Form.Item>

       
      <Form.Item
        label="Author"
        name="author"
        rules={[{ required: true, message: 'Author is required!',whitespace:true }]}

      >
        <Input className=" text-capitalize"  />

      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
      >
        <>
         <ReactQuill 
         theme="snow" 
         value={blog} 
         modules={modules}
         formats={formats}
         onChange={setBlog} />
         </>
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