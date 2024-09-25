import React,{useState} from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Form, InputGroup, Col, Row,Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import HospitalService from "../../services/MasterData/hospital.service";
import BookingManagerService from "../../services/MasterData/bookingmanager.service";

// Define validation schema with Yup
const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone Number is required"),
  phone2: Yup.string(),
  addharcard: Yup.string().required("aadhar number is required"),
  address: Yup.string().required("Address is required"),
  employeeID: Yup.string().required("employeeID is required"),

 

});

const AddBookingManagers = () => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name:"", phone:"", phone2:"", addharcard:"", employeeID:"", address:""

      
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data1) => {
   

    try{
     

      let data =  await BookingManagerService.createBookingManagers(data1); 
          if(data.status === 200){
          navigate("/admin/booking-managers");
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
          <Link to="/admin/booking-managers">Booking Manager</Link>&nbsp;&#8811; Add Booking Manager
          </div>
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title className="fw-bold fs-5 mt-2">
                  Add Booking Manager
                </Card.Title>
              </Card.Header>
              <div className="card-body mt-2">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">Name</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="name">
                        <Form.Control type="text"
                           placeholder="Enter  name"
                      {...register("name")}>
                         
                        </Form.Control>
                        {errors.name && (
                          <p className="text-danger">{errors.name.message}</p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Phone Name */}
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6"> Phone</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="hospitalName">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter Phone Number"
                            {...register("phone")}
                          />
                        </InputGroup>
                        {errors.phone && (
                          <p className="text-danger">
                            {errors.phone.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6"> Phone2</Form.Label>
                  
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="phone2">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter Phone Number2"
                            {...register("phone2")}
                          />
                        </InputGroup>
                        {errors.phone2 && (
                          <p className="text-danger">
                            {errors.phone2.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">Aadhaar Number</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="addharcard">
                        <Form.Control type="string"   placeholder="Enter Aadhaar number" {...register("addharcard")} />
                        {errors.addharcard && (
                          <p className="text-danger">{errors.addharcard.message}</p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">Employee ID</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="employeeID">
                        <Form.Control type="string"   placeholder="Enter employeeID " {...register("employeeID")} />
                        {errors.employeeID && (
                          <p className="text-danger">{errors.employeeID.message}</p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">Address</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="address">
                        <InputGroup>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Enter  Adress"
                            {...register("address")}
                          />
                        </InputGroup>
                        {errors.address && (
                          <p className="text-danger">
                            {errors.address.message}
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

export default AddBookingManagers;
