import styled from "styled-components";

const Confirmation = () => {
  const getCheckOutData = JSON.parse(sessionStorage.getItem("CheckoutData"));
  console.log("get", getCheckOutData);

  return (
    <ConfirmationWrapper>
      <TitleConfirmation>
        <p>Thank you {getCheckOutData.givenName}!</p>
        <h1>Your order is confirmed!</h1>
      </TitleConfirmation>
      <OrderSummary>
        <h3>Order summary</h3>
        {getCheckOutData.cart.map((item) => (
          <ItemContainer>
            <>
              <img src={item.imageSrc} />
              <p>{item.name}</p>
              <p>$ {item.price}</p>
              <p>Quantity: {item.qty}</p>
              <p>Subtotal: {(item.price*item.qty).toFixed(2)}</p>
            </>
          </ItemContainer>
          
        ))}
        <TotalPrice>Total: ${getCheckOutData.total}</TotalPrice>
      </OrderSummary>
    </ConfirmationWrapper>
  );
};

const ConfirmationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  p {
    padding: 5px;
  }
`;
const TitleConfirmation = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 2em;
  }
`;

const OrderSummary = styled.div`
  border-radius: 20px;
  border: 0.5px solid #e4e8eb;
  background-color: #fafafa;

  h3 {
    text-align: center;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
  img {
    width: 100px;
  }
  p {
    padding: 0 30px;
  }
`;
const TotalPrice = styled.div`
  text-align: center;

  padding-top: 40px;
  padding-bottom: 20px;
  font-size: 1.4em;
  font-weight: 700;
`;

export default Confirmation;
