import React, { useRef } from "react";
import { RiHome4Line, RiPencilFill } from "react-icons/ri";
import { useState, Fragment, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { IRootState } from "../../store/index";
import { setPageTitle } from "../../store/themeConfigSlice";
import Swal from "sweetalert2";
import PageLoader from "../../components/PageLoader";
import withReactContent from "sweetalert2-react-content";
import { ErrorHandle } from "../common/ErrorHandle";
import logo from "../../assets/images/logo.svg";
import dlogo from "../../assets/images/dlogo.svg";
import favicon from "../../assets/images/favicon.svg";
import dfavicon from "../../assets/images/dfavicon.svg";
const CrmSwal = withReactContent(Swal);
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const AddRestaurant = ({editRest,editRestaurant}) => {
    let location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const restaurantId=location?.state?.restaurantId?location.state.restaurantId:null
    const timeZone=location?.state?.timeZone;
    console.log("timeZone",timeZone);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{

    if(restaurantId)fetchRestaurantData();
    else setIsLoading(false)
    },[restaurantId])
const [restauratData,setRestaurantData]=useState<any>(null)



useEffect(()=>{
    if(restauratData)
        setParams(
        {
            id:restaurantId,
            app_name:restauratData.app_name,
            restaurant_name:restauratData.restaurant_name,
            no_of_branches:restauratData.no_of_branches,
            admin_email:restauratData.admin_email,
            admin_name:restauratData.admin_name,
            admin_phone:restauratData.admin_phone,
            mode: restauratData.mode,
            status:restauratData.status,
            logo: restauratData.logo,
            fav_icon: restauratData.fav_icon,

            branch_name: restauratData?.branch?restauratData?.branch.branch_name:'',
            area: restauratData?.branch?restauratData?.branch.area:'',
            city: restauratData?.branch?restauratData?.branch.city:'',
            state: restauratData?.branch?restauratData?.branch.state:'',
            pincode:  restauratData?.branch?restauratData?.branch.pincode:'',
            country: restauratData?.branch?restauratData?.branch.country:'',
            time_zone: restauratData?.branch?restauratData?.branch.time_zone:'',

            address_line_1: restauratData?.branch?restauratData?.branch.address_line_1:'',
            address_line_2: restauratData?.branch?restauratData?.branch.address_line_2:'',
            branch_email: restauratData?.branch?restauratData?.branch.branch_email:'',
            branch_phone: restauratData?.branch?restauratData?.branch.branch_phone:'',


        })
    },[restauratData])


const fetchRestaurantData=async()=>{
    setIsLoading(true)
    try {
        const response=await axios({
            method:'get',
            url:`https://cdn.onetapdine.com/api/restaurants/${restaurantId}/edit`,
            headers:{
                'Content-Type':'application/json',
                Authorization:'Bearer '+ crmToken
            }
        })
        if(response.data.status=='success'){
            setRestaurantData(response.data.restaurant)
            // setTimeZones(response.data.timeZones)
        }

    } catch (error) {

    }
    finally{
        setIsLoading(false)
    }
}

console.log('restaurantData', restauratData)
const [defaultParams] = useState({
    id:'',
    app_name:'',
    restaurant_name:'',
    no_of_branches:'',
    admin_email:'',
    admin_name:'',
    admin_phone:'',
    mode: '',
    status:'',
    logo: '',
    fav_icon: '',

    branch_name: '',
    area: '',
    city: '',
    state: '',
    pincode:  '',
    country: '',
    time_zone: '',

    address_line_1:'',
    address_line_2: '',
    branch_email: '',
    branch_phone: '',


});

    // const [timeZones, setTimeZones] = useState([]);

    const crmToken = useSelector(
        (state: IRootState) => state.themeConfig.crmToken
    );

    // console.log(crmToken);
    // const crmToken='8|wE3Mh4SVxwrcXeqKDcQIMZYC6RDVZ4IKGQcSTF5d937ad76e's


    const [btnLoading, setBtnLoading] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    useEffect(() => {
        dispatch(setPageTitle("Restaurant"));
    }, []);

    const fileLogoRef = useRef<HTMLInputElement>(null);
    const fileIconRef = useRef<HTMLInputElement>(null);
    const [logoPriview, setLogoPriview] = useState<any>(
        themeConfig.theme == "dark" ? dlogo : logo
    );
    const [iconPriview, setIconPriview] = useState<any>(
        themeConfig.theme == "dark" ? dfavicon : favicon
    );


    const setImage = (e: any) => {
        const { name } = e.target;
        setErros({ ...errors, [name]: "" });
        if (e.target.files[0]) {
            if (
                e.target.files[0].type &&
                e.target.files[0].type.indexOf("image") === -1
            ) {
                setErros({ ...errors, [name]: "file is not a valid image" });
                return;
            }
            const maxSizeInBytes = 2 * 1024 * 1024;
            if (e.target.files[0].size > maxSizeInBytes) {
                setErros({ ...errors, [name]: "maximum file size is 2 mb" });
                return;
            }
            const reader = new FileReader();
            reader.onload = function (event: any) {
                if (name == "logo") setLogoPriview(reader.result);
                else setIconPriview(reader.result);

                setParams({ ...params, [name]: e.target.files[0] });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const [params, setParams] = useState<any>(
        JSON.parse(JSON.stringify(defaultParams))
    );
    const [errors, setErros] = useState<any>({});

    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: "" });
        setParams({ ...params, [name]: value });
    };

    const validate = () => {
        setErros({});
        let errors = {};

        if (!params.restaurant_name) {
            errors = {
                ...errors,
                restaurant_name: "restaurant name is required!",
            };
        }
        if (!params.app_name) {
            errors = { ...errors, app_name: "app name is required" };
        }

        if (!params.admin_email) {
            errors = {
                ...errors,
                admin_email: "admin email is required",
            };
        }
        if (!params.admin_name) {
            errors = {
                ...errors,
                admin_name: "admin name is required",
            };
        }
        if (!params.admin_phone) {
            errors = {
                ...errors,
                admin_phone: "admin phone is required",
            };
        }
        if (!params.branch_name) {
            errors = {
                ...errors,
                branch_name: "Branch Name is required",
            };
        }
        if (!params.no_of_branches) {
            errors = {
                ...errors,
                no_of_branches: "No of Branch is required",
            };
        }

        if (!params.area) {
            errors = {
                ...errors,
                area: "Area is required",
            };
        }
        if (!params.city) {
            errors = {
                ...errors,
                city: "City is required",
            };
        }
        if (!params.state) {
            errors = {
                ...errors,
                state: "State is required",
            };
        }
        if (!params.pincode) {
            errors = {
                ...errors,
                pincode: "Pincode is required",
            };
        }

        if (params.status == "")
            errors = { ...errors, status: "The status field is required." };
        if (params.mode == "")
            errors = { ...errors, mode: "The mode field is required." };
        if (!params.no_of_branches) {
            errors = { ...errors, no_of_branches: "Please select no_of_branches!" };
        }
        if (!params.id) {
            if (!params.country) {
                errors = { ...errors, country: "country is required" };
            }
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
                url: "https://cdn.onetapdine.com/api/restaurants",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + crmToken,
                },
            });
            if (response.data.status == "success") {
                Swal.fire({
                    icon: response.data.status,
                    title: response.data.title,
                    text: response.data.message,
                    padding: "2em",
                    customClass: "sweet-alerts",
                });

                navigate('/restaurants')
            } else {
                alert("Failed");
            }
        } catch (error: any) {
            console.log(error);
            if (error.response.status === 401) {
                ErrorHandle();
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
        data.append("app_name", params.app_name);
        data.append("restaurant_name", params.restaurant_name);
        data.append("no_of_branches", params.no_of_branches);
        data.append("admin_name", params.admin_name);
        data.append("admin_email", params.admin_email);
        data.append("admin_phone", params.admin_phone);
        data.append("mode", params.mode);
        data.append("status", params.status);
        data.append("logo", params.logo);
        data.append("fav_icon", params.fav_icon);
        data.append("area", params.area);
        data.append("city", params.city);
        data.append("state", params.state);
        data.append("pincode", params.pincode);
        data.append("country", params.country);
        data.append("time_zone", params.time_zone);
        data.append("branch_name", params.branch_name);
        data.append("address_line_1", params.address_line_1);
        data.append("address_line_2", params.address_line_2);
        data.append("branch_email", params.branch_email);
        data.append("branch_phone", params.branch_phone);
        storeOrUpdateApi(data);
    };


    return (
        <div>
            {isLoading ? (
                <PageLoader />
            ) : (

                <div className="">
                    <div>
                        <div className="panel flex justify-between items-center overflow-x-auto whitespace-nowrap p-1.5 rounded-none ">
                            <div className="flex  items-center overflow-x-auto whitespace-nowrap " >
                                <div className="rounded-full p-1.5   ltr:mr-3 rtl:ml-3">
                                    <RiHome4Line className=' opacity' size={20} color='gray' />

                                </div>
                                <IoIosArrowForward className='ltr:mr-3 opacity-25 font-thin' color='gray' />

                                <a href="/" style={{ letterSpacing: '1px', fontFamily: 'Poppins', fontSize: '0.85rem', fontWeight: '400', lineHeight: '25px' }} className="block hover:underline text-gray-600  ltr:mr-3 rtl:ml-3" rel="noreferrer">
                                    Home
                                </a>

                                <IoIosArrowForward className='font-thin ml-3 mr-3 opacity-25' color='gray' />

                                <a href="/restaurants" style={{ letterSpacing: '1px', fontFamily: 'Poppins', fontSize: '0.85rem', fontWeight: '400', lineHeight: '25px' }} className="block hover:underline text-gray-600  ltr:mr-3 rtl:ml-3" rel="noreferrer">
                                    Restaurants
                                </a>


                                <IoIosArrowForward className='font-thin ml-3 opacity-25' color='gray' />

                                <p style={{ letterSpacing: '1px', fontFamily: 'Poppins', fontSize: '0.85rem', fontWeight: '400', lineHeight: '25px' }} className='ltr:ml-3 text-blue-700' >Add Restaurants</p>

                            </div>
                            <div className="flex  items-center overflow-x-auto">


                                <a href="/restaurants" style={{ letterSpacing: '1px', fontFamily: 'Poppins', fontWeight: '400', lineHeight: '25px' }} className="flex  items-center hover:underline text-gray-600 text-[13px]  ltr:mr-10 rtl:ml-3" rel="noreferrer">
                                    <IoIosArrowBack
                                        className='font-thin ml-2 mr-2 ' color='gray' />  Back
                                </a>

                            </div>
                        </div>
                    </div>
                    <div>

                    </div>

                    <div className="px-6 py-6" >
                        <div className="px-8 py-8 dark:bg-[#202125] bg-white">
                            <h1 className=" font-medium text-md mb-2" >Restaurant Details</h1>
                            <form>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-x-5">
                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="rname"
                                        >
                                            Restaurant Name
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="restaurant_name"
                                            value={params.restaurant_name}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.restaurant_name ? (
                                            <div className="text-danger mt-1">
                                                {errors.restaurant_name}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="subdomain"
                                        >
                                            App Name
                                        </label>

                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent "
                                            name="app_name"
                                            value={params.app_name}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.app_name ? (
                                            <div className="text-danger mt-1">
                                                {errors.app_name}
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
                                            Mode
                                        </label>

                                        <select
                                            className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="mode"
                                            value={params.mode ? params.mode : ""}
                                            onChange={(e) => changeValue(e)}
                                        >
                                            <option className="" value="">
                                                Select Mode
                                            </option>
                                            <option className="" value="1" defaultChecked={params.mode == '1' ? true : false} >
                                                Live
                                            </option>
                                            <option className="" value="0" defaultChecked={params.mode == '0' ? true : false} >
                                                Demo
                                            </option>

                                        </select>
                                        {errors?.mode ? (
                                            <div className="text-danger mt-1">
                                                {errors.mode}
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
                                            Status
                                        </label>

                                        <select
                                            className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="status"
                                            value={params.status ? params.status : ""}
                                            onChange={(e) => changeValue(e)}
                                        >
                                            <option className="" value="">
                                                Select Status
                                            </option>
                                            <option className="" value="1" defaultChecked={params.mode == '1' ? true : false} >
                                                Active
                                            </option>
                                            <option className="" value="0" defaultChecked={params.mode == '0' ? true : false} >
                                                Disable
                                            </option>

                                        </select>
                                        {errors?.status ? (
                                            <div className="text-danger mt-1">
                                                {errors.status}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="mb-1 mt-1">
                                        <input
                                            ref={fileLogoRef}
                                            name="logo"
                                            type="file"
                                            onChange={(e) => setImage(e)}
                                            className="form-input hidden"
                                            accept="image/*"
                                        />
                                        <span className="w-full h-20 relative">
                                            <img
                                                className="w-30 h-20 rounded overflow-hidden object-cover"
                                                id="logo"
                                                onClick={() => {
                                                    fileLogoRef.current!.click();
                                                }}
                                                src={logoPriview}
                                                alt="logo"
                                            />
                                        </span>
                                        {errors?.logo ? (
                                            <div className="text-danger mt-1">
                                                {errors.logo}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="mb-1 mt-1 ">
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
                                        {errors?.fav_icon ? (
                                            <div className="text-danger mt-1">
                                                {errors.fav_icon}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    </div>
                                    <hr className="my-5" />

                                    <div>
                                    <h1 className=" font-medium text-md mb-2" >Main Branch Details</h1>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-x-5">
                                    <div className="mb-1">

                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="email"
                                        >
                                            Branch Name
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="branch_name"
                                            value={params.branch_name}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.branch_name ? (
                                            <div className="text-danger mt-1">
                                                {errors.branch_name}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="email"
                                        >
                                           No of Branches
                                        </label>
                                        <input
                                            type="number"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="no_of_branches"
                                            value={params.no_of_branches}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.no_of_branches ? (
                                            <div className="text-danger mt-1">
                                                {errors.no_of_branches}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="email"
                                        >
                                           Phone Number
                                        </label>
                                        <input
                                            type="number"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="branch_phone"
                                            value={params.branch_phone}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.branch_phone ? (
                                            <div className="text-danger mt-1">
                                                {errors.branch_phone}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="email"
                                        >
                                             Email
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="branch_email"
                                            value={params.branch_email}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.branch_email ? (
                                            <div className="text-danger mt-1">
                                                {errors.branch_email}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>


                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="email"
                                        >
                                            Address Line1
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="address_line_1"
                                            value={params.address_line_1}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.address_line_1 ? (
                                            <div className="text-danger mt-1">
                                                {errors.address_line_1}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="email"
                                        >
                                            Address Line2
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="address_line_2"
                                            value={params.address_line_2}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.address_line_2 ? (
                                            <div className="text-danger mt-1">
                                                {errors.address_line_2}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="email"
                                        >
                                            Area
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="area"
                                            value={params.area}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.area ? (
                                            <div className="text-danger mt-1">
                                                {errors.area}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="email"
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
                                            htmlFor="email"
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
                                            htmlFor="email"
                                        >
                                            Pincode
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="pincode"
                                            value={params.pincode}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.pincode ? (
                                            <div className="text-danger mt-1">
                                                {errors.pincode}
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
                                            Country
                                        </label>

                                        <select
                                            className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="country"
                                            value={params.time_zone ? params.country : ""}
                                            onChange={(e) => changeValue(e)}
                                        >
                                            <option className="" value="">
                                                Select Country
                                            </option>
                                            <option className="" value="INDIA">
                                                INDIA
                                            </option>
                                            <option className="" value="USA">
                                                USA
                                            </option>
                                            <option className="" value="UAE">
                                                UAE
                                            </option>
                                        </select>
                                        {errors?.country ? (
                                            <div className="text-danger mt-1">
                                                {errors.country}
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
                                            Timezone
                                        </label>

                                        <select
                                            className="input-form h-[33px] dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="time_zone"
                                            value={params.time_zone ? params.time_zone : ""}
                                            onChange={(e) => changeValue(e)}
                                        >
                                            <option value="">Select Timezone</option>
                                            {timeZone[params.country]?.map((z) => (
                                       <option value={z} key={z}>
                                           {z}
                                       </option>
                                   ))}
                                        </select>
                                        {errors?.time_zone ? (
                                            <div className="text-danger mt-1">
                                                {errors.time_zone}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    </div>
                                    </div>
                                    <hr className="my-5" />

                                    <div>
                                    <h1 className=" font-medium text-md mt-4 mb-1" >Admin Details</h1>
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-x-5" >
                                        <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="name"
                                        >
                                            Admin Name
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="admin_name"
                                            value={params.admin_name}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.admin_name ? (
                                            <div className="text-danger mt-1">
                                                {errors.admin_name}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="phone"
                                        >
                                            Admin Email Id
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="admin_email"
                                            value={params.admin_email}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.admin_email ? (
                                            <div className="text-danger mt-1">
                                                {errors.admin_email}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="email"
                                        >
                                            Admin Contact Number
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="admin_phone"
                                            value={params.admin_phone}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.admin_phone ? (
                                            <div className="text-danger mt-1">
                                                {errors.admin_phone}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                        </div>

                                    </div>

                            </form>
                            <div className="mt-8 flex items-center justify-end">
                                <button
                                    type="button"
                                    disabled={btnLoading}
                                    className="btn  btn-dark btn-sm px-10 rounded-2xl bg-[#000000] text-white dark:bg-white dark:text-black "
                                    onClick={() => {
                                        formSubmit();
                                    }}
                                >
                                    {btnLoading ? "please wait" : 'Submit'}

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default AddRestaurant;
