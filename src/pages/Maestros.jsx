import { ButtonMaestro } from '../components/ButtonMaestro'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const Maestros = () => {
    const obtenerMaestros = async () => {
        const respose = await axios.get('http://192.168.1.135:5000/api/obtener_tablas_maestro')
        // const respose = await axios.get(`http://10.0.0.130:5000/api/obtener_tablas_maestro`)
        return respose.data
    }
    const { isLoading, data, isError, error } = useQuery(
        {
            queryKey: ['maestros'],
            queryFn: obtenerMaestros
        }
    )

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start px-3 pt-2">
            {isLoading ? <h1>Cargando ...</h1> : data.map((val, idx) => (
                <ButtonMaestro key={idx * 3} text={val.Name} isCompleted={val.Completed} fecha={val.UltimaActual} check={val.Checked} />
            ))}
            {!isLoading && isError && (<h3>{`${error}}`}</h3>)}

        </div>
    )
}