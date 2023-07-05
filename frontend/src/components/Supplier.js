import React from "react";
import { Card } from "react-bootstrap";
import { Link, generatePath } from "react-router-dom";
import Rating from "./Rating";

function Supplier({ supplier }) {
  return (
    //my-3 is margin top and bottom 3, p-3 is padding 3, rounded is rounded corners
    <Link
      to={generatePath("/suppliers/:supplierId/products", {
        supplierId: supplier._id,
      })}
    >
      <Card className="my-3 p-3 rounded">
        <Card.Img
          src={supplier.image}
          className="rounded mx-auto d-block"
          style={{ width: "250px", height: "250px" }}
        />
        {/* mx-auto is margin x-axis auto, d-block is display block */}

        <Card.Body>
          <Card.Text as="div">
            <strong>{supplier.description}</strong>
          </Card.Text>

          <Card.Text as="div">
            <div className="my-3">
              <Rating
                value={supplier.rating}
                text={`${supplier.numReviews} reviews`}
                color={"#f8e825"}
              />{" "}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default Supplier;
