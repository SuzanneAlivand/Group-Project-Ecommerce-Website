import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { CartState } from "../context/Context";
import Form from "./Form/Form";

const Checkout = () => {
  const history = useHistory();

  const {
    state: { cart },
    dispatch,
    setCart,
    total,
  } = CartState();

  //for holding user information in state before submitting
  const [formData, setFormData] = useState({});

  //redirects to confirmation when form is successfully submitted.
  const linkToConfirmationPage = (formData) => {
    history.push("/confirmation");
  };

  //handles and stores all user inputs into state 
  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  //On Submit,  checkout data is created with cart info and the total price.
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
    //sends all the form-filled data to BE 
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
        //we store this data in sessionStorage to make it available at the confirmation page.
        sessionStorage.setItem("CheckoutData", JSON.stringify(checkoutData));
        //now that purchase is complete, we 'empty' the cart from session storage.
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
