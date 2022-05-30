import styled from "styled-components";
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <Wrapper>
            <SignupContainer>
                <FirstNameInput type="text" placeholder="First Name" required/>
                <LastNameInput type="text" placeholder="Last Name" required/>
                <SignUpInfo>Already a member? <Link to="/login">Login here.</Link></SignUpInfo>
            </SignupContainer>
        </Wrapper>
    );
};
export default SignUp;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px black solid;
    width: 500px;
    height: 40vh;
    gap: 10px;
`;

const FirstNameInput = styled.input`
    width: 175px;
    height: 20px;
`;

const LastNameInput = styled.input`
    width: 175px;
    height: 20px;
`;

const SignUpInfo = styled.div`
    font-size: 14px;
`;
