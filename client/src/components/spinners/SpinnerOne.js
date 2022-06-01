import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
const SpinnerOne = () => {
  return (
    <Div>
      <CircularProgress />
    </Div>
  );
};

export default SpinnerOne;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: hsl(258deg, 100%, 50%);
  height: 100%;
  width: 100%;
`;
