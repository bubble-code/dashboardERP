import { useState } from "react"
import { Button } from "antd"
import axios from "axios"
import { useParams } from "react-router-dom"
import { RenderTable } from "./RenderTable/RenderTableData"

export const MaestroDetalle = () => {
    const { name } = useParams()
    const [dataTable, setDataTable] = useState(null)

    const handleGet = async () => {
        try {
            const respose = await axios.get(`http://192.168.1.135:5000/api/maestro/${name}`)
            setDataTable(respose.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col w-full">
            <div className="bg-blue-950 text-white w-full h-8">
                <h1 className="font-bold ml-4">{name}</h1>
            </div>
            <div className="flex justify-start gap-1">
                <Button type="primary" ghost onClick={() => handleGet()} >Ver Datos</Button>
            </div>
            <div className="flex h-full flex-col" >
                {dataTable ? <RenderTable data={dataTable} /> : null}
            </div>
        </div>
    )
}