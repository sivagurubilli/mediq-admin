import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {  Card, Form, InputGroup, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FirstAidService from "../../../services/MasterData/firstaid.service";
import FirstAidCategoryService from "../../../services/MasterData/firstaidcategory.service";

// Define validation schema with Yup
const schema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  licencenumber: Yup.string().required("licence number is required"),
  bloodgroup: Yup.string().required("Blood group is required"),
  phone: Yup.string().required("Phone Number is required"),

});

const EditDriver = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

    const onSubmit = async (formData) => {
      try{
        let data =  await FirstAidService.createfirstAid(formData); 
            if(data.status === 200){
            navigate("/admin/first-aid");
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
                      <Form.Label className="fs-6">Name</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="name">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter name"
                            {...register("name")}
                          >
                    
                         </Form.Control>

                        </InputGroup>
                        <div style={{ minHeight: "0.1rem" }}>
                          {errors.name && (
                            <p className="text-danger mb-0">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
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
                      <Form.Group controlId="licencenumber">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter Licence Number"
                            {...register("licencenumber")}
                          />
                        </InputGroup>
                        <div style={{ minHeight: "0.1rem" }}>
                          {errors.licencenumber && (
                            <p className="text-danger">
                              {errors.licencenumber.message}
                            </p>
                          )}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row md={9} className="d-flex justify-content-center mb-3">
                    <Col md={2} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6"> Blood Group</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="bloodgroup">
                        <InputGroup>
                          <Form.Control
                            type="url"
                            placeholder="Enter blood group"
                            {...register("bloodgroup")}
                          />
                        </InputGroup>
                        <div style={{ minHeight: "0.1rem" }}>
                          {errors.bloodgroup && (
                            <p className="text-danger">
                              {errors.bloodgroup.message}
                            </p>
                          )}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row md={9} className="d-flex justify-content-center mb-3">
                    <Col md={2} className="d-flex  align-items-center mt-1">
                      <Form.Label className="fs-6">Phone</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="phone">
                        <InputGroup>
                          <Form.Control
                            as="text"
                            placeholder="Enter Phone Number"
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

export default EditDriver;
