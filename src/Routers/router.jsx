import {
    createBrowserRouter,
} from "react-router";

import Mainlayout from "../layouts/Mainlayout";
import Home from '../pages/Home';
import Pets from '../pages/Pets';
import PetDetails from "../pages/PetDetails";
import Donations from "../pages/Donations";
import DonationDetails from "../pages/DonationDetails";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Mainlayout,

        children: [
            {
                index: true,
                Component: Home,

                loader: async () => {
                    const res = await fetch('http://localhost:3000/pets');
                    return res.json();
                }
            },

            {
                path: "/pets",
                Component: Pets,
            },

            {
                path: "/pets/:id",
                Component: PetDetails,

                loader: ({ params }) =>
                    fetch(`http://localhost:3000/pets/${params.id}`)
            },

            {
                path: "/donations",
                Component: Donations,
            },

            {
                path: "/donations/:id",
                Component: DonationDetails,
            },

            {
                path: "/login",
                element: <Auth mode="login" />,
            },

            {
                path: "/register",
                element: <Auth mode="register" />,
            },

            {
                path: "/dashboard",
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
            }
        ]
    },
]);