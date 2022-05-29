import styled from "styled-components";
import { useEffect, useState } from "react";
import { CartState } from "../context/Context";

const MyCart = () => {

  const {
    state: { cart },
    dispatch,
    products,
    setProducts
    } = CartState(); 

  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  return (
    <Wrapper>
      <Items>
        {cart.map((item) => (
          <ItemContainer>
            <img src={item.imageSrc}></img>
            <Details>
              <h3>{item.name}</h3>
              <h4>${item.price}</h4>
            </Details>
          </ItemContainer>
        ))}
      </Items>
      <Purchase>
        <h3>Subtotal ({cart.length}) items.</h3>
        <h4>Total: ${total}</h4>
        <button>Proceed to checkout</button>
      </Purchase>
    </Wrapper>
  );
};
export default MyCart;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px 70px;
`;
const Items = styled.div`
  width: 50vw;
`;

const ItemContainer = styled.div`
  border: 0.5px solid grey;
  margin-bottom: 10px;
  display: flex;
  padding: 10px;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
`;
const Purchase = styled.div`
  border: 0.5px solid grey;
  width: 20%;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
