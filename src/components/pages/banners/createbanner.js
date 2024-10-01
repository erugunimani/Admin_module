import React, {useState} from 'react'
import {Form, Button, Input, Upload, Image, message, Col,Row} from 'antd'
import {createBanner} from '../../../api/bannerSlice'
import {useDispatch} from 'react-redux'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import storage from '../../shared/storage'
import Loader from '../../shared/loader';
import {MdClose, MdDelete} from 'react-icons/md'
import styled from 'styled-components'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {useHistory} from "react-router-dom";

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


export default function CreateBanner() {
  const history = useHistory();
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);
    const [imgurl, setImgurl] = useState([])
    const [loading1, setLoading1] = useState(false)
    const [fileList, setFileList] = useState([])
    const [checked, setChecked] = useState();
    const [visible, setVisible] = useState(false);
    const [noError,setError] = useState(false)



    const onQtyChange = (value) => { 
      return setQty(value.quantity)

    }

    const onChange1=(value)=>{
      console.log(`selected ${value}`)
      setChecked(value)
    }
    



    const onFinish = (values) => {

      if(imgurl.length < 1){
        message.warning({content:'Banner image is required',duration:2})
      }
else{
  const bannerdata = {

    banner_title:values.banner_title,
    banner_image: imgurl[0],
    description:values.description ,
    sub_title:values.sub_title ,
    
  }

       dispatch(createBanner(bannerdata))
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
              console.log(url);
              setImgurl([...imgurl, url])
              message.success('Image uploaded successfully');

              setLoading1(false)
        
            })
            .catch(error => {
              console.log(error);
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
        setVisible(true);
      };
    
      const [form] = Form.useForm();
    
      const onChange = (value)=> {
        console.log(`selected ${value}`)
    
      }
    
        

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
        label="Banner Name"
        name="banner_title"
        rules={[{required: true,message: 'Banner Title is required!', whitespace:true}]}
      >
        <Input className=" text-capitalize"  />

      </Form.Item>


      <Form.Item
            label={<p className="text-left m-0 ml-2 ">Banner Image</p>}
            name="banner_image"
            rules={[{required: true,message: 'Banner Image is required!', whitespace:true}]}
            >
                    <Row glutter = {12}>
                    <Col span={5}>
                 {

                imgurl.map((img, i)=>{

                  return <div className=" imglist  bg-gray-50 text-center" style={{height:"100px"}}>
                   
                  <Image    
                   preview={false}               
                   key={i}
                   className="  rounded col-span-1  block  object-cover"
                   style={{height:"100px", width:"100px"}}
                   src={img}
                   placeholder={<Loader/> }              
                 />   
                  <h2 onClick={(e)=>remove(e, img)} className="p-1 text-white  text-xl "> <MdDelete/></h2> 

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
                        className="ml-2"
                        >
                        {imgurl.length >= 1 ? null : uploadButton}
                        </Upload>
                <p>(<span className=' text-red-500'>*</span> Image size should be less than 1MB)</p>
                </Row>
 

        </Form.Item>

        <Form.Item
        label=" Sub title"
        name="sub_title"
        rules={[{required: true,message: 'Banner Subtitle is required!', whitespace:true}]}

      >
        <Input className=" text-capitalize"  />

      </Form.Item>

       


      <Form.Item
        label="Description"
        name="description"
        rules={[{required: true,message: 'Description is required!', whitespace:true}]}
      >
         <Input.TextArea rows={4}/>

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