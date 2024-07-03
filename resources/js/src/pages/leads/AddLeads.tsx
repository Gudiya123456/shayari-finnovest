import React, { useRef } from "react";
import { useState, Fragment, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { IRootState } from "../../store";
import Select from 'react-select';

const AddLeads = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let location = useLocation();

    console.log(location?.state?.leadId);
    const leadsData = location?.state?.leadId;
    const [settings, setSettings] = useState([])
    const token = useSelector(
        (state: IRootState) => state.themeConfig.token
    );

    // console.log(crmToken);
    const [isLoading, setIsLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        if (leadsData)
            setParams({
                id: leadsData?.id,
                owner: leadsData?.owner,
                first_name: leadsData?.first_name,
                last_name: leadsData?.last_name,
                email: leadsData?.email,
                phone: leadsData?.phone,
                second_phone: leadsData?.second_phone,
                invest: leadsData?.invest,
                first_trial: leadsData?.first_trial,
                second_trial: leadsData?.second_trial,
                followup: leadsData?.followup,
                source: leadsData?.source,
                dnd: leadsData?.dnd,
                city: leadsData?.city,
                state: leadsData?.state,
                product: leadsData?.product,
                description: leadsData?.description,
                kyc_status: leadsData?.kyc_status,
                rp_status: leadsData?.rp_status,
                status: leadsData?.status
            })

    }, [leadsData])

    const options5 = [
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
    ];


    const [defaultParams] = useState({
        id: '',
        owner: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        second_phone: '',
        invest: '',
        first_trial: '',
        second_trial: '',
        followup: '',
        source: '',
        dnd: '',
        city: '',
        state: '',
        product: '',
        description: '',
        kyc_status: '',
        rp_status: '',
        status: ''

    });



    const [params, setParams] = useState<any>(
        JSON.parse(JSON.stringify(defaultParams))
    );
    const [errors, setErros] = useState<any>({});

    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: "" });
        setParams({ ...params, [name]: value });
    };
    console.table(params);


    const validate = () => {
        setErros({});
        let errors = {};
        if (!params.first_name) {
            errors = {
                ...errors,
                first_name: " first_name is required!",
            };
        }
        console.log(errors);
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };

    const storeOrUpdateApi = async (data: any) => {
        setBtnLoading(true);
        try {
            const response = await axios({
                method: "post",
                url: window.location.origin + "/api/leads",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + token,
                },
            });
            if (response.data.status == "success") {
                alert('successs');
                Swal.fire({
                    icon: response.data.status,
                    title: response.data.title,
                    text: response.data.message,
                    padding: "2em",
                    customClass: "sweet-alerts",
                });

                // fetchLeads();
                // dispatch(setCrmData(response.data.setting));
                navigate('/leads')
            } else {
                alert("Failed");
            }
        } catch (error: any) {
            console.log(error);
            if (error.response.status === 401) {
                // ErrorHandle();
                console.log(error)
            }
            if (error?.response?.status === 422) {
                const serveErrors = error.response.data.errors;
                let serverErrors = {};
                for (var key in serveErrors) {
                    serverErrors = { ...serverErrors, [key]: serveErrors[key][0] };
                    console.log(serveErrors[key][0]);
                }
                setErros(serverErrors);
                CrmSwal.fire({
                    title: "Server Validation Error! Please solve",
                    toast: true,
                    position: "top",
                    showConfirmButton: false,
                    showCancelButton: false,
                    width: 450,
                    timer: 2000,
                    customClass: {
                        popup: "color-danger",
                    },
                });
            }
        } finally {
            setBtnLoading(false);
        }
    };

    const formSubmit = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("id", params.id);
        data.append("owner", params.owner);
        data.append("first_name", params.first_name);
        data.append("last_name", params.last_name);
        data.append("email", params.email);
        data.append("phone", params.phone);
        data.append("second_phone", params.second_phone);
        data.append("invest", params.invest);
        data.append("first_trial", params.first_trial);
        data.append("second_trial", params.second_trial);
        data.append("followup", params.followup);
        data.append("source", params.source);
        data.append("dnd", params.dnd);
        data.append("city", params.city);
        data.append("state", params.state);
        data.append("product", params.product);
        data.append("description", params.description);
        data.append("kyc_status", params.kyc_status);
        data.append("rp_status", params.rp_status);
        data.append("status", params.status);
        storeOrUpdateApi(data);
    };

    const storeOrUpdate = (data) => {
        setErros({});
        if (data) {
            setParams({
                id: data.id,
                owner: data.owner,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                second_phone: data.second_phone,
                invest: data.invest,
                first_trial: data.first_trial,
                second_trial: data.second_trial,
                followup: data.followup,
                source: data.source,
                dnd: data.dnd,
                city: data.city,
                state: data.state,
                product: data.product,
                description: data.description,
                kyc_status: data.kyc_status,
                rp_status: data.rp_status,
                status: data.status ? "1" : "0",
            });


        } else {
            setParams(defaultParams);

        }
    };




    useEffect(()=>{
        fetchProducts();

    },[])
    const [products,setProducts]=useState([])

        const fetchProducts=async()=>{
            setIsLoading(true);
            try {
                const response=await axios({
                    method:'get',
                    url:window.location.origin+'/api/dropdowns',
                    headers:{
                        'Content-Type':'application/json',
                        Authorization:'Bearer ' + token
                    }
                })

                if(response.data.status=='success'){
                    setProducts(response.data.dropdown);
                }

            } catch (error) {
                console.log(error)

            }
            finally{
                setIsLoading(false);
            }
        }


    return (
        <div>

            <div className=" grid grid-cols-12 gap-4">
                <div className=" lg:col-span-2 bg-amber-500 h-full" >
                   sidebar
                </div>
                <div className=" lg:col-span-10 " >
                    <div className="px-8 py-8 dark:bg-[#202125] bg-white">
                        <h2 className='text-amber-500 text-xl font-bold mb-4 ' >Add Leads</h2>

                        <form>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-x-5">

                                <div className="mb-1">
                                    <label
                                        className="text-style roboto-light"
                                        htmlFor="rname"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"

                                        name="first_name"
                                        value={params.first_name}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    />
                                    {errors?.first_name ? (
                                        <div className="text-danger mt-1">
                                            {errors.first_name}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                <div className="mb-1">
                                    <label
                                        className="text-style roboto-light"
                                        htmlFor="rname"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                        name="last_name"
                                        value={params.last_name}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    />
                                    {errors?.last_name ? (
                                        <div className="text-danger mt-1">
                                            {errors.last_name}
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                </div>
                                <div className="mb-1">
                                    <label
                                        className="text-style roboto-light"
                                        htmlFor="rname"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                        name="email"
                                        value={params.email}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    />
                                    {errors?.email ? (
                                        <div className="text-danger mt-1">
                                            {errors.email}
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                </div>
                                <div className="mb-1">
                                    <label
                                        className="text-style roboto-light"
                                        htmlFor="rname"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                        name="phone"
                                        value={params.phone}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    />
                                    {errors?.phone ? (
                                        <div className="text-danger mt-1">
                                            {errors.phone}
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                </div>
                                <div className="mb-1">
                                    <label
                                        className="text-style roboto-light"
                                        htmlFor="rname"
                                    >
                                        Second Phone
                                    </label>
                                    <input
                                        type="text"
                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                        name="second_phone"
                                        value={params.second_phone}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    />
                                    {errors?.second_phone ? (
                                        <div className="text-danger mt-1">
                                            {errors.second_phone}
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                </div>

                                <div className="mb-1">
                                    <label
                                        htmlFor="name"
                                        className="text-style roboto-light"
                                    >
                                       Invest
                                    </label>

                                    <select
                                        className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                                        name="invest"
                                        value={params.invest}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}

                                    >
                                        <option className="" value="">
                                            Select invest
                                        </option>
                                        <option className="" value='dnd1' defaultChecked={true}
                                            onClick={(e) => changeValue(e)}
                                        >
                                            invest one
                                        </option>
                                        <option className="" value='dnd2' defaultChecked={false}
                                            onClick={(e) => changeValue(e)}
                                        >
                                            invest two
                                        </option>

                                    </select>

                                </div>

                                {/* <div className="mb-1">
                                    <label
                                        className="text-style roboto-light"
                                        htmlFor="rname"
                                    >
                                        Invest
                                    </label>
                                    <input
                                        type="text"
                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                        name="invest"
                                        value={params.invest}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    />
                                    {errors?.invest ? (
                                        <div className="text-danger mt-1">
                                            {errors.invest}
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                </div> */}

                                <div className="mb-1">
                                    <label
                                        className="text-style roboto-light"
                                        htmlFor="rname"
                                    >
                                        First Trial
                                    </label>
                                    <input
                                        type="date"
                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                        name="first_trial"
                                        value={params.first_trial}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    />
                                    {errors?.first_trial ? (
                                        <div className="text-danger mt-1">
                                            {errors.first_trial}
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                </div>

                                <div className="mb-1">
                                    <label
                                        className="text-style roboto-light"
                                        htmlFor="rname"
                                    >
                                        Second Trail
                                    </label>
                                    <input
                                        type="date"
                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                        name="second_trial"
                                        value={params.second_trial}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    />
                                    {errors?.second_trial ? (
                                        <div className="text-danger mt-1">
                                            {errors.second_trial}
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                </div>
                                <div className="mb-1">
                                    <label
                                        className="text-style roboto-light"
                                        htmlFor="rname"
                                    >
                                        Follow Up
                                    </label>
                                    <input
                                        type="date"
                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                        name="followup"
                                        value={params.followup}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    />
                                    {errors?.followup ? (
                                        <div className="text-danger mt-1">
                                            {errors.followup}
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                </div>

                                <div className="mb-1">
                                    <label
                                        className="text-style roboto-light"
                                        htmlFor="rname"
                                    >
                                        Source
                                    </label>
                                    <input
                                        type="text"
                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                        name="source"
                                        value='Incoming'
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    />

                                </div>

                                {/* <div className="mb-1">
                                    <label
                                        className="text-style roboto-light"
                                        htmlFor="rname"
                                    >
                                        DND
                                    </label>
                                    <input
                                        type="text"
                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                        name="dnd"
                                        value={params.dnd}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    />
                                    {errors?.dnd ? (
                                        <div className="text-danger mt-1">
                                            {errors.dnd}
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                </div> */}


                                <div className="mb-1">
                                    <label
                                        htmlFor="name"
                                        className="text-style roboto-light"
                                    >
                                        DND
                                    </label>

                                    <select
                                        className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                                        name="dnd"
                                        value={params.dnd}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}

                                    >
                                        <option className="" value="">
                                            Select Dnd
                                        </option>
                                        <option className="" value='dnd1' defaultChecked={true}
                                            onClick={(e) => changeValue(e)}
                                        >
                                            Dnd one
                                        </option>
                                        <option className="" value='dnd2' defaultChecked={false}
                                            onClick={(e) => changeValue(e)}
                                        >
                                            Dnd two
                                        </option>

                                    </select>

                                </div>

                                <div className="mb-1">
                                    <label
                                        className="text-style roboto-light"
                                        htmlFor="rname"
                                    >
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                        name="state"
                                        value={params.state}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    />
                                    {errors?.state ? (
                                        <div className="text-danger mt-1">
                                            {errors.state}
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                </div>

                                <div className="mb-1">
                                    <label
                                        className="text-style roboto-light"
                                        htmlFor="rname"
                                    >
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                        name="city"
                                        value={params.city}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    />
                                    {errors?.city ? (
                                        <div className="text-danger mt-1">
                                            {errors.city}
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                </div>

                                <div className="mb-1">
                                    <label
                                        className="text-style roboto-light"
                                        htmlFor="rname"
                                    >
                                        Products
                                    </label>

                                    <select

                                        className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                                        name='product'
                                        value={params.product ? params.product : ""}
                                        onChange={(e) => { changeValue(e) }}

                                    >
                                        <option className="" value="">
                                            Select products
                                        </option>
                                        <option className="" value='p1'

                                            onClick={(e) => changeValue(e)}
                                        >
                                            P1
                                        </option>
                                        <option className="" value='p2'
                                            onClick={(e) => changeValue(e)}
                                        >
                                            P2
                                        </option>

                                    </select>

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
                                        name='status'
                                        value={params.status ? params.status : ""}
                                        onChange={(e) => { changeValue(e) }}

                                    >
                                          {
                                            products.map((s)=>{return(<><option value={params.dropdown_type}>{s.dropdown_type}</option></>)})
                                           }

                                        {/* <option className="" value={'1'}

                                            onClick={(e) => changeValue(e)}
                                        >
                                            Active
                                        </option> */}
                                        {/* <option className="" value={'0'}
                                            onClick={(e) => changeValue(e)}
                                        >
                                            Disabled
                                        </option> */}

                                    </select>

                                </div>

                                <div className="mb-1">
                                    <label
                                        className="text-style roboto-light"
                                        htmlFor="rname"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                        name="description"
                                        value={params.description}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    ></textarea>
                                    {/* <input
                                        type="text"
                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                        name="description"
                                        value={params.description}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    /> */}
                                    {errors?.description ? (
                                        <div className="text-danger mt-1">
                                            {errors.description}
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                </div>
                            </div>
                        </form>
                        <div className="mt-8 flex items-center justify-end">
                            <button
                                type="button"
                                className="btn  btn-dark btn-sm px-10 rounded-2xl border-none bg-amber-500 text-white dark:bg-white dark:text-black "
                                onClick={() => { formSubmit() }}

                            >

                                {
                                    btnLoading ? 'Please wait' : 'Submit'
                                }
                            </button>
                        </div>
                    </div>
                </div>

            </div>



        </div>
    );
};

export default AddLeads;
