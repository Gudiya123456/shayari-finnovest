import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import React, { useEffect, useState, Fragment } from 'react';
import sortBy from 'lodash/sortBy';
import { downloadExcel } from 'react-export-table-to-excel';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconFile from '../../components/Icon/IconFile';
import IconPrinter from '../../components/Icon/IconPrinter';
import { Dialog, Transition, Tab } from '@headlessui/react';
import IconSearch from '../../components/Icon/IconSearch';
import IconXCircle from '../../components/Icon/IconXCircle';
import { IRootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { RiPencilFill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';

const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        email: 'carolinejensen@zidant.com',
        dob: '2004-05-28',

        phone: '+91 9988775533',
        isActive: true,
        age: 39,
        company: 'POLARAX',
    },
    {
        id: 2,
        firstName: 'Celeste',
        lastName: 'Grant',
        email: 'celestegrant@polarax.com',
        dob: '1989-11-19',
        // address: {
        //     street: '639 Kimball Street',
        //     city: 'Bascom',
        //     zipcode: 8907,
        //     geo: {
        //         lat: 65.954483,
        //         lng: 98.906478,
        //     },
        // },
        phone: '+91 9988775533',
        isActive: false,
        age: 32,
        company: 'MANGLO',
    },
    {
        id: 3,
        firstName: 'Tillman',
        lastName: 'Forbes',
        email: 'tillmanforbes@manglo.com',
        dob: '2016-09-05',
        // address: {
        //     street: '240 Vandalia Avenue',
        //     city: 'Thynedale',
        //     zipcode: 8994,
        //     geo: {
        //         lat: -34.949388,
        //         lng: -82.958111,
        //     },
        // },
        phone: '+91 9988775533',
        isActive: false,
        age: 26,
        company: 'APPLIDECK',
    },
    {
        id: 4,
        firstName: 'Daisy',
        lastName: 'Whitley',
        email: 'daisywhitley@applideck.com',
        dob: '1987-03-23',
        // address: {
        //     street: '350 Pleasant Place',
        //     city: 'Idledale',
        //     zipcode: 9369,
        //     geo: {
        //         lat: -54.458809,
        //         lng: -127.476556,
        //     },
        // },
        phone: '+91 9988775533',
        isActive: true,
        age: 21,
        company: 'VOLAX',
    },
    {
        id: 5,
        firstName: 'Weber',
        lastName: 'Bowman',
        email: 'weberbowman@volax.com',
        dob: '1983-02-24',
        // address: {
        //     street: '154 Conway Street',
        //     city: 'Broadlands',
        //     zipcode: 8131,
        //     geo: {
        //         lat: 54.501351,
        //         lng: -167.47138,
        //     },
        // },
        phone: '+91 9988775533',
        isActive: false,
        age: 26,
        company: 'ORBAXTER',
    },
    {
        id: 6,
        firstName: 'Buckley',
        lastName: 'Townsend',
        email: 'buckleytownsend@orbaxter.com',
        dob: '2011-05-29',
        // address: {
        //     street: '131 Guernsey Street',
        //     city: 'Vallonia',
        //     zipcode: 6779,
        //     geo: {
        //         lat: -2.681655,
        //         lng: 3.528942,
        //     },
        // },
        phone: '+91 9988775533',
        isActive: true,
        age: 40,
        company: 'OPPORTECH',
    },
    {
        id: 7,
        firstName: 'Latoya',
        lastName: 'Bradshaw',
        email: 'latoyabradshaw@opportech.com',
        dob: '2010-11-23',
        // address: {
        //     street: '668 Lenox Road',
        //     city: 'Lowgap',
        //     zipcode: 992,
        //     geo: {
        //         lat: 36.026423,
        //         lng: 130.412198,
        //     },
        // },
        phone: '+91 9988775533',
        isActive: true,
        age: 24,
        company: 'GORGANIC',
    },


];

const col = ['id', 'firstName', 'lastName', 'company', 'age', 'dob', 'email', 'phone'];

