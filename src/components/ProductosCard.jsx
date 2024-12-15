/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { useProductos } from "../context/ProductosContext";
import { Link } from "react-router-dom";
import { IoTrashBinSharp, IoPaperPlaneSharp } from "react-icons/io5";
function ProductosCard({productos}) {
    const {deleteProducto } = useProductos()
        
    

    const server= import.meta.env.VITE_BASE_URL+"/img/";
  return (
    <div className='bg-emerald-500 max-w-md w-full p-10 rounded-sm'>
        <header className="flex justify-between">
            <h1 className="text-2xl font-bold">{productos.nombre}</h1>
            <div className="flex gap-x-2 items-center">
                    <button className="bg-red-500 hover:bg-red-600
                            text-white px-4 py-2 rounded-lg"         
                        onClick={ ()=>{
                           deleteProducto(productos._id);
                            // console.log(productos._id);
                        }}
                    ><IoTrashBinSharp/>

                        </button>


                <Link to={'/productos/'+ productos._id}
                 className="bg-green-800 hover:bg-green-900
                text-white px-4 py-2 rounded-lg" 
                >
                    <IoPaperPlaneSharp/>

                </Link>

            </div>



        </header>

        <div className="flex justify-center">
            <img 
            src={server+productos.image}
            alt="Imagen seleccionada"
            width={200}
            height={200}
            className="max-h[200px] object-contain flex my-2 py-2"
            />

        </div>
        <div className="overflow-x-auto">
            <h2 className="text-center text-black text-2xl font-bold">DESCRIPCION</h2>
    <table className="table-auto w-full border-separate  border-white">
        <tbody>
            <tr>
                <td className="border border-white px-4 py-2 text-black">Precio</td>
                <td className="border border-white px-4 py-2 text-black">
                    {productos.precio}
                </td>
            </tr>
            <tr>
                <td className="border border-white px-4 py-2 text-black">Stock</td>
                <td className="border border-white px-4 py-2 text-black">
                    {productos.stock }
                </td>
            </tr>
            <tr>
                <td className="border border-white px-4 py-2 text-black">Talla</td>
                <td className="border border-white px-4 py-2 text-black">
                    {productos.talla }
                </td>
            </tr>
            <tr>
                <td className="border border-white px-4 py-2 text-black">Marca</td>
                <td className="border border-white px-4 py-2 text-black">
                    {productos.marca }
                </td>
            </tr>
        </tbody>
    </table>
</div>



    </div>
  )
}

export default ProductosCard

ProductosCard.prototype ={
    productos:PropTypes.any
}
