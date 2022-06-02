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
            <GrFormPreviousLink/>
            <span> Return to cart</span>
          </Link>
        </ReturnWrapper>

        <H1>Your order</H1>
        <H2>Contact information</H2>
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
        <H2>Shipping Address</H2>
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
        <H4>Subtotal ({cart.length}) items</H4>
        <H3>Total:<span> ${total}</span> </H3>
      </Purchase>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  display: flex;
  justify-content: center;

  padding: 20px 50px;
`;

const H1 = styled.h1`
padding-bottom: 20px;
text-align: center;
`

const H2 = styled.h2`
padding-top: 20px;
padding-bottom: 10px;
text-align: center;
`


const FormContent = styled.div`
  max-width: 400px;
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 40px;
`;

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ReturnWrapper = styled.div`
padding-bottom: 20px;
  span {
    padding: 10px;
  }
    a {
      color: #32cd32;
    text-decoration: none;
  
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
  padding: 7px 20px;
  font-size: 1.2rem;
  width: 100%;
  border: none;
  color: white;
  background-color: var(--color-secondary);
  cursor: pointer;
`;

const Purchase = styled.div`
  background-color: var(--color-lightBlue);
  border: 0.5px solid #e4e8eb;
  width: 28%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-left: 40px;
`;

const Items = styled.div`
  padding: 20px 10px;
  img {
    max-width: 100px;
    &:nth-child(n) {
      padding: 10px;
    }
  }
`;

const H4 = styled.h4`
padding: 30px 20px;

`

const H3 = styled.h3`
padding: 0 20px;
 span {
font-weight: 700;
font-size: 1.4em;
color: var(color-secondary);
}
`


export default Form;
