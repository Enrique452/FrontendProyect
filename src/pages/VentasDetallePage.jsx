import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetalleVentaRequest } from "../api/detalleVenta"; // Asegúrate de tener este endpoint configurado

function VentasDetallePage() {
  const { id } = useParams(); // Obtiene el ID de la venta desde la URL
  const [detalleVenta, setDetalleVenta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetalleVenta = async () => {
      try {
        setLoading(true);
        const response = await getDetalleVentaRequest(id);
        console.log("Detalle de venta obtenido:", response.data);
        setDetalleVenta(response.data);
      } catch (err) {
        console.error("Error al obtener el detalle de la venta:", err);
        setError("No se pudo cargar el detalle de la venta.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetalleVenta();
  }, [id]);

  if (loading) return <p>Cargando detalles de la venta...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Detalle de Venta</h1>
      {detalleVenta ? (
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Venta ID: {detalleVenta._id}</h2>
          <p className="mb-2">
            <strong>Fecha de Venta:</strong> {new Date(detalleVenta.fechaVenta).toLocaleDateString()}
          </p>
          <p className="mb-2">
            <strong>Total de Venta:</strong> ${detalleVenta.totalVenta.toFixed(2)}
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Productos Vendidos:</h3>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Producto</th>
                <th className="border border-gray-300 px-4 py-2">Cantidad</th>
                <th className="border border-gray-300 px-4 py-2">Precio Unitario</th>
                <th className="border border-gray-300 px-4 py-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {detalleVenta.productosVendidos.map((producto, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{producto.nombre}</td>
                  <td className="border border-gray-300 px-4 py-2">{producto.cantidad}</td>
                  <td className="border border-gray-300 px-4 py-2">${producto.precio.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${(producto.cantidad * producto.precio).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No se encontró el detalle de la venta.</p>
      )}
    </div>
  );
}

export default VentasDetallePage;
