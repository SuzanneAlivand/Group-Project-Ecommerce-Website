import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { CartState } from "../context/Context";
import Form from "./Form/Form";

const Checkout = () => {
  //   const [subStatus, setSubStatus] = useState("idle");
  //   const [errMessage, setErrMessage] = useState("");
  const history = useHistory();

  const {
    state: { cart },
    dispatch,
    setCart,
    total,
  } = CartState();

  const [formData, setFormData] = useState({});

  const linkToConfirmationPage = (formData) => {
    history.push("/confirmation");
  };

  console.log("cart", cart);

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };
  console.log("formData", formData);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const checkoutData = {
      cart: cart,
      total:
        total.toFixed(2) != 0
          ? total.toFixed(2)
          : sessionStorage.getItem("Total"),
      ...formData,
    };

    await fetch("/api/orders", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutData),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "CLEAR" });
        sessionStorage.setItem("CheckoutData", JSON.stringify(checkoutData));
        setCart(localStorage.removeItem("Cart"));
        linkToConfirmationPage(formData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Wrapper>
        <Form
          formData={formData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          linkToConfirmationPage={linkToConfirmationPage}
          total={
            total.toFixed(2) != 0
              ? total.toFixed(2)
              : JSON.parse(sessionStorage.getItem("Total"))
          }
          cart={cart}
        ></Form>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;

export default Checkout;
