import React, { useEffect } from 'react';
import './Home.css';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { getFetchUsersData } from '../../store/action/HomeAction';
import { PlusCircleFilled, EditFilled, EyeFilled, DeleteFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AddStore, getFetchDataStorage } from '../../hooks/LocalStorage';
import DeleteAll from '../../components/DeleteAll';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!getFetchDataStorage('data', localStorage)) {
      AddStore('data', [], localStorage)
    }
    dispatch(getFetchUsersData());
  }, [dispatch, localStorage]);
  const { users } = useAppSelector((state) => state.users);

  const deleteUser = (ind) => {
    const items = getFetchDataStorage('data', localStorage);
    const filtered = items.filter((item, index) => index !== ind);
    AddStore("data", filtered, localStorage)
    dispatch(getFetchUsersData());
  }

  return (
    <div className='Home'>
      <div className='header'>
        <h2>Users</h2>
        <button className='add-button' onClick={() => navigate("/add")} >
          <PlusCircleFilled />
        </button>
      </div>
      <div className='table-container'>
        <table className='custom-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{el?.name}</td>
                  <td>{el?.surname}</td>
                  <td>{el?.email}</td>
                  <td>{el?.position}</td>
                  <td>
                    <button className='action-button'>
                      <EditFilled onClick={() => navigate(`/edit/${index + 1}`)} />
                    </button>
                    <button className='action-button'>
                      <EyeFilled onClick={()=>navigate(`/detail/${index+1}`)} />
                    </button>
                    <button className='action-button'>
                      <DeleteFilled onClick={() => {
                        DeleteAll({
                          title: "do you want to delete it?",
                          text: "warning",
                          deleteItem: () => deleteUser(index),
                        });
                      }}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
