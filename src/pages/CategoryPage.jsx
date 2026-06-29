import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

//import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import ProductGrid from "../components/ProductGrid";

function formatCategory(category) {
    return decodeURIComponent(category);
}

function CategoryPage({ search }) {
    const { category } = useParams();
     
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState("");

    const activeCategory = formatCategory(category);
    

  useEffect(() => {
    const fetchCategories = async () => {
      try {

        setStatus("loading");
        setError("");
        
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);

        setProducts(response.data);
        setStatus("success");
      } catch (error) {
        setError(error.message);
        setStatus("error");
      }
    };

    fetchCategories();
  }, []);

  //para la busqueda por palabra
    const filteredProducts = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        if (!searchText) {
            return products;
        }

        return products.filter((product) =>
            product.title.toLowerCase().includes(searchText)
        );
    }, [products, search]);

//aqui ya mostramos productos filtrados





}

export default CategoryPage;