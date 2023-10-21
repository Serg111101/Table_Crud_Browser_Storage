import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFetchDataStorage } from '../../hooks/LocalStorage';
import './Detail.css';
import { Button } from 'antd';

const Detail = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const currentIndex = parseInt(id, 10);
  const navigate = useNavigate();

  const loadUser = useCallback(() => {
    const response = getFetchDataStorage('data', localStorage);
    const res = response.filter((_, index) => index + 1 === currentIndex);
    setUser(...res);
  }, [currentIndex]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div className="person-detail-container">
      <div className="person-detail">
        <h2>Person Details</h2>
        <div className="detail-card">
          <div className="detail-image">
            <img src={user?.image} alt={user?.name} />
          </div>
          <div className="detail-info">
            <h3>{user?.name + ' ' + user?.surname}</h3>
            <p>Email: {user?.email}</p>
            <p>Position: {user?.position}</p>
          </div>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
