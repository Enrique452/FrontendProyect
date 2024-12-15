/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// DetalleVentaContext.js
import { createContext, useContext } from 'react';
import { createDetalleVentaRequest,  getDetalleVentaRequest } from '../api/detalleVenta';

const DetalleVentaContext = createContext();

// Hook personalizado para usar el contexto
export const useDetalleVenta = () => {
    return useContext(DetalleVentaContext);
};

// Proveedor del contexto
export const DetalleVentaProvider = ({ children }) => {
    const createDetalleVenta = async (idVenta, productosVendidos) => {
        try {
            const detalleVentaData = {
                idventas: idVenta,
                productosVendidos,
            };
            const response = await createDetalleVentaRequest(detalleVentaData);
            console.log('Detalle de venta creado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al crear el detalle de venta:', error);
            throw error;
        }
    };
    const getDetalleVenta = async (idVenta) => {
        try {
            const response = await getDetalleVentaRequest(idVenta);
            console.log('Detalle de venta obtenido:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener el detalle de venta:', error);
            throw error;
        }
    };

    return (
        <DetalleVentaContext.Provider value={{ createDetalleVenta, getDetalleVenta  }}>
            {children}
        </DetalleVentaContext.Provider>
    );
};
