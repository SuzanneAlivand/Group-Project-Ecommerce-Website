import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginMessage, setLoginMessage] = useState(null); // rethink the variable name

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const json = await data.json();
      setLoginMessage(json.message);
      console.log(json);
    } catch (error) {
      console.log("ERROR:", error.message);
    }
  };

  const handleEmail = (e) => {
    // setEmail(email + e.target.value);
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    // setPassword(password + e.target.value);
    setPassword(e.target.value);
  };

  return (
    <Wrapper>
      <form onSubmit={(e) => handleSubmit(e)}>
        <LoginContainer>
          <Email
            type="email"
            placeholder="Login"
            onChange={(e) => handleEmail(e)}
            required
          />
          <PassInput
            type="password"
            placeholder="Password"
            onChange={(e) => handlePassword(e)}
            required
          />
          <button type="submit">Submit</button>
          <SignUpInfo>
            Not a member? <Link to="/sign-up">Sign up here.</Link>
          </SignUpInfo>
          <LoginMessage>{loginMessage}</LoginMessage>
        </LoginContainer>
      </form>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px black solid;
  width: 500px;
  height: 40vh;
  gap: 10px;
`;

const Email = styled.input`
  width: 175px;
  height: 20px;
`;

const PassInput = styled.input`
  width: 175px;
  height: 20px;
`;

const SignUpInfo = styled.div`
  font-size: 14px;
`;

const LoginMessage = styled.div`
  font-weight: bold;
  color: red;
`;
