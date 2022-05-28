import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
        <ProductWrapper>
            {product && (
             <>
                <Image src={product.imageSrc} />
                <InfoWrapper>
                    <Name>{product.name}</Name>
                    <Price>${product.price}</Price>
                    <BodyLocation>{product.body_location}</BodyLocation>
                    <Category>{product.category}</Category>
                    <Stock>{product.numInStock}</Stock>
                    <CompanyId>{product.companyId}</CompanyId>
                </InfoWrapper> 
            </>               
            )}
        </ProductWrapper>
    );
}
export default ProductDetails;

const ProductWrapper = styled.div`
    display: flex;
    gap: 50px;    
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;    
`;

const Image = styled.img`
    width: 400px;
    border-radius: 20px;
`;

const Name = styled.div`
    font-size: 32px;
    font-weight: bold;
`;

const Price = styled.div`
    font-style: italic;
    color: gray;
    margin-bottom: 30px;
`;

const BodyLocation = styled.div`
    font-size: 32px;
    font-weight: bold;
`;

const Category = styled.div`
    font-size: 32px;
    font-weight: bold;
`;

const Stock = styled.div`
    font-size: 32px;
    font-weight: bold;
`;

const CompanyId = styled.div`
    font-size: 32px;
    font-weight: bold;
`;