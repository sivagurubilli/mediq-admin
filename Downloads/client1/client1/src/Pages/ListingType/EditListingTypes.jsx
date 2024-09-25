import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Form, InputGroup, Col, Row } from "react-bootstrap";
import Pageheader from "../../components/Common/PageHeader";
import LystingTypeService from "../../services/MasterData/listingtype.service";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { descriptionRegex, nameregex } from "../../utils/Regex";
import { checkIfFilesAreCorrectType, checkIfFilesAreTooBig, isfileavailable } from "../../utils/helpers/Modals/helperfunctions";

// Define validation schema with Yup
const schema = Yup.object().shape({
  name: Yup.string().required('Please enter name').matches(nameregex,"Please enter valid name"),
	image: Yup.mixed().required('Please upload an image').test("is-size","Please upload an image",value=>isfileavailable(value)).test('is-correct-file', 'File size too large', value => checkIfFilesAreTooBig(value)).test('is-big-file', 'Invalid file type', value => checkIfFilesAreCorrectType(value)),
  name: Yup.string().required('Please enter description').matches(descriptionRegex,"Please enter valid description"),
});

const EditListingTypePage = () => {
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
      name: data?.name,
      image:data?.image,
      description:data?.description
    }
  });

  const onSubmit = async (data) => {
    // Handle form submission
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image[0]);  // data.image is an array, so we get the first file
    formData.append("description", data.description);

    try {
    let data = await LystingTypeService.editListingType(formData,id); // Assuming this service accepts FormData
      if(data.status === 200){
        navigate("/admin/listing-types");
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
          <Link to="/admin/first-aid-categories">Listing Types</Link>&nbsp;&#8811; Edit
          Listing Types
        </div>
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title className="fw-bold fs-5 mt-2">
                  Edit Listing Type
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
                      <Form.Label className="fs-5">Icon</Form.Label>
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
                        {errors.image && (
                          <p className="text-danger">{errors.image.message}</p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row md={9} className="d-flex justify-content-center mb-3">
                    <Col md={2} className="d-flex  align-items-center">
                      <Form.Label className="fs-5">Description</Form.Label>
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
                        {errors.description && (
                          <p className="text-danger">
                            {errors.description.message}
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

export default EditListingTypePage;
