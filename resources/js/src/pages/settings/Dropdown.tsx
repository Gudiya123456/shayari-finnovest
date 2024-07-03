import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import React,{ useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import AddProducts from './AddProducts';
import axios from 'axios';
import { IRootState } from '../../store';
import Swal from 'sweetalert2';
import { MdDelete } from 'react-icons/md'
import { RiHome4Line, RiPencilFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import AddDropdown from './AddDropdown';
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

const Dropdown = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Dropdown'));
    });

    const navigate=useNavigate();

    const[products,setProducts]=useState([]);
    const[isLoading,setIsLoading]=useState(false);
    const[data,setData]=useState([]);

    const token = useSelector((state:IRootState)=>state.themeConfig.token);

useEffect(()=>{
    fetchProducts();

},[])

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
                setData(response.data.dropdown);
            }

        } catch (error) {
            console.log(error)

        }
        finally{
            setIsLoading(false);
        }
    }


    const [showDrawer,setShowDrawer]=useState(false)

    const handleDrawable=(data)=>{
        setData(data)
        setShowDrawer(true)
        console.log(data);

    }

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(products, 'id'));
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
            return products.filter((item: any) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.value.toLowerCase().includes(search.toLowerCase()) ||
                    item.dropdown_type.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.toString().toLowerCase().includes(search.toLowerCase())

                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);



    const distroy = (data: any) => {
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
                        url: window.location.origin+'/api/dropdowns/' + data.id,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: "Bearer " + token,
                        },
                    });
                    if (response.data.status === "success") {
                        // setCategories(categories.filter((d: any) => d.id !== id))
                        Swal.fire({ title: response.data.title, text: response.data.message, icon: 'success', customClass: 'sweet-alerts' });

                        fetchProducts()
                    }
                } catch (error: any) {
                    console.log(error)

                    // if (error.response.status == 401) console.log(error)
                } finally {

                }
            }
        });

    }

    return (
        <div>
            <AddDropdown showDrawer={showDrawer} setShowDrawer={setShowDrawer} data={data} fetchProducts={fetchProducts} />

            <div className="panel ">
                <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                    <div className="flex items-center flex-wrap">


                        <h2 className='text-amber-500 text-xl font-bold ' >Dropdowns</h2>
                    </div>

                  <div className='flex gap-2' >
                  <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                  <button type="button" onClick={()=>{handleDrawable(
                    {
                        'value':'',
                        "dropdown_type":'',
                        'status':''
                    }
                  )}} className="btn bg-amber-500 text-white btn-sm m-1">
                            Create Dropdown
                        </button>
                  </div>
                </div>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={products}
                        columns={[
                            { accessor: 'id', title: '#', sortable: true },
                            { accessor: 'dropdown_type',title:'Lead Status', sortable: true },
                            { accessor: 'value', title: 'Dropdown Name', sortable: true },
                            { accessor: 'status',title:'Status', sortable: true,
                                render: ({status}) => <label  className="w-12 h-6 relative">
                                    <p className=' text-amber-500' >{status=='1'?'Active':'Disabled'}</p>
                            </label>,
                             },
                            { accessor: 'action', title: 'Action', sortable: true,
                                render:(data)=><div>
                                  <td className="text-center">
                                                <button type="button" className='me-3'>
                                                    <RiPencilFill onClick={() => { handleDrawable(data) }} className="text-warning hover:text-gray-500 cursor-pointer text-2xl" />
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
        </div>
    );
};

export default Dropdown;
