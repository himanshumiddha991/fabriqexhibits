import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  Container,
} from "@chakra-ui/react";
import { store } from "../../redux/store";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { setToken } from "../../redux/authSlice";
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/admin/home" replace />;
  }

  const API_URL = process.env.REACT_APP_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      });

      const token = res.data.token;

      login(token);
      store.dispatch(setToken(token));
      navigate("/admin/home");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <Container centerContent h="100vh" justifyContent="center">
      <Box bg="white" p={10} shadow="lg" rounded="lg">
        <Heading mb={6}>Login</Heading>

        <form onSubmit={handleLogin}>
          <Stack spacing={4}>
            <Input name="email" placeholder="Email" />

            <Input name="password" type="password" placeholder="Password" />

            <Button type="submit" colorScheme="blue">
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
