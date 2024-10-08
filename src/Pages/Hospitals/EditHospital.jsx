import React,{useState} from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Form, InputGroup, Col, Row,Button } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import HospitalService from "../../services/MasterData/hospital.service";
import { passwordregex, phoneNumberRegex } from "../../utils/Regex";

// Define validation schema with Yup
const schema = Yup.object().shape({
  type: Yup.string().required("Type is required"),
  hospitalName: Yup.string().required("Hospital Name is required"),
  logo: Yup.mixed().when('type', ([type], schema) => {
    return type === "emergency" ? schema.required('Logo is required') : schema.notRequired();
  }),
  website: Yup.string().when('type', ([type], schema) => {
    return type === "emergency" ? schema.required('Website is required') : schema.notRequired();
  }),
  location: Yup.string().when('type', ([type], schema) => {
    return type === "non-emergency" ? schema.required('Location is required') : schema.notRequired();
  }),
  phoneNumber1: Yup.string().when('type', ([type], schema) => {
    return type === "non-emergency" ? schema.required('Phone Number 1 is required').matches(phoneNumberRegex,"Please enter valid phoneNumber") : schema.notRequired();
  }),
  phoneNumber2: Yup.string(),
  hospitalAdminName: Yup.string().when('type', ([type], schema) => {
    return type === "emergency" ? schema.required("Hospital Admin Name is required") : schema.notRequired();
  }),
  hospitalAdminEmail: Yup.string().email("Must be a valid email").when('type', ([type], schema) => {
    return type === "emergency" ? schema.required("Hospital Admin Email is required") : schema.notRequired();
  }),
  hospitalAdminPassword: Yup.string().when('type', ([type], schema) => {
    return type === "emergency" ? schema.required("Hospital Admin Password is required").matches(passwordregex, "Password must include one capital letter and special characters") : schema.notRequired();
  }),
  adminconfirmPassword: Yup.string().oneOf([Yup.ref("hospitalAdminPassword"), null], "Passwords must match").when('type', ([type], schema) => {
    return type === "emergency" ? schema.required("Confirm Password is required") : schema.notRequired();
  }),
});
const EditHospital = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const {id} = useParams()
  const location = useLocation();
  const listing = location.state?.listing;
  const [data,setData] = useState(listing)
  const navigate = useNavigate();
  console.log(data)
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors ,
    watch
  } = useForm({
    defaultValues: {
      type: data?.type,
      hospitalName:data?.hospitalName  || undefined,
      logo: data?.logo  || undefined,
      website: data?.website  || undefined,
      location: data?.location  || undefined,
      phoneNumber1: data?.phoneNumber1  || undefined,
      phoneNumber2: data?.phoneNumber2 || undefined,
      hospitalAdminName: data?.hospitalAdminName  || undefined,
      hospitalAdminEmail: data?.hospitalAdminEmail  || undefined,
      hospitalAdminPassword: '',
      adminconfirmPassword:''
    },
    resolver: yupResolver(schema),
  });
  const selectedType = watch("type");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("type", data?.type);
    if(data?.logo){
    formData.append("logo", data?.logo[0]);
    } 
    data?.hospitalName? formData.append("hospitalName", data?.hospitalName) : undefined;
    data?.website? formData.append("website", data?.website) : undefined;
    data?.location?   formData.append("location", data?.location) : undefined;
    data?.phoneNumber1?  formData.append("phoneNumber1", data?.phoneNumber1) : undefined;
    data?.phoneNumber2? formData.append("phoneNumber2", data?.phoneNumber2): undefined;
    data?.hospitalAdminName? formData.append("hospitalAdminName", data?.hospitalAdminName): undefined;
    data?.hospitalAdminEmail? formData.append("hospitalAdminEmail", data?.hospitalAdminEmail): undefined;
    data?.hospitalAdminPassword? formData.append("hospitalAdminPassword", data?.hospitalAdminPassword): undefined;
    try{
      let data =  await HospitalService.editHospital(formData,id); 
          if(data.status === 200){
          navigate("/admin/hospitals");
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
          <Link to="/admin/hospitals">Hospitals</Link>&nbsp;&#8811; Edit Hospital
          </div>
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title className="fw-bold fs-5 mt-2">
                  Edit Hospital
                </Card.Title>
              </Card.Header>
              <div className="card-body mt-2">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">  Type</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="type">
                        <Form.Control as="select"
                         className= 'form-select' 
                         
                         onInput={selectChange}
                      {...register("type")}>
                          <option value="">Select Type</option>
                          <option value="emergency">Emergency</option>
                          <option value="non-emergency">Non-Emergency</option>
                        </Form.Control>
                        {errors.type && (
                          <p className="text-danger">{errors.type.message}</p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Hospital Name */}
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">Hospital Name</Form.Label>
                      
      <span style={{ color: "red", marginTop: "-15px" }}>*</span>
  
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="hospitalName">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter Hospital Name"
                            {...register("hospitalName")}
                          />
                        </InputGroup>
                        {errors.hospitalName && (
                          <p className="text-danger">
                            {errors.hospitalName.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Logo */}
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">Logo</Form.Label>
                      {selectedType === "emergency" && (
      <span style={{ color: "red", marginTop: "-15px" }}>*</span>
    )}
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
                      {selectedType === "emergency" && (
      <span style={{ color: "red", marginTop: "-15px" }}>*</span>
    )}
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

                  {/* Hospital Admin Name */}
              {selectedType === "emergency" ?( <> 
              <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">
                        Hospital Admin Name
                      </Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="hospitalAdminName">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter Admin Name"
                            {...register("hospitalAdminName")}
                          />
                        </InputGroup>
                        {errors.hospitalAdminName && (
                          <p className="text-danger">
                            {errors.hospitalAdminName.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Hospital Admin Email */}
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">
                        Hospital Admin Email
                      </Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="hospitalAdminEmail">
                        <InputGroup>
                          <Form.Control
                            type="email"
                            placeholder="Enter Admin Email"
                            {...register("hospitalAdminEmail")}
                          />
                        </InputGroup>
                        {errors.hospitalAdminEmail && (
                          <p className="text-danger">
                            {errors.hospitalAdminEmail.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Hospital Admin Password */}
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">
                        Hospital Admin Password
                      </Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="hospitalAdminPassword">
                        <InputGroup>
                          <Form.Control
                        type={passwordShow ? "text" : "password"}
                            placeholder="Enter Admin Password"
                            {...register("hospitalAdminPassword")}
                          />
                           <Button
                                    variant="outline-primary"
                  onClick={() => setPasswordShow(!passwordShow)}
                >
                  <i className={passwordShow ? "ri-eye-line" : "ri-eye-off-line"}></i>
                </Button>
                        </InputGroup>
                        {errors.hospitalAdminPassword && (
                          <p className="text-danger">
                            {errors.hospitalAdminPassword.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    </Row>
                    <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">
                      Confirm Hospital Admin  Password
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
                            {...register("adminconfirmPassword")}
                          />
                           <Button
                                    variant="outline-primary"
                  onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                >
                  <i className={confirmPasswordShow ? "ri-eye-line" : "ri-eye-off-line"}></i>
                </Button>
                        </InputGroup>
                        {errors.adminconfirmPassword && (
                          <p className="text-danger">
                            {errors.adminconfirmPassword.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    </Row> </>):""}
                    {selectedType === "non-emergency" && (
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

export default EditHospital;
