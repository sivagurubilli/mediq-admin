import { Card } from "react-bootstrap";

const Statistics = ({ title, icon, stats, variant, color, change }) => {
  return (
    <Card
      className="mt-3"
      style={{ minHeight: "125px", backgroundColor: `${color}` }}
    >
      <div className="d-flex justify-content-between p-3 ">
        <div
          className="d-flex justify-content-center"
          style={{
            width: "4rem",
            height: "3.4rem",
            marginTop: "-40px",
            backgroundColor: `${variant}`,
            borderRadius: "10px",
          }}
        >
          <img
            src={icon}
            className="mt-2"
            style={{ height: "25px", width: "25px", textAlign: "center" }}
          />
        </div>
        <div className="text-end text-white mt-4" style={{ lineHeight: 1.25 }}>
          <h6 className=" mb-1 text-white">{title}</h6>
          <h4 className="mb-0 text-white">{stats}</h4>
        </div>
      </div>
    </Card>
  );
};

export default Statistics;
