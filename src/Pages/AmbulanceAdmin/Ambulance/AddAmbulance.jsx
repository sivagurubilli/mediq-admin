import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Form, InputGroup, Col, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AmbulenceTypeService from "../../../services/MasterData/ambulencetype.service";
import { formatDate } from "../../../utils/Regex";
import AmbulanceService from "../../../services/AmbulanceAdmin/Ambulance.services";

// Define validation schema with Yup
const schema = Yup.object().shape({
  ambulanceType: Yup.string().required("Ambulance Type is required"),
    amenity: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Amenity is required"),
        price: Yup.number().required("Price is required").positive("Price must be a positive number")
      })
    ).when('ambulancetype',([ambulancetype],schema)=> {
     return ambulancetype ==="" ?schema.required("Amenity is required") :schema.notRequired();
    }),
    vehiclenumber: Yup.string().required("Vehicle number is required"),
    insurancedate: Yup.date().required("Insurance date is required"),
    registrationCertificate: Yup.mixed().required("Registration certificate is required"),
    km0to5Price: Yup.string().required("Rate for 0KM to 5KM is required"),
  km5to15Price: Yup.string().required("Rate for 5KM to 15KM is required"),
  km15to30Price: Yup.string().required("Rate for 15KM to 30KM is required"),
  km30PlusPerKmPrice: Yup.string().required("Rate for 30KM+ is required"),
  });
  

const AddAmbulance = () => {
  const [typeSelected, setTypeSelected] = useState(false);
  const [ambulanceTypes, setAmbulanceTypes] = useState([]);
  const  [selectedAmbulance,setSelectedAmbulance] = useState()
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors },setValue, watch } = useForm({
    defaultValues: {
      ambulancetype: "",
      amenities: selectedAmbulance?.amenities?.map((el) => ({ name: el.name, price: el.price })),
      vehiclenumber: "",
      insurancedate: null,
      registrationCertificate: null,
      km0to5Price: selectedAmbulance?.km0to5Price,
      km5to15Price: selectedAmbulance?.km5to15Price,
      km15to30Price: selectedAmbulance?.km15to30Price,
      km30PlusPerKmPrice: selectedAmbulance?.km30PlusPerKmPrice,
    },
    resolver: yupResolver(schema)
  });

 
   useEffect(()=>{
    getData()
   },[])

   const getData = async () => {
    try {
      let data = await AmbulenceTypeService.getAmbulenceTypes();  
      setAmbulanceTypes(data?.data);
    } catch (error) {
      alert("Failed to fetch data");
      console.error("Failed to fetch data", error);
    }
  };
  const onSubmit = async (data) => {
    const  formData = new FormData();
    const formattedInsuranceDate = formatDate(data.insurancedate);
console.log(data.amenities)
    formData.append("ambulancetype", data.ambulancetype);
    formData.append("registrationcertificate", data.registrationCertificate[0]); 
    formData.append("vehiclenumber", data.vehiclenumber);
    formData.append("amenities", JSON.stringify(data.amenities)); // Stringify the array
    formData.append("insurancedate",formattedInsuranceDate);
    formData.append("km0to5Price", data.km0to5Price);
    formData.append("km5to15Price", data.km5to15Price);
    formData.append("km15to30Price", data.km15to30Price);
    formData.append("km30PlusPerKmPrice", data.km30PlusPerKmPrice);
   try {
    const response = await AmbulanceService.createAmbulances(formData); 
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

  const TypeSelected = (val) => {
    const selectedAmbulanceObj = ambulanceTypes.find((el) => el.name === val);
    setSelectedAmbulance(selectedAmbulanceObj); // Set the full object in the state
 
    if (selectedAmbulanceObj) {
      setValue("amenities", selectedAmbulanceObj.amenities?.map((el) => ({ name: el.name, price: el.price })) || []);
      setValue("km0to5Price", selectedAmbulanceObj.km0to5Price || "");
      setValue("km5to15Price", selectedAmbulanceObj.km5to15Price || "");
      setValue("km15to30Price", selectedAmbulanceObj.km15to30Price || "");
      setValue("km30PlusPerKmPrice", selectedAmbulanceObj.km30PlusPerKmPrice || "");
      setValue("ambulancetype", selectedAmbulanceObj.name || ""); // Set the ambulance type's name
    };
}

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
                    <Form.Label className="fs-6">Ambulance Type</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="ambulancetype">
                      <InputGroup>
                        <Form.Control
                          as="select"
                          className="form-select"
                          {...register("ambulancetype")}
                          value={watch("ambulancetype")}
                          onChange={(e) => TypeSelected(e.target.value)}
                        >
                          <option value="">Select Type</option>
                         {ambulanceTypes?.map((elem,index)=>
                         <option key={index} value={elem.name}> {/* Pass the index as value */}
                         {elem.name}
                       </option>
                        )}
                               
                        </Form.Control>
                      </InputGroup>
                      {errors.ambulancetype && <p className="text-danger">{errors.ambulancetype.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>

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
                          type="file"
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
                            type="string"
                            placeholder={`Enter ${label}`}
                            {...register(id)}
                            readOnly
                          />
                        </InputGroup>
                        {errors[id] && (
                          <p className="text-danger">{errors[id].message}</p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                ))}
 {selectedAmbulance?.amenities?.map((item, index) => (
                  <Row className="d-flex justify-content-center mb-3" key={index}>
                    <Col md={3} className="d-flex align-items-center mt-1" >
                      <Form.Label className="fs-6">Amenity</Form.Label>
                    </Col>
                    <Col md={2}>
                      <Form.Group >
                        <InputGroup>
                          <Form.Control value={item.name} readOnly>
                           
                          </Form.Control>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group >
                        <InputGroup>
                          <Form.Control type="text" placeholder="Price" value={item.price || ''} readOnly />
                        </InputGroup>
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
