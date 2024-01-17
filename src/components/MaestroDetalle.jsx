import { Button, Statistic } from "antd"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { RenderTable } from "./RenderTable/RenderTableData"
import { useState } from "react"

export const MaestroDetalle = () => {
    const { name } = useParams()
    const [cVisible, setCvisible] = useState(null)
    const [vAmbas, setAmbas] = useState(false)
    const [vPrueba, setPrueba] = useState(false)
    const [vFavram, setFavram] = useState(false)

    const handleGet = async () => {
        const respose = await axios.get(`http://192.168.1.135:5000/api/maestro/${name}`)
        // const respose = await axios.get(`http://10.0.0.130:5000/api/maestro/${name}`)
        setCvisible(1)
        return respose.data
    }
    const handleGetNew = async () => {
        const respose = await axios.get(`http://192.168.1.135:5000/api/maestroNew/${name}`)
        // const respose = await axios.get(`http://10.0.0.130:5000/api/maestroNew/${name}`)
        setCvisible(2)
        return respose.data
    }
    const handleComparar = async () => {
        const respose = await axios.get(`http://192.168.1.135:5000/api/comparar/${name}`)
        // const respose = await axios.get(`http://10.0.0.130:5000/api/comparar/${name}`)
        setCvisible(3)
        return respose.data
    }
    const handleCompletar = async () => {
        await axios.get(`http://192.168.1.135:5000/api/maestroUpdate/${name}`)
        // const respose = await axios.get(`http://10.0.0.130:5000/api/maestroUpdate/${name}`)       
    }
    const handleChecked = async () => {
        await axios.get(`http://192.168.1.135:5000/api/maestroChecked/${name}`)
        // const respose = await axios.get(`http://10.0.0.130:5000/api/maestroUpdate/${name}`)       
    }
    const getData = useQuery({
        queryKey: [name],
        queryFn: handleGet,
        enabled: false
    })
    const getDataNew = useQuery({
        queryKey: [name + 'new'],
        queryFn: handleGetNew,
        enabled: false
    })
    const getComparar = useQuery({
        queryKey: [name + '_comparar'],
        queryFn: handleComparar,
        enabled: false
    })

    const handleDetallesComparar = (id) => {
        const change = {
            '1': () => setAmbas((prev) => !prev),
            '2': () => setFavram((prev) => !prev),
            '3': () => setPrueba((prev) => !prev)
        }
        change[id]()
    }


    return (
        <div className="flex flex-col w-full">
            <div className="bg-blue-950 text-white w-full h-8">
                <h1 className="font-bold ml-4">{name}</h1>
            </div>
            <div className="flex flex-wrap gap-3 mb-3 mt-2">
                <div className="flex justify-start gap-1">
                    <Button type="primary" ghost onClick={() => getData.refetch()} >Ver Datos Solmicro</Button>
                </div>
                <div className="flex justify-start gap-1">
                    <Button type="primary" color="green" ghost onClick={() => getDataNew.refetch()} >Ver Datos New Solmicro</Button>
                </div>
                <div className="flex justify-start gap-1">
                    <Button type="primary" color="violet" ghost onClick={() => getComparar.refetch()} >Comparar Tablas</Button>
                </div>
                <div className="flex justify-start gap-1">
                    <Button type="primary" color="violet" ghost onClick={() => handleChecked()} >Completar</Button>
                </div>
                <div className="flex justify-start gap-1">
                    <Button danger ghost onClick={() => handleGet()} >Ver Datos Industry</Button>
                </div>
                <div className="flex justify-start gap-1">
                    <Button danger ghost onClick={() => handleCompletar()} >Completar</Button>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {cVisible == 1 ? <div className="flex h-full flex-col">
                    <div className="flex items-start mb-2">
                        <Statistic title="Cant DB Pruebas" value={getData.data?.length} loading={getData.isLoading} />
                    </div>
                    {getData.isLoading ? <h1>Cargando...</h1> : <RenderTable data={getData.data} />}
                </div> : null}
                {cVisible == 2 ? <div className="flex h-full flex-col gap-3" >
                    <div className="flex items-start mb-2">
                        {getDataNew.data ? <Statistic title="Cant DB Favram" value={getDataNew.data.length} /> : null}
                    </div>
                    {getDataNew.isLoading ? <h1>Cargando...</h1> : <RenderTable data={getDataNew.data} />}
                </div> : null}
                {cVisible == 3 ? <div className="flex h-full flex-col gap-3" >
                    <div className="flex items-start mb-2">
                        {getComparar.data ?
                            <div className="flex flex-col gap-4 w-full">
                                <div className="flex gap-3 align-middle">
                                    <Statistic title="Diff de ambas tablas" value={getComparar.data['df_both_ways'].length} className="mr-4" />
                                    <Button ghost type="primary" onClick={() => handleDetallesComparar('1')}>Ver Detalles</Button>
                                </div>
                                {vAmbas && <RenderTable data={getComparar.data["df_both_ways"]} height="300px" />}
                                <div className="flex gap-3 align-middle">
                                    <Statistic title="Diff en Prueba" value={getComparar.data['df_prueba'].length} />
                                    <Button ghost type="primary" onClick={() => handleDetallesComparar('3')} >Ver Detalles</Button>
                                </div>
                                {vPrueba && <RenderTable data={getComparar.data["df_prueba"]} height="300px" />}
                                <div className="flex gap-3 align-middle">
                                    <Statistic title="Diff en Favram" value={getComparar.data['df_favram'].length} />
                                    <Button ghost type="primary" onClick={() => handleDetallesComparar('2')}>Ver Detalles</Button>
                                </div>
                                {vFavram && <RenderTable data={getComparar.data["df_favram"]} height="300px" />}
                            </div>
                            : null}
                    </div>
                </div> : null}

            </div>
        </div>
    )
}