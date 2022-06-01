import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import SpinnerOne from "./spinners/SpinnerOne";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { itemId } = useParams();

  // for adding spinner, we define a loading state
  const [loaded, setLoaded] = useState(false);

  const {
    state: { cart },
    dispatch,
  } = CartState();

  // storing cart into localstorage
  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  // fetching product info by itemId
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await fetch(`/api/items/${itemId}`);
      const json = await data.json();
      setProduct(json.data);
      setLoaded(true);
    };
    fetchProduct();
  }, []);


  return (
    <Wrapper>
      <ProductWrapper>
        {loaded ? (
          product && (
            <>
              <Image src={product.imageSrc} />
              <InfoWrapper>
                <Name>{product.name}</Name>
                <Rating value={product.rating} />
                <Price>${product.price}</Price>
                <BodyLocation>For: {product.body_location}</BodyLocation>
                <Category>Category: {product.category}</Category>
                <Stock>Qty In Stock: {product.numInStock}</Stock>
                <div>
                  {/* button logic. if item isn't in card, button is marked as 'add to cart'. Once item is added, */}
                  {/* it's marked as 'item added'. If item is out of stock, then button is disabled. */}
                  {product.numInStock > 0 ? (
                    cart.find((x) => x._id === product._id) ? (
                      <Button style={{ backgroundColor: "lightpink" }}>
                        Item added!
                      </Button>
                    ) : (
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
                    )
                  ) : (
                    <Button disabled>Out Of Stock</Button>
                  )}
                </div>
              </InfoWrapper>
            </>
          )
        ) : (
          <SpinnerOne />
        )}
      </ProductWrapper>
    </Wrapper>  
  );
};
export default ProductDetails;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  height: 70vh;
`;

const ProductWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  gap: 50px;
  padding: 30px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 5px 15px 31px 4px #dfdfdf;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 500px;
  border-radius: 20px;
`;

const Name = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

const Price = styled.div`
  font-style: italic;
  color: gray;
  margin-bottom: 30px;
`;

const BodyLocation = styled.div`
  font-size: 22px;
  font-weight: bold;
`;

const Category = styled.div`
  font-size: 22px;
  font-weight: bold;
`;

const Stock = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
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
