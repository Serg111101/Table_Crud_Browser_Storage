import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetchDataStorage } from "../../hooks/LocalStorage";
import { fetchErrorUsers, fetchSuccessUsers,  } from "../slice/userSlice";


export const getFetchUsersData = ()=>{

   return async (dispatch) => {
        try{

            if (getFetchDataStorage("data",localStorage)){
                const res = await  getFetchDataStorage("data",localStorage)
                dispatch(fetchSuccessUsers(res));

            }
          

        }catch(error){
            console.error(error);
            dispatch(fetchErrorUsers(error))
        }
}
}
    
