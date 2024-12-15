import { useEffect } from "react";
import { useProductos } from "../context/ProductosContext";
//import logo from "../assets/logo.png"; 
import ProductosCard from "../components/ProductosCard";
function ProductosPages() {

const {getProductos, productos} = useProductos();

useEffect( ()=>{
  getProductos();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

if (productos.length === 0)
  return(<h1>No hay prouctos para listar</h1>)

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">

    {
      productos.map( (productos)=>(
          <ProductosCard productos={productos}
            key={productos._id}
            />
      ))



    }
    
    </div>
  )
}

export default ProductosPages
