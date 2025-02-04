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
  TooltipProps,
} from "recharts";
import {
    NameType,
    ValueType,
  } from "recharts/types/component/DefaultTooltipContent";

type QABarChartProps = {
  title: string;
  data: Array<any>;
};

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
        <div className="custom-tooltip p-2 rounded-lg border bg-gray-400">
            <p className="label">{label}</p>
            <p className="intro">Pass Rate</p>
            <p className="desc">{`${payload[0].name} - ${payload[0].value}%`}</p>
        </div>
        );
    }
    
    return null;
}

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
          <Tooltip content={<CustomTooltip />}/>
          <Legend />

          <Bar
            radius={[5, 5, 0, 0]}
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
