import React, { useRef } from "react";
import { useState, Fragment, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { setPageTitle } from "../../store/themeConfigSlice";
import { IRootState } from "../../store";

const Notification = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[settings,setSettings]=useState([])
    const token = useSelector(
        (state: IRootState) => state.themeConfig.token
    );

    const [isLoading, setIsLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle("Notification"));
        fetchNotification();
    }, []);

    // fetchNotification
    const fetchNotification = async () => {
        setIsLoading(true);
        try {
            const response = await axios({
                method: "get",
                url: window.location.origin+ "/api/notification",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            console.log("Setthings Datatatat",response.data.notification);

            if (response.data.status == "success") {
                if(response.data.notification) storeOrUpdate(response.data.notification)
                    else storeOrUpdate();
                setSettings(response.data.notification);
                console.log(response.data);
            }

            if (response.data.status == "error") {
                alert(99999);
            }
        } catch (error: any) {
            if (error.response.status == 401) {
                // ErrorHandle();
                console.log(error)
            } else console.log(error);
        } finally {
            setIsLoading(false);
        }
    };


    const [defaultParams] = useState({
        id: "",
        from_name:'',
        from_email:'',
        mail_queue:'',
        mail_driver:'',
        mail_port:'',
        mail_encryption:'',
        mail_host:'',
        mail_password:'',
        mail_username:'',
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
        // if (!params.from_name) {
        //     errors = {
        //         ...errors,
        //         from_name: " Name is required!",
        //     };
        // }
        console.log(errors);
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };

    const storeOrUpdateApi = async (data: any) => {
        setBtnLoading(true);
        try {
            const response = await axios({
                method: "post",
                url: window.location.origin+ "/api/notification/1",
                data,
                headers: {
                    "Content-Type": "multmail_portart/form-data",
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

                // fetchNotification();
                // dispatch(setCrmData(response.data.setting));
                // navigate('/restaurants')
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
        data.append("from_name", params.from_name);
        data.append("from_email", params.from_email);
        data.append("mail_queue", params.mail_queue);
        data.append("mail_driver", params.mail_driver);
        data.append("mail_port", params.mail_port);
        data.append("mail_encryption", params.mail_encryption);
        data.append("mail_host", params.mail_host);
        data.append("mail_username", params.mail_username);
        data.append("mail_password", params.mail_password);



        storeOrUpdateApi(data);
    };

    const storeOrUpdate = (data) => {
        setErros({});
        if (data) {
            setParams({
                id: data.id,
                from_name: data.from_name,
                from_email: data.from_email,
                mail_queue: data.mail_queue,
                mail_driver: data.mail_driver,
                mail_port: data.mail_port,
                mail_encryption: data.mail_encryption,
                mail_host: data.mail_host,
                mail_password: data.mail_password,
                mail_username: data.mail_username,



            });
        }




};

return(
    <>
   <div className="">

<div className=" " >
    <div className="px-8 py-8 dark:bg-[#202125] bg-white">
    <h2 className='text-amber-500 text-xl font-bold mb-4 ' >SMTP  Email</h2>

        <form>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-x-5">
            <div className="mb-1">
                    <label
                        className="text-style roboto-light"
                        htmlFor="rname"
                    >
                      Mail From Name
                    </label>
                    <input
                        type="text"
                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                        name="from_name"
                        value={params.from_name}
                        onChange={(e) => {
                            changeValue(e);
                        }}
                    />
                    {errors?.from_name ? (
                        <div className="text-danger mt-1">
                            {errors.from_name}
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
                      Mail From from_email
                    </label>
                    <input
                        type="text"
                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"

                        name="from_email"
                        value={params.from_email}
                        onChange={(e) => {
                            changeValue(e);
                        }}
                    />
                    {errors?.from_email ? (
                        <div className="text-danger mt-1">
                            {errors.from_email}
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
                       Select Mail Queue
                    </label>

                    <select
                        className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                        name="mail_queue"
                        value={params.mail_queue}
                        onChange={(e) => {
                            changeValue(e);
                        }}

                    >

                        <option className="" value='yes'

                    >
                         Yes
                        </option>
                        <option className="" value='no'

                        >
                           No
                        </option>

                    </select>

                </div>

                <div className="mb-1">
                    <label
                        htmlFor="name"
                        className="text-style roboto-light"
                    >
                       Mail Driver
                    </label>

                    <select
                        className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                        name="mail_driver"
                        value={params.mail_driver}
                        onChange={(e) => {
                            changeValue(e);
                        }}

                    >

                        <option className="" value='smtp'

                    onClick={(e) => changeValue(e)} >
                         SMTP
                        </option>
                        <option className="" value='mail'
                        onClick={(e) => changeValue(e)}
                        >
                          Mail
                        </option>

                    </select>

                </div>
                <div className="mb-1">
                    <label
                        className="text-style roboto-light"
                        htmlFor="rname"
                    >
                     Mail Port
                    </label>
                    <input
                        type="text"
                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                        name="mail_port"
                        value={params.mail_port}
                        onChange={(e) => {
                            changeValue(e);
                        }}
                    />
                    {errors?.mail_port ? (
                        <div className="text-danger mt-1">
                            {errors.mail_port}
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
                      Mail Encryption
                    </label>

                    <select
                        className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                        name="mail_encryption"
                        value={params.mail_encryption}
                        onChange={(e) => {
                            changeValue(e);
                        }}
                        >
                        <option className="" value='ssl' >
                         ssl
                        </option>
                        <option className="" value='slr'
                        >
                          slr
                        </option>

                    </select>

                </div>


                <div className="mb-1">
                    <label
                        className="text-style roboto-light"
                        htmlFor="rname"
                    >
                       Mail Host
                    </label>
                    <input
                        type="text"
                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                        name="mail_host"
                        value={params.mail_host}
                        onChange={(e) => {
                            changeValue(e);
                        }}
                    />
                    {errors?.mail_host ? (
                        <div className="text-danger mt-1">
                            {errors.mail_host}
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
                    Mail Username
                    </label>
                    <input
                        type="text"
                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                        name="mail_username"
                        value={params.mail_username}
                        onChange={(e) => {
                            changeValue(e);
                        }}
                    />
                    {errors?.mail_username ? (
                        <div className="text-danger mt-1">
                            {errors.mail_username}
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
                      Mail Password
                    </label>
                    <input
                        type="text"
                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                        name="mail_encryption"
                        value={params.mail_encryption}
                        onChange={(e) => {
                            changeValue(e);
                        }}
                    />
                    {errors?.mail_encryption ? (
                        <div className="text-danger mt-1">
                            {errors.mail_encryption}
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
                onClick={()=>{formSubmit()}}

            >
            {
                btnLoading?'Please wait':'Update'
            }
            </button>
        </div>
    </div>
</div>
</div>
    </>
)
}

export default Notification;
