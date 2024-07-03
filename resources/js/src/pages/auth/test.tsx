import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { IRootState } from '../../store';
import { NavLink, useNavigate } from 'react-router-dom';
import logo1 from '../../assets/images/auth/Logo 1.svg'
import { setCrmToken, setUserData } from '../../store/themeConfigSlice';
import { ErrorHandle } from '../common/ErrorHandle';
import { IoEyeSharp } from "react-icons/io5";

const CrmSwal = withReactContent(Swal);

export default function EmailLogin() {
    const dispatch = useDispatch();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const navigate = useNavigate();

    useEffect(() => {
        if (crmToken) navigate('/')
    }, [crmToken])

    const defaultParams = { email: '', password: '' };
    const [errors, setErrors] = useState<any>({});
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const [btnLoading, setBtnLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErrors({ ...errors, [name]: '' });
        setParams({ ...params, [name]: value });
    };

    const validate = () => {
        setErrors({});
        let errors = {};
        if (!params.email) {
            errors = { ...errors, email: 'The email field is required.' };
        }
        if (!params.password) {
            errors = { ...errors, password: 'The password field is required.' };
        }
        setErrors(errors);
        return { totalErrors: Object.keys(errors).length };
    };

    const loginApi = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios.post("https://cdn.onetapdine.com/api/login", data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.status === 'success') {
                navigate('/');
                dispatch(setCrmToken(response.data.token))
                dispatch(setUserData(response.data.user))
            } else {
                alert("Error")
            }
        } catch (error: any) {
            if (error?.response?.status === 401) {
                ErrorHandle()
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
        } finally {
            setBtnLoading(false)
        }
    };

    const login = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("email", params.email);
        data.append("password", params.password);
        loginApi(data);
    };

    return (
        <form className="space-y-4 dark:text-white h-full rounded-xl">
            <div className="text-center">
                <img className='w-1/2 mx-auto mb-2' src={logo1} alt="Logo" />
            </div>
            <div className="space-y-1">
                <input type="email" value={params.email} name='email' onChange={(e) => changeValue(e)} placeholder='User Id' className="w-full rounded-lg border border-black bg-white px-4 py-2 text-sm text-black" />
                <span className="text-danger font-semibold text-sm">{errors.email}</span>
            </div>
            <div className="space-y-1">
                <div className='flex items-center rounded-lg border border-black bg-white px-4 py-2 text-sm text-black'>
                    <input type={showPassword ? 'text' : 'password'} value={params.password} name='password' onChange={(e) => changeValue(e)} placeholder='Password' className="w-full outline-none" />
                    <IoEyeSharp onClick={() => setShowPassword(prev => !prev)} className='ml-2 cursor-pointer' />
                </div>
                <span className="text-danger font-semibold text-sm">{errors.password}</span>
            </div>
            <button type="button" onClick={() => login()} disabled={btnLoading} className="btn bg-black text-white w-full rounded-lg mt-2">
                {btnLoading ? 'Please Wait...' : 'Login'}
            </button>
            <div className='flex  justify-between mt-2'>
                <div className="flex  items-center gap-2">
                    <input type='checkbox' />
                    <p className="text-black text-sm">Remember me?</p>
                </div>
                <NavLink to='/forgotpassword' className="text-sm text-black">Forgot password?</NavLink>
            </div>
        </form>
    )
}
