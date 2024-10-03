import { Card, Col, Row } from 'react-bootstrap'
import Statistics from './Statistics'
import {  statistics } from './data'
import { Link } from 'react-router-dom'

const Dashboard = () => {
	return (
		<>
		 <div className="fs-5 text-start mt-5 mb-2 ms-1" >
          <Link to="/dashboard">Dashboard</Link>
          
        </div>
        <div style={{backgroundColor:"white",padding:"20px", borderRadius:"10px",marginBottom:"30px"}}>
			<Row className=' p-3 d-flex' >
				{(statistics || []).map((item, idx) => {
					return (
						<Col xxl={4}  sm={6} key={idx} >
							<Statistics
								title={item.title}
								stats={item.stats}
								change={item.change}
								icon={item.icon}
								variant={item.variant}
                                color={item.color}
							/>
						</Col>
					)
				})}
			</Row>
			</div>
			
		</>
	)
}

export default Dashboard