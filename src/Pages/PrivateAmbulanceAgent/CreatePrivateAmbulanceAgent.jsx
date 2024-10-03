import React,{useState} from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Form, InputGroup, Col, Row,Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PrivateAmbulanceAgentService from "../../services/MasterData/privateAmbulanceAgent.service";
import { passwordregex } from "../../utils/Regex";

// Define validation schema with Yup
const schema = Yup.object().shape({
    privatetype: Yup.string().required("Type is required"),
    privateAmbulanceagentName: Yup.string().required("Agent Name is required"),
    privateAmbulanceAdminName: Yup.string().required("Ambulance Admin Name is required"),
    privateAmbulanceAdminEmail: Yup.string()
    .email("Must be a valid email")
    .required("Ambulance Admin Email is required"),
    privateAmbulanceAdminPassword: Yup.string()
   
    .required("Ambulance Admin Password is required").matches(
      passwordregex, "Password must be at least one Capital letter and special characters"),
    confirmPrivateAmbulanceAdminPassword: Yup.string().oneOf([Yup.ref("privateAmbulanceAdminPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const AddPrivateAmbulanceAgent = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
        privatetype :"",
				privateAmbulanceagentName:"",
                logo: null,
				website:"",
				privateAmbulanceAdminName:"",
				privateAmbulanceAdminEmail:"",
				privateAmbulanceAdminPassword:"",
                confirmPrivateAmbulanceAdminPassword:""
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("privatetype", data.privatetype);
    data?.logo !==null ?  formData.append("logo", data?.logo[0] ) : undefined
    formData.append("privateAmbulanceagentName", data.privateAmbulanceagentName);
    data?.website !=="" ?  formData.append("website", data?.website ) : undefined
        formData.append("privateAmbulanceAdminName", data.privateAmbulanceAdminName);
    formData.append("privateAmbulanceAdminEmail", data.privateAmbulanceAdminEmail);
    formData.append("privateAmbulanceAdminPassword", data.privateAmbulanceAdminPassword);
    try{
     

      let data =  await PrivateAmbulanceAgentService.createPrivateAmbulanceAgent(formData); 
          if(data.status === 200){
          navigate("/admin/private-ambulance-agent");
          alert(data.message)
         }else{
           alert(data.message)
         }
         } catch (error) {
           alert(error?.response?.data?.message)
           console.error("Failed to upload", error);
         }
    };
  

  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <div>
        <div
          className="text-start mt-5 mb-2 ms-1"
          style={{ fontWeight: "800" }}
        >
          <Link to="/admin/dashboard">Dashboard</Link>&nbsp;&#8811;
          <Link to="/admin/private-ambulance-agent">Private Ambulance Agent</Link>&nbsp;&#8811; Add Private Ambulance Agent
          </div>
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title className="fw-bold fs-5 mt-2">
                  Add Private Ambulance Agent
                </Card.Title>
              </Card.Header>
              <div className="card-body mt-2">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">Ambulance Type</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="type">
                        <Form.Control as="select"
                         className= 'form-select' 
                      {...register("privatetype")}>
                          <option value="">Select  Ambulance Type</option>
                          <option value="partner">Partner</option>
                          <option value="non-partner">Non-Partner</option>
                        </Form.Control>
                        {errors.privatetype && (
                          <p className="text-danger">{errors.privatetype.message}</p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* privateAmbulanceagent Name  */}
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6"> Ambulance Agent Name</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="privateAmbulanceagentName">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter Private Ambulance Agent Name"
                            {...register("privateAmbulanceagentName")}
                          />
                        </InputGroup>
                        {errors.privateAmbulanceagentName && (
                          <p className="text-danger">
                            {errors.privateAmbulanceagentName.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Logo */}
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">Logo</Form.Label>
                    
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="logo">
                        <Form.Control type="file" {...register("logo")} />
                        {errors.logo && (
                          <p className="text-danger">{errors.logo.message}</p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Website */}
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">Website</Form.Label>
                   
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="website">
                        <InputGroup>
                          <Form.Control
                            type="url"
                            placeholder="Enter Website URL"
                            {...register("website")}
                          />
                        </InputGroup>
                        {errors.website && (
                          <p className="text-danger">
                            {errors.website.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* private Ambulance Admin Name */}
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">
                       Ambulance Admin Name
                      </Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="privateAmbulanceAdminName">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter  Ambulance Admin Name"
                            {...register("privateAmbulanceAdminName")}
                          />
                        </InputGroup>
                        {errors.privateAmbulanceAdminName && (
                          <p className="text-danger">
                            {errors.privateAmbulanceAdminName.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Private Ambulance Admin Email */}
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">
                       Ambulance Admin Email
                      </Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="privateAmbulanceAdminEmail">
                        <InputGroup>
                          <Form.Control
                            type="email"
                            placeholder="Enter  Ambulance Admin Email"
                            {...register("privateAmbulanceAdminEmail")}
                          />
                        </InputGroup>
                        {errors.privateAmbulanceAdminEmail && (
                          <p className="text-danger">
                            {errors.privateAmbulanceAdminEmail.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Private Ambulance Admin Password */}
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">
                       Ambulance Admin Password
                      </Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="privateAmbulanceAdminPassword">
                        <InputGroup>
                          <Form.Control
                        type={passwordShow ? "text" : "password"}
                            placeholder="Enter Ambulance Admin Password"
                            {...register("privateAmbulanceAdminPassword")}
                          />
                           <Button
                                    variant="outline-primary"
                  onClick={() => setPasswordShow(!passwordShow)}
                >
                  <i className={passwordShow ? "ri-eye-line" : "ri-eye-off-line"}></i>
                </Button>
                        </InputGroup>
                        {errors.privateAmbulanceAdminPassword && (
                          <p className="text-danger">
                            {errors.privateAmbulanceAdminPassword.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    </Row>
                    <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">
                      Confirm Ambulance Admin Password
                      </Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="adminconfirmPassword">
                        <InputGroup>
                          <Form.Control
  type={confirmPasswordShow ? "text" : "password"}
                              placeholder="Confirm Admin Password"
                            {...register("confirmPrivateAmbulanceAdminPassword")}
                          />
                           <Button
                                    variant="outline-primary"
                  onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                >
                  <i className={confirmPasswordShow ? "ri-eye-line" : "ri-eye-off-line"}></i>
                </Button>
                        </InputGroup>
                        {errors.confirmPrivateAmbulanceAdminPassword && (
                          <p className="text-danger">
                            {errors.confirmPrivateAmbulanceAdminPassword.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    </Row>
                

                  {/* Buttons */}
                  <div className="col-md-12 mt-4" align="center">
                    <button
                    type="button"
                      className="btn btn-outline-danger wd-100"
                      onClick={cancelHandler}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-info ms-2 wd-100"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AddPrivateAmbulanceAgent;
