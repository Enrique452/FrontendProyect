import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext'; // Contexto para productos
import { createVentaRequest } from '../api/ventas'; // Función para hacer la solicitud de creación de venta
import { useDetalleVenta } from '../context/DetalleVentaContext'; // Contexto para detalles de venta

function VentaFormPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { productos, getProductos } = useProductos(); // Obtener productos del contexto
  const { createDetalleVenta } = useDetalleVenta(); // Crear detalles de venta
  const [productosVendidos, setProductosVendidos] = useState([]);
  const [cantidadProducto, setCantidadProducto] = useState(1);
  const [totalVenta, setTotalVenta] = useState(0); // Estado para el total
  const navigate = useNavigate();

  // Cargar los productos cuando el componente se monta
  useEffect(() => {
    getProductos(); // Llamamos a la función del contexto para cargar los productos
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recalcular el total cada vez que cambien los productos vendidos
  useEffect(() => {
    const total = productosVendidos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    setTotalVenta(total);
  }, [productosVendidos]);

  // Función para agregar un producto a la venta
  const agregarProducto = (idProducto) => {
    if (!idProducto || cantidadProducto <= 0) {
      console.error("ID de producto inválido o cantidad no válida:", { idProducto, cantidadProducto });
      return;
    }

    const productoSeleccionado = productos.find(p => p._id === idProducto);

    if (!productoSeleccionado) {
      console.error("Producto no encontrado en la lista:", { idProducto, productos });
      return;
    }

    setProductosVendidos((prev) => {
      const productoExistente = prev.find(p => p.idProducto === idProducto);

      if (productoExistente) {
        return prev.map(p =>
          p.idProducto === idProducto
            ? { ...p, cantidad: p.cantidad + cantidadProducto }
            : p
        );
      }

      return [
        ...prev,
        {
          idProducto,
          nombre: productoSeleccionado.nombre,
          precio: productoSeleccionado.precio,
          talla: productoSeleccionado.talla, 
          cantidad: cantidadProducto,
        }
      ];
    });
  };

  // Manejar el cambio de cantidad
  const manejarCambioCantidad = (e) => {
    setCantidadProducto(Number(e.target.value));
  };

  // Manejo del formulario
  const onSubmit = handleSubmit(async (data) => {
    const ventaData = {
      fechaVenta: data.fechaVenta,
      productosVendidos,
      totalVenta,
    };

    try {
      // Crear la venta
      const ventaResponse = await createVentaRequest(ventaData);
      const ventaId = ventaResponse.data.venta._id;

      // Crear el detalle de la venta
      await createDetalleVenta(ventaId, productosVendidos);

      // Redirigir a la lista de ventas
      navigate('/ventas');
    } catch (error) {
      console.error('Error al crear la venta o el detalle:', error);
    }
  });

  return (
    <div className="flex items-center justify-center h-screen pt-40">
      <div className="bg-green-400 max-w-md w-full p-8 rounded-md">
        <h1 className="text-3xl font-bold text-center my-2">Crear Venta</h1>

        {/* Fecha de la Venta */}
        <label htmlFor="fechaVenta">Fecha de Venta</label>
        <input
          type="date"
          id="fechaVenta"
          className="w-full bg-white-700 text-black px-4 py-2 rounded-md my-2"
          {...register('fechaVenta', { required: true })}
        />
        {errors.fechaVenta && <div className="text-red-500">La fecha es requerida</div>}

        {/* Buscar Productos */}
        <label htmlFor="producto">Seleccionar Producto</label>
        <select
          id="producto"
          className="w-full bg-white-700 text-black px-4 py-2 rounded-md my-2"
          onChange={(e) => agregarProducto(e.target.value)}
        >
          <option value="">Selecciona un producto</option>
          {productos.length > 0 ? (
            productos.map((producto) => (
              <option key={producto._id} value={producto._id}>
                {producto.talla} {producto.nombre} - ${producto.precio}
              </option>
            ))
          ) : (
            <option>Cargando productos...</option>
          )}
        </select>

        {/* Input para cantidad */}
        <label htmlFor="cantidadProducto">Cantidad</label>
        <input
          type="number"
          id="cantidadProducto"
          value={cantidadProducto}
          onChange={manejarCambioCantidad}
          min="1"
          className="w-full bg-white-700 text-black px-4 py-2 rounded-md my-2"
        />

        {/* Mostrar Productos Seleccionados */}
        <div>
          <h2>Productos Seleccionados</h2>
          <ul>
            {productosVendidos.map((p) => (
              <li key={p.idProducto}>
                {p.talla} {p.nombre} - ${p.precio} x {p.cantidad} unidades
              </li>
            ))}
          </ul>
        </div>

        {/* Mostrar Total de la Venta */}
        <h2 className="text-2xl font-bold my-4">Total: ${totalVenta}</h2>

        <button
          className="bg-black font-semibold text-white py-2 px-4"
          onClick={onSubmit}
        >
          Guardar Venta
        </button>
      </div>
    </div>
  );
}

export default VentaFormPage;
