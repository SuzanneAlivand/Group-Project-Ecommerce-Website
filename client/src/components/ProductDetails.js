import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { itemId } = useParams();

  const {
    state: { cart },
    dispatch,
  } = CartState();

  // storing data
  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchProduct = async () => {
      //to be modified later when endpoints and handlers have been created
      const data = await fetch(`/api/items/${itemId}`);
      const json = await data.json();
      setProduct(json.data);
    };
    fetchProduct();
  }, []);

  return (
    <ProductWrapper>
      {product && (
        <>
          <Image src={product.imageSrc} />
          <InfoWrapper>
            <Name>{product.name}</Name>
            <Rating value={product.rating} />
            <Price>${product.price}</Price>
            <BodyLocation>{product.body_location}</BodyLocation>
            <Category>{product.category}</Category>
            <Stock>{product.numInStock}</Stock>
            <CompanyId>{product.companyId}</CompanyId>
            <div>
              {product.numInStock > 0 ? (
                <Button
                  onClick={() => {
                    dispatch({
                      type: "ADD_ITEM",
                      payload: product,
                    });
                  }}
                >
                  Add to my cart
                </Button>
              ) : (
                <Button disabled>Add to my cart</Button>
              )}
            </div>
          </InfoWrapper>
        </>
      )}
    </ProductWrapper>
  );
};
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

const Button = styled.button`
  border-radius: 4px;
  border: none;
  background-color: lightblue;
  cursor: pointer;
  padding: 5px 10px;
`;
