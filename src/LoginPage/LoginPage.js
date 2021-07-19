import React from "react";
import "./loginPage.css";
import { InputGroup, Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/layout";
import { useState } from "react";
import { FormControl } from "@chakra-ui/form-control";
import { set } from "lodash";

const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPW, setEnteredPW] = useState("");

  console.log(enteredUsername);

  const validateInputs = (username, pw) => {
    if (username === "asdf" && pw === "qwer") {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="loginPageContainer">
      <div className="loginMenuContainer">
        <Stack direction="column" spacing={4} align="left">
          <h1 style={{ fontSize: "1.4rem" }}>Login</h1>

          <InputGroup flexDirection="column">
            <FormControl id="username" isRequired>
              <Input
                variant="flushed"
                type="text"
                placeholder="Username"
                mb="5"
                onChange={(e) => setEnteredUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <Input
                variant="flushed"
                type="password"
                placeholder="Password"
                mb="10"
                onChange={(e) => setEnteredPW(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              onClick={() => validateInputs(enteredUsername, enteredPW)}
            >
              Submit
            </Button>
          </InputGroup>
        </Stack>
      </div>
    </div>
  );
};

export default LoginPage;
