import { useEffect, useState } from "react";
import { getVentasRequest } from "../api/ventas";
import { useDetalleVenta } from "../context/DetalleVentaContext";

function VentasPage() {
  const [ventas, setVentas] = useState([]);
  const [detalleVenta, setDetalleVenta] = useState(null); // Estado para guardar el detalle actual
  const [modalVisible, setModalVisible] = useState(false); // Controla la visibilidad del modal
  const { getDetalleVenta } = useDetalleVenta();

  // Función para mostrar detalles de la venta
  const verDetalle = async (ventaId) => {
    try {
      const detalle = await getDetalleVenta(ventaId);
      setDetalleVenta(detalle); // Guarda los detalles
      setModalVisible(true); // Muestra el modal
    } catch (error) {
      console.error("Error al obtener el detalle de venta:", error);
      alert("No se pudieron obtener los detalles de la venta.");
    }
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setModalVisible(false); // Oculta el modal
    setDetalleVenta(null); // Limpia el detalle actual
  };

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await getVentasRequest();
        console.log("Ventas obtenidas del backend:", response.data);
        setVentas(response.data);
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
      }
    };

    fetchVentas();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Ventas Realizadas</h1>

      {/* Tabla de Ventas */}
      {ventas.length > 0 ? (
        <table className="table-auto w-full rounded-md shadow-md">
          <thead>
            <tr className="bg-green-300">
              <th className="px-4 py-2">ID Venta</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta._id} className="border-t text-center">
                <td className="px-4 py-2">{venta._id}</td>
                <td className="px-4 py-2">
                  {new Date(venta.fechaVenta).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">${venta.totalVenta.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => verDetalle(venta._id)}
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay ventas registradas.</p>
      )}

      {/* Modal para mostrar detalle de la venta */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-3/4 max-w-2xl relative">
            {/* Botón para cerrar el modal */}
            <button
              onClick={cerrarModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            {detalleVenta ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">Detalle de Venta</h2>
                <p><strong>ID Venta:</strong> {detalleVenta._id}</p>
                <p><strong>Productos Vendidos:</strong></p>
                <ul className="list-disc list-inside">
                  {detalleVenta.detallesVenta.map((producto) => (
                    <li key={producto._id}>
                      {producto.idproducto.nombre} - Cantidad: {producto.cantidad}, Precio: ${producto.precio.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500">Cargando detalles...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default VentasPage;
