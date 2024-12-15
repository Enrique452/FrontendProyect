 
import { useForm, Controller} from "react-hook-form"
import { useProductos } from "../context/ProductosContext"
import uploadIcon from '../assets/addphoto.svg';
import { useState, useRef, useEffect } from "react";
import{ useNavigate, useParams} from 'react-router-dom';
import logo from "../assets/logo.png"; 
import imagen1 from "../assets/imagen1.png"
function ProductosFormPage() {
const server = import.meta.env.VITE_BASE_URL+"/img/";
    const {register, handleSubmit, control, setValue, formState:{errors} }= useForm({
      defaultValues:{
        nombre: "",
        precio: 0.0,
        stock: 0.0,
        talla: 0.0,
        marca: "",
        image: uploadIcon

      }
    });
    const {productos, createProducto, getProducto, updateProducto, updateProductoNoUpdateImage } = useProductos();
    const [selectedImage, setSelectedImage] =useState(uploadIcon);
    const inputImage = useRef(null);
    const navigate = useNavigate();
    const params = useParams();
    const [updateImage, setUpdateImage] = useState(false);

    useEffect( ()=>{
      async function loadProducto() {
        console.log(params);
        if(params.id){
          const productos = await getProducto(params.id);
          setValue('nombre', productos.nombre);
          setValue('precio', productos.precio);
          setValue('stock', productos.stock);
          setValue('talla', productos.talla);
          setValue('marca', productos.marca);
          setValue('image', productos.image);
          setSelectedImage(server+productos.image);
        }
        
      }
    
    
      loadProducto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const onSubmnit = handleSubmit( (data)=>{
      
      const formData = new FormData();
      formData.append("nombre", data.nombre);
      formData.append("precio", data.precio);
      formData.append("stock", data.stock);
      formData.append("talla", data.talla);
      formData.append("marca", data.marca);
      formData.append("image", data.image);
      
      if(data.image =="/src/assets/addphoto.svg"){
      return;
      }
      
      if(params.id){
        if(!updateImage){
          const updateData ={
            "nombre": data.nombre,
            "precio": data.precio.toString(),
            "stock": data.stock.toString(),
            "talla": data.talla.toString(),
            "marca": data.marca,
            "image": data.image
          }
          updateProductoNoUpdateImage(params.id, updateData);
        

      }else{
          updateProducto(params.id, formData);
      }
      }else{
        createProducto(formData);

      }
      navigate('/productos');
    });

    const handleImageClick = (()=>{
      inputImage.current.click();
    })

    const handleImageChange = (e, field) => { 
      const file = e.target.files[0];
      setSelectedImage(file ? URL.createObjectURL(file) : uploadIcon);
       field.onChange(file);
       setUpdateImage(true);
    };
  
    console.log(productos);
  return (
    
      <div className="flex items-center justify-center h-screen pt-40">
      <div className='bg-green-400 max-w-md w-full p-8 rounded-md'>
       
      <div className="absolute top-0 right-0 md:top-[6rem] md:right-[-2rem] sm:top-[4rem] sm:right-[-2rem] lg:top-[4rem] lg:right-[-3rem] lg:m-2">
  <img 
    src={logo} 
    alt="Logotipo" 
    className="h-48 w-auto lg:h-[25rem] object-contain max-w-full" 
  />
</div>

       <div className="absolute top-20 left-0 lg:left-[-10rem] m-6">
  <img 
    src={imagen1} 
    alt="Imagen grande" 
    className="h-32 w-auto lg:h-[40rem] object-contain max-w-full" 
  />
</div>
       
       
       
       
       
        <form onSubmit={onSubmnit}>
        <h1 className="text-3xl font-bold text-center my-2">Productos</h1>
        <label htmlFor="nombre">Nombre </label>
          <input type="text" id="nombre"
                    className='w-full bg-white-700 text-black px-4 py-2 rounded-md my-2'
                    placeholder="Nombre del Tenis"
                    {
                      ...register("nombre", {required: true})
                    }
                    autoFocus
  
          />
          {errors.nombre &&(
              <div className="text-red-500">Nombre del producto es requerido</div>
          )}
          <label htmlFor="precio">Precio </label>
          <input type="number" step={0.10} id="precio"
                    className='w-full bg-white-700 text-black px-2 py-2 rounded-md my-2'
                    placeholder="Precio del Tenis"
                    {
                      ...register("precio",{
                        required: true,
                        valueAsNumber: true,
                        min: 0.0,

                      })
                    }
                />
                {errors.precio &&(
              <div className="text-red-500">El precio del producto es requerido</div>
                )}
                {errors.precio?.types ==="min" &&(
              <div className="text-red-500">El precio minimo es 0</div>
          )}
                <label htmlFor="stock">Stock</label>
            <input type="number" step={0.10} id="stock"
                    className='w-full bg-white-700 text-black px-4 py-2 rounded-md my-2'
                    placeholder="Stock"
                    {
                      ...register("stock",{
                        required: true,
                        valueAsNumber: true,
                        min: 0.0,
                      })
                    }
                />
                {errors.stock &&(
              <div className="text-red-500">El stock es requerido</div>
                )}
                {errors.stock?.types ==="min" && (
              <div className="text-red-500">El precio minimo es 0</div>
          )}

                <label htmlFor="talla">Talla</label>
              <input type="number" step="0.10" id="talla"
                    className='w-full bg-white-700 text-black px-4 py-2 rounded-md my-2'
                    placeholder="Talla"
                    {
                      ...register("talla",{
                        required: true,
                        valueAsNumber: true,
                        min: 0.0,

                      })
                    }
                />
                {errors.talla &&(
              <div className="text-red-500">Talla del producto es requerido</div>
                )}
                {errors.talla?.types ==="min" &&(
              <div className="text-red-500">El precio minimo es 0</div>
          )}
                <label htmlFor="marca">Marca </label>
              <input type="text" id="marca"
                    className='w-full bg-white-700 text-black px-4 py-2 rounded-md my-2'
                    placeholder="Marca"
                    {
                      ...register("marca",{required:true})
                    }
                />  
                 {errors.marca &&(
              <div className="text-red-500">La marca del  producto es requerido</div>
               )}  
                <div className="py-2 my-2">
                  {
                    selectedImage &&(
                      <img 
                      src={selectedImage}
                      alt="Imagen seleccionada"
                      width={200}
                      height={200}
                      className="max-h[200px] object-contain"
                      onClick={handleImageClick}
                      
                      />
                    )}
                    <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  ref={inputImage}
                  onChange={(e) => handleImageChange(e, field)}
                  className="hidden"
                />
              )}
              />
          </div>   
          <button className="bg-transparent hover:bg-zinc-500
          text-zinc-500 fron-semibold hover:text-white 
          py-2 px-4 border border-zinc-500
          hover:border-transparent rounded">
            Guardar
          </button> 
          <button className="bg-red-300 ml-4 hover:bg-red-700
        text-white fron-semibold 
        py-2 px-4 border border-zinc-500
        hover:border-transparent rounded"
     onClick={()=>{navigate('/productos')}}

     >
      Cancelar
     </button>


        </form>


      </div>
      </div>
  )
}

export default ProductosFormPage
