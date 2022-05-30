import { useState } from "react";
import styled from "styled-components";
import { CartState } from "../context/Context";
import Form from "./Form/Form";


const Checkout = () => {
  //   const [subStatus, setSubStatus] = useState("idle");
  //   const [errMessage, setErrMessage] = useState("");

  const {
    state: { cart },
    } = CartState(); 


  const { total } = CartState();
  const [formData, setFormData] = useState({});

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };
  console.log('formData', formData);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const checkoutData = {
        cart: cart,
      ...formData,
    };

    fetch("/api/orders", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutData),
    })
      .then((res) => res.json())
      .then((json) => {
        const { status, error } = json;
        if (status === "success") {
        //   setSubStatus("confirmed");
          // NEED TO BE UPDATED
        } else if (error) {
            console.log('error');
        //   setSubStatus("error");
          //   setErrMessage(errorMessages[error]);
        }
      });
  };

  return (
    <>
      <Wrapper>
        <Form
          formData={formData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          total={total}
          cart={cart}
        ></Form>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;

export default Checkout;
