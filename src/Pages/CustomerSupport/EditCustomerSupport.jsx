import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Form, InputGroup, Col, Row } from "react-bootstrap";
import Pageheader from "../../components/Common/PageHeader";
import LystingTypeService from "../../services/MasterData/listingtype.service";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {  nameregex, phoneNumberRegex } from "../../utils/Regex";
import CustomerSupportService from "../../services/MasterData/customersupport";

// Define validation schema with Yup
const schema = Yup.object().shape({
    name: Yup.string().required('Please enter name').matches(nameregex,"Please enter valid name"),
      phone: Yup.string().required('Please upload an phone').matches(phoneNumberRegex,'Please enter valid phone number'),
    employeeID: Yup.string().required('Please enter employeeID'),
  });
  

const EditCustomerSupport = () => {
  const {id} = useParams()
  const location = useLocation();
  const listing = location.state?.listing;
  const [data,setData] = useState(listing)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
  
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues:{
        name: data.name,
        phone:data.phone,
        employeeID:data.employeeID
    }
  });

  const onSubmit = async (data) => {
    // Handle form submission
    console.log(data);
    let item={
      name:data.name,phone:data.phone,employeeID:data.employeeID
    }


    try {
    let data = await CustomerSupportService.editCustomerSupport(item,id); // Assuming this service accepts FormData
      if(data.status === 200){
        navigate("/admin/customer-support");
       }else{
         alert(data.message)
       }
    } catch (error) {
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
          <Link to="/admin/customer-support"> Customer Support</Link>&nbsp;&#8811; Edit
          Customer Support        </div>
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title className="fw-bold fs-5 mt-2">
                  Edit  Customer Support
                </Card.Title>
              </Card.Header>
              <div className="card-body mt-4">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row md={9} className="d-flex justify-content-center mb-3">
                    <Col md={2} className="d-flex align-items-center">
                      <Form.Label className="fs-5">Name</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                   
                    <Col md={4}>
                      <Form.Group controlId="name">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            {...register("name")}
                          />
                        </InputGroup>
                        {errors.name && (
                          <p className="text-danger">{errors.name.message}</p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row md={9} className="d-flex justify-content-center mb-3">
                    <Col md={2} className="d-flex align-items-center">
                      <Form.Label className="fs-5">Phone</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                   
                    <Col md={4}>
                      <Form.Group controlId="phone">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter Phone number"
                            {...register("phone")}
                          />
                        </InputGroup>
                        {errors.phone && (
                          <p className="text-danger">{errors.phone.message}</p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row md={9} className="d-flex justify-content-center mb-3">
                    <Col md={2} className="d-flex  align-items-center">
                      <Form.Label className="fs-5">Employee ID</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                   
                    <Col md={4}>
                      <Form.Group controlId="employeeID">
                        <InputGroup>
                          <Form.Control
                        type="text"
                            rows={3}
                            placeholder="Enter employee ID"
                            {...register("employeeID")}
                          />
                        </InputGroup>
                        {errors.employeeID && (
                          <p className="text-danger">
                            {errors.employeeID.message}
                          </p>
                        )}
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

export default EditCustomerSupport;
