import { FC, Fragment, useState } from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import mediqlogo from "../../assets/images/lyfeguard-logo2.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailregex } from "../../utils/Regex";
import AuthService from "../../services/auth.services";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(emailregex, "Please enter valid email"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const forgotpassword1 = async (data) => {
    // Replace with your login logic
    let item = {
      userEmail: data.email,
    };
    const success = await AuthService.Forgotpassword(item);
    console.log(success);
    if (success.status == 200) {
      alert(success.message)
    }
  };

  return (
    <Fragment>
      <Helmet>
        <body className="bg-light"></body>
      </Helmet>

      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <Col lg={4} md={6} sm={8} xs={10}>
          <div className="text-center mb-4">
            <h2 className="fw-bold mt-3">Reset your password</h2>
            <p className="text-muted">
              Fear not. We'll email you instructions to reset your password.
            </p>
          </div>

          <Form onSubmit={handleSubmit(forgotpassword1)}>
            <Form.Group controlId="formUsername">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email")}
                />
              </InputGroup>
            </Form.Group>
            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="primary"
                className="me-3"
                size="md"
                type="submit"
              >
                Update Password
              </Button>
              <Link to="/admin/login" className="text-primary mt-2">
                Return to login
              </Link>
            </div>
          </Form>
        </Col>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
