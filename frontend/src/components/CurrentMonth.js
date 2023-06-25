import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function preventDefault(event) {
  event.preventDefault();
}

export default function CurrentMonth({ data }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate("/pos");
  };

  return (
    <React.Fragment>
      <Typography
        component="h2"
        variant="h6"
        color={theme.palette.warning.main}
        gutterBottom
      >
        This Month
      </Typography>
      <Typography component="p" variant="h4">
        ${data && data.profit}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {new Date().toLocaleString("default")}
      </Typography>
      <div>
        <Link
          color={theme.palette.warning.main}
          href=""
          onClick={handleClick}
          sx={{ mt: 3 }}
        >
          Add Sales
        </Link>
      </div>
    </React.Fragment>
  );
}
