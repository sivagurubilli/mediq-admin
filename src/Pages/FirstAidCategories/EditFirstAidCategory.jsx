import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Form, InputGroup, Col, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import FirstAidCategoryService from "../../services/MasterData/firstaidcategory.service";
import { descriptionRegex, nameregex } from "../../utils/Regex";

// Define validation schema with Yup
const schema = Yup.object().shape({
  name: Yup.string().required('Please enter name').matches(nameregex,"Please enter valid name"),
  description: Yup.string().required('Please enter description').matches(descriptionRegex,"Please enter valid description"),

});

const EditFirstAidCategory = () => {
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
    defaultValues: {
      name: data.name,
      description:data.description,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    try{
      let data =  await FirstAidCategoryService.editfirstAidCategory(formData,id); 
          if(data.status === 200){
            alert(data.message)
          navigate("/admin/first-aid-categories");
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
          <Link to="/admin/first-aid-categories"> First Aid Categories</Link>
          &nbsp;&#8811; Edit First Aid Categories
        </div>
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title className="fw-bold fs-5 mt-2">
                  Edit First Aid Categories
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
                      <Form.Label className="fs-6">Description</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>
                  
                    <Col md={4}>
                      <Form.Group controlId="description">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter your description"
                            {...register("description")}
                          />
                        </InputGroup>
                        <div style={{ minHeight: "0.1rem" }}>
        {errors.description && (
          <p className="text-danger mb-0">{errors.description.message}</p>
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

export default EditFirstAidCategory;
