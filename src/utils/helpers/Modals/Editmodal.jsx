import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordregex } from "../../Regex";
import { Modal, ModalBody } from "reactstrap";

// Define validation schema
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .matches(
      passwordregex,
      "Please enter valid password"
    ),
});

const EditModal = ({ showModal, setShowModal, handleEdit }) => {
  const [passwordShow, setPasswordShow] = useState(false);

  // Close modal function
  const handleCloseModal = () => {
    reset(); 
    setShowModal(false)
  };
  // Use react-hook-form
  const { register, handleSubmit,reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });
const password = localStorage.getItem("password")
  // Handle form submission
  const handleEditSubmit = (data) => {
    if (data.password ===password) {
        handleEdit();
      reset(); 
      handleCloseModal();
    }else{
      alert(" Please enter correct password")
    }
 
    
  };

  return (
    <Modal isOpen={showModal} toggle={handleCloseModal} centered>
      <ModalBody className="d-flex flex-column justify-content-center align-items-center">
        <h5 className="mt-3 mb-4">Are you sure you want to edit?</h5>
        <Form onSubmit={handleSubmit(handleEditSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label for="password" className="fs-5">Password</Form.Label>
            <InputGroup>
                  <Form.Control
                    type={passwordShow ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password")}
                  />
                  <Button
                    variant="outline-primary"
                    onClick={() => setPasswordShow(!passwordShow)}
                  >
                    <i
                      className={
                        passwordShow ? "ri-eye-line" : "ri-eye-off-line"
                      }
                    ></i>
                  </Button>
                </InputGroup>   
                {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}        
          </Form.Group>
          
          <div className="text-center mt-4">
            <button
              color="danger"
              type="button"
              className=" btn btn-outline-danger font-1"
              style={{ marginRight: "5px" }}
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              color="success"
              className="btn btn-outline-info font-1 ms-2"
            >
              Submit
            </button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditModal;
