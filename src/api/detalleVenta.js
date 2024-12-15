// En detalleVenta.js
import axios from './axios';



// Obtener el detalle de una venta
export const createDetalleVentaRequest = (detalleVenta) => axios.post('/detalleVenta', detalleVenta, {
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getDetalleVentaRequest = (id) =>
    axios.get(`/detalleVenta/${id}`); // Agregamos '/api' aquí
