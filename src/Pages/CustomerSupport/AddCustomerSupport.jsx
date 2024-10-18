import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Form, InputGroup, Col, Row } from "react-bootstrap";
import Pageheader from "../../components/Common/PageHeader";
import { Link, useNavigate } from "react-router-dom";
import { employeeIDRegex, nameregex, phoneNumberRegex } from "../../utils/Regex";
import CustomerSupportService from "../../services/MasterData/customersupport";

// Define validation schema with Yup
const schema = Yup.object().shape({
  name: Yup.string().required('Please enter name').matches(nameregex,"Please enter valid name"),
	phone: Yup.string().required('Please upload an phone').matches(phoneNumberRegex,'Please enter valid phone number'),
  employeeID: Yup.string().required('Please enter employeeID'),
});

const AddCustomerSupport = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues:{
      name: "",
      phone:null,
      employeeID:""
    }
  });

  const onSubmit = async (data) => {
    let item={
      name:data.name,phone:data.phone,employeeID:data.employeeID
    }

    try {
     let data =  await CustomerSupportService.createCustomerSupport(item); // Assuming this service accepts FormData
    if(data.status === 200){
     navigate("/admin/customer-support");
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
          <Link to="/admin/customer-support">Customer Support</Link>&nbsp;&#8811; Add
          Customer Support
        </div>
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title className="fw-bold fs-5 mt-2">
                  Add  Customer Support
                </Card.Title>
              </Card.Header>
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
                            placeholder="Enter your name"
                            {...register("name")}
                          />
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
                      <Form.Label className="fs-6">Phone</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="phone">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Choose phone number"
                            {...register("phone")}
                          />
                        </InputGroup>
                        <div style={{ minHeight: "0.1rem" }}>
                          {errors.phone && (
                            <p className="text-danger">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row md={9} className="d-flex justify-content-center mb-3">
                    <Col md={2} className="d-flex  align-items-center mt-1">
                      <Form.Label className="fs-6">Employee ID</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="employee ID">
                        <InputGroup>
                          <Form.Control
                        type="text"
                            placeholder="Enter employeeID"
                            {...register("employeeID")}
                          />
                        </InputGroup>
                        <div style={{ minHeight: "0.1rem" }}>
                          {errors.employeeID && (
                            <p className="text-danger">
                              {errors.employeeID.message}
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

export default AddCustomerSupport;
