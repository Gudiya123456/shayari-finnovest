import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import React,{ useEffect, useState } from 'react';
import { setPageTitle, setToken, setUserData, toggleRTL } from '../../store/themeConfigSlice';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const CrmSwal = withReactContent(Swal);

const Login = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login'));
    });
    const navigate = useNavigate();
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    // const submitForm = () => {
    //     navigate('/');
    // };

    const defaultParams={email:'', password:''};
    const[errors,setErrors]=useState<any>({});
    const[params,setParams]=useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const[btnLoading,setBtnLoading]=useState(false);
    const[showPassword,setShowPassword]=useState(false);

    const changeValue=(e:any)=>{
        const{ value,name}=e.target;
        setErrors({...errors,[name]:''});
        setParams({...params,[name]:value});
    }

    const validate=()=>{
        setErrors({});
        let errors={}
        if(!params.email){
            errors={...errors, email:'The email is reqiured'};
        }

        if(!params.password){
            errors={...errors,password:'Password is required'}
        }

        setErrors(errors);
        return {totalErrors:Object.keys(errors).length};
    }

    const loginApi=async(data)=>{
        setBtnLoading(true);
        try {

            const response= await axios({
                method:'post',
                data,
                url:window.location.origin+'/api/login',
                headers:{
                    'Content-Type':'application/json'
                }

            })
            if(response.data.status=='success'){
                navigate('/');
               dispatch(setToken(response.data.token))
               dispatch(setUserData(response.data.user))

            }

            console.log(response.data);

        } catch (error) {
            console.log(error)
            if (error?.response?.status === 401) {
               console.log('object')
            } else if (error?.response?.status === 422) {
                const serverErrors = error.response.data.errors;
                for (var key in serverErrors) {
                    setErrors({ ...errors, [key]: serverErrors[key][0] });
                }
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

        }
        finally{
            setBtnLoading(false)
        }

    }

    const loginSubmit=()=>{
        const isValid=validate();
        if(isValid.totalErrors) return false;
        const data= new FormData()
        data.append('email',params.email);
        data.append('password',params.password);
        loginApi(data);

    }



    return (
        <div>
            <div className="relative flex min-h-screen items-center justify-center  bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">

                <div className="relative w-full max-w-[660px] rounded-md  p-2 ">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[358px] py-10">

                        <div className="mx-auto w-full max-w-[540px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-amber-500 md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                            <form className="space-y-5 dark:text-white" >
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input id="Email" type="email" value={params.email} name='email' onChange={(e) => changeValue(e)} placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                    <span className="text-danger font-semibold text-sm">{errors.email}</span>

                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input id="Password" type="password" value={params.password} name='password' onChange={(e) => changeValue(e)} placeholder="Enter Password" className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                    <span className="text-danger font-semibold text-sm">{errors.password}</span>

                                </div>
                                <div>
                                    <label className="flex cursor-pointer items-center">
                                        <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                        <span className="text-white-dark">Remember me</span>
                                    </label>
                                </div>
                                <button type="button" onClick={()=>{loginSubmit()}} disabled={btnLoading} className="btn bg-amber-500 text-white !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                  {
                                    btnLoading?'Please wait':'Sign In'
                                  }
                                </button>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
