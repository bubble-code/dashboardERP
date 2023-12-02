import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { OrdenFabrica } from "../pages/OrdenFabrica";
import { Busquedas } from "../pages/Busquedas";

export const router = createBrowserRouter([
    {
        element: <App />,
        path: '/',
        children: [
            {
                path: 'ofs',
                element: <OrdenFabrica />
            },
            {
                path: 'busquedas',
                element: <Busquedas />
            }
        ]

    }
])