import React, { useEffect, useState } from 'react';
import './Edit.css';
import { Input, Form, Button } from 'antd';
import { AddStore, getFetchDataStorage } from '../../hooks/LocalStorage';
import { useNavigate, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getFetchUsersData } from '../../store/action/HomeAction';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.users);

  const [user, setUser] = useState({}); // Initialize as an object
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getFetchUsersData());
    const data = getFetchDataStorage('data', localStorage);
    const currentIndex = parseInt(id, 10); 
    const currentUser = data.find((_, index) => index + 1 === currentIndex);
    if (currentUser) {
      setUser(currentUser);
      form.setFieldsValue(currentUser);
      setPath(currentUser?.image)      
    }
  }, [id, dispatch, form]);

  const [path, setPath] = useState(user?.image);
  

  // Handle image upload
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setPath(URL.createObjectURL(file));
      setUser({ ...user, image: URL.createObjectURL(file) });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const send = () => {
    form
      .validateFields()
      .then((values) => {
        const currentIndex = parseInt(id, 10); // Convert to number
        const updatedData = users.map((user, index) => (index === currentIndex - 1 ? { ...user, ...values } : user));
        AddStore('data', updatedData, localStorage);
        navigate('/');
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

  return (
    <div className="Add">
      <Form form={form} autoComplete="off" onFinish={send} initialValues={user}>
        <div>
          <label>Your Profile Picture</label>
          <Form.Item name="image">
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

        {Object.keys(user).map((key) => {
          
          return key !== "image"&&(
          <div key={key}>
            <label>Your {key}</label>
            <Form.Item
              name={key}
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
              <Input placeholder={`Write your ${key}`} />
            </Form.Item>
          </div>
        )}
        )}

        <div className='buttons'>
        <Form.Item>
            <Button htmlType="submit" onClick={()=>navigate(-1)} >go back</Button>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Send</Button>
          </Form.Item>
      
        </div>
      </Form>
    </div>
  );
};

export default Edit;
