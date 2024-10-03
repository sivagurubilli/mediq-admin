import React, { useState } from 'react';
import { Button, Card, Col, Row, Tabs, Tab } from "react-bootstrap";

const WalletBalancePage = () => {
  const [activeTab, setActiveTab] = useState('hospitals');

  // Data for each category
  const hospitals = [
    { id: 1, name: 'BlueRock Hospital', balance: 53154 },
    { id: 2, name: 'Sunrise Clinic', balance: 80770 },
    { id: 3, name: 'Greenland Hospital', balance: 27114 },
  ];

  const privateAmbulance = [
    { id: 1, name: 'QuickCare Ambulance', balance: 20154 },
    { id: 2, name: 'FastRescue Services', balance: 10770 },
  ];

  const mortuaries = [
    { id: 1, name: 'Evergreen Mortuary', balance: 9054 },
    { id: 2, name: 'Peaceful Rest Mortuary', balance: 15770 },
  ];

  // Function to get data based on active tab
  const getDataForTab = () => {
    if (activeTab === 'hospitals') return hospitals;
    if (activeTab === 'ambulances') return privateAmbulance;
    if (activeTab === 'mortuaries') return mortuaries;
  };

  return (
    <div className="container py-5">
      <Col xl={12}>
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <Card.Title className="fw-bold fs-5 mt-2">Wallet Balance</Card.Title>
            <div className="d-flex flex-wrap gap-2"></div>
          </Card.Header>

          {/* Header Section */}
          <Card.Body className="p-3">
            <header className="mb-4">
              <div className="row text-center">
                <div className="col-md-4 mb-3">
                  <div className="card shadow border-0 custom-card crm-highlight-card">
                    <div className="card-body">
                      <h5 className="text-white">Total Wallet Balance</h5>
                      <p className="text-white display-6">₹ 31,211.00</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card custom-card crm-highlight-card shadow border-0">
                    <div className="card-body">
                      <h5 className="text-white">Wallet Balance Remaining</h5>
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

            {/* Tabs Section */}
            <Tabs
              id="wallet-balance-tabs"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-4 d-flex justify-content-around"
              style={{ width: '100%' }} // Inline style for the width of the tabs container
            >
              <Tab
                eventKey="hospitals"
                title="Hospitals Wallet"
                tabClassName="flex-grow-1" // Make each tab grow to fit the container evenly
                style={{ textAlign: 'center' }} // Inline style for the tab content
              >
              </Tab>
              <Tab
                eventKey="ambulances"
                title="Private Ambulance Wallet"
                tabClassName="flex-grow-1"
                style={{ textAlign: 'center' }}
              >
              </Tab>
              <Tab
                eventKey="mortuaries"
                title="Mortuaries Wallet"
                tabClassName="flex-grow-1"
                style={{ textAlign: 'center' }}
              >
              </Tab>
            </Tabs>

            {/* Wallet Balance Table */}
            <section className="mb-5">
              <h3 className="text-center mb-4">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Balances List
              </h3>
              <table className="table table-hover table-striped shadow-sm">
                <thead className="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>Balance</th>
                    <th>Add Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {getDataForTab().map((entity) => (
                    <tr key={entity.id}>
                      <td>{entity.name}</td>
                      <td>₹ {entity.balance.toLocaleString()}</td>
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

export default WalletBalancePage;
