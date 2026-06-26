import { useState,useEffect } from "react";



function useFetchProducts() {
    const {productos,setproductos} = useState([])


        useEffect(() => {
            async function traerDatos() {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                setProductos(data);
            } catch (error) {
                console.error(error);
            }
            }
            traerDatos();
        }, []);
    
  return data;
}
