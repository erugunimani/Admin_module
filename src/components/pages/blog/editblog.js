import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Form,Input,Image,Button,Upload,message,Row,Col} from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { blogSelector, fetchOneBlog, updateBlog } from '../../../api/blog'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import storage from '../../shared/storage'
import { MdDelete} from 'react-icons/md'
import styled from 'styled-components'



 function Editblog() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const  history = useHistory()
  const [form] = Form.useForm();
  const [imgurl, setImgurl] = useState([])
  const [blog, setBlog] = useState("");
  const [loading1, setLoading1] = useState(false)
  const [noError,setError] = useState(false)
  const [fileList, setFileList] = useState([])





  const {current_blog} = useSelector(blogSelector)

  const onFinish = (value)=>{
    console.log(value)
    if(imgurl.length < 1)
     message.warning({content:'Blog Image is required',duration:2})
    else{

  const data = {
    title:value.title,
    image:imgurl.length >=1 ? imgurl[0] :null,
    sub_title:value.sub_title,
    author:value.author,
    description:blog,
  }
  dispatch(updateBlog(id,data))
  history.goBack()
}
  }
 
  useEffect(()=>{
    dispatch(fetchOneBlog(id))
  },[id])

  useEffect(()=>{
    setImgurl([current_blog?.image])
      form.setFieldsValue({
          title: current_blog && current_blog.title,     
          sub_title: current_blog && current_blog.sub_title,
          author:current_blog && current_blog.author,
          description: current_blog && current_blog.description,
        })

  }, [current_blog])

  const uploadButton = (
    <div>
      { loading1 ? <LoadingOutlined  /> : <PlusOutlined />}
      <div style={{ marginTop: 8, fontSize:"14px" }}>{loading1 ? "uploading" :""}</div>
    </div>
  );


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
          console.log(url);
          setImgurl([...imgurl, url])
          setLoading1(false)
    
        })
        .catch(error => {
          console.log(error);
        });
    
}

const remove = (e,url) =>{
  console.log(url)
  e.preventDefault()

  setImgurl(prev => prev.filter(item => item !== url))
  
  }
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
    <Form form = {form} onFinish={onFinish}>
      <Form.Item label="Blog Title" name="title" rules={[{message:'Blog Title is required ',required:true,whitespace:true}]}>
        <Input className=" text-capitalize"  />
      </Form.Item>

      <Form.Item label="Blog Image" name="image" rules={[{message:'Blog Image is required ',required:true}]}>

      <Row glutter = {12}>
      <Col span={5}>
        <div className='imglist' style={{height:'100px'}}>
      <Image    
                  preview={false}               
                  style={{height:"100%", width:"100%", borderRadius: '0.25rem', display:'block', objectFit:'cover'}}
                  src={imgurl.length >= 1 ?imgurl[0]:" "}
                      
                 /> 
                  <h2 onClick={(e)=>remove(e,imgurl[0])} className=" text-white  "> <MdDelete/></h2> 
                  </div>
                  </Col>
                <Upload       
                        listType="picture-card"
                        fileList={fileList}
                        onChange={noError && handleChange}
                        beforeUpload = {beforeImageUpload}
                        multiple={false}
                        style={{marginLeft:'0.5rem'}}
                        >
                        {imgurl.length >= 1 ? null : uploadButton}
                        </Upload>  
                        </Row>   
      </Form.Item>

      <Form.Item label="Sub Title" name="sub_title" rules={[{message:'Sub Title is required ',required:true,whitespace:true}]}>
           <Input className=" text-capitalize"  />
      </Form.Item>

      <Form.Item label="Description" name="description" rules={[{message:'Description is required ',required:true,whitespace:true}]}>

      <ReactQuill 
         theme="snow" 
         value={blog} 
         modules={modules}
         formats={formats}
         onChange={setBlog} />

      </Form.Item>

      <Form.Item label="Author" name="author" rules={[{message:'Author name is required ',required:true,whitespace:true}]}>
           <Input className=" text-capitalize"  />
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
 
 export default Editblog