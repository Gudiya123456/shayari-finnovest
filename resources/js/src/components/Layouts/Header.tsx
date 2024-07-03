import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleRTL, toggleTheme, toggleSidebar } from '../../store/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import Dropdown from '../Dropdown';
import IconMenu from '../Icon/IconMenu';
import IconSearch from '../Icon/IconSearch';
import IconXCircle from '../Icon/IconXCircle';
import IconSun from '../Icon/IconSun';
import IconMoon from '../Icon/IconMoon';
import IconLaptop from '../Icon/IconLaptop';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMenuApps from '../Icon/Menu/IconMenuApps';
import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
import IconMenuElements from '../Icon/Menu/IconMenuElements';
import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
import IconMenuForms from '../Icon/Menu/IconMenuForms';
import logout from "../../assets/images/logout.svg"
const Header = () => {
    const location = useLocation();
    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }, [location]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();


    const [search, setSearch] = useState(false);



    const { t } = useTranslation();
    // console.log(location.pathname)
    const path=location.pathname;

    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
                    <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                        <Link to="/" className="main-logo flex items-center shrink-0">
                            <span className=" ltr:ml-1.5 rtl:mr-1.5  font-semibold  align-middle hidden md:inline dark:text-white-light transition-all duration-300">
                                <img className="w-32" src="/logo.png" alt="logo" />

                            </span>
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            onClick={() => {
                                dispatch(toggleSidebar());
                            }}
                        >
                            <IconMenu className="w-5 h-5" />
                        </button>
                    </div>

                    {/* style={{ border: 'white 2px solid', width: '1300px' }} */}
                    <marquee  style={{ border: 'white 2px solid', }} className="fs-4 w-[500px] lg:w-[1400px] hidden md:block text-amber-500 fw-bold text-success-emphasis" scrollamount="12" id="latestBroadcast">Finnovest : TGT1 DONE BOOK PROFIT.\nBy Growthlift Investment Private Limited - \nhttps://www.growthlift.co.in</marquee>
                    <div className="sm:flex-1  ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto">

                            <button
                                type="button"
                                onClick={() => setSearch(!search)}
                                className="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            >
                                <IconSearch className="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
                            </button>
                        </div>
                        {/* <div>

                            <form
                                className={`${search && '!block'} sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
                                onSubmit={() => setSearch(false)}
                            >
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="form-input ltr:pl-9 rtl:pr-9 w-[250px] ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                        placeholder="Search..."
                                    />
                                    <button type="button" className="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                                        <IconSearch className="mx-auto" />
                                    </button>
                                    <button type="button" className="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2" onClick={() => setSearch(false)}>
                                        <IconXCircle />
                                    </button>
                                </div>
                            </form>
                        </div> */}
                        {/* <div>
                            {themeConfig.theme === 'light' ? (
                                <button
                                    className={`${themeConfig.theme === 'light' &&
                                        'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                                        }`}
                                    onClick={() => {
                                        dispatch(toggleTheme('dark'));
                                    }}
                                >
                                    <IconSun />
                                </button>
                            ) : (
                                ''
                            )}
                            {themeConfig.theme === 'dark' && (
                                <button
                                    className={`${themeConfig.theme === 'dark' &&
                                        'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                                        }`}
                                    onClick={() => {
                                        dispatch(toggleTheme('system'));
                                    }}
                                >
                                    <IconMoon />
                                </button>
                            )}
                            {themeConfig.theme === 'system' && (
                                <button
                                    className={`${themeConfig.theme === 'system' &&
                                        'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                                        }`}
                                    onClick={() => {
                                        dispatch(toggleTheme('light'));
                                    }}
                                >
                                    <IconLaptop />
                                </button>
                            )}
                        </div> */}

                        <div className="dropdown shrink-0 flex">
                          <NavLink to='/login' >
                          <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="relative group block"
                                button={<img className="w-8 h-8 rounded-full object-cover saturate-10 group-hover:saturate-100" src={logout} alt="userProfile" />}
                            >
                            </Dropdown>
                          </NavLink>
                        </div>
                    </div>
                </div>

                {/* horizontal menu */}
                <ul className="horizontal-menu hidden py-1.5 font-semibold px-6 lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse bg-white border-t border-[#ebedf2] dark:border-[#191e3a] dark:bg-black text-black dark:text-white-dark">

                    <li>
                    <NavLink to='/' >
                      <button type="button" className={`nav-link ${path=='/'?'nav-link bg-amber-500 text-white':''}`}>
                            <div className="flex items-center">
                                <IconMenuDashboard className="shrink-0" />
                                <span className="px-1">{t('dashboard')}</span>
                            </div>

                        </button>
                      </NavLink>
                    </li>





                    <li className="menu nav-item relative">
                        <NavLink to="/registerd">

                            <button type="button" className={`nav-link ${path=='/registerd'?'nav-link bg-amber-500 text-white':''}`}>
                                <div className="flex items-center">
                                    <IconMenuApps className="shrink-0" />
                                    <span className="px-1">{t('Registerd Client')}</span>
                                </div>

                            </button>
                        </NavLink>

                    </li>
                    <li className="menu nav-item relative">
                        <NavLink to='/leads'>
                            <button type="button" className={`nav-link ${path=='/leads'?'nav-link bg-amber-500 text-white':''}`}>
                                <div className="flex items-center">
                                    <IconMenuComponents className="shrink-0" />
                                    <span className="px-1">{t('Leads')}</span>
                                </div>
                            </button>
                        </NavLink>

                    </li>
                    <li className="menu nav-item relative">
                        <NavLink to='/sales' >
                            <button type="button" className={`nav-link ${path=='/sales'?'nav-link bg-amber-500 text-white':''}`}>
                                <div className="flex items-center">
                                    <IconMenuElements className="shrink-0" />
                                    <span className="px-1">{t('Sales')}</span>
                                </div>
                            </button>
                        </NavLink>

                    </li>
                    <li className="menu nav-item relative">
                        <NavLink to='/analyst' >
                            <button type="button" className={`nav-link ${path=='/analyst'?'nav-link bg-amber-500 text-white':''}`}>
                                <div className="flex items-center">
                                    <IconMenuDatatables className="shrink-0" />
                                    <span className="px-1">{t('Analyst')}</span>
                                </div>

                            </button>
                        </NavLink>

                    </li>
                    <li className="menu nav-item relative">
                        <NavLink to='/settings'>
                            <button type="button" className={`nav-link ${path=='/settings'?'nav-link bg-amber-500 text-white':''}`}>
                                <div className="flex items-center">
                                    <IconMenuForms className="shrink-0" />
                                    <span className="px-1">{t('Settings')}</span>
                                </div>

                            </button>
                        </NavLink>

                    </li>


                </ul>
            </div>
        </header>
    );
};

export default Header;
