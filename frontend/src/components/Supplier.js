import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

function Supplier({ supplier }) {
  return (
    //my-3 is margin top and bottom 3, p-3 is padding 3, rounded is rounded corners
    <Card className="my-3 p-3 rounded">
      <a href={`/suppliers/${supplier._id}/products`}>
        <Card.Img
          src={supplier.image}
          className="rounded mx-auto d-block"
          style={{ width: "250px", height: "250px" }}
        />
        {/* mx-auto is margin x-axis auto, d-block is display block */}
      </a>

      <Card.Body>
        <a href={`/suppliers/${supplier._id}/products`}>
          <Card.Text as="div">
            <strong>{supplier.description}</strong>
          </Card.Text>
        </a>

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
  );
}

export default Supplier;
