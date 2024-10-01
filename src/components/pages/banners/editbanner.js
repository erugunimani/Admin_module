import React, { useEffect,useState } from 'react'
import {Form, InputNumber,Switch,  Button, Input, Upload, Image, Row, Col,message} from 'antd'
import {updateBanner, bannerSelector, fetchOneBanner} from '../../../api/bannerSlice'
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
import Loader from '../../shared/loader';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import storage from '../../shared/storage'
import {MdClose, MdDelete} from 'react-icons/md'
import styled from 'styled-components'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {useHistory} from "react-router-dom";

export default function EditProduct() {
const history = useHistory();
const dispatch = useDispatch()
const {currentBanner, loading} = useSelector(bannerSelector)
const [form] = Form.useForm();
const [imgurl, setImgurl] = useState([])
const [loading1, setLoading1] = useState(false)
const [fileList, setFileList] = useState([])
const [checked, setChecked] = useState();
const {id} = useParams()
const [noError,setError] = useState(false)


console.log(currentBanner);

useEffect(()=>{

    dispatch(fetchOneBanner(id))
    
    }, [dispatch])



    useEffect(()=>{
      currentBanner && setImgurl([ currentBanner && currentBanner.banner_image])

      form.setFieldsValue({
        banner_title:currentBanner && currentBanner.banner_title,         
      // featured_image: currentProduct && currentProduct.featured_image,
      description: currentBanner && currentBanner.description,
      sub_title:currentBanner && currentBanner.sub_title,
 
    });


}, [currentBanner])



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
  
          dispatch(updateBanner(id, bannerdata))
          history.goBack()

        }

        
        
        
        };
        
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
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

                const onChange=(value)=>{
                  console.log(`selected ${value}`)
                  setChecked(value)
                }

    return (
        <FormWrap>      

         
  {
      loading ? <Loader/> : 
      <div>
              <h5 className="">Update Banner</h5>
              <hr style={{height:"0.1rem"}} className="mb-5 mt-3 bg-light border-0"/>

              <Form
      {...layout}
      form={form}

      name="basic"
      initialValues={{ remember: true }}
    
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
             >

          <Row gutter={10}>
            <Col span={5}>
                {

                imgurl?.map((img, i)=>{

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
          label="Sub title"
          name="sub_title"
          rules={[{required: true,message: 'Banner Subtitle is required!', whitespace:true}]}

      >
       <Input  />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{required: true,message: 'Banner Description is required!', whitespace:true}]}

      >
         <Input.TextArea rows={4}/>

      </Form.Item>

      
    

     
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
}   
                 
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