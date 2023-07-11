import * as React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { WebsocketContext } from "./WebSocketProvider";
import ErrorIcon from "@mui/icons-material/Error";
import { ButtonGroup, Button, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function NotificationUnread() {
  const navigate = useNavigate();
  const [ready, val, send] = useContext(WebsocketContext);
  const today = new Date().toISOString().split("T")[0];
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {ready
        ? val &&
          val.notification_unread.map((item) => (
            <React.Fragment key={item._id}>
              <ListItem alignItems="center">
                <ListItemAvatar>
                  <ErrorIcon
                    fontSize="large"
                    color={item.isRead ? "disabled" : "warning"}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.subject}
                  secondary={
                    <React.Fragment>
                      <Typography
                        // sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {item.message}
                      </Typography>
                      {item.date == today ? " — Today" : " — " + item.date}
                    </React.Fragment>
                  }
                />

                <ButtonGroup
                  variant="text"
                  aria-label="text button group"
                  orientation={isSmallScreen ? "vertical" : "horizontal"}
                >
                  <Button
                    onClick={() => {
                      navigate("/stocktaking");
                      send(JSON.stringify({ type: "read", id: item._id }));
                    }}
                  >
                    Check Stocks
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/suppliers");
                      send(JSON.stringify({ type: "read", id: item._id }));
                    }}
                  >
                    Get Supplies
                  </Button>
                  <Button
                    onClick={() =>
                      send(JSON.stringify({ type: "read", id: item._id }))
                    }
                    sx={{ px: 2 }}
                  >
                    Confirm
                  </Button>
                </ButtonGroup>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))
        : null}
    </List>
  );
}
