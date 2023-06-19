import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

function Product({ product }) {
  return (
    //my-3 is margin top and bottom 3, p-3 is padding 3, rounded is rounded corners
    <Card className="my-3 p-3 rounded">
      <a href={`products/${product._id}`}>
        <Card.Img
          src={product.image}
          className="rounded mx-auto d-block"
          style={{ width: "100%", height: "200px", objectFit: "contain" }} 
          // other than cover, you can use contain, fill, none, scale-down
        />
      </a>

      <Card.Body>
        <a href={`products/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
