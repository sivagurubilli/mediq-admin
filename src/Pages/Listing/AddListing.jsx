import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, Button, Col, Row, InputGroup, Card } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import LystingService from '../../services/MasterData/listing.service';
import { phoneNumberRegex } from '../../utils/Regex';

// Validation schema
const validationSchema = Yup.object().shape({
  type: Yup.string().required('Type is required'),
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required').matches(phoneNumberRegex,"Please enter valid phone number"),
  phone2: Yup.string().nullable(),
  phone3: Yup.string().nullable(),
  addressline1: Yup.string().required('Address is required'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  latitude: Yup.string().required('Latitude is required'),
  longitude: Yup.string().required('Longitude is required'),
  image: Yup.mixed().required("Logo is required"),
  website: Yup.string().url('Invalid URL').required('Website is required'),
});

const AddListing = () => {

  const location = useLocation();
  const listing = location.state?.listing;
  const [data, setData] = useState(listing);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [sourcePosition, setSourcePosition] = useState({ lat: 0, lng: 0 });
  
  const { register, handleSubmit, setValue, formState: { errors }, setError } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onInput',
    defaultValues: {
      type: data?.name || '',
      name: '',
      email: '',
      phone: '',
      phone2: '',
      phone3: '',
      addressline1: '',
      country: '',
      state: '',
      city: '',
      latitude: '',
      longitude: '',
      website: '',
      image:null
    },
  });

  const onSubmit = async (formData) => {
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("type", formData.type || '');
    formDataToSubmit.append("name", formData.name || '');
formDataToSubmit.append("email", formData.email || '');
formDataToSubmit.append("phone", formData.phone || '');
formDataToSubmit.append("phone2", formData.phone2 || '');
formDataToSubmit.append("phone3", formData.phone3 || '');
formDataToSubmit.append("addressline1", formData.addressline1 || '');
formDataToSubmit.append("country", formData.country || '');
formDataToSubmit.append("state", formData.state || '');
formDataToSubmit.append("city", formData.city || '');
formDataToSubmit.append("latitude", formData.latitude || '');
formDataToSubmit.append("longitude", formData.longitude || '');
formDataToSubmit.append("website", formData.website || '');
formDataToSubmit.append("image", formData.image[0] || '');
 try{
    // Append each property to FormData
  

      let response = await LystingService.createListing(formDataToSubmit);
      if (response.status === 200) {
        navigate(`/admin/listing/${listing._id}`);
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
          <Link to="/admin/dashboard">Dashboard</Link>&nbsp;&#8811;
          <Link to={`/admin/listing/${listing._id}`}>Listing</Link>&nbsp;&#8811; Add Listing
          </div>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
            Add Listing
            </Card.Header>
            <Card.Body>
            <LoadScript googleMapsApiKey="AIzaSyCLg_Oahf9q1keNmJoqHc_Uk4f0fu3YmxU" libraries={['places']}>

              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Type */}
                {/* <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Type</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="type">
                      <Form.Control as="select" className="form-select" {...register("type")}>
                        <option value="">Select Type</option>
                        <option value="emergency">Emergency</option>
                        <option value="non-emergency">Non-Emergency</option>
                      </Form.Control>
                      {errors.type && <p className="text-danger">{errors.type.message}</p>}
                    </Form.Group>
                  </Col>
                </Row> */}

                {/* Name */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Name</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="name">
                      <InputGroup>
                        <Form.Control type="text" placeholder="Enter Name" {...register("name")} />
                      </InputGroup>
                      {errors.name && <p className="text-danger">{errors.name.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Email */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Email</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="email">
                      <InputGroup>
                        <Form.Control type="email" placeholder="Enter Email" {...register("email")} />
                      </InputGroup>
                      {errors.email && <p className="text-danger">{errors.email.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Phone */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Phone</Form.Label>
                    <span style={{ color: "red", marginTop: "-15px" }}>*</span>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="phone">
                      <InputGroup>
                        <Form.Control type="tel" placeholder="Enter Phone" onInput={(e) => {
                e.target.value = e?.target?.value?.replace(/[^0-9]/g, '').slice(0, 10);
              }} {...register("phone")} />
                      </InputGroup>
                      {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Additional Phone */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Phone 2</Form.Label>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="phone2">
                      <InputGroup>
                        <Form.Control type="tel" placeholder="Enter Phone 2"  onInput={(e) => {
                e.target.value = e?.target?.value?.replace(/[^0-9]/g, '').slice(0, 10);
              }} {...register("phone2")} />
                      </InputGroup>
                      {errors.phone2 && <p className="text-danger">{errors.phone2.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Phone 3 */}
                <Row className="d-flex justify-content-center mb-3">
                  <Col md={3} className="d-flex align-items-center mt-1">
                    <Form.Label className="fs-6">Phone 3</Form.Label>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="phone3">
                      <InputGroup>
                        <Form.Control type="tel" placeholder="Enter Phone 3"   onInput={(e) => {
                e.target.value = e?.target?.value?.replace(/[^0-9]/g, '').slice(0, 10);
              }} {...register("phone3")} />
                      </InputGroup>
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
                      <Form.Label className="fs-6">image</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="image">
                        <Form.Control type="file" {...register("image")} />
                        {errors.image && (
                          <p className="text-danger">{errors.image.message}</p>
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

export default AddListing;
