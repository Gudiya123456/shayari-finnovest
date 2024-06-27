import React, { useState } from 'react'
import General from './General';
import Products from './Products';
import Employee from './Employee';

export default function Settings() {
    const [selectSetting,setSelectSetting]=useState('general');

    const handleSetting=()=>{
        setSelectSetting('products');
    }
  return (
    <div>

        <div className=' grid grid-cols-12 gap-2 ' >
            <div className=' col-span-12 md:col-span-2  ' >
                <button type='button' onClick={()=>{setSelectSetting('general')}} className='bg-amber-500 btn mb-2 text-white w-[200px] px-10' >General Settings</button>
                <button type='button' onClick={()=>{handleSetting()}} className='bg-amber-500 btn text-white w-[200px] px-10' >Products</button>
            </div>
          <div className='col-span-12 md:col-span-10 '>
            {
               selectSetting=='general'? <General/>: selectSetting=='products'?<Products/>:<Employee/>
            }
          </div>
        </div>
    </div>
  )
}
