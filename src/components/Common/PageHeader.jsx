import { Fragment } from 'react';
import { Breadcrumb, Card } from "react-bootstrap";

const Pageheader =(props) =>{
  return (
    <Fragment>
 <div className=" mt-5" style={{border:"1px solid red"}}>
          <Breadcrumb >
            <Breadcrumb.Item href="/">{props.heading}</Breadcrumb.Item>
            <Breadcrumb.Item active aria-current="page">{props.active}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
    </Fragment>
  );
}

export default Pageheader;
