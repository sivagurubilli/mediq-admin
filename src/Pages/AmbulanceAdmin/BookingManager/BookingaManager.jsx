import { useState, Fragment, useMemo, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "reactstrap";
import DeleteModal from "../../../utils/helpers/Modals/DeleteModal";
import ReactPaginate from "react-paginate";
import { useTable, usePagination, useSortBy } from 'react-table';
import { pagesToShowInitially } from "../../../utils/Regex";
import PrivateAmbulanceAgentService from "../../../services/MasterData/privateAmbulanceAgent.service";
import EditModal from "../../../utils/helpers/Modals/Editmodal";
import BookingManagerService from "../../../services/MasterData/bookingmanager.service";

const BookingManager = () => {
  const navigate = useNavigate();
  const [row,setRow] = useState()
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5); 
  const [searchInput, setSearchInput] = useState("");
  const [totalData, setTotalData] = useState(2); 
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal1, setShowModal1] = useState(false);
  const [bookingmanagers,setBookingManagers] = useState([])
  const profile = JSON.parse(localStorage.getItem('user'))

  const filterBookingManagers = (AdminId, managers) => {
    return managers?.filter(manager => {
      if (manager?.assignedPrivateAmbulances) {
        return manager?.assignedPrivateAmbulances.some(hospital => 
          hospital?._id === AdminId && hospital?.active === true
        );
      }
      return false;
    });
  };
  const getData = async () => {
    try {
      let data = await BookingManagerService.getBookingManagers();
    
      setBookingManagers(data?.data);
      setTotalData(data?.data?.length);
    } catch (error) {
      alert("Failed to fetch data");
      console.error("Failed to fetch data", error);
    }
  };
  




  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(()=>{
    const filteredBookingManagers = filterBookingManagers(profile?.privateHospitalDetails?._id, bookingmanagers);
    setRow(filteredBookingManagers)
  },[bookingmanagers])
 
  // Define columns for the react-table
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: " Name",
        accessor: "name",
      },
      {
        Header: "Phone No",
        accessor: "phone",
      },
      {
        Header: "EmployeeID",
        accessor: "employeeID",
      },
      
      {
        Header: "Address",
        accessor: "address",
      },
      
    ],
    []
  );

  // Filter the row data based on search input
  const filteredData = useMemo(() => {
    return row?.filter((item) => {
      return (
        item?.name?.toLowerCase().includes(searchInput.toLowerCase()) 
      );
    });
   
  }, [row, searchInput]);

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  useEffect(() => {
    if (filteredData) {
      setTotalData(filteredData.length);
    }
  }, [filteredData]);
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Use `page` for pagination
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: paginatedData || [],
      initialState: { pageIndex: 0, pageSize: itemsPerPage }, // Initial page size
      manualPagination: true,
      pageCount: Math.ceil(filteredData?.length / itemsPerPage),
    },
    useSortBy,
    usePagination
  );


 
  return (

    <Fragment>
  
    <div className="text-start mb-2 mt-5 ms-1" style={{ fontWeight: "800" }}>
      <Link to="/admin/dashboard">Dashboard</Link>&nbsp;&#8811;&nbsp; Booking Manager
      
    </div>
    <Row>
      <Col xl={12}>
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <Card.Title className="fw-bold fs-5 mt-2">Booking Manager</Card.Title>
            <div className="d-flex flex-wrap gap-2">
          
          

            </div>
          </Card.Header>
          <Card.Body className="p-3">
            <div className="d-flex justify-content-end mb-3">
              <span className="p-2 ">Search : </span>
              <Input
                type="text"
                placeholder="Search by  Name"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{ width: "25%" }}
              />
            </div>
            <div className="table-responsive">
              <table {...getTableProps()} className="table text-nowrap">
                <thead className="thead-dark">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="text-center align-middle">
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className="text-center align-middle">
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
             {page.length ? <div className="d-flex align-items-center" style={{ marginBottom: "1rem" }}>
                <span className="me-2" style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Show
                </span>
                <Input
                  type="select"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  style={{ width: "80px", fontSize: "14px" }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </Input>
                <span className="ms-2" style={{ fontSize: "16px", fontWeight: "bold" }}>
                  entries
                </span>
              </div> :""}
              <div className="mr-5">
                {totalData / itemsPerPage > 1 && (
                  <div className="mt-5 d-flex justify-content-end align-right">
                    <ReactPaginate
                      previousLabel="<"
                      nextLabel=">"
                      breakLabel="..."
                      breakLinkClassName={"page-link"}
                      pageCount={Math.ceil(totalData / itemsPerPage)}
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={pagesToShowInitially}
                      onPageChange={handlePageChange}
                      containerClassName="pagination"
                      activeClassName="active"
                      pageLinkClassName="page-link"
                      previousLinkClassName="page-link"
                      nextLinkClassName="page-link"
                      disabledClassName="disabled"
                      forcePage={currentPage - 1}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Fragment>
  );
};

export default BookingManager;
