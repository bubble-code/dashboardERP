import { AutoComplete, Table, Tag } from "antd"
import axios from "axios"
import { useState } from "react"
// import { RenderTable } from "../components/RenderTableData"

export const Ofertas = () => {
  const [options, setOptions] = useState([])
  const [selectedOferta, setSelectedOferta] = useState(null)

  const handleSearch = async (value) => {
    if (value.length >= 2) {
      try {
        const respose = await axios.get(`http://192.168.1.135:5000/api/oferta?term=${value}`)
        setOptions(respose.data.map(item => ({ value: item })))
      } catch (error) {
        console.error(error)
      }
    } else {
      setOptions([])
    }
  }


  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Ofertas</h1>
      <div className="flex mb-4">
        <AutoComplete style={{ width: 300 }} options={options} onSelect={value => setSelectedOferta(value)} onSearch={handleSearch} placeholder={"Buscar Ofertas"} />
      </div>
      {/* {selectedOferta && (
        <RenderTable oferta={selectedOferta} />
      )} */}
    </div>
  )
}
