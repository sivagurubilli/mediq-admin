import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from "react-bootstrap";

const HospitalWalletBalance = () => {
  const [hospitals, setHospitals] = useState([
    { id: 1, name: 'BlueRock Hospital', balance: 53154 },
    { id: 2, name: 'Sunrise Clinic', balance: 80770 },
    { id: 3, name: 'Greenland Hospital', balance: 27114 },
    // Add more hospitals here
  ]);

  return (
    <div className="container py-5">
         <Col xl={12} >
        <Card >
          <Card.Header className="d-flex justify-content-between">
            <Card.Title className="fw-bold fs-5 mt-2">  Wallet Balance</Card.Title>
            <div className="d-flex flex-wrap gap-2">
          
        
            </div>
          </Card.Header>
      {/* Header Section */}
      <Card.Body className="p-3">
      <header className="mb-4">
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="card shadow border-0 custom-card crm-highlight-card">
              <div className="card-body">
                <h5 className=" text-white">Total Wallet Balance</h5>
                <p className="text-white display-6">₹ 31,211.00</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card custom-card crm-highlight-card shadow border-0">
              <div className="card-body">
                <h5 className="text-white"> Wallet Balance Remaining</h5>
                <p className="text-white display-6">₹ 17,560.00</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card custom-card crm-highlight-card shadow border-0">
              <div className="card-body">
                <h5 className="text-white">Wallet Balance Deducted</h5>
                <p className="text-white display-6">₹ 14,390.00</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Wallet Balance Table */}
      <section className="mb-5">
        <h3 className="text-center mb-4"> Branch Wallet Balances List</h3>
        <table className="table table-hover table-striped shadow-sm">
          <thead className="thead-dark">
            <tr>
              <th> Branch Name</th>
              <th>Balance</th>
              <th>Add Balance</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((hospital) => (
              <tr key={hospital.id}>
                <td>{hospital.name}</td>
                <td>₹  {hospital.balance.toLocaleString()}</td>
                <td>
                  <button className="btn btn-primary">Add Balance</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      </Card.Body>
      </Card>
      </Col>
    </div>
  );
};

export default HospitalWalletBalance;