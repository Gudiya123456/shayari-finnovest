import { lazy } from 'react';
import Leads from '../pages/leads/Leads';
import Sales from '../pages/sales/Sales';
import RegisterdClient from '../pages/register/RegisterdClient';
import Index from '../pages/dashboard/Index';
import Settings from '../pages/settings/Settings';
import Analyst from '../pages/analyst/Analyst';
import Login from '../pages/auth/Login';



const routes = [

    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },
    {
        path: '/leads',
        element: <Leads />,
        layout: 'default',
    },
    {
        path: '/sales',
        element: <Sales />,
        layout: 'default',
    },
     {
        path: '/registerd',
        element: <RegisterdClient />,
        layout: 'default',
    },
    {
        path: '/analyst',
        element: <Analyst />,
        layout: 'default',
    },
    {
        path: '/settings',
        element: <Settings />,
        layout: 'default',
    },

    // {
    //     path: '/about',
    //     element: <About />,
    //     layout: 'blank',
    // },
    // {
    //     path: '*',
    //     element: <Error />,
    //     layout: 'blank',
    // },

];

export { routes };
