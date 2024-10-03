import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {  Card, Form, InputGroup, Col, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import FirstAidService from "../../services/MasterData/firstaid.service";
import FirstAidCategoryService from "../../services/MasterData/firstaidcategory.service";
import { descriptionRegex, nameregex, videoRegex } from "../../utils/Regex";

// Define validation schema with Yup
const schema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  title: Yup.string().required("Title is required").matches(nameregex,'Please enter valid Title'),
  videolink: Yup.string().required("Video link is required").matches(videoRegex,"Please enter valid videolink"),
  description: Yup.string().required('Please enter description').matches(descriptionRegex,"Please enter valid description"),

});
  

const EditFirstAid = () => {
  const {id} = useParams()
  const location = useLocation();
  const listing = location.state?.listing;
  const [data,setData] = useState(listing)
  const [firstAidCat,setFirstCat] = useState()

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: data.category,
      title:data.title,
      videolink: data.videolink,
      description: data.description,
    },
    resolver: yupResolver(schema),
  });


  const onSubmit = async (formData) => {
    try{
      let data =  await FirstAidService.editfirstAid(formData,id); 
          if(data.status === 200){
          navigate("/admin/first-aid");
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

  const getData =async()=>{
    try {
      let data = await FirstAidCategoryService.getfirstAidCategory();
      setFirstCat(data?.data)     
    } catch (error) {
      alert("Failed to delete item");
      console.error("Failed to delete item", error);
    }
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <>
      <div>
        <div
          className="text-start mt-5 mb-2 ms-1"
          style={{ fontWeight: "800" }}
        >
          <Link to="/admin/dashboard">Dashboard</Link>&nbsp;&#8811;
          <Link to="/admin/first-aid"> First Aid</Link>
          &nbsp;&#8811;
           Edit First Aid
        </div>
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title className="fw-bold fs-5 mt-2">
                  Edit First Aid
                </Card.Title>
              </Card.Header>
              <div className="card-body">
              <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row md={9} className="d-flex justify-content-center mb-3">
                    <Col md={2} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">Category</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="category">
                        <InputGroup>
                        <Form.Control
                          className="form-select"
                            as="select"
                            value={data?.category}
                            placeholder="Enter category"
                            {...register("category")}
                          >
                      <option value="">Select Type</option>
                       {firstAidCat?.map((el)=>(
                   <option value={el.name}>{el.name}</option>
                       ))}  
                         </Form.Control>
                        </InputGroup>
                        <div style={{ minHeight: "0.1rem" }}>
                          {errors.category && (
                            <p className="text-danger mb-0">
                              {errors.category.message}
                            </p>
                          )}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row md={9} className="d-flex justify-content-center mb-3">
                    <Col md={2} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">Title</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="title">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter Title"
                            {...register("title")}
                          />
                        </InputGroup>
                        <div style={{ minHeight: "0.1rem" }}>
                          {errors.title && (
                            <p className="text-danger">
                              {errors.title.message}
                            </p>
                          )}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row md={9} className="d-flex justify-content-center mb-3">
                    <Col md={2} className="d-flex align-items-center mt-1">
                      <Form.Label className="fs-6">Video Link</Form.Label>
                      <span style={{ color: "red", marginTop: "-15px" }}>
                        *
                      </span>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="videolink">
                        <InputGroup>
                          <Form.Control
                            type="url"
                            placeholder="Enter Video Link"
                            {...register("videolink")}
                          />
                        </InputGroup>
                        <div style={{ minHeight: "0.1rem" }}>
                          {errors.videolink && (
                            <p className="text-danger">
                              {errors.videolink.message}
                            </p>
                          )}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row md={9} className="d-flex justify-content-center mb-3">
                    <Col md={2} className="d-flex  align-items-center mt-1">
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

export default EditFirstAid;
