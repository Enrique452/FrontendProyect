import { createContext, useContext, useState} from "react";
import PropTypes from "prop-types";
import { createProductoRequest, getProductosRequest, deleteProductoRequest, getProductoRequest, updateProductoRequest, updateProductoRequestNoUpdateImage} from "../api/productos";

const ProductosContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProductos= ()=>{
    const context = useContext(ProductosContext)

    if(!context){
        throw new Error('UseAuth debe estar definifo en un contexto ');
    }
    return context;
}

export function ProductosProvider({children}){
    const [productos, setProductos] = useState([]);

    const createProducto = async (productos)=>{
          //console.log(productos);
           try {
             await createProductoRequest(productos);
            getProductos();
            
           } catch (error) {
                console.log(error)
           }
    
        }
        const getProductos = async ()=>{
           try {
            const res = await getProductosRequest();
            setProductos(res.data);
           } catch (error) {
            console.log(error);
            
           }
            const res = await getProductosRequest();
            console.log(res)
        }

        const deleteProducto = async (id) =>{

            try {
                const res = await deleteProductoRequest(id);
                if(res.status === 200)
                    setProductos(productos.filter(productos => productos._id != id));   
            } catch (error) {
                console.log(error);

            }
        }
        //funcion para obtener un producto por id de la base de datos 
        const getProducto = async(id)=>{
            try {
                const res = await getProductoRequest(id)
                return res.data
                //console.log(res);
            } catch (error) {
                console.log(error)
            }
        }
        //funcion para actulizar un porducto sin cambiar la imagen 
        const updateProductoNoUpdateImage = async (id, productos)=>{
            try {
                const res = await updateProductoRequestNoUpdateImage(id, productos)
                console.log(res);
            } catch (error) {
                console.log(error)
            }
        }
        //funcion para editat un producto de la base de datos 
        const updateProducto = async (id, productos)=>{
        try {
           const res = await updateProductoRequest(id, productos);
           console.log(res);
        } catch (error) {
            console.log(error)
        }
    }
        return(
        <ProductosContext.Provider  value={{
            productos,
            createProducto,
            getProductos,
            deleteProducto,
            getProducto, 
            updateProducto,
            updateProductoNoUpdateImage
        }}>
        {children}

        </ProductosContext.Provider>
    )
}

ProductosProvider.propTypes ={
    children: PropTypes.any
}
