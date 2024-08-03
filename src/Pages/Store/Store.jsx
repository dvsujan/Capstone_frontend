import React, { useEffect, useState } from 'react'; 
import './store.css';
import axios from 'axios';  
import StoreComponent from '../../Components/StoreComponent/StoreComponent';
import toast , { Toaster } from 'react-hot-toast';

const Store = () => { 
    const [userCity , setUserCity] = useState("India");    
    const [storesData , setStoresData] = useState([]);
    useEffect(()=>{ 
        axios.get("http://ip-api.com/json/"). then((res)=>{
            const uri = `https://maps.google.com/maps?width=100%&amp;height=100%&amp;hl=en&amp;q=%20"${res.data.city}"&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed` 
            document.getElementById("map").innerHTML = `<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src=${uri}></iframe>  <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=282a8f1ff73809c9f2c41f5d7b7041bb44262686'></script>`;
            setUserCity(res.data.city);
            axios.get (`${process.env.REACT_APP_API}/api/Store?city=${res.data.city}`).then((res)=>{
                setStoresData(res.data);
            }).catch((err)=>{
                console.log(err);
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    } , [])
    useEffect(()=>{
        axios.get (`${process.env.REACT_APP_API}/api/Store/city?city=${userCity}`).then((res)=>{
            setStoresData(res.data);
            if (res.data.length != 0){
                const uri = `https://maps.google.com/maps?width=100%&amp;height=100%&amp;hl=en&amp;q=%20"${userCity}"&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed` 
                document.getElementById("map").innerHTML = `<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src=${uri}></iframe>  <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=282a8f1ff73809c9f2c41f5d7b7041bb44262686'></script>`;
            }
        }).catch((err)=>{
            console.log(err);
            toast.error("Error in fetching Stores");
        })
    } , [userCity])

  return ( 
    <div className='store-page'>   
        <div className="store-left"> 
    <input type="text" value={userCity} onChange={(e)=>{setUserCity(e.target.value)}}/>
        <h1>Stores Near You</h1> 
            {
                storesData.length == 0 && <p>Oops no stores in your area</p>
            }
            {
                storesData.map((store)=>{
                    return <StoreComponent key={store.storeId} storeData={store}/>
                })
            }
        </div>
        <div className="store-right" id="map"> 
        </div>
        <Toaster/>
    </div>
  )
}

export default Store