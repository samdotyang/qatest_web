import React from "react";
import { Box } from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

type QABarChartProps = {
  title: string;
  data: Array<any>;
};

const QABarChart = ({ title, data }: QABarChartProps) => {
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <strong style={{ paddingLeft: "10%", fontSize: "20px" }}>
        {title.toUpperCase()}
      </strong>
      <ResponsiveContainer aspect={1.2} maxHeight={window.screen.height / 3}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(value) => `${value}%`} />
          <Tooltip />
          <Legend />

          <Bar
            barSize={40}
            dataKey="pass_rate"
            fill="#0a84ff"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default QABarChart;
