import React, { useRef } from "react";
import { useState, Fragment, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



const General = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fileLogoRef = useRef<HTMLInputElement>(null);
    const fileIconRef = useRef<HTMLInputElement>(null);
    const [logoPriview, setLogoPriview] = useState<any>(
        'https://dummyimage.com/600x400/000/fff'
    );
    const [iconPriview, setIconPriview] = useState<any>(
        'https://dummyimage.com/600x400/000/fff'
    );

    return (
        <div>

                <div className="">

                    <div className=" " >
                        <div className="px-8 py-8 dark:bg-[#202125] bg-white">
                        <h2 className='text-amber-500 text-xl font-bold mb-4 ' >General Settings</h2>

                            <form>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-x-5">
                                <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="rname"
                                        >
                                            CRM  Name
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="site_name"

                                        />

                                    </div>
                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="rname"
                                        >
                                            Admin Email
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="site_name"

                                        />

                                    </div>

                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="rname"
                                        >
                                         Accounts
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="site_name"

                                        />

                                    </div>
                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="rname"
                                        >
                                           Complaince
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="site_name"

                                        />

                                    </div>
                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="rname"
                                        >
                                          IP
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="site_name"

                                        />

                                    </div>
                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="rname"
                                        >
                                           Marque Contact
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="site_name"

                                        />

                                    </div>



                                    <div className="mb-1">
                                        <label
                                            htmlFor="name"
                                            className="text-style roboto-light"
                                        >
                                           Status
                                        </label>

                                        <select
                                            className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="console_mode"

                                        >
                                            <option className="" value="">
                                                Select Status
                                            </option>
                                            <option className="" value="1" defaultChecked={true} >
                                               Active
                                            </option>
                                            <option className="" value="0" defaultChecked={false} >
                                               Disabled
                                            </option>

                                        </select>

                                    </div>



                                    <div className="mb-1 mt-1">
                                    <label
                                            htmlFor="name"
                                            className="text-style roboto-light"
                                        >
                                          Logo
                                        </label>
                                        <input
                                            ref={fileLogoRef}
                                            name="dark_logo"
                                            type="file"
                                            onChange={(e) => setImage(e)}
                                            className="form-input hidden"
                                            accept="image/*"
                                        />
                                        <span className="w-full h-20 relative">
                                            <img
                                                className="w-40 h-20 rounded shadow-none overflow-hidden object-cover"
                                                id="dark_logo"
                                                onClick={() => {
                                                    fileLogoRef.current!.click();
                                                }}
                                                src={logoPriview}
                                                alt="dark_logo"
                                            />
                                        </span>

                                    </div>
                                    <div className="mb-1 mt-1 ">
                                    <label
                                            htmlFor="name"
                                            className="text-style roboto-light"
                                        >
                                          FavIcon
                                        </label>
                                        <input
                                            ref={fileIconRef}
                                            name="fav_icon"
                                            type="file"
                                            onChange={(e) => setImage(e)}
                                            className="form-input hidden"
                                            accept="image/*"
                                        />
                                        <span className="w-full h-20 relative">
                                            <img
                                                className="w-30 h-20 rounded  overflow-hidden object-cover"
                                                id="fav_icon"
                                                onClick={() => {
                                                    fileIconRef.current!.click();
                                                }}
                                                src={iconPriview}
                                                alt="fav_icon"
                                            />
                                        </span>

                                    </div>
                                    </div>



                            </form>
                            <div className="mt-8 flex items-center justify-end">
                                <button
                                    type="button"
                                    className="btn  btn-dark btn-sm px-10 rounded-2xl border-none bg-amber-500 text-white dark:bg-white dark:text-black "

                                >
                                  Submit

                                </button>
                            </div>
                        </div>
                    </div>
                </div>



        </div>
    );
};

export default General;
