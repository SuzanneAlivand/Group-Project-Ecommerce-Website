import styled from "styled-components";

const Form = ({ handleSubmit, handleChange, total }) => {
  return (
    <Wrapper onSubmit={handleSubmit}>
      <FormContent>
        <h1>Order Form</h1>
        <h2>Provide your information</h2>
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
          <Button type="submit" onSubmit={handleSubmit}>
            Proceed to checkout
          </Button>
        </FormGroup>
      </FormContent>
      <Purchase>
        <h3>Subtotal items</h3>
        <h4>Total:{total} $</h4>
        <button>Proceed to checkout</button>
      </Purchase>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  display: flex;
  justify-content: space-around;

  padding: 50px 50px;
`;
const FormContent = styled.div`
  width: 50vw;
  margin: 0 16px 0;
`;
const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  > div {
    flex: 1 0 auto;
    width: 48%;

    &:first-child {
      margin-right: 6px;
    }
  }
`;

const Input = styled.input``;

const Button = styled.button``;

const Purchase = styled.div`
  border: 0.5px solid grey;
  width: 20%;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export default Form;
