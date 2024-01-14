import { useEffect, useState } from 'react'
import { ButtonMaestro } from '../components/ButtonMaestro'
import axios from 'axios'

export const Maestros = () => {
    const [tablesNames, setTablesNames] = useState(null)

    useEffect(() => {
        const obtenerDetallesOferta = async () => {
            try {
                const respose = await axios.get(`http://192.168.1.135:5000/api/obtener_tablas_maestro`)
                setTablesNames(respose.data)
            } catch (error) {
                console.error(error)
            }
        }
        obtenerDetallesOferta()

    }, [])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start px-3 pt-2">
            {tablesNames ? tablesNames['tables'].map((val, idx) => (
                <ButtonMaestro key={idx * 3} text={val} />
            )) : null}

        </div>
    )
}