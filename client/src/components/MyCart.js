import styled from "styled-components";
import { useEffect, useState } from "react";
import { CartState } from "../context/Context";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const MyCart = () => {
  const {
    state: { cart },
    dispatch,
    total,
    setTotal,
  } = CartState();

  // storing data
  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * Number(curr.qty), 0)
    );
  }, [cart]);
  const x = cart.map((x) => console.log(x.qty));

  return (
    <Wrapper>
      <Items>
        {cart.map((item) => (
          <ItemContainer>
            <img src={item.imageSrc}></img>
            <div style={{ maxWidth: "200px" }}>
              <p>{item.name}</p>
            </div>
            <span>${Number(item.price).toFixed(2)}</span>
            {item.numInStock > 0 && (
              <div>
                <select
                  style={{ width: "50px", padding: "5px" }}
                  value={item.qty}
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_CART_QTY",
                      payload: {
                        _id: item._id,
                        qty: e.target.value,
                      },
                    })
                  }
                >
                  {[...Array(item.numInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <AiFillDelete
              style={{ cursor: "pointer" }}
              size={"20px"}
              onClick={(e) => {
                dispatch({
                  type: "REMOVE_ITEM",
                  payload: item._id,
                });
              }}
            />
          </ItemContainer>
        ))}
      </Items>
      <Purchase>
        <p>Subtotal ({cart.length}) items</p>
        <span>Total: ${total.toFixed(2)}</span>

        {cart.length > 0 ? (
          <Link to="/checkout">
            <button>Proceed to checkout</button>
          </Link>
        ) : (
          <button disabled>Your cart is empty!</button>
        )}
      </Purchase>
    </Wrapper>
  );
};
export default MyCart;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px 70px;
  color: white;
`;
const Items = styled.div`
  width: 50vw;
`;

const ItemContainer = styled.div`
  border: 0.5px solid grey;
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background-color: #244d61;
  img {
    border-radius: 5px;
    width: 120px;
  }
`;

const Purchase = styled.div`
  border: 0.5px solid grey;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #244d61;
  padding: 20px;
  border-radius: 5px;
  align-self: flex-start;
  button {
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    margin: 10px;
  }
  p {
    font-size: 20px;
  }
  span {
    font-size: 18px;
    margin: 10px;
  }
`;
