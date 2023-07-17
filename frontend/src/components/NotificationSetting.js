import { useContext, useState } from "react";
import { WebsocketContext } from "./WebSocketProvider";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography, Button } from "@mui/material";
import Message from "../components/Message";

export default function NotificationSetting() {
  const [ready, val, send] = useContext(WebsocketContext);
  const [value, setValue] = useState(ready ? val.noticePeriod : 7);

  const submitHandler = () => {
    send(
      JSON.stringify({
        type: "updateNoticePeriod",
        noticePeriod: value,
      })
    );
  };

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Typography>
        Current Notice Period: {ready ? val.noticePeriod : "Unknown"} days
      </Typography>
      <Slider
        aria-label="Temperature"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        valueLabelDisplay="auto"
        step={1}
        min={0}
        max={14}
        color="warning"
        sx={{ paddingY: 3 }}
      />
      <Box display={"flex"} justifyContent={"right"}>
        <Button
          variant="contained"
          color="warning"
          onClick={submitHandler}
          size="large"
          sx={{}}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
