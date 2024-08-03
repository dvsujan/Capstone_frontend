import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./menu.css";
import { fetchWithTimeout } from "../../global/Global";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; 
import ProductCategory from "../../Components/ProductCategory/ProductCategory";

const Menu = () => {
  const [menuData, setMenuData] = useState(null);
  const [err , setErr] = useState(false); 
  const [isAdmin , setIsAdmin] = useState(false);  
  const fetchIsAdmin = ()=>{ 
    const token = localStorage.getItem("admin-token");
    if (token == null){ 
      return ; 
    } 
    else{  
      axios.get(`${process.env.REACT_APP_API}/api/Admin/tst`, {headers:{ 
        Authorization: `Bearer ${token}`
      }}).then
      ((res)=>{setIsAdmin(true);}).catch((err)=>{setIsAdmin(false);});
    }
  }
  useEffect(() => {
    toast.promise(
        axios.get(`${process.env.REACT_APP_API}/api/Menu`).then((res) => {
            setMenuData(res.data); 
          }).catch((err) => {  
            setErr(true);
            throw err ; 
          }),
          {
            loading: "Loading...",
            success: "Fetched Menu",
            error: "Error Fetching Menu",
          }
      )
      fetchIsAdmin(); 
  }, []);
  
  return (
    <div className="vertical-tabs-container">
      {err && <p className="menu-err">Error! Try again Later</p>}
      {menuData && (
        <Tabs className="vertical-tabs">
          <TabList className="vertical-tablist">
            <h1>Categories</h1> 
            {menuData?.superCategories.map((item) => (
              <Tab key={item.id}>{item.name}</Tab>
            ))}
          </TabList>
          {menuData?.superCategories.map((superCategory) => (
            <TabPanel key={superCategory.id} className="categories">
                <h1 className="category-name">{superCategory.name}</h1>
                {superCategory.categories.map((category)=>(
                    <ProductCategory key={category.id} category={category} admin={isAdmin}/>
                ))}
            </TabPanel>
          ))}
        </Tabs>
      )}
          <Toaster />
    </div>
  );
};

export default Menu;
