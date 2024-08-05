import React, { useEffect, useState } from 'react'
import './storecomponent.css'
import { useSearchParams } from 'react-router-dom';

const StoreComponent = (props) => { 
    const[storeData , setStoreData] = useState(props.storeData);  
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(()=>{
        setStoreData(props.storeData); 
    } , [])
const storestoreData = () => {
    localStorage.setItem('storeData' , JSON.stringify(storeData)); 
    if (searchParams.get('history')  !== null) {
        window.location.href = searchParams.get('history');
        return ; 
    }
    window.location.href = '/menu';
}
  return (
    <div className='store-card'>  
    <h2>{storeData.address}</h2>
    <span>
        <p><strong>Email:</strong> {storeData.email}</p>
        <p><strong>Phone:</strong> {storeData.phone}</p>
    </span>
        <button onClick={storestoreData}>Order Here</button>
    </div>
  )
}

export default StoreComponent