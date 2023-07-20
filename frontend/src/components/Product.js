import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import Rating from "./Rating";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { generatePath } from "react-router-dom";

function Product({ product }) {
  const { supplierId } = useParams();

  return (
    <RouterLink
      component={RouterLink}
      to={generatePath("/suppliers/:supplierId/products/:productId", {
        supplierId: supplierId,
        productId: product._id,
      })}
      className="link"
    >
      <Card sx={{ my: 3, p: 3, borderRadius: "16px" }}>
        <CardMedia
          component="img"
          src={product.image}
          alt="Product Image"
          style={{ width: "100%", height: "200px", objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="subtitle1" component="div">
            <strong>{product.name}</strong>
          </Typography>
          <Typography variant="b3" component="div">
            ${product.price}
          </Typography>
        </CardContent>
      </Card>
    </RouterLink>
  );
}

export default Product;
