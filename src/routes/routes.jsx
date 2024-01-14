import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { OrdenFabrica } from "../pages/OrdenFabrica";
import { Busquedas } from "../pages/Busquedas";
import { Ofertas } from "../pages/Ofertas";
import { Maestros } from "../pages/Maestros";
import { MaestroDetalle } from "../components/MaestroDetalle";

export const router = createBrowserRouter([
    {
        element: <App />,
        path: '/',
        children: [
            {
                path: 'maestros',
                element: <Maestros />
            }
            ,
            {
                path: 'ofs',
                element: <OrdenFabrica />
            },
            {
                path: 'busquedas',
                element: <Busquedas />
            },
            {
                path: 'ofertas',
                element: <Ofertas />
            },
            {
                path: 'maestros/:name',
                element: <MaestroDetalle />
            }
        ]

    }
])