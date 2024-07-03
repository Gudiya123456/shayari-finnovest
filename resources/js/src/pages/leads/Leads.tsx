import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { downloadExcel } from 'react-export-table-to-excel';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconFile from '../../components/Icon/IconFile';
import IconPrinter from '../../components/Icon/IconPrinter';
import CreateLeads from './CreateLead';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { IRootState } from '../../store';
import { RiPencilFill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const Leads = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Leads'));
    }, [dispatch]);

    const [showDrawer, setShowDrawer] = useState(false);
    const [leads, setLeads] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        fetchLeads();
    }, []);
    const token = useSelector((state: IRootState) => state.themeConfig.token);

    const fetchLeads = async () => {
        setIsLoading(true);
        try {
            const response = await axios({
                method: 'get',
                url: window.location.origin + '/api/leads',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            });
            if (response.data.status === 'success') {
                setLeads(response.data.leads);
                console.log(response.data.leads);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(leads, 'id'));
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
            return leads.filter((item: any) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.first_name.toLowerCase().includes(search.toLowerCase()) ||
                    item.last_name.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search, leads]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus, initialRecords]);

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
                        url: window.location.origin + '/api/leads/' + data.id,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: "Bearer " + token,
                        },
                    });
                    if (response.data.status === "success") {
                        // setCategories(categories.filter((d: any) => d.id !== id))
                        Swal.fire({ title: response.data.title, text: response.data.message, icon: 'success', customClass: 'sweet-alerts' });

                        fetchLeads()
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
        //container
        <div className=" mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-2 bg-amber-500 h-full">sidebar</div>
                <div className="lg:col-span-10">
                    <div className="panel">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                            <h2 className="text-amber-500 text-xl font-bold">Leads</h2>
                            <div className="flex gap-2 flex-col md:flex-row">
                                <input
                                    type="text"
                                    className="form-input w-full md:w-auto"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <NavLink to='/leads/add'>
                                    <button
                                        type="button"
                                        onClick={() => { setShowDrawer(true); }}
                                        className="btn bg-amber-500 text-white btn-sm w-72 md:w-auto m-1"
                                    >
                                        <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                        Create New Leads
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                        <div className="datatables">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover"
                                records={leads}
                                columns={[
                                    { accessor: 'id', title: '#', sortable: true },
                                    { accessor: 'first_name', title: 'Name', sortable: true },
                                    { accessor: 'email', sortable: true },
                                    { accessor: 'phone', sortable: true },
                                    { accessor: 'state', title: 'State', sortable: true },
                                    { accessor: 'city', title: 'City', sortable: true },
                                    { accessor: 'source', title: 'Source', sortable: true },
                                    {
                                        accessor: 'status', title: 'Status', sortable: true,
                                        render: ({ status }) => <label className="w-12 h-6 relative">
                                            <p className='text-amber-500'>Active</p>
                                        </label>,
                                    },
                                    {
                                        accessor: 'action', title: 'Action', sortable: true,
                                        render: (data) => <div>
                                            <td className="text-center">
                                                <NavLink to='/leads/add' state={{ leadId: data }} >
                                                    <button type="button" className='me-3'>
                                                        <RiPencilFill className="text-warning hover:text-gray-500 cursor-pointer text-2xl" />
                                                    </button>
                                                </NavLink>
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
                                paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leads;
