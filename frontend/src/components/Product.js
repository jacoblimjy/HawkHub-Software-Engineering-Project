import React from "react";
import { Card } from "react-bootstrap";
import { Link, generatePath, useParams } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  const { supplierId } = useParams();
  return (
    //my-3 is margin top and bottom 3, p-3 is padding 3, rounded is rounded corners
    <Link
      to={generatePath("/suppliers/:supplierId/products/:productId", {
        supplierId: supplierId,
        productId: product._id,
      })}
      className="link"
    >
      <Card className="my-3 p-3 rounded">
        <Card.Img
          src={product.image}
          className="rounded mx-auto d-block"
          style={{ width: "100%", height: "200px", objectFit: "contain" }}
          // other than cover, you can use contain, fill, none, scale-down
        />
        <Card.Body>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default Product;
