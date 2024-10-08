import { FC, Fragment, useEffect, useState } from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import loginImage2 from "../../assets/images/login-gyf.gif";
import mediqlogo from "../../assets/images/lyfeguard-logo2.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailregex } from "../../utils/Regex";
import { passwordregex } from "../../utils/Regex";
import { login } from "../../store/slices/auth";
import { useDispatch } from "react-redux";
import Loader from "../../utils/helpers/Loader";

// Define validation schema using Yup
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(emailregex, "Please enter valid email"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      passwordregex,
      "Password must be at least one Capital letter and special characters"
    ),
});

const Login = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading,setLoading] =  useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = async (data) => {
    let item = {
      userEmail: data.email,
      userPassword: data.password,
    };
    setLoading(true)

    dispatch(login(item))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.user?.status === 200) {
          setLoading(false)
          localStorage.setItem("password",data?.password)
          if(res?.user?.role ==="superadmin"){
          navigate("/admin");
        }else if(res?.user?.role ==="hospitaladmin"){
          navigate("/hospitals");
          localStorage.setItem("hospitalDetails",JSON.stringify(res?.user?.hospitalDetails))
          localStorage.setItem("hospitallogo",JSON.stringify(res?.user?.hospitalDetails?.logo))
        }else{
          navigate("/private-ambulance")
        }
        } else {
          alert(res?.user?.message);
        }
      })
      .catch((message) => {
        setLoading(false)
        alert(message.message);
      });
  };

  console.log(loading)
  return (
    <Fragment>
      <Helmet>
        <body className="bg-light"></body>
      </Helmet>
{loading ? <Loader /> :""}
      <div className="row  mx-0 vh-100">
        <Col
          md={12}
          lg={6}
          className="d-flex align-items-center justify-content-center bg-white"
        >
          <Col lg={6} md={6}>
            <div className="text-center mb-2">
              <Link to={`/admin`}>
                <img
                  src={mediqlogo}
                  alt=""
                  style={{ width: "250px", height: "150px" }}
                />
              </Link>
              <h4 className="fw-bold mt-4 mb-3 ">Welcome to LYFGUARD!</h4>
            </div>

            <Form onSubmit={handleSubmit(handleLogin)}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label className="fs-5">Email</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    {...register("email")}
                  />
                </InputGroup>
                {/* Display error message for email */}
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label className="fs-5">Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={passwordShow ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password")}
                  />
                  <Button
                    variant="outline-primary"
                    onClick={() => setPasswordShow(!passwordShow)}
                  >
                    <i
                      className={
                        passwordShow ? "ri-eye-line" : "ri-eye-off-line"
                      }
                    ></i>
                  </Button>
                </InputGroup>
                {/* Display error message for password */}
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  id="rememberMe"
                />
                <Link to="/admin/forgot-password" className="text-primary">
                  Forgot password?
                </Link>
              </Form.Group>

              <div className="text-center mt-4">
                <Button
                  type="submit"
                  variant="success"
                  className="w-50"
                  size="md"
                >
                  Log In
                </Button>
              </div>
            </Form>

            <div className="text-center mt-4">
              <p>
                Don't have an account?{" "}
                <Link to="/admin/register" className="text-primary">
                  Register here
                </Link>
              </p>
            </div>
          </Col>
        </Col>

        <Col lg={6} className="d-none d-lg-block px-0 mr-3 text-center">
          <img
            src={loginImage2}
            alt="Login"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover" }}
          />
        </Col>
      </div> 
    </Fragment>
  );
};

export default Login;
