import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Modal, ModalBody } from "reactstrap";
import HospitalService from "../../../services/MasterData/hospital.service";
import PrivateAmbulanceAgentService from "../../../services/MasterData/privateAmbulanceAgent.service";
import BookingManagerService from "../../../services/MasterData/bookingmanager.service";

const AssignModal = ({ assignId, showModal, setShowModal, handleAssign }) => {
  const [selectedType, setSelectedType] = useState(""); // To store selected type
  const [data, setData] = useState(null); // To store the API data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [selectedHospitals, setSelectedHospitals] = useState([]);
  const [selectedAmbulances, setSelectedAmbulances] = useState([]);

  // Close modal function
  const handleCloseModal = () => {
    reset();
    setShowModal(false);
  };

  // Use react-hook-form
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Handle dropdown change and API call
  const handleTypeChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);
    setLoading(true); // Start loading
    setError(""); // Reset error

    // Call respective APIs based on selection
    try {
      let responseData = null;
      if (selectedValue === "hospital") {
        const response = await HospitalService.getHospital();
        responseData = response.data;
      } else if (selectedValue === "privateAmbulance") {
        const response = await PrivateAmbulanceAgentService.getPrivateAmbulanceAgent();
        responseData = response.data;
      } else if (selectedValue === "mortuary") {
        // Implement the Mortuary API when available
      }

      setData(responseData); // Store the API data to display beside the dropdown
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  // Handle checkbox selection
const handleCheckboxChange = (item) => {
  if (selectedType === "hospital") {
    const foundItem = selectedHospitals.find(selectedItem => selectedItem._id === item._id);

    if (foundItem) {
      setSelectedHospitals(selectedHospitals.map(selectedItem =>
        selectedItem._id === item._id ? { ...selectedItem, active: !selectedItem.active } : selectedItem
      ));
    } else {
      setSelectedHospitals([...selectedHospitals, { ...item, active: true }]);
    }
  } else if (selectedType === "privateAmbulance") {
    const foundItem = selectedAmbulances.find(selectedItem => selectedItem._id === item._id);

    if (foundItem) {
      setSelectedAmbulances(selectedAmbulances.map(selectedItem =>
        selectedItem._id === item._id ? { ...selectedItem, active: !selectedItem.active } : selectedItem
      ));
    } else {
      setSelectedAmbulances([...selectedAmbulances, { ...item, active: true }]);
    }
  }
};

  
useEffect(() => {
  if (assignId) {
    if (assignId.assignedHospitals) {
      const selected = assignId.assignedHospitals.filter(el => el.active);
      setSelectedHospitals(selected);
    }
    if (assignId.assignedPrivateAmbulances) {
      const selected = assignId.assignedPrivateAmbulances.filter(el => el.active);
      setSelectedAmbulances(selected);
    }
  }
}, [assignId]);

console.log(selectedAmbulances,selectedHospitals)

  

  // Handle form submission (Assign button click)
  const onSubmit = async () => {
    let item;
    

      const filteredHospitals = selectedHospitals.filter((el) => el.active);
      const filteredAmbulances = selectedAmbulances.filter((el) => el.active);

      item = {
        bookingManagerId: assignId._id,
        hospitalIds: filteredHospitals.map(hospital => ({
          id: hospital._id,
          active: hospital.active
        })),
        privateAmbulanceIds: filteredAmbulances.map(ambulance => ({
          id: ambulance._id,
          active: ambulance.active
        }))
      };

    
    
  
    if (item && Object.keys(item).length > 0) {
      try {
        const response = await BookingManagerService.assignBookingManagers(item);
        if (response.status === 200) {
          handleAssign();
          handleCloseModal();
        }
      } catch (error) {
        console.error("Failed to assign:", error);
        setError("Failed to assign. Please try again.");
      }
    } else {
      alert("Please select at least one item to assign.");
    }
  };
  

  return (
    <Modal isOpen={showModal} toggle={handleCloseModal} centered>
      <ModalBody className="d-flex flex-column justify-content-center align-items-center">
        <h5 className="mt-3 mb-4">Assign booking Managar </h5>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3 w-100">
            <Form.Label>Select Type</Form.Label>
            <InputGroup>
              <Form.Control
                as="select"
                className="form-select"
                {...register("type")}
                onChange={handleTypeChange}
              >
                <option value="">Select Type</option>
                <option value="hospital">Hospital</option>
                <option value="privateAmbulance">Private Ambulance</option>
                <option value="mortuary">Mortuary</option>
              </Form.Control>
            </InputGroup>
          </Form.Group>

          {/* Show loading state */}
          {loading && <p>Loading data...</p>}

          {/* Display error if any */}
          {error && <p className="text-danger">{error}</p>}

          {/* Display fetched data based on selected type with checkboxes */}
          {selectedType === "hospital" && data && (
            <div className="mt-3 w-100">
              {data.map((elem, index) => (
                elem.hospitalName && (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`hospital-${index}`}
                      value={elem._id}
                      name="selectedItems"
                      onChange={() => handleCheckboxChange(elem)}
                      checked={selectedHospitals.some((item) => item._id === elem._id && item.active)}
                    />
                    <label className="form-check-label" htmlFor={`hospital-${index}`}>
                      {elem.hospitalName}
                    </label>
                  </div>
                )
              ))}
            </div>
          )}

          {selectedType === "privateAmbulance" && data && (
            <div className="mt-3 w-100">
             {data.map((elem, index) => (
  <div key={index} className="form-check">
    <input
      type="checkbox"
      className="form-check-input"
      id={`ambulance-${index}`}
      value={elem._id}
      name="selectedItem"
      onChange={() => handleCheckboxChange(elem)}
      checked={selectedAmbulances.some((item) => item._id === elem._id && item.active)}
    />
    <label className="form-check-label ms-2" htmlFor={`ambulance-${index}`}>
      {elem.privateAmbulanceagentName}
    </label>
  </div>
))}

            </div>
          )}

          <div className="text-center mt-4">
            <Button variant="outline-danger" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="outline-info" className="ms-2">
              Assign
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AssignModal;
