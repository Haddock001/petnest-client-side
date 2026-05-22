import {
    createBrowserRouter,
} from "react-router";
import Mainlayout from "../layouts/Mainlayout";
import Home from '../pages/Home';
import Pets from '../pages/Pets';

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
                path: "pets",
                Component: Pets,
            }
        ]
    },
]);
