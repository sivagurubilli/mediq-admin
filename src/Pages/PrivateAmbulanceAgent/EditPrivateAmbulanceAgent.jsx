import React,{useState} from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Form, InputGroup, Col, Row,Button } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PrivateAmbulanceAgentService from "../../services/MasterData/privateAmbulanceAgent.service";
import { passwordregex, phoneNumberRegex } from "../../utils/Regex";

// Define validation schema with Yup
const schema = Yup.object().shape({
  privatetype: Yup.string().required("Type is required"),
  privateAmbulanceagentName: Yup.string().required("Agent Name is required"),
  logo: Yup.mixed().notRequired(),
  website: Yup.string(),
  location: Yup.string().when('privatetype', ([privatetype], schema) => {
    return privatetype === "non-partner" ? schema.required('Location is required') : schema.notRequired();
  }),
  phoneNumber1: Yup.string().when('privatetype', ([privatetype], schema) => {
    return privatetype === "non-partner" ? schema.required('Phone Number 1 is required').matches(phoneNumberRegex,"Please enter valid phoneNumber") : schema.notRequired();
  }),
  phoneNumber2: Yup.string(),
  privateAmbulanceAdminName: Yup.string().when('privatetype', ([privatetype], schema) => {
    return privatetype === "partner" ? schema.required("Private Ambulance Admin Name is required") : schema.notRequired();
  }),
  privateAmbulanceAdminEmail: Yup.string().when('privatetype', ([privatetype], schema) => {
    return privatetype === "partner" ? schema.required("Private Ambulance Admin Email is required") : schema.notRequired();
  }),
  privateAmbulanceAdminPassword: Yup.string().when('privatetype', ([privatetype], schema) => {
    return privatetype === "partner" ? schema.required("Ambulance Admin Password is required").matches(
    passwordregex, "Password must be at least one Capital letter and special characters") : schema.notRequired()
  }),
  confirmPrivateAmbulanceAdminPassword: Yup.string().oneOf([Yup.ref("privateAmbulanceAdminPassword"), null], "Passwords must match").when('privatetype', ([privatetype], schema) => {
    return privatetype === "partner" ? schema.required("Confirm Password is required") : schema.notRequired();
  }),

});

const EditPrivateAmbulanceAgent = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const {id} = useParams()
  const location = useLocation();
  const listing = location.state?.listing;
  const [data,setData] = useState(listing)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch
  } = useForm({
    defaultValues: {
        privatetype :data?.privatetype,
				privateAmbulanceagentName:data?.privateAmbulanceagentName,
                logo: null || undefined,
				website:data?.website || undefined,
				privateAmbulanceAdminName:data?.privateAmbulanceAdminName,
        location: data?.location  || undefined,
        phoneNumber1: data?.phoneNumber1  || undefined,
        phoneNumber2: data?.phoneNumber2 || undefined,
				privateAmbulanceAdminEmail:data?.privateAmbulanceAdminEmail,
				privateAmbulanceAdminPassword:"",
                confirmPrivateAmbulanceAdminPassword:""
    },
    resolver: yupResolver(schema),
  });
  const selectedType = watch("privatetype");
  console.log(data)

  const onSubmit = async (data) => {
    const formData = new FormData();
    data?.privatetype ? formData.append("privatetype", data.privatetype): undefined;
    data?.logo !==null ?  formData.append("logo", data?.logo[0] ) : undefined
    data?.privateAmbulanceagentName !=="" ?  formData.append("privateAmbulanceagentName", data.privateAmbulanceagentName) :undefined;
    data?.website ?  formData.append("website", data?.website ) : undefined;
    data?.location?   formData.append("location", data?.location) : undefined;
    data?.phoneNumber1?  formData.append("phoneNumber1", data?.phoneNumber1) : undefined;
    data?.phoneNumber2? formData.append("phoneNumber2", data?.phoneNumber2): undefined;
      data?.privateAmbulanceAdminName ?  formData.append("privateAmbulanceAdminName", data.privateAmbulanceAdminName) : undefined;
      data?.privateAmbulanceAdminName ? formData.append("privateAmbulanceAdminEmail", data.privateAmbulanceAdminEmail)  : undefined;
      data?.privateAmbulanceAdminPassword ? formData.append("privateAmbulanceAdminPassword", data.privateAmbulanceAdminPassword) : undefined;
    try{
     

      let data =  await PrivateAmbulanceAgentService.editPrivateAmbulanceAgent(formData,id); 
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

  const selectChange =()=>{
    clearErrors()
  }

  return (
    <>
      <div>
        <div
          className="text-start mt-5 mb-2 ms-1"
          style={{ fontWeight: "800" }}
        >
          <Link to="/admin/dashboard">Dashboard</Link>&nbsp;&#8811;
          <Link to="/admin/private-ambulance-agent">Private Ambulance Agent</Link>&nbsp;&#8811; Edit Private Ambulance Agent
          </div>
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title className="fw-bold fs-5 mt-2">
                  Edit Private Ambulance Agent
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
                      <Form.Group controlId="privatetype">
                        <Form.Control as="select"
                         className= 'form-select' 
                         onInput={selectChange}
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
                  {selectedType === "non-partner" && (
          <>
            <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">
                        Location
                      </Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="location">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter Location"
                            {...register("location")}
                          />
                        </InputGroup>
                        {errors.location && (
                          <p className="text-danger">
                            {errors.location.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">
                        Phone Number 1
                      </Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="phoneNumber1">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter phoneNumber1"
                            {...register("phoneNumber1")}
                          />
                        </InputGroup>
                        {errors.phoneNumber1 && (
                          <p className="text-danger">
                            {errors.phoneNumber1.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">
                        Phone Number 2
                      </Form.Label>
                     
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="phoneNumber2">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter phoneNumber2"
                            {...register("phoneNumber2")}
                          />
                        </InputGroup>
                        {errors.phoneNumber2 && (
                          <p className="text-danger">
                            {errors.phoneNumber2.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>


       
          </>
        )}
                  {/* private Ambulance Admin Name */}
                  {selectedType !== "non-partner" ?( <>    <Row className="d-flex justify-content-center mb-3">
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
                    </Row> </> ):""}

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

export default  EditPrivateAmbulanceAgent;
