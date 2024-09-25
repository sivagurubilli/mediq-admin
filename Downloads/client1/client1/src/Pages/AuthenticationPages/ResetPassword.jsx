import { useState ,Fragment} from "react";
import { Button, Col, Row, Form, InputGroup } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordregex } from "../../utils/Regex";
import * as yup from "yup";
import AuthService from "../../services/auth.services";

const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .matches(
        passwordregex,
        "Password must contain at least one capital letter and one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  
const ResetPassword = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  
  // Extract email from query parameters
  const query = useQuery();
  const email = query.get("email");
  const token = query.get("token");
  const navigate = useNavigate();

  const handleResetPassword = async (data) => {
    let item ={

        newPassword:data.password,
        token:token,
        email:email
      }    

      const success = await AuthService.Updatepassword(item);
          if (success ==="Password has been reset successfully") {
            alert(success)
            navigate("/admin/login");
          }else{
            alert(success.message)

          }
      
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <Fragment>
      <Helmet>
        <body className="bg-light"></body>
      </Helmet>

      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <Col lg={4} md={6} sm={8} xs={10}>
          <div className="text-center mb-4">
            <h2 className="fw-bold mt-3">Update your password</h2>
            <p className="text-muted">Enter your new  Password</p>
          </div>

          <Form  onSubmit={handleSubmit(handleResetPassword)}>
            <Form.Group controlId="formPassword">
              <Form.Label >New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={passwordShow ? "text" : "password"}
                  placeholder="Enter new password"
                  {...register("password")}
                />
                <Button
                                    variant="outline-primary"
                  onClick={() => setPasswordShow(!passwordShow)}
                >
                  <i className={passwordShow ? "ri-eye-line" : "ri-eye-off-line"}></i>
                </Button>
              </InputGroup>
              {errors.password && <p className="text-danger">{errors.password.message}</p>}

            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Label>Confirm New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={confirmPasswordShow ? "text" : "password"}
                  placeholder="Confirm new password"
                  {...register("confirmPassword")}
                />
                <Button
                                   variant="outline-primary"
                  onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                >
                  <i className={confirmPasswordShow ? "ri-eye-line" : "ri-eye-off-line"}></i>
                </Button>
              </InputGroup>
              {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}

            </Form.Group>

            <div  className="d-flex justify-content-center mt-4">
              <Button
                variant="primary"
                className="me-3"
                size="md"
            type="submit"
              >
                Reset Password
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

export default ResetPassword;
