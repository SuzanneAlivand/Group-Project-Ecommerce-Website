import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const {itemId} = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            //to be modified later when endpoints and handlers have been created
            const data = await fetch(`/api/items/${itemId}`);
            const json = await data.json();
            setProduct(json.data);
        }
        fetchProduct();
    },[]);    

    return (
        <p>Product Details</p>
        
    );
}
export default ProductDetails;