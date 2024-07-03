import { Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';
import IconHome from '../../components/Icon/IconHome';
import IconUser from '../../components/Icon/IconUser';
import IconPhone from '../../components/Icon/IconPhone';
import IconInfoCircle from '../../components/Icon/IconInfoCircle';
import IconSettings from '../../components/Icon/IconSettings';
import IconSearch from '../../components/Icon/IconSearch';
import IconXCircle from '../../components/Icon/IconXCircle';
import TemplateTable from './TemplateTable';
import WhatsappTable from './WhatsappTable';

const Tabs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tabs'));
    });
    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };

    const [search, setSearch] = useState();
    return (
        <div>

            <div className="space-y-8 ">

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">

                    {/* Line */}
                    <div className="panel" id="border_top">
                    <h2 className='text-amber-500 text-xl font-bold ' >Template</h2>

                        <div className="mb-5">
                            <Tab.Group>
                                <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected ? 'border-b !border-amber-500 text-amber-500 !outline-none' : ''}
                                                    before:inline-block' -mb-[1px] flex items-center border-transparent p-5 py-3 hover:border-b hover:!border-amber-500 hover:text-amber-500`}
                                            >
                                                <IconHome className="ltr:mr-2 rtl:ml-2" />
                                                Sms
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected ? 'border-b !border-amber-500 text-amber-500 !outline-none' : ''}
                                                before:inline-block' -mb-[1px] flex items-center border-transparent p-5 py-3 hover:border-b hover:!border-amber-500 hover:text-amber-500`}
                                            >
                                                <IconUser className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                                Whatsapp
                                            </button>
                                        )}
                                    </Tab>

                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel>
                                        <div className="active pt-5">

                                            <div>
                                                <TemplateTable/>
                                            </div>
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <div className='pt-5'>

                                        <WhatsappTable/>
                                        </div>
                                    </Tab.Panel>

                                </Tab.Panels>
                            </Tab.Group>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Tabs;
