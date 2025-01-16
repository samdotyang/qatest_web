import {
  LineChart,
  XAxis,
  YAxis,
  Text,
  Line,
  Legend,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { Box } from "@mui/material";

import { generateRandomHexColor } from "@/lib/utils";
import React from "react";

type LineChartProps = {
  title: string;
  data: Array<any>;
  xLineDataKey: string;
  lineDataKey: Array<string>;
  lineColor?: Array<string>;
};

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip p-2 rounded-lg border bg-gray-400">
        <p className="label">{label}</p>
        <p className="intro">Pass Rate</p>
        <p className="desc">{`${payload[0].name} - ${payload[0].value}%`}</p>
        <p className="desc">{`${payload[1].name} - ${payload[1].value}%`}</p>
      </div>
    );
  }

  return null;
};

const NoDataLabel = () => (
  <Text x="100%" y="10%" textAnchor="middle" dominantBaseline="middle">
    No Data
  </Text>
);

const QALineChart = ({
  title,
  data,
  xLineDataKey,
  lineDataKey,
  lineColor,
}: LineChartProps) => {
  const noData = data.length === 0 ? true : false;
  if (!lineColor) {
    lineColor = [generateRandomHexColor(), generateRandomHexColor()];
  }
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <strong style={{ paddingLeft: "10%", fontSize: "20px" }}>
        {title.toUpperCase()}
      </strong>
      <ResponsiveContainer aspect={1.2} maxHeight={window.screen.height / 3}>
        {noData ? <NoDataLabel /> :
        <LineChart data={data} title={title}>
          <XAxis dataKey={xLineDataKey} fontSize={10} />
          <YAxis tickFormatter={(value) => `${value}%`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey={lineDataKey[0]}
            stroke={lineColor[0]}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey={lineDataKey[1]}
            stroke={lineColor[1]}
            activeDot={{ r: 8 }}
          />
        </LineChart>
        }
      </ResponsiveContainer>
    </Box>
  );
};

export default QALineChart;
