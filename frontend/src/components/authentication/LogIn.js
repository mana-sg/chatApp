import {
  VStack,
  FormControl,
  Input,
  FormLabel,
  InputGroup,
  Button,
  InputRightElement,
  HStack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const LogIn = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const handleClick = () => setShow(!show);
  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill in all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing={"5px"}>
      <FormControl id="email-login" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password-login" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <HStack w={"100%"}>
        <Button
          colorScheme="blue"
          w={"100%"}
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Log In
        </Button>
        <Button
          variant={"solid"}
          colorScheme="red"
          w={"100%"}
          style={{ marginTop: 15 }}
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
        >
          Log In As Guest User
        </Button>
      </HStack>
    </VStack>
  );
};

export default LogIn;