const WhatsappTable = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(setPageTitle('Whatsapp'));
        fetchAuthorization();
    }, []);

    const [model, setModal] = useState<any>(false);
    const [authList, setAuthList] = useState<any>([]);
    const [rules, setRules] = useState<any>([]);
    const token = useSelector((state: IRootState) => state.themeConfig.token);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);


    // fetch Restaurant data
    const fetchAuthorization = async () => {
        setIsLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: window.location.origin + '/api/whatsapps',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            });
            if (response.data.status == 'success') {
                setAuthList(response.data.whatsapp);
            }
            else {
                console.log(errors)
            }

        } catch (error: any) {
            if (error.response.status == 401) navigate('/login')
            if (error.response.status === 422) {
                const serveErrors = error.response.data.errors;
                for (var key in serveErrors) {
                    setErros({ ...errors, [key]: serveErrors[key][0] });
                }
            }
            else console.log(error)
        }
        finally {
            setIsLoading(false)

        }
    };
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(authList));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return authList.filter((item: any) => {
                return (
                    // item.id.toString().includes(search.toLowerCase()) ||
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.temp_name.toLowerCase().includes(search.toLowerCase())

                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search , authList]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);
    const header = ['Id', 'Firstname', 'Lastname', 'Email', 'Start Date', 'Phone No.', 'Age', 'Company'];
    const [modal1, setModal1] = useState(false);



    // useEffect(() => {
    //     setFilteredItems(() => {
    //         return authList.filter((item: any) => {
    //             return item.name.toLowerCase().includes(search.toLowerCase());
    //         });
    //     });
    // }, [search, authList]);


    const [defaultParams] = useState({
        id: '',
        name: '',
        temp_name: '',
        dropdown_type: '',
        status: '1',
    });
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const [errors, setErros] = useState<any>({});
    const [btnLoading, setBtnLoading] = useState(false)
    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: '' });
        setParams({ ...params, [name]: value });
    };

    const validate = () => {
        setErros({});
        let errors = {};

        if (!params.name) {
            errors = { ...errors, name: 'name is required!' };
        }



        console.log(errors)
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };

    const storeOrUpdateApi = async (data: any) => {



        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: window.location.origin + "/api/whatsapps",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: 'Bearer ' + token,
                },
            });

            if (response.data.status == 'success') {
                Swal.fire({
                    icon: response.data.status,
                    title: response.data.title,
                    text: response.data.message,
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });

                if (response.data.status == "success") {
                    fetchAuthorization()
                    setModal1(false)
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
                setErros(serverErrors);
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
        data.append("name", params.name);
        data.append("temp_name", params.temp_name);
        data.append("status", params.status);
        storeOrUpdateApi(data);
    };

    const storeOrUpdate = (data) => {
        setErros({});
        if (data) {
            setParams({
                id: data.id,
                status: data.status,
                name: data.name,
                temp_name: data.temp_name,
            });
            setModal1(true)
        }


    }


    const distroy = (data: any) => {
        alert(data.id)
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then(async (result) => {
            if (result.value) {
                try {
                    const response = await axios({
                        method: 'delete',
                        url: window.location.origin + "/api/whatsapps/" + data.id,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token,
                        },
                    });
                    if (response.data.status === "success") {
                        // setCategories(categories.filter((d: any) => d.id !== id))
                        Swal.fire({ title: response.data.title, text: response.data.message, icon: 'success', customClass: 'sweet-alerts' });
                        fetchAuthorization()
                    }
                } catch (error: any) {

                    if (error.response.status == 401) navigate('/login')
                } finally {

                }
            }
        });

    }



    return (
        <div>
            <div className="mb-5 flex items-center justify-between">
                {/* <form
                    className={`${search && '!block'} sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
                    onSubmit={() => setSearch(false)}
                >
                    <div className="relative">
                        <input
                            type="text"
                            className="form-input ltr:pl-9 rtl:pr-9 w-[250px] ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                            placeholder="Search Template..."
                        />
                        <button type="button" className="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                            <IconSearch className="mx-auto" />
                        </button>
                        <button type="button" className="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2" onClick={() => setSearch(false)}>
                            <IconXCircle />
                        </button>
                    </div>
                </form> */}
                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />

                <button onClick={()=>{setModal1(true)}} className=' bg-amber-500 text-white btn' >Add Template</button>
            </div>
            <div className="panel mt-6">

                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'ID', sortable: true },

                            { accessor: 'name', title: 'Template Name', sortable: true },

                            {
                                accessor: 'status', title: 'Status', sortable: true,
                                render: ({ status }) => <label className="w-12 h-6 relative">
                                    <p className=' text-white bg-amber-500 rounded-md flex justify-center ' >Active</p>
                                </label>,
                            },
                            { accessor: 'temp_name', title: 'Template', sortable: true },
                            { accessor: 'action', title: 'Action', sortable: true,
                                render:(data)=><div>
                                  <td className="text-center">
                                                <button type="button" className='me-3'>
                                                    <RiPencilFill onClick={() => { storeOrUpdate(data) }} className="text-warning hover:text-gray-500 cursor-pointer text-2xl" />
                                                </button>
                                                <button type="button" >
                                                    <MdDelete onClick={() => { distroy(data) }} className="text-danger  cursor-pointer text-2xl" />
                                                </button>
                                            </td>
                                </div>
                            },
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>

            <div className="mb-5">

                <Transition appear show={modal1} as={Fragment}>
                    <Dialog as="div" open={modal1} onClose={() => setModal1(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                            <div className="flex items-start justify-center min-h-screen px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                        <div className="flex bg-white dark:bg-[#121c2c] items-center justify-center px-5 py-3">
                                            <div className="text-xl">New Template</div>

                                        </div>
                                        <div className="p-5 pt-0">
                                            <div className="mb-7">
                                                <input
                                                    type="text"
                                                    className="input-form dark:border-[#5E5E5E] dark:bg-transparent placeholder-black"

                                                    placeholder='  Name'
                                                    name='name' value={params.name} onChange={(e) => changeValue(e)}
                                                />
                                                {errors?.name ? <div className="text-danger mt-1">{errors.name}</div> : ''}

                                            </div>
                                            <div className="mb-5">
                                                <textarea className="input-form dark:border-[#5E5E5E] placeholder-black dark:bg-transparent"  name='temp_name' value={params.temp_name} onChange={(e) => changeValue(e)} placeholder='Enter The Template' id=""></textarea>
                                            </div>

                                            <div className="mb-5">
                                                <select
                                                    className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                                                    name='status' value={params.status} onChange={(e) => changeValue(e)}

                                                >
                                                    <option className=""

                                                    >
                                                        Select Status
                                                    </option>
                                                    <option className="" value={1}

                                                    >
                                                        Active
                                                    </option>
                                                    <option className="" value={0}

                                                    >
                                                        Inactive
                                                    </option>

                                                </select>

                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setModal1(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn bg-amber-500 text-white ltr:ml-4 rtl:mr-4" onClick={() => formSubmit()}>
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    );
};

export default WhatsappTable;
