import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Form, InputGroup, Col, Row } from "react-bootstrap";
import LystingTypeService from "../../../services/MasterData/listingtype.service";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

// Define validation schema with Yup
const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone Number is required"),
});

const EditBookingManager= () => {
    const {id} = useParams()
    const location = useLocation();
    const listing = location.state?.listing;
    const [data,setData] = useState(listing)
    console.log(data,"ddddd")
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
   
    }
  });

  const onSubmit = async (data) => {
 
    try {
     let data =  await LystingTypeService.createListingType(); // Assuming this service accepts FormData
    if(data.status === 200){
     navigate("/admin/listing-types");
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
          <Link to="/admin/booking-manager">Booking Manager</Link>&nbsp;&#8811; Edit
          Booking Manager
        </div>
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title className="fw-bold fs-5 mt-2">
                  Edit Booking Manager
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
                            placeholder="Enter Booking Manager name"
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
                      <Form.Label className="fs-6">Phone Number</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="phone">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter Booking Manager Number"
                            {...register("phone")}
                          />
                        </InputGroup>
                        <div style={{ minHeight: "0.1rem" }}>
                          {errors.phone && (
                            <p className="text-danger mb-0">
                              {errors.phone.message}
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
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default EditBookingManager;
