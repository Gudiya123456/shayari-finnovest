import React, { useRef, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IRootState } from '../../store';


export default function CreateSales({ showDrawer, setShowDrawer }) {

    return (
        <div>
            <div className={`${(showDrawer && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`} ></div>

            <nav
                className={`${(showDrawer && 'ltr:!right-0 rtl:!left-0') || ''
                    } bg-white fixed ltr:-right-[800px] rtl:-left-[800px] top-0 bottom-0 w-full max-w-[500px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-1000 z-[51] dark:bg-black p-4`}
            >
                <div className="flex flex-col h-screen overflow-hidden">
                    <div className="w-full text-center border-b border-grey p-4">
                        <button type="button" className="px-4 py-4 absolute top-0 ltr:right-0 rtl:left-0 opacity-30 hover:opacity-100 dark:text-white" onClick={() => setShowDrawer(false)}>
                            <IoCloseSharp className=" w-5 h-5" />
                        </button>

                        <h4 className="mb-1 dark:text-white font-bold"> <span className='text-yellow-500' ></span> Create Sales</h4>
                    </div>

                    <section className="flex-1 overflow-y-auto overflow-x-hidden perfect-scrollbar mt-5">
                        <form action="" method="post" className='p-5'>
                            {/* <div className='mb-4 poppins-font'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Gateway Name</label>
                                <input id="fullname" type="text" placeholder="Enter Gateway Name" className="input-form poppins-font placeholder-black "
                                name='gateway_name'
                                value={params.gateway_name}
                                onChange={(e)=>{changeValue(e)}}
                                />
                                <span className='text-red-700' >{errors.gateway_name}</span>
                            </div> */}

                            <div className='mb-4'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Name</label>
                                <input id="fullname" type="text"  className="input-form  poppins-font placeholder-black"
                                name='key'
                                // value={params.key}
                                // onChange={(e)=>{changeValue(e)}}
                                />
                                {/* <span className='text-red-700' >{errors.key}</span> */}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Email</label>
                                <input id="fullname" type="text"  className=" input-form poppins-font placeholder-black"
                                name='secret'
                                // value={params.secret}
                                // onChange={(e)=>{changeValue(e)}}
                                />
                                {/* <span className='text-red-700' >{errors.secret}</span> */}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Mobile</label>
                                <input id="fullname" type="text"  className=" input-form poppins-font placeholder-black"
                                name='secret'
                                // value={params.secret}
                                // onChange={(e)=>{changeValue(e)}}
                                />
                                {/* <span className='text-red-700' >{errors.secret}</span> */}
                            </div>


                            <div className='mb-4'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>State</label>
                                <input id="fullname" type="text"  className=" input-form poppins-font placeholder-black"
                                name='secret'
                                // value={params.secret}
                                // onChange={(e)=>{changeValue(e)}}
                                />
                                {/* <span className='text-red-700' >{errors.secret}</span> */}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>City</label>
                                <input id="fullname" type="text"  className=" input-form poppins-font placeholder-black"
                                name='secret'
                                // value={params.secret}
                                // onChange={(e)=>{changeValue(e)}}
                                />
                                {/* <span className='text-red-700' >{errors.secret}</span> */}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Source</label>
                                <input id="fullname" type="text"  className=" input-form poppins-font placeholder-black"
                                name='secret'
                                // value={params.secret}
                                // onChange={(e)=>{changeValue(e)}}
                                />
                                {/* <span className='text-red-700' >{errors.secret}</span> */}
                            </div>





                              <div className="mb-3">
                          <label
                            htmlFor="name"
                            className="text-style roboto-light poppins-font"
                          >
                           Status
                          </label>

                          <select
                            className="input-form h-[33px] poppins-font  dark:border-[#5E5E5E] dark:bg-transparent"
                            name='environment'
                            // value={params.environment ? params.environment : ""}
                            // onChange={(e)=>{changeValue(e)}}
                            >
                            <option className="poppins-font text-red-600" value="">
                              Select Status
                            </option>
                            <option className="poppins-font" value='1' >
                          Active
                            </option>
                            <option className="poppins-font" value='0' >
                           Disabled
                            </option>

                          </select>
                          {/* <span className='text-red-700' >{errors.environment}</span> */}



                        </div>

                        </form>
                    </section>
                    <footer className="w-full text-center border-t border-grey p-4">
                        <div className='flex justify-end gap-5 py-2'>
                            <button className='btn shadow' onClick={() => setShowDrawer(false)}>Cancel</button>
                            <button className='btn bg-amber-500 text-white'  >
                                Submit
                              </button>
                        </div>
                    </footer>
                </div>
            </nav>
        </div>
    )
}
