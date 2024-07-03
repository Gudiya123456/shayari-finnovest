import React, { useState } from 'react';
import General from './General';
import Products from './Products';
import Employee from './Employee';
import Template from './Template';
import Notification from './Notification';
import { FaProductHunt } from "react-icons/fa6";
import Dropdown from './Dropdown';
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { GrTemplate } from "react-icons/gr";
import { IoNotifications } from "react-icons/io5";
import { BsClipboard2DataFill } from "react-icons/bs";

export default function Settings() {
    const [selectSetting, setSelectSetting] = useState('general');

    const handleSetting = () => {
        if (selectSetting == 'products') {
            setSelectSetting('products');

        }
        alert(9999)
    }

    return (
        //container
        <div className=" mx-auto p-4">

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3 lg:col-span-2">
                    {/* <div className="flex flex-col space-y-2">
                        <button
                            type="button"
                            onClick={() => { setSelectSetting('general'); }}
                            className="bg-amber-500 btn text-white w-full py-2"
                        >
                          <FaProductHunt/>   General Settings
                        </button>
                        <button
                            type="button"
                            onClick={() => { setSelectSetting('products'); }}
                            className="bg-amber-500 btn text-white w-full py-2"
                        >
                          <FaProductHunt/>  Products
                        </button>
                        <button
                            type="button"
                            onClick={() => { setSelectSetting('template'); }}
                            className="bg-amber-500 btn text-white w-full py-2"
                        >
                          <FaProductHunt/>  Templates
                        </button>
                        <button
                            type="button"
                            onClick={() => { setSelectSetting('notification'); }}
                            className="bg-amber-500 btn text-white w-full py-2"
                        >
                           <FaProductHunt/>  Notification Settings
                        </button>
                    </div> */}
                    <div className="flex flex-col space-y-2">

                        <button onClick={() => { setSelectSetting('general'); }} className="button">
                            <IoMdSettings className='' color='white' size={15} />
                            <span className="lable">General</span>
                        </button>
                        <button onClick={() => { setSelectSetting('products'); }} className="button">
                            <FaProductHunt
                            className='' color='white' size={15} />
                            <span className="lable">Products</span>
                        </button>

                        <button onClick={() => { setSelectSetting('template'); }} className="button">
                            <GrTemplate className='' color='white' size={15} />
                            <span className="lable">Templates</span>
                        </button>
                        <button onClick={() => { setSelectSetting('notification'); }} className="button">
                            <IoNotifications className='' color='white' size={15} />
                            <span className="lable">Notification</span>
                        </button>
                        <button onClick={() => { setSelectSetting('dropdown'); }} className="button">
                            <BsClipboard2DataFill className='' color='white' size={15} />
                            <span className="lable">Dropdowns</span>
                        </button>

                    </div>
                </div>
                <div className="col-span-12 md:col-span-9 lg:col-span-10">
                    {
                        selectSetting === 'general' ? <General /> :
                            selectSetting === 'products' ? <Products /> :
                                selectSetting === 'template' ? <Template /> :
                                    selectSetting === 'notification' ? <Notification /> :
                                        selectSetting === 'dropdown' ? <Dropdown /> : ''
                    }
                </div>
            </div>
        </div>
    )
}

