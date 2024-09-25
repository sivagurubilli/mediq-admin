import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Form, InputGroup, Col, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AmenitiesService from "../../services/MasterData/amenities.service";
import AmbulenceTypeService from "../../services/MasterData/ambulencetype.service";

// Define validation schema with Yup
const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  image: Yup.mixed().required("Image is required"),
  description: Yup.string().required("Description is required"),
  km0to5Price: Yup.string().required("Rate for 0KM to 5KM is required"),
  km5to15Price: Yup.string().required("Rate for 5KM to 15KM is required"),
  km15to30Price: Yup.string().required("Rate for 15KM to 30KM is required"),
  km30PlusPerKmPrice: Yup.string().required("Rate for 30KM+ is required"),
});

const AddAmbulanceTypes = () => {
  const navigate = useNavigate();
  const [amenities, setAmenities] = useState([]);
  const [amenityPrices, setAmenityPrices] = useState({});

  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: "",
      image: null,
      description: "",
      km0to5Price: null,
      km5to15Price: null,
      km15to30Price: null,
      km30PlusPerKmPrice: null,
      amenity: [{ _id: "", name: "", price: null }],
    },
    resolver: yupResolver(schema)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "amenity"
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
  
    formData.append("name", data.name);
    formData.append("image", data.image[0]); 
    formData.append("description", data.description);
    formData.append("km0to5Price", data.km0to5Price);
    formData.append("km5to15Price", data.km5to15Price);
    formData.append("km15to30Price", data.km15to30Price);
    formData.append("km30PlusPerKmPrice", data.km30PlusPerKmPrice);
    formData.append("amenities", JSON.stringify(data.amenity)); // Convert to JSON string

    try {
      const response = await AmbulenceTypeService.createAmbulenceTypes(formData); 
      if (response.status === 200) {
        navigate("/admin/ambulance-types");
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert(error?.response?.data?.message);
      console.error("Failed to upload", error);
    }
  };

  const cancelHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    getAmenities();
  }, []);

  const getAmenities = async () => {
    try {
      const response = await AmenitiesService.getAmenities();  
      const amenitiesData = response?.data;
      setAmenities(amenitiesData);
      const pricesMapping = {};
      amenitiesData.forEach(amenity => {
        pricesMapping[amenity.name] = amenity.price;
      });
      setAmenityPrices(pricesMapping);
    } catch (error) {
      alert("Failed to fetch data");
      console.error("Failed to fetch data", error);
    }
  };

  const handleAmenityChange = (index) => (event) => {
    const selectedAmenity = event.target.value;
    const price = amenityPrices[selectedAmenity] || "";
    setValue(`amenity.${index}.name`, selectedAmenity);
    setValue(`amenity.${index}.price`, price);
    // Optionally set an ID based on selected amenity
    const selectedAmenityData = amenities.find(amenity => amenity.name === selectedAmenity);
    setValue(`amenity.${index}._id`, selectedAmenityData?._id || ""); // Assuming each amenity has an `id` field
  };

  return (
    <div>
      <div className="text-start mt-5 mb-2 ms-1" style={{ fontWeight: "800" }}>
        <Link to="/admin/dashboard">Dashboard</Link>&nbsp;&#8811; 
        <Link to="/admin/ambulance">Ambulance Types</Link>&nbsp;&#8811;
        Add Ambulance Types
      </div>
      <Row>
        <Col xl={12}>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <Card.Title className="fw-bold fs-4 mt-2">Add Ambulance Types</Card.Title>
            </Card.Header>
            <div className="card-body">
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Name</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="name">
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="Enter name"
                          {...register("name")}
                        />
                      </InputGroup>
                      {errors.name && <p className="text-danger">{errors.name.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Image */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Image</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="image">
                      <InputGroup>
                        <Form.Control
                          type="file"
                          placeholder="Choose image"
                          {...register("image")}
                        />
                      </InputGroup>
                      {errors.image && <p className="text-danger">{errors.image.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Description */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Description</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="description">
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="Enter description"
                          {...register("description")}
                        />
                      </InputGroup>
                      {errors.description && <p className="text-danger">{errors.description.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                {/* KM Rates */}
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

                {/* Amenities */}
                {fields.map((item, index) => (
                  <Row className="d-flex justify-content-center mb-3" key={item.id}>
                    <Col md={3} className="d-flex align-items-center mt-1" style={{ marginLeft: "100px" }}>
                      <Form.Label className="fs-6">Add Amenity</Form.Label>
                    </Col>
                    <Col md={2} className="mt-1">
                      <Form.Group controlId={`amenity.${index}.name`}>
                        <InputGroup>
                          <Form.Control
                            as="select"
                            className="form-select"
                            placeholder="Select Amenity"
                            {...register(`amenity.${index}.name`)}
                            onChange={handleAmenityChange(index)}
                          >
                            <option value="">Select Amenity</option>
                            {amenities?.map((el) => (
                              <option key={el.name} value={el.name}>{el.name}</option>
                            ))}
                          </Form.Control>
                        </InputGroup>
                        {errors.amenity?.[index]?.name && (
                          <p className="text-danger">{errors.amenity[index].name.message}</p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={2} className="mt-1">
                      <Form.Group controlId={`amenity.${index}.price`}>
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter Price"
                            {...register(`amenity.${index}.price`)}
                            readOnly
                          />
                        </InputGroup>
                        {errors.amenity?.[index]?.price && (
                          <p className="text-danger">{errors.amenity[index].price.message}</p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={1} className="d-flex align-items-center mt-1">
                      {index > 0 ? (
                        <Button variant="danger" className="btn-sm" onClick={() => remove(index)}>
                          <i className="ri-delete-bin-line"></i> 
                        </Button>
                      ) : (
                        <Button
                          variant="info"
                          className="btn-sm"
                          onClick={() => append({ id: "", name: "", price: null })}
                        >
                          <i className="ri-add-circle-line"></i>
                        </Button>
                      )}
                    </Col>
                  </Row>
                ))}

                {/* Buttons */}
                <div className="col-md-12 mt-4" align="center">
                  <Button type="button" variant="outline-danger" onClick={cancelHandler}>
                    Cancel
                  </Button>
                  <Button type="submit" className="btn btn-info ms-2">
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddAmbulanceTypes;
