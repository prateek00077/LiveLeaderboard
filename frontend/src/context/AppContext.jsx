import axios from 'axios'
import { createContext, useContext, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

// create app context
const AppContext = createContext();

// making custom hook for easy usage
export const useAppContext = () => useContext(AppContext);

// making an axios instance
const api = axios.create({
    baseURL : API_URL
})

export const AppProvider = ({ children}) => {
    const [users, setUsers] = useState([]);

    // function to fetch all the users

    async function getUser() {
        try {
            const response = await api.get("/user/get");
            setUsers(response.data.users);
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // function to add new users

    async function addUser(name) {
        try {
            const response =  await api.post("/user/add",{name})
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // function to claim points

    async function claimPoints(userId) {
        try {
            const response = await api.put("/user/claim",{userId});
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // values

    const value = {
        users,
        setUsers,
        getUser,
        addUser,
        claimPoints
    }

    return <AppContext.Provider value = {value}>{children}</AppContext.Provider>
}