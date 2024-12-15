import axios from './axios';



// Obtener todas las ventas
export const getVentasRequest = () => axios.get('/ventas');

// Obtener una venta por ID
export const getVentaRequest = (id) => axios.get(`/ventas/${id}`);

// Crear una nueva venta
export const createVentaRequest = (venta) => axios.post('/ventas', venta, {
    headers: {
        'Content-Type': 'application/json' // O puedes usar 'multipart/form-data' si necesitas incluir archivos
    }
});
