import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Form, InputGroup, Col, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// Define validation schema with Yup
const schema = Yup.object().shape({
    type: Yup.string().required("Type is required"),
    amenity: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Amenity is required"),
        price: Yup.number().required("Price is required").positive("Price must be a positive number")
      })
    ).when('type',([type],schema)=> {
     return type ==="" ?schema.required("Amenity is required") :schema.notRequired();
    }),
    vehiclenumber: Yup.string().required("Vehicle number is required"),
    insurancedate: Yup.date().required("Insurance date is required"),
    registrationCertificate: Yup.string().required("Registration certificate is required"),
    "0KMto5KMPRate": Yup.string().required("Rate for 0KM to 5KM is required"),
    "5KMto15KMRate": Yup.string().required("Rate for 5KM to 15KM is required"),
    "15KMto30KMRate": Yup.string().required("Rate for 15KM to 30KM is required"),
    "30KMPerKMRate": Yup.string().required("Rate for 30KM+ is required"),
  });
  

const AddAmbulance = () => {
  const [typeSelected, setTypeSelected] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors }, watch } = useForm({
    defaultValues: {
      type: "",
      amenity: [{ name: "", price: null }],
      vehiclenumber: "",
      insurancedate: null,
      registrationCertificate: null,
      "0KMto5KMPerKMRate": null,
      "5KMto15KMPerKMRate": null,
      "15KMto30KMPerKMRate": null,
      "30KMPerKMRate": null
    },
    resolver: yupResolver(schema)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "amenity"
  });

  const type = watch("type");

  const onSubmit = async (data) => {
    try {
      // Handle form submission logic
      const response = await LystingTypeService.createListingType(data); 
      if (response.status === 200) {
        navigate("/private-ambulance/ambulance");
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

  

  return (
    <div>
      <div className="text-start mt-5 mb-2 ms-1" style={{ fontWeight: "800" }}>
        <Link to="/admin/dashboard">Dashboard</Link>&nbsp;&#8811; 
        <Link to="/admin/ambulance">Ambulance</Link>&nbsp;&#8811;
        Add Ambulance
      </div>
      <Row>
        <Col xl={12}>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <Card.Title className="fw-bold fs-4 mt-2">Add Ambulance</Card.Title>
            </Card.Header>
            <div className="card-body">
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Type */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Type</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="type">
                      <InputGroup>
                        <Form.Control
                          as="select"
                          className="form-select"
                          {...register("type")}
                          onChange={(e) => setTypeSelected(e.target.value !== '')}
                        >
                          <option value="">Select Type</option>
                          <option value="oxygen">PTA</option>
                                <option value="wheelchair">BLS</option>
                                <option value="ventilator">ALS</option>
                        </Form.Control>
                      </InputGroup>
                      {errors.type && <p className="text-danger">{errors.type.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Amenities */}
                {typeSelected && (
                  <>
                    {fields.map((item, index) => (
                      <Row className="d-flex justify-content-center mb-3" key={item.id}>
                        <Col md={2} className="d-flex align-items-center mt-1">
                          <Form.Label className="fs-6">Amenity</Form.Label>
                          <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                        </Col>
                        <Col md={2}>
                          <Form.Group controlId={`amenity.${index}.name`}>
                            <InputGroup>
                              <Form.Control
                                as="select"
                                 className="form-select"
                                placeholder="Select Amenity"
                                {...register(`amenity.${index}.name`)}
                              >
                                <option value="">Select Amenity</option>
                                <option value="oxygen">Oxygen</option>
                                <option value="wheelchair">Wheelchair</option>
                                <option value="ventilator">Ventilator</option>
                              </Form.Control>
                            </InputGroup>
                            {errors.amenity?.[index]?.name && (
                              <p className="text-danger">{errors.amenity[index].name.message}</p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col md={2}>
                          <Form.Group controlId={`amenity.${index}.price`}>
                            <InputGroup>
                              <Form.Control
                                type="text"
                                placeholder="Enter Price"
                                {...register(`amenity.${index}.price`)}
                              />
                            </InputGroup>
                            {errors.amenity?.[index]?.price && (
                              <p className="text-danger">{errors.amenity[index].price.message}</p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col md={1} className="d-flex align-items-center">
                          {index > 0 ? (
                            <Button variant="danger" onClick={() => remove(index)}>
                              <i className="ri-delete-bin-line"></i> 
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              className="mb-3"
                              onClick={() => append({ name: "", price: null })}
                            >
                              <i className="ri-add-circle-line"></i>
                            </Button>
                          )}
                        </Col>
                      </Row>
                    ))}
                  </>
                )}

                {/* Vehicle Number */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Vehicle Number</Form.Label>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="vehiclenumber">
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="Enter Vehicle Number"
                          {...register("vehiclenumber")}
                          onInput={(e) => {
                            e.target.value = e?.target?.value?.replace(/[^0-9]/g, '').slice(0, 10);
                          }}
                        />
                      </InputGroup>
                      {errors.vehiclenumber && <p className="text-danger">{errors.vehiclenumber.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Insurance Date */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Insurance Date</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="insurancedate">
                      <InputGroup>
                        <Form.Control
                          type="date"
                          placeholder="Enter Insurance Date"
                          {...register("insurancedate")}
                        />
                      </InputGroup>
                      {errors.insurancedate && <p className="text-danger">{errors.insurancedate.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Registration Certificate */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Registration Certificate</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="registrationCertificate">
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="Enter Registration Certificate"
                          {...register("registrationCertificate")}
                        />
                      </InputGroup>
                      {errors.registrationCertificate && (
                        <p className="text-danger">{errors.registrationCertificate.message}</p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                {/* KM Rates */}
                {[
                  { id: "0KMto5KMPerKMRate", label: "0KM to 5KM Per KM Rate" },
                  { id: "5KMto15KMPerKMRate", label: "5KM to 15KM Per KM Rate" },
                  { id: "15KMto30KMPerKMRate", label: "15KM to 30KM Per KM Rate" },
                  { id: "30KMPerKMRate", label: "30KM+ Per KM Rate" }
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
                            type="string"
                            placeholder={`Enter ${label}`}
                            {...register(id)}
                          />
                        </InputGroup>
                        {errors[id] && (
                          <p className="text-danger">{errors[id].message}</p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                ))}

                {/* Buttons */}
                <div className="col-md-12 mt-4" align="center">
                  <Button variant="outline-danger" onClick={cancelHandler}>
                    Cancel
                  </Button>
                  <Button type="submit" className="btn btn-success ms-2">
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

export default AddAmbulance;
