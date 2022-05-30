import styled from "styled-components";
import { Link } from "react-router-dom";
import { GrFormPreviousLink } from "react-icons/gr";

const Form = ({ handleSubmit, handleChange, total, cart }) => {
  console.log("cart IS", cart);
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <FormContent>
        <ReturnWrapper>
          <Link to="/cart">
            <GrFormPreviousLink />
            <span> Return to cart</span>
          </Link>
        </ReturnWrapper>
        <h1>Your order</h1>
        <h2>Contact information</h2>
        <FormGroup>
          <Input
            name="givenName"
            type="text"
            placeholder="First name"
            required
            onChange={(ev) => handleChange(ev.target.value, "givenName")}
          />
          <Input
            name="surname"
            type="text"
            placeholder="Last name"
            required
            onChange={(ev) => handleChange(ev.target.value, "surname")}
          />
        </FormGroup>
        <Input
          name="email"
          type="text"
          placeholder="Email"
          required
          onChange={(ev) => handleChange(ev.target.value, "email")}
        />
        <h2>Shipping Address</h2>
        <Input
          name="address"
          type="address"
          placeholder="Address"
          onChange={(ev) => handleChange(ev.target.value, "address")}
        />
        <FormGroup>
          <Input
            name="city"
            type="text"
            placeholder="City"
            required
            onChange={(ev) => handleChange(ev.target.value, "city")}
          />
          <Input
            name="province"
            type="text"
            placeholder="Province"
            required
            onChange={(ev) => handleChange(ev.target.value, "province")}
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="postcode"
            type="text"
            placeholder="Postal Code"
            required
            onChange={(ev) => handleChange(ev.target.value, "postcode")}
          />
          <Input
            name="country"
            type="text"
            placeholder="Country"
            required
            onChange={(ev) => handleChange(ev.target.value, "country")}
          />
        </FormGroup>
        <BtnCheckout type="submit" onSubmit={handleSubmit}>
          Proceed to checkout
        </BtnCheckout>
      </FormContent>
      <Purchase>
        <Items>
          {cart.map((item) => (
            <img src={item.imageSrc}></img>
          ))}
        </Items>
        <h4>Subtotal ({cart.length}) items</h4>
        <h3>Total: ${total} </h3>
      </Purchase>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  display: flex;
  justify-content: space-evenly;

  padding: 50px 50px;
`;
const FormContent = styled.div`
  max-width: 300px;
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ReturnWrapper = styled.div`
  span {
    padding: 10px;
    /* &.active {
  text-decoration: none;
} */
  }
`;

const Input = styled.input`
  display: flex;
  padding: 8px 12px 10px 12px;
  margin: 5px;
  width: 100%;
  border-radius: 3px;
  border: 1px solid #e4e8eb;
`;

const BtnCheckout = styled.button`
  margin-top: 20px;
  padding: 10px;
`;

const Purchase = styled.div`
  background-color: #fafafa;
  border: 0.5px solid #e4e8eb;
  width: 20%;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Items = styled.div`
  padding: 10px;
  img {
    max-width: 80px;
    &:nth-child(n) {
      padding: 10px;
    }
  }
`;

export default Form;
