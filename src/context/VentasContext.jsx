/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { createVentaRequest, getVentasRequest, getVentaRequest } from "../api/ventas";

const VentasContext = createContext();

export const useVentas = () => {
    const context = useContext(VentasContext);

    if (!context) {
        throw new Error('useVentas debe estar definido en un contexto');
    }
    return context;
};

export function VentasProvider({ children }) {
    const [ventas, setVentas] = useState([]);
    

    // Crear una nueva venta
    const createVenta = async (venta) => {
        try {
            await createVentaRequest(venta);
            getVentas();
        } catch (error) {
            console.error(error);
        }
    };

    // Obtener todas las ventas
    const getVentas = async () => {
        try {
            const res = await getVentasRequest();
            setVentas(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Obtener una venta por ID
    const getVenta = async (id) => {
        try {
            const res = await getVentaRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    

    return (
        <VentasContext.Provider value={{
            ventas,
            createVenta,
            getVentas,
            getVenta,
            
        }}>
            {children}
        </VentasContext.Provider>
    );
}

VentasProvider.propTypes = {
    children: PropTypes.any
};
