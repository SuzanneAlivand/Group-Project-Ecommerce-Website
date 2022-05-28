import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProductsPage = () => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            //to be modified later when endpoints and handlers have been created
            const data = await fetch("/api/items");
            const json = await data.json();
            setProducts(json.data);
        }
        fetchProducts();
    },[]);
    
    return (
        <Wrapper>
            {products && products.map(product => (
                <Link to={`/api/items/${product._id}`}>
                    <ProductContainer>
                        <ProductName>{product.name}</ProductName>
                        <ProductImg src={product.imageSrc}></ProductImg>
                    </ProductContainer>
                </Link>
            ))}
        </Wrapper>
    );
}
export default ProductsPage;

const Wrapper = styled.div`
    display: grid;
    justify-items: center;
    grid-template: 1fr 1fr / 1fr 1fr 1fr;
    row-gap: 40px;
    margin: 70px;    
`;

const ProductContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    border: 1px solid gray;
    border-radius: 20px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    width: 250px;
    height: 230px;
    padding-bottom: 40px;
`;

const ProductImg = styled.img`
    position: absolute;
    top: -15px;
    width: 150px;
    border-radius: 20px;
`;

const ProductName = styled.div`
    font-size: 20px;
    font-weight: bold;
`;


