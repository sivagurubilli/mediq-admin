import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Form, InputGroup, Col, Row } from "react-bootstrap";
import Pageheader from "../../components/Common/PageHeader";
import LystingTypeService from "../../services/MasterData/listingtype.service";
import { Link, useNavigate } from "react-router-dom";
import AmenitiesService from "../../services/MasterData/amenities.service";

// Define validation schema with Yup
const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  image: Yup.mixed().required("Image is required"),
  km0to5Price: Yup.string().required("Rate for 0KM to 5KM is required"),
  km5to15Price: Yup.string().required("Rate for 5KM to 15KM is required"),
  km15to30Price: Yup.string().required("Rate for 15KM to 30KM is required"),
  km30PlusPerKmPrice: Yup.string().required("Rate for 30KM+ is required"),
    description:Yup.string().required("Description is required")
});

const AddAmenities = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues:{
      name: "",
      image:null,
      km0to5Price: null,
      km5to15Price: null,
      km15to30Price: null,
      km30PlusPerKmPrice: null,
        description:""
    }
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("icon", data.image[0]);  
    formData.append("description", data.description);
    formData.append("km0to5Price", data.km0to5Price);
    formData.append("km5to15Price", data.km5to15Price);
    formData.append("km15to30Price", data.km15to30Price);
    formData.append("km30PlusPerKmPrice", data.km30PlusPerKmPrice);
    try {
     let data =  await AmenitiesService.createAmenities(formData); 
    if(data.status === 200){
      alert(data.message)
     navigate("/admin/amenities");
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
          <Link to="/admin/amenities">Ambulance Amenities</Link>&nbsp;&#8811; Add Ambulance
          Amenities
        </div>
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title className="fw-bold fs-5 mt-2">
                  Add Ambulance Amenities
                </Card.Title>
              </Card.Header>
              <div className="card-body mt-4">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row md={9} className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
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
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">Icon</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="image">
                        <InputGroup>
                          <Form.Control
                            type="file"
                            placeholder="Choose Icon"
                            {...register("image")}
                          />
                        </InputGroup>
                        <div style={{ minHeight: "0.1rem" }}>
                          {errors.image && (
                            <p className="text-danger">
                              {errors.image.message}
                            </p>
                          )}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  {[
                  { id: "km0to5Price", label: "0KM to 5KM Price" },
                  { id: "km5to15Price", label: "5KM to 15KM Price" },
                  { id: "km15to30Price", label: "15KM to 30KM Price" },
                  { id: "km30PlusPerKmPrice", label: "30KM+ Per KM Price" }
                ].map(({ id, label }) => (
                  <Row className="d-flex justify-content-center mb-3" key={id}>
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">{label}</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId={id}>
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder={`Enter ${label}`}
                            {...register(id)}
                          />
                        </InputGroup>
                        {errors[id] && <p className="text-danger">{errors[id].message}</p>}
                      </Form.Group>
                    </Col>
                  </Row>
                ))}

                  <Row md={9} className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex  align-items-center mt-1">
                      <Form.Label className="fs-6">Description</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="description">
                        <InputGroup>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter description"
                            {...register("description")}
                          />
                        </InputGroup>
                        <div style={{ minHeight: "0.1rem" }}>
                          {errors.description && (
                            <p className="text-danger">
                              {errors.description.message}
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

export default AddAmenities;
