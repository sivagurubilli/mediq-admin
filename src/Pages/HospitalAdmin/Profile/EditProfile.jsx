import React,{useState} from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Form, InputGroup, Col, Row,Button } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import HospitalService from "../../../services/MasterData/hospital.service";
import { passwordregex } from "../../../utils/Regex";

// Define validation schema with Yup
const schema = Yup.object().shape({
  hospitalName: Yup.string().required("Hospital Name is required"),
  logo: Yup.mixed().required("Logo is required"),
  website: Yup.string()
    .url("Website must be a valid URL")
    .required("Website is required"),
  hospitalAdminName: Yup.string().required("Hospital Admin Name is required"),
  hospitalAdminEmail: Yup.string()
    .email("Must be a valid email")
    .required("Hospital Admin Email is required"),
  hospitalAdminPassword: Yup.string()
   
    .required("Hospital Admin Password is required").matches(
      passwordregex, "Password must be at least one Capital letter and special characters"),
    adminconfirmPassword: Yup.string().oneOf([Yup.ref("hospitalAdminPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const EditProfile = ({profileData,onCancel}) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [data,setData] = useState(profileData)
  console.log(data)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: data?.type,
      hospitalName:data?.hospitalName,
      logo: data?.logo,
      website: data?.website,
      hospitalAdminName: data?.hospitalAdminName,
      hospitalAdminEmail: data?.hospitalAdminEmail,
      hospitalAdminPassword: '',
      adminconfirmPassword:''
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data1) => {
    const formData = new FormData();
    formData.append("type", data.type);
    formData.append("logo", data1.logo[0]); 
    formData.append("hospitalName", data1.hospitalName);
    formData.append("website", data1.website);
    formData.append("hospitalAdminName", data1.hospitalAdminName);
    formData.append("hospitalAdminEmail", data1.hospitalAdminEmail);
    formData.append("hospitalAdminPassword", data1.hospitalAdminPassword);
    try{
      let datares =  await HospitalService.editHospital(formData,data._id); 
          if(datares.status === 200){
            localStorage.setItem("hospitalDetails",JSON.stringify(datares?.updatedData))
          alert(datares.message)
          onCancel()
                 }else{
           alert(datares.message )
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
          
          </div>
        <Row>
          <Col xl={12}>
            <Card>
            
              <div className="card-body mt-2">
                <Form onSubmit={handleSubmit(onSubmit)}>
                
                  {/* Hospital Name */}
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">Hospital Name</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
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
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
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
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
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

export default EditProfile
