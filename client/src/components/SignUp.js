import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/Context";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [userName, setUserName] = useState(null);
  const [signUpMessage, setSignUpMessage] = useState(null);
  const [secondPassword, setSecondPassword] = useState(null);

  const { user, setUser } = useContext(UserContext);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          userName: userName,
          password: password,
          secondPassword: secondPassword,
        }),
      });
      const json = await data.json();
      console.log(json);
      setSignUpMessage(json.message);
      console.log(json);
      setUser(userName);
      history.push("/");
    } catch (error) {
      console.log("ERROR:", error.message);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSecondPassword = (e) => {
    setSecondPassword(e.target.value);
  };

  return (
    <Wrapper>
      <SignupForm onSubmit={(e) => handleSubmit(e)}>
        <h2>Sign Up</h2>
        <UsernameInput
          type="text"
          placeholder="Username"
          onChange={(e) => handleUserName(e)}
          required
        />
        <EmailInput
          type="email"
          placeholder="Email Address"
          onChange={(e) => handleEmail(e)}
          required
        />
        <PasswordInput
          type="password"
          placeholder="Password"
          onChange={(e) => handlePassword(e)}
          minlength="6"
          required
        />
        <PasswordInput
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => handleSecondPassword(e)}
          minlength="6"
          required
        />
        <button type="submit">Submit</button>
        <SignUpInfo>
          Already a member? <Link to="/login">Login here.</Link>
        </SignUpInfo>
        <SignUpMessage>{signUpMessage}</SignUpMessage>
      </SignupForm>
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

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px black solid;
  width: 500px;
  height: 40vh;
  gap: 10px;
`;

const NameContainer = styled.div`
  display: flex;
`;

const UsernameInput = styled.input`
  width: 175px;
  height: 20px;
`;

const EmailInput = styled.input`
  width: 175px;
  height: 20px;
`;

const PasswordInput = styled.input`
  width: 175px;
  height: 20px;
`;

const SignUpInfo = styled.div`
  font-size: 14px;
`;

const SignUpMessage = styled.div`
  font-weight: bold;
  color: red;
`;
