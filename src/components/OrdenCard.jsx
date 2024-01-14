import { Card, Tag } from "antd"
import { useEffect, useState } from "react"
import axios from "axios"
import PropTypes from "prop-types";

export const OrdenCard = ({ orden }) => {

    const [detallesOrden, setDetallesOrden] = useState(null);

    useEffect(() => {
        const obtenerDetallesOrden = async () => {
            try {
                const response = await axios.get(`http://192.168.1.135:5000/api/orden/${orden}`);
                setDetallesOrden(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (orden) {
            obtenerDetallesOrden();
        }
    }, [orden]);

    return (
        <Card title={`Detalles ${orden}`} style={{ textAlign: "left" }}>
            {detallesOrden && (
                <>
                    <p>ID de Artículo: <Tag color="magenta">{detallesOrden.IDArticulo}</Tag></p>
                    <p>QFabricar: <Tag color="red">{Math.round(detallesOrden.QFabricar)}</Tag></p>
                    <p>QIniciada: <Tag color="volcano">{Math.round(detallesOrden.QIniciada)}</Tag></p>
                    <p>QFabricada: <Tag color="orange">{Math.round(detallesOrden.QFabricada)}</Tag></p>
                    <p>QRechazada: <Tag color="gold">{Math.round(detallesOrden.QRechazada)}</Tag></p>
                    <p>Estado: <Tag color="lime">{detallesOrden.Estado}</Tag></p>
                    <p>FechaInicio: <Tag color="green">{detallesOrden.FechaInicio}</Tag></p>
                    <p>FechaFin: <Tag color="cyan">{detallesOrden.FechaFin}</Tag></p>
                </>
            )}
        </Card>
    );
}

OrdenCard.propTypes = {
    orden: PropTypes.string.isRequired,
};