import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Form, InputGroup, Col, Row, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import AmenitiesService from "../../services/MasterData/amenities.service";
import AmbulenceTypeService from "../../services/MasterData/ambulencetype.service";

// Validation schema
const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  image: Yup.mixed().required("Image is required"),
  description: Yup.string().required("Description is required"),
  km0to5Price: Yup.string().required("Rate for 0KM to 5KM is required"),
  km5to15Price: Yup.string().required("Rate for 5KM to 15KM is required"),
  km15to30Price: Yup.string().required("Rate for 15KM to 30KM is required"),
  km30PlusPerKmPrice: Yup.string().required("Rate for 30KM+ is required"),
  amenities: Yup.array()
    .of(
      Yup.object().shape({
        _id: Yup.string(),
        name: Yup.string(),
        price: Yup.string(),
      })
    )
    .nullable()
    .notRequired(),
});

const EditAmbulanceTypes = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const listing = location.state?.listing;

  const [amenities, setAmenities] = useState([]);
  const [amenityPrices, setAmenityPrices] = useState({});
  const [data, setData] = useState({
    name: listing.name || "",
    image: listing.image || null,
    description: listing.description || "",
    km0to5Price: listing.km0to5Price || "",
    km5to15Price: listing.km5to15Price || "",
    km15to30Price: listing.km15to30Price || "",
    km30PlusPerKmPrice: listing.km30PlusPerKmPrice || "",
    amenities: listing?.amenities?.map(amenity => ({
      _id: amenity._id ||"",
      name: amenity.name||"",
      price: amenity.price||"",
    })) ||[{ _id: "", name: "", price: null }],
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: data,
  });

  useEffect(() => {
    getAmenities();
  }, []);

  const getAmenities = async () => {
    try {
      const response = await AmenitiesService.getAmenities();
      const amenitiesData = response.data;
      setAmenities(amenitiesData);
      const pricesMapping = {};
      amenitiesData.forEach(amenity => {
        pricesMapping[amenity.name] = amenity.price;
      });
      setAmenityPrices(pricesMapping);
    } catch (error) {
      alert("Failed to fetch amenities");
      console.error(error);
    }
  };

  const handleAmenityChange = (event, index) => {
    const selectedAmenity = event.target.value;
    const selectedPrice = amenityPrices[selectedAmenity] || "";
    const selectedAmenityData = amenities.find(amenity => amenity.name === selectedAmenity);
    
    setData(prevData => {
      const updatedAmenities = [...prevData.amenities];
      updatedAmenities[index] = { _id: selectedAmenityData?._id, name: selectedAmenity, price: selectedPrice };
      return { ...prevData, amenities: updatedAmenities };
    });
  };

  const onSubmit = async (formData) => {
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("image", formData.image[0]);
    submitData.append("description", formData.description);
    submitData.append("km0to5Price", formData.km0to5Price);
    submitData.append("km5to15Price", formData.km5to15Price);
    submitData.append("km15to30Price", formData.km15to30Price);
    submitData.append("km30PlusPerKmPrice", formData.km30PlusPerKmPrice);
    submitData.append("amenities", JSON.stringify(data.amenities));

    try {
      const response = await AmbulenceTypeService.editAmbulenceTypes(submitData, id);
      if (response.status === 200) {
        alert(response.message);
        navigate("/admin/ambulance-types");
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to update");
      console.error("Failed to update", error);
    }
  };

  const cancelHandler = () => {
    navigate(-1);
  };

  const addAmenity = () => {
    setData(prevData => ({
      ...prevData,
      amenities: [...prevData.amenities, { name: "", price: "" }]
    }));
  };

  const deleteAmenity = (index) => {
    setData(prevData => {
      const updatedAmenities = prevData.amenities.filter((_, i) => i !== index);
      return { ...prevData, amenities: updatedAmenities };
    });
  };

  return (
    <div>
      <div className="text-start mt-5 mb-2 ms-1" style={{ fontWeight: "800" }}>
        <Link to="/admin/dashboard">Dashboard</Link>&nbsp;&#8811; 
        <Link to="/admin/ambulance">Ambulance Types</Link>&nbsp;&#8811;
        Edit Ambulance Types
      </div>
      <Row>
        <Col xl={12}>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <Card.Title className="fw-bold fs-4 mt-2">Edit Ambulance Types</Card.Title>
            </Card.Header>
            <div className="card-body">
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Form Fields */}
                {[
                  { id: "name", label: "Name", type: "text" },
                  { id: "image", label: "Image", type: "file" },
                  { id: "description", label: "Description", type: "text" },
                  ...[
                    { id: "km0to5Price", label: "0KM to 5KM Price" },
                    { id: "km5to15Price", label: "5KM to 15KM Price" },
                    { id: "km15to30Price", label: "15KM to 30KM Price" },
                    { id: "km30PlusPerKmPrice", label: "30KM+ Per KM Price" },
                  ],
                ].map(({ id, label, type }) => (
                  <Row className="d-flex justify-content-center mb-3" key={id}>
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">{label}</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId={id}>
                        <InputGroup>
                          <Form.Control type={type} placeholder={`Enter ${label}`} {...register(id)} />
                        </InputGroup>
                        {errors[id] && <p className="text-danger">{errors[id].message}</p>}
                      </Form.Group>
                    </Col>
                  </Row>
                ))}

                {/* Amenities Field */}
                {data?.amenities?.map((item, index) => (
                  <Row className="d-flex justify-content-center mb-3" key={index}>
                    <Col md={3} className="d-flex align-items-center mt-1" style={{ marginLeft: "80px" }}>
                      <Form.Label className="fs-6">Amenity</Form.Label>
                    </Col>
                    <Col md={2}>
                      <Form.Group controlId={`amenities[${index}].name`}>
                        <InputGroup>
                          <Form.Select onChange={(e) => handleAmenityChange(e, index)} value={item.name}>
                            <option value="">Select Amenity</option>
                            {amenities.map((amenity) => (
                              <option key={amenity._id} value={amenity.name}>
                                {amenity.name}
                              </option>
                            ))}
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group controlId={`amenities[${index}].price`}>
                        <InputGroup>
                          <Form.Control type="text" placeholder="Price" value={item.price || ''} readOnly />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={1} className="d-flex align-items-center mt-1">
                      {index > 0 ? (
                        <Button variant="danger" className="btn-sm" onClick={() => deleteAmenity(index)}>
                          <i className="ri-delete-bin-line"></i>
                        </Button>
                      ) : (
                        <Button variant="info" className="btn-sm" onClick={addAmenity}>
                          <i className="ri-add-circle-line"></i>
                        </Button>
                      )}
                    </Col>
                  </Row>
                ))}

                {/* Action Buttons */}
                <Row className="d-flex justify-content-center mb-3">
                  <div className="col-md-12 mt-4" align="center">
                    <Button type="button" variant="outline-danger" onClick={cancelHandler}>Cancel</Button>
                    <Button type="submit" className="btn btn-info ms-2">Submit</Button>
                  </div>
                </Row>
              </Form>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EditAmbulanceTypes;
