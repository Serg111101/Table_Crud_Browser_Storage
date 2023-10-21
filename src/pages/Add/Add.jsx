import React, { useEffect, useState } from 'react';
import './Add.css';
import { Input, Form, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { AddStore, getFetchDataStorage } from '../../hooks/LocalStorage';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

const Add = () => {
  const navigate = useNavigate();
  const arr = [
    {
      id: 1,
      text: 'name',
    },
    {
      id: 2,
      text: 'surname',
    },
    {
      id: 3,
      text: 'email',
    },
    {
      id: 4,
      text: 'position',
    },
  ];

  const [form] = useForm();
  const [path, setPath] = useState('');
  const [oldData, setOldData] = useState([]);

  useEffect(() => {
    if (getFetchDataStorage('data', localStorage)) setOldData(getFetchDataStorage('data', localStorage));
  }, []);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setPath(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const send = () => {
    const values = form.getFieldsValue();
    const data = { ...values, image: path };
    AddStore('data', [...oldData, data], localStorage);
    navigate('/');
  };

  // const downloadImage = () => {
  //   const link = document.createElement('a');
  //   link.href = path;
  //   link.download = 'uploaded-image.jpg'; // Change the filename if needed
  //   link.click();
  // };

  return (
    <div className="Add">
      <Form form={form} autoComplete="off" onFinish={send}>
        <div>
          <label>Your Profile Picture</label>
          <Form.Item>
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              {path ? (
                <img src={path} alt="Profile" style={{ width: '100%' }} />
              ) : (
                <div>
                  <p>Upload</p>
                </div>
              )}
            </div>
          </Form.Item>
        </div>

        {arr?.map((el) => {
          return (
            <div key={el?.id}>
              <label>Your {el?.text}</label>
              <Form.Item
                name={el?.text}
                rules={[
                  { required: true, message: 'Required' },
                  {
                    type: 'string',
                    min: 2,
                    max: 60,
                    message: 'Min 2 Max 60',
                  },
                ]}
              >
                <Input placeholder={`Write your ${el?.text}`} />
              </Form.Item>
            </div>
          );
        })}

        <div className='buttons'>
        <Form.Item>
            <Button htmlType="submit" onClick={()=>navigate(-1)} >go back</Button>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Send</Button>
          </Form.Item>
         
          {/* {path && (
            <Button type="primary" onClick={downloadImage}>
              Download Image
            </Button>
          )} */}
        </div>
      </Form>
    </div>
  );
};

export default Add;
