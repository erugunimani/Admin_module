import { Button } from 'antd';
import React from 'react'
import ReactExport from "react-export-excel";
import { DownloadOutlined  } from '@ant-design/icons';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function ExportExcel({data}) {
    console.log(data)
   return (

       
        <ExcelFile filename="Subscribers" 
        element={<Button icon={<DownloadOutlined  style={{transform:"translateY(2px)",fontWeight: "700",  fontSize: '20px' }}/>} className="mx-2" type="primary" style={{fontSize: '14px'}}>Download</Button>}>
                
        <ExcelSheet data={data} name="Subscribers" >
            <ExcelColumn label="email" value={col => col?.email ? col.email: "null"} /> 
 
        </ExcelSheet>
    </ExcelFile>
    )
}