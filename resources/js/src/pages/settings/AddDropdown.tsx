import React, { useEffect, useRef, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IRootState } from '../../store';
import themeConfig from '../../theme.config';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function AddDropdown({ showDrawer, setShowDrawer, data, fetchProducts }) {
    console.log("data", data);
    const token = useSelector((state: IRootState) => state.themeConfig.token);
    const navigate = useNavigate();
    const [btnLoading, setBtnLoading] = useState(false);


    const defaultParams =
    {
        id: '',
        dropdown_type: '',
        value: '',
        status: '1'
    }
    const [params, setParams] = useState<any>(defaultParams);
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        if (data?.id) {
            setParams({
                id: data.id,
                dropdown_type: data.dropdown_type,
                value: data.value,
                status: data.status,
            })
        }
        else setParams(defaultParams);
        // alert(9999)
    }, [data]);

    console.log("defaultParams", defaultParams);
    console.log('params', params);
    console.log("dattaaa", data);




    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErrors({ ...errors, [name]: "" });
        setParams({ ...params, [name]: value });
    }

    const validate = () => {
        setErrors({});
        let errors = {};
        // if(!params.value){
        //     errors={...errors, value:'Product name is requred'}
        // }
        console.log(errors);
        setErrors(errors);
        return { totalErrors: Object.keys(errors).length }
    }
    const storeOrUpdateApi = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: window.location.origin + '/api/dropdowns',
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + token,
                },
            });

            if (response.data.status == 'success') {
                fetchProducts();
                setShowDrawer(false)
                setParams(defaultParams)
                Swal.fire({
                    icon: response.data.status,
                    title: response.data.title,
                    text: response.data.message,
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });

                if (response.data.status == "success") {
                    alert('successs')
                } else {
                    alert(9)
                }

            } else {

                alert("Failed")
            }

        } catch (error: any) {
            console.log(error)
            if (error.response.status == 401) navigate('/login')
            if (error?.response?.status === 422) {
                const serveErrors = error.response.data.errors;
                let serverErrors = {};
                for (var key in serveErrors) {
                    serverErrors = { ...serverErrors, [key]: serveErrors[key][0] };
                    console.log(serveErrors[key][0])
                }
                setErrors(serverErrors);
                CrmSwal.fire({
                    title: "Server Validation Error! Please solve",
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    showCancelButton: false,
                    width: 450,
                    timer: 2000,
                    customClass: {
                        popup: "color-danger"
                    }
                });
            }
        } finally {
            setBtnLoading(false)
        }
    };

    const formSubmit = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("id", params.id);
        data.append("dropdown_type", params.dropdown_type);
        data.append("value", params.value);
        data.append("status", params.status);
        storeOrUpdateApi(data);
    };


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

                        <h4 className="mb-1 dark:text-white font-bold"> <span className='text-yellow-500' ></span> {params.id ? 'Update' : 'Add'} Dropdown</h4>
                    </div>

                    <section className="flex-1 overflow-y-auto overflow-x-hidden perfect-scrollbar mt-5">
                        <form action="" method="post" className='p-5'>

                            <div className="mb-3">
                                <label
                                    htmlFor="name"
                                    className="text-style roboto-light poppins-font"
                                >
                                    Lead Status
                                </label>

                                <select
                                    className="input-form h-[33px] poppins-font  dark:border-[#5E5E5E] dark:bg-transparent"
                                    name='dropdown_type'
                                    value={params.dropdown_type ? params.dropdown_type : ""}
                                    onChange={(e) => { changeValue(e) }}
                                >

                                    <option className="poppins-font" value='new' >
                                        New
                                    </option>
                                    <option className="poppins-font" value='fresh' >
                                        Fresh
                                    </option>

                                </select>
                                <span className='text-red-700' >{errors.dropdown_type}</span>



                            </div>

                            <div className='mb-3'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Value</label>
                                <input id="fullname" type="text" className="input-form  poppins-font placeholder-black"
                                    name='value'
                                    value={params.value}
                                    onChange={(e) => { changeValue(e) }}
                                />
                                <span className='text-red-700' >{errors.value}</span>
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
                                    name='status'
                                    value={params.status ? params.status : ""}
                                    onChange={(e) => { changeValue(e) }}
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
                                <span className='text-red-700' >{errors.status}</span>
                            </div>

                        </form>
                    </section>
                    <footer className="w-full text-center border-t border-grey p-4">
                        <div className='flex justify-end gap-5 py-2'>
                            <button className='btn shadow' onClick={() => setShowDrawer(false)}>Cancel</button>
                            <button type='button' disabled={btnLoading} onClick={() => { formSubmit() }} className='btn bg-amber-500 text-white'  >
                                {
                                    btnLoading ? 'Please wait' : 'Submit'
                                }
                            </button>
                        </div>
                    </footer>
                </div>
            </nav>
        </div>
    )
}
