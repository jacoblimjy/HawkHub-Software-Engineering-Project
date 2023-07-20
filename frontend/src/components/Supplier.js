import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Rating from "./Rating";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { generatePath } from "react-router-dom";

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
    <RouterLink
      to={generatePath("/suppliers/:supplierId/products", {
        supplierId: supplier._id,
      })}
      className="link"
    >
      <Card sx={{ my: 3, p: 3, borderRadius: "16px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", }}>
        <CardMedia
          component="img"
          src={supplier.image}
          alt="Supplier Image"
          style={{ width: "100%", height: "250px", objectFit: "contain" }}
        />

        <CardContent style={{ height: "100px" }}>
          <Typography variant="subtitle1" component="div">
            <strong>{supplier.user.name}</strong>
          </Typography>

          <Typography variant="body2" component="div" sx={{ color: "grey" }}>
            {displayCategories.join(", ")}
          </Typography>

          <Typography variant="body2" component="div">
            <div className="my-3">
              <Rating
                value={supplier.rating}
                text={`${supplier.numReviews} reviews`}
                color={"#f8e825"}
              />
            </div>
          </Typography>
        </CardContent>
      </Card>
    </RouterLink>
  );
}

export default Supplier;
