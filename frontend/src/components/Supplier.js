import React from "react";
import { Card } from "react-bootstrap";
import { Link, generatePath } from "react-router-dom";
import Rating from "./Rating";

function Supplier({ supplier }) {
  const productCategories = supplier.products
    ? [...new Set(supplier.products.map((product) => product.category))]
    : [];

  let displayCategories = productCategories.slice(0, 1);
  if (productCategories.length > 1) {
    if (displayCategories[0] === "Others") {
      displayCategories = [productCategories[1], "Others"];
    } else {
      displayCategories.push("Others");
    }
  }

  return (
    <Link
      to={generatePath("/suppliers/:supplierId/products", {
        supplierId: supplier._id,
      })}
      className="link"
    >
      <Card className="my-3 p-3 rounded">
        <Card.Img
          src={supplier.image}
          className="rounded mx-auto d-block"
          style={{ width: "100%", height: "250px", objectFit: "contain" }}
        />

        <Card.Body style={{ height: "100px" }}>
          <Card.Text as="div">
            <strong>{supplier.user.name}</strong>
          </Card.Text>

          {/* Show first product category and "Others" */}
          <Card.Text as="div" style={{ color: "grey" }}>
            {displayCategories.join(", ")}
          </Card.Text>

          <Card.Text as="div">
            <div className="my-3">
              <Rating
                value={supplier.rating}
                text={`${supplier.numReviews} reviews`}
                color={"#f8e825"}
              />
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default Supplier;
