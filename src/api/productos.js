import axios from './axios';

export const getProductosRequest = () =>axios.get('/productos');

export const getProductoRequest = (id) => axios.get(`/productos/${id}`);


export const createProductoRequest = (productos) =>axios.post('/productos', productos,{
    headers:{
            'Content-Type':'multipart/form-data'
    }
});

export const deleteProductoRequest = (id) =>axios.delete('/productos/'+id);


export const updateProductoRequestNoUpdateImage = (id, productos) =>axios.put('/productosupdatenoimage/'+id, productos);

export const updateProductoRequest = (id,productos) =>axios.put('/productos/'+id, productos,{
    headers:{
        "Content-Type":"multipart/form-data"
    }
});

