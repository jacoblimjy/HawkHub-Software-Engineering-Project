import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Typography from "@mui/material/Typography";

export default function Chart({ data }) {
  const theme = useTheme();

  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{
          top: 16,
          right: 16,
          bottom: 0,
          left: 24,
        }}
      >
        <XAxis
          dataKey="date"
          stroke={theme.palette.text.secondary}
          style={theme.typography.body2}
        />
        <YAxis
          stroke={theme.palette.text.secondary}
          style={theme.typography.body2}
        >
          <Label
            angle={270}
            position="left"
            style={{
              textAnchor: "middle",
              fill: theme.palette.text.primary,
              ...theme.typography.body1,
            }}
          >
            Profit ($)
          </Label>
        </YAxis>
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="profit"
          stroke={theme.palette.warning.main}
          dot={true}
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
