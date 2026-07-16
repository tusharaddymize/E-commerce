import { createContext,useContext,useState } from "react";

const AdminContext=createContext();

export const AdminProvider=({children})=>{

    const [admin,setAdmin]=useState(
        JSON.parse(localStorage.getItem("admin"))
    );

    const login=(data)=>{

        localStorage.setItem(
            "admin",
            JSON.stringify(data)
        );

        localStorage.setItem(
            "adminToken",
            data.token
        );

        setAdmin(data);

    };

    const logout=()=>{

        localStorage.removeItem("admin");

        localStorage.removeItem("adminToken");

        setAdmin(null);

    };

    return(

        <AdminContext.Provider
        value={{admin,login,logout}}
        >

            {children}

        </AdminContext.Provider>

    );

};

export const useAdmin=()=>useContext(AdminContext);