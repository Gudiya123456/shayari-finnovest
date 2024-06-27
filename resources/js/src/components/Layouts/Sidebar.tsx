import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import React,{ useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
import IconMenuElements from '../Icon/Menu/IconMenuElements';
import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
import IconMenuForms from '../Icon/Menu/IconMenuForms';
import IconMenuApps from '../Icon/Menu/IconMenuApps';

const Sidebar = () => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();


    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            {/* <img className="w-8 ml-[5px] flex-none" src="/logo.svg" alt="logo" /> */}
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
                                <img className='w-32' src="/logo.png" alt="" />
                            </span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">


                            <li className="nav-item">
                                <ul>
                                <li className="menu nav-item relative">
                      <NavLink to='/' >
                      <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuDashboard className="shrink-0" />
                                <span className="px-1">{t('dashboard')}</span>
                            </div>

                        </button>
                      </NavLink>

                    </li>
                    <li className="menu nav-item relative">
                        <NavLink to="/registerd">

                            <button type="button" className="nav-link">
                                <div className="flex items-center">
                                    <IconMenuApps className="shrink-0" />
                                    <span className="px-1">{t('Registerd Client')}</span>
                                </div>

                            </button>
                        </NavLink>

                    </li>
                    <li className="menu nav-item relative">
                        <NavLink to='/leads'>
                            <button type="button" className="nav-link">
                                <div className="flex items-center">
                                    <IconMenuComponents className="shrink-0" />
                                    <span className="px-1">{t('Leads')}</span>
                                </div>
                            </button>
                        </NavLink>

                    </li>
                    <li className="menu nav-item relative">
                        <NavLink to='/sales' >
                            <button type="button" className="nav-link">
                                <div className="flex items-center">
                                    <IconMenuElements className="shrink-0" />
                                    <span className="px-1">{t('Sales')}</span>
                                </div>
                            </button>
                        </NavLink>

                    </li>
                    <li className="menu nav-item relative">
                        <NavLink to='/analyst' >
                            <button type="button" className="nav-link">
                                <div className="flex items-center">
                                    <IconMenuDatatables className="shrink-0" />
                                    <span className="px-1">{t('Analyst')}</span>
                                </div>

                            </button>
                        </NavLink>

                    </li>
                    <li className="menu nav-item relative">
                        <NavLink to='/settings'>
                            <button type="button" className="nav-link">
                                <div className="flex items-center">
                                    <IconMenuForms className="shrink-0" />
                                    <span className="px-1">{t('Settings')}</span>
                                </div>

                            </button>
                        </NavLink>

                    </li></ul>
                    </li>

                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
