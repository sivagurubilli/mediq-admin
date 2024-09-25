import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, Button, Col, Row, InputGroup, Card } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import LystingService from '../../../services/MasterData/listing.service';

// Validation schema
const validationSchema = Yup.object().shape({
  emergencytype: Yup.string().required('Type is required'),
  branchname: Yup.string().required('Branch Name is required'),
  phone: Yup.string().required('Phone is required'),
  addressline1: Yup.string().required('Address is required'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  latitude: Yup.string().required('Latitude is required'),
  longitude: Yup.string().required('Longitude is required'),
  website: Yup.string().url('Invalid URL').required('Website is required'),
  branchadminname: Yup.string().required("Hospital Branch Admin Name is required"),
  branchadminemail: Yup.string()
    .email("Must be a valid email")
    .required("Hospital Branch Admin Email is required"),
  branchAdminPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Hospital Branch Admin Password is required"),
    adminconfirmPassword: Yup.string().oneOf([Yup.ref("branchAdminPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const AddHospitalBranch = () => {

  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [sourcePosition, setSourcePosition] = useState({ lat: 0, lng: 0 });
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors }, setError } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onInput',
    defaultValues: {
      emergencytype: '',
      branchname: '',
      email: '',
      phone: '',
      addressline1: '',
      country: '',
      state: '',
      city: '',
      latitude: '',
      longitude: '',
      website: '',
      branchadminname:"",
      branchadminemail:"",
      branchAdminPassword:"",
      adminconfirmPassword:""
    },
  });

  const onSubmit = async (formData) => {
    const formDataToSubmit = new FormData();
   // Assuming formData is an object containing these values
formDataToSubmit.append("emergencytype", formData.emergencytype || '');
formDataToSubmit.append("branchname", formData.branchname || '');
formDataToSubmit.append("email", formData.email || '');
formDataToSubmit.append("phone", formData.phone || '');
formDataToSubmit.append("addressline1", formData.addressline1 || '');
formDataToSubmit.append("country", formData.country || '');
formDataToSubmit.append("state", formData.state || '');
formDataToSubmit.append("city", formData.city || '');
formDataToSubmit.append("latitude", formData.latitude || '');
formDataToSubmit.append("longitude", formData.longitude || '');
formDataToSubmit.append("website", formData.website || '');
formDataToSubmit.append("branchadminname", formData.branchadminname || '');
formDataToSubmit.append("branchadminemail", formData.branchadminemail || '');
formDataToSubmit.append("branchAdminPassword", formData.branchAdminPassword || '');
formDataToSubmit.append("adminconfirmPassword", formData.adminconfirmPassword || '');

 try{
    // Append each property to FormData
  

      let response = await LystingService.createListing(formDataToSubmit);
      if (response.status === 200) {
        navigate(`/hospitals/branch`);
        alert(response.message);
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert(error?.response?.data?.message);
      console.error('Failed to upload', error);
    }
  };

  const cancelHandler = () => {
    navigate(-1);
  };

  // Forward Geocoding function
   // Handle address selection
   const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);
    setValue('addressline1', selectedAddress); // Set address in form

    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setSourcePosition(latLng);
      setValue('latitude', latLng.lat); // Set latitude
      setValue('longitude', latLng.lng); // Set longitude
       // Extract city name from the results
       const addressComponents = results[0].address_components;

    const cityComponent = addressComponents.find(component => component.types.includes('locality'));
    const cityName = cityComponent ? cityComponent.long_name : '';

    const stateComponent = addressComponents.find(component => component.types.includes('administrative_area_level_1'));
    const stateName = stateComponent ? stateComponent.long_name : '';

    const countryComponent = addressComponents.find(component => component.types.includes('country'));
    const countryName = countryComponent ? countryComponent.long_name : '';

    setValue('city', cityName); // Set city in form
    setValue('state', stateName); // Set state in form
    setValue('country', countryName);
    } catch (error) {
      console.error('Error', error);
    }
  };
 
  return (
    <div className="container mt-5">
       <div
          className="text-start mt-5 mb-2 ms-1"
          style={{ fontWeight: "800" }}
        >
          <Link to="/hospitals/dashboard">Dashboard</Link>&nbsp;&#8811;
          <Link to={`/hospitals/branch`}>Listing</Link>&nbsp;&#8811; Add Hospitals Branch
          </div>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
            Add Hospitals Branch
            </Card.Header>
            <Card.Body>
            <LoadScript googleMapsApiKey="AIzaSyCLg_Oahf9q1keNmJoqHc_Uk4f0fu3YmxU" libraries={['places']}>

              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Type */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Type</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="type">
                      <Form.Control as="select" className="form-select" {...register("emergencytype")}>
                        <option value="">Select Type</option>
                        <option value="emergency">Emergency</option>
                        <option value="non-emergency">Non-Emergency</option>
                      </Form.Control>
                      {errors.emergencytype && <p className="text-danger">{errors.emergencytype.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Name */}
             
             
                {/* Phone */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Phone</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="phone">
                      <InputGroup>
                        <Form.Control type="tel" placeholder="Enter Phone" {...register("phone")} />
                      </InputGroup>
                      {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>

             

                {/* Address Line 1 */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Address Line 1</Form.Label>
                    <span style={{ color: 'red', marginTop: '-15px' }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="addressline1">
                      <PlacesAutocomplete
                        value={address}
                        onChange={setAddress}
                        onSelect={handleSelect}
                      >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                          <div>
                            <Form.Control
                          {...register("addressline1")}
                              {...getInputProps({
                                placeholder: 'Search Places...',
                              })}
                            />
                            <div className="autocomplete-dropdown">
                              {suggestions.slice(0, 4).map((suggestion, index) => (
                                <div
                                  key={index}
                                  style={{ cursor: "pointer" }}
                                  {...getSuggestionItemProps(suggestion, {
                                    className: 'suggestion-item p-2',
                                  
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                      {errors.addressline1 && (
                        <p className="text-danger">{errors.addressline1.message}</p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                 {/* City */}
                 <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">City</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="city">
                      <InputGroup>
                        <Form.Control type="text" placeholder="Enter City" {...register("city")} />
                      </InputGroup>
                      {errors.city && <p className="text-danger">{errors.city.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>
                  {/* State */}
                  <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">State</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="state">
                      <InputGroup>
                        <Form.Control type="text" placeholder="Enter State" {...register("state")} />
                      </InputGroup>
                      {errors.state && <p className="text-danger">{errors.state.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>
                {/* Country */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Country</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="country">
                      <InputGroup>
                        <Form.Control type="text" placeholder="Enter Country" {...register("country")} />
                      </InputGroup>
                      {errors.country && <p className="text-danger">{errors.country.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>

              

               

                {/* Latitude */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Latitude</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="latitude">
                      <InputGroup>
                        <Form.Control type="string" placeholder="Enter Latitude" {...register("latitude")} />
                      </InputGroup>
                      {errors.latitude && <p className="text-danger">{errors.latitude.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Longitude */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Longitude</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="longitude">
                      <InputGroup>
                        <Form.Control type="string" placeholder="Enter Longitude" {...register("longitude")} />
                      </InputGroup>
                      {errors.longitude && <p className="text-danger">{errors.longitude.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Website */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Website</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="website">
                      <InputGroup>
                        <Form.Control type="url" placeholder="Enter Website URL" {...register("website")} />
                      </InputGroup>
                      {errors.website && <p className="text-danger">{errors.website.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>

 <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Branch Admin Name</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="branchadminname">
                      <InputGroup>
                        <Form.Control type="text" placeholder="Enter branch admin name " {...register("branchadminname")} />
                      </InputGroup>
                      {errors.branchadminname && <p className="text-danger">{errors.branchadminname.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Branch Admin Email</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="branchadminemail">
                      <InputGroup>
                        <Form.Control type="text" placeholder="Enter branch admin email " {...register("branchadminemail")} />
                      </InputGroup>
                      {errors.branchadminemail && <p className="text-danger">{errors.branchadminemail.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>
  {/* Hospital Admin Password */}
  <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">
                        Branch Admin Password
                      </Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="branchAdminPassword">
                        <InputGroup>
                          <Form.Control
                        type={passwordShow ? "text" : "password"}
                            placeholder="Enter Branch Admin Password"
                            {...register("branchAdminPassword")}
                          />
                           <Button
                                    variant="outline-primary"
                  onClick={() => setPasswordShow(!passwordShow)}
                >
                  <i className={passwordShow ? "ri-eye-line" : "ri-eye-off-line"}></i>
                </Button>
                        </InputGroup>
                        {errors.branchAdminPassword && (
                          <p className="text-danger">
                            {errors.branchAdminPassword.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    </Row>
                    <Row className="d-flex justify-content-center mb-3">
                    <Col md={3} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">
                      Confirm Branch Admin  Password
                      </Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="adminconfirmPassword">
                        <InputGroup>
                          <Form.Control
  type={confirmPasswordShow ? "text" : "password"}
                              placeholder="Confirm Admin Password"
                            {...register("adminconfirmPassword")}
                          />
                           <Button
                                    variant="outline-primary"
                  onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                >
                  <i className={confirmPasswordShow ? "ri-eye-line" : "ri-eye-off-line"}></i>
                </Button>
                        </InputGroup>
                        {errors.adminconfirmPassword && (
                          <p className="text-danger">
                            {errors.adminconfirmPassword.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    </Row>
                

                {/* Buttons */}
                <div className="col-md-12 mt-4" align="center">
                  <Button
                  type="button"  variant="outline-danger" onClick={cancelHandler}>
                    Cancel
                  </Button>
                  <Button type="submit" className="btn btn-info ms-2">
                    Submit
                  </Button>
                </div>
              </Form>
              </LoadScript>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddHospitalBranch;
