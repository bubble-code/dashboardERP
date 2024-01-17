import { AgGridReact } from 'ag-grid-react'
import PropTypes from "prop-types";
import './style.css'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'


export const RenderTable = ({ data, height = '75vh' }) => {
    if (!data || data.length === 0) {
        return <p>No hay datos para mostrar.</p>;
    }

    const columns = () => {
        const namesColumns = Object.keys(data[0])
        const columnsObj = namesColumns.map(val => ({
            field: val,
            filter: 'agSetColumnFilter'
        }))
        return columnsObj
    }

    return (
        <div className='ag-theme-quartz' style={{ height: height }}>
            <AgGridReact
                rowData={data}
                columnDefs={columns()}
                suppressRowClickSelection={true}
                groupSelectsChildren={true}
                rowSelection={'multiple'}
                rowGroupPanelShow={'always'}
                pivotPanelShow={'always'}
                pagination={true}
                paginationPageSize={15}
                className='text-xs'
            />
        </div>
    )
}


RenderTable.propTypes = {
    data: PropTypes.array,
    height: PropTypes.string
};
