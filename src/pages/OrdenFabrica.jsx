import { AutoComplete } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import 'antd/dist/antd'
import { OrdenCard } from '../components/OrdenCard'

export const OrdenFabrica = () => {
  const [options, setOptions] = useState([])
  const [selectedOrden, setSelectedOrden] = useState(null);

  const handleSearch = async (value) => {
    if (value.length >= 2) {
      try {
        const respose = await axios.get(`http://192.168.1.135:5000/api/of?term=${value}`)
        setOptions(respose.data.map(item => ({ value: item })))
      } catch (error) {
        console.log(error)
      }
    } else {
      setOptions([])
    }
  }

  return (
    <main className="bg-white p-2 lg:pl-10 xl:pl-10 flex flex-col items-start">
      <p className="text-xs font-bold mb-1 pb-2">Ordenes de Fabricacion</p>
      <div className='pb-4'>
        <AutoComplete
          style={{ width: 200 }}
          options={options}
          onSearch={handleSearch}
          onSelect={value => setSelectedOrden(value)}
          title="Buscar órdenes de fabricación"
        />
      </div>
      {selectedOrden && <OrdenCard orden={selectedOrden} />}
    </main>
  )
}
