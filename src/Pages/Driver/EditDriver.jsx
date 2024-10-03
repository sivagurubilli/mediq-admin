import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {  Card, Form, InputGroup, Col, Row } from "react-bootstrap";
import { Link, useNavigate,useLocation,useParams } from "react-router-dom";
import DriverService from "../../services/MasterData/driver.service";
import { phoneNumberRegex } from "../../utils/Regex";

// Define validation schema with Yup
const schema = Yup.object().shape({
  drivername: Yup.string().required("Driver name is required"),
  logo: Yup.mixed().required("Logo is required"),
  driverlicence: Yup.string().required("licence number is required"),
  dateofbirth:Yup.string().required("Date of birth is required"),
  phonenumber: Yup.string().required("phone Number is required").matches(phoneNumberRegex,"Please enter valid phone number"),
  gender: Yup.string().required("gender is required"),

});

const AdminEditDriver = () => {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state?.listing;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:{
      drivername: data.drivername,
      logo: data.logo,
      driverlicence: data.driverlicence,
      dateofbirth: data.dateofbirth,
      phonenumber: data.phonenumber,
      gender: data.gender,
  },
    resolver: yupResolver(schema),
  });

    const onSubmit = async (formData) => {
      try{
        let data =  await DriverService.editDrivers(formData,id); 
            if(data.status === 200){
              alert(data.message)
            navigate("/admin/drivers");
           }else{
             alert(data.message)
           }
           } catch (error) {
             alert(error?.response?.data?.message)
             console.error("Failed to upload", error);
           }
      };
    



  const cancelhandler = () => {
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
          <Link to="/admin/driver">Driver</Link>
          &nbsp;&#8811;
           Edit Driver
        </div>
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title className="fw-bold fs-4 mt-2">
                  Edit Driver
                </Card.Title>
              </Card.Header>
              <div className="card-body">
              <div className="card-body mt-4">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row md={9} className="d-flex justify-content-center mb-3">
                    <Col md={2} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">Driver Name</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="drivername">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter drivername"
                            {...register("drivername")}
                          >
                    
                         </Form.Control>

                        </InputGroup>
                        <div style={{ minHeight: "0.1rem" }}>
                          {errors.drivername && (
                            <p classdrivername="text-danger mb-0">
                              {errors.drivername.message}
                            </p>
                          )}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={2} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6"> Date Of Birth</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="dateofbirth">
                        <Form.Control type="date"   placeholder="Enter  Date Of Birth " {...register("dateofbirth")} />
                        {errors.dateofbirth && (
                          <p className="text-danger">{errors.dateofbirth.message}</p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={2} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">Gender</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="gender">
                      <Form.Control as="select" className="form-select"  placeholder="Enter gender " {...register("gender")} >
                        <option value="">Select Type</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Form.Control>
                        
                        {errors.gender && (
                          <p className="text-danger">{errors.gender.message}</p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={2} className="d-flex align-items-center mt-1">
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
                  <Row md={9} className="d-flex justify-content-center mb-3">
                    <Col md={2} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6"> Licence Number</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="driverlicence">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter Licence Number"
                            {...register("driverlicence")}
                          />
                        </InputGroup>
                        <div style={{ minHeight: "0.1rem" }}>
                          {errors.driverlicence && (
                            <p className="text-danger">
                              {errors.driverlicence.message}
                            </p>
                          )}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

               

                  
                  <Row md={9} className="d-flex justify-content-center mb-3">
                    <Col md={2} className="d-flex  align-items-center mt-1">
                      <Form.Label className="fs-6">Phone Number</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="phonenumber">
                        <InputGroup>
                          <Form.Control
                            type="text"
                         
                            placeholder="Enter phone Number"
                            {...register("phonenumber")}
                          />
                        </InputGroup>
                        <div style={{ minHeight: "0.1rem" }}>
                          {errors.phonenumber && (
                            <p className="text-danger">
                              {errors.phonenumber.message}
                            </p>
                          )}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="col-md-10 mt-4" align="center">
                    <button
                                        type="button"

                      className="btn btn-outline-danger wd-100"
                      onClick={cancelhandler}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success ms-2 wd-100"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AdminEditDriver;
