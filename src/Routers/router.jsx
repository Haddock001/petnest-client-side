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
        children:[
            {
                index: true,
                Component: Home,
            },
            {
                path: "/pets",
                Component: Pets,
            },
            {
                path: "/pets/:petId",
                Component: PetDetails,
            },
            {
                path: "/donations",
                Component: Donations,
            },
            {
                path: "/donations/:donationId",
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
                element: <PrivateRoute><Dashboard /></PrivateRoute>,
            }
        ]
    },
]);
