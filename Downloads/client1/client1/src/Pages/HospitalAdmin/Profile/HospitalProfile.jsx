import { useState, Fragment, useEffect } from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import HospitalService from "../../../services/MasterData/hospital.service";
import DeleteModal from "../../../utils/helpers/Modals/DeleteModal";
import EditModal from "../../../utils/helpers/Modals/Editmodal";
import EditProfile from "./EditProfile"; // Import the EditProfile component

const HospitalProfile = () => {
  const navigate = useNavigate();
  const [row, setRow] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editId, setEditId] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to toggle between view/edit

  const handleAdd = () => {
    navigate("/admin/add-hospital");
  };

  const handleEdit = () => {
    navigate(`/admin/edit-hospital/${editId?._id}`, {
      state: { listing: editId },
    });
  };

  const handleEdit1 = (item) => {
    setShowModal1(true);
    setEditId(item);
  };

  const getData = async () => {
    try {
      let data = await HospitalService.getHospital();
      setRow(data?.data);
    } catch (error) {
      alert("Failed to fetch data");
      console.error("Failed to fetch data", error);
    }
  };

  const handleDelete1 = async () => {
    try {
      await HospitalService.deleteHospital({}, deleteId);
      getData();
      alert("Success");
      setTimeout(() => setShowModal(false), 1000);
    } catch (error) {
      setShowModal(false);
      alert("Failed to delete item");
      console.error("Failed to delete item", error);
    }
  };

  const handleDelete = (item) => {
    setShowModal(true);
    setDeleteId(item._id);
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <Fragment>
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleDelete={handleDelete1}
      />
      <EditModal
        showModal={showModal1}
        setShowModal={setShowModal1}
        handleEdit={handleEdit}
      />
      <div className="text-start mb-2 mt-5 ms-1" style={{ fontWeight: "800" }}>
        <Link to="/admin/dashboard">Dashboard</Link>&nbsp;&#8811;&nbsp; Hospital
        Profile
      </div>
      <Row>
        <Col xl={12}>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <Card.Title className="fw-bold fs-5 mt-2">
                {isEditing ? "Edit Profile" : "Hospital Profile"}
              </Card.Title>
              <div className="d-flex flex-wrap gap-2">
                {!isEditing ? (
                  <Button
                    variant="primary"
                    className="btn btn-md btn-wave custom-button"
                    onClick={toggleEditMode}
                  >
                    <i className="mdi mdi-clipboard-plus"></i> Edit Profile
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    className="btn btn-md btn-wave custom-button"
                    onClick={toggleEditMode} // Toggle back to view mode
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </Card.Header>

            <Card.Body className="p-3">
              {isEditing ? (
                // Edit Profile Component
                <EditProfile
                  profileData={row}
                  onCancel={toggleEditMode} // Handle cancel action
                />
              ) : (
                // View Profile Component
                <Fragment>
                  {/* Logo at the top center */}
                  <Card.Header className="d-flex justify-content-center bg-white">
                    {row?.logo && (
                      <Image
                        src={row?.logo}
                        alt="Hospital Logo"
                        roundedCircle
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </Card.Header>

                  {/* Card body with key-value pairs */}
                  <Row className="mb-3">
                    <Col xs={6} className="fw-bold text-end">
                      Type  :
                    </Col>
                    <Col xs={6} className="text-start">
                      {row?.type || "N/A"}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6} className="fw-bold text-end">
                      Hospital Name :
                    </Col>
                    <Col xs={6} className="text-start">
                      {row?.hospitalName || "N/A"}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6} className="fw-bold text-end">
                      Website :
                    </Col>
                    <Col xs={6} className="text-start">
                      {row?.website ? (
                        <a
                          href={row?.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {row?.website}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6} className="fw-bold text-end">
                      Hospital Admin Name :
                    </Col>
                    <Col xs={6} className="text-start">
                      {row?.hospitalAdminName || "N/A"}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6} className="fw-bold text-end">
                      Hospital Admin Email :
                    </Col>
                    <Col xs={6} className="text-start">
                      {row?.hospitalAdminEmail || "N/A"}
                    </Col>
                  </Row>
                </Fragment>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default HospitalProfile;
