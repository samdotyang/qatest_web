import {
  LineChart,
  XAxis,
  YAxis,
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

type LineChartProps = {
  title: string;
  data: Array<any>;
  xLineDataKey: string;
  lineDataKey: string;
  lineColor: string;
};

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">This is intro</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};

const QALineChart = ({
  title,
  data,
  xLineDataKey,
  lineDataKey,
  lineColor,
}: LineChartProps) => {
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <strong style={{ paddingLeft: "10%", fontSize: "20px" }}>
        {title.toUpperCase()}
      </strong>
      <ResponsiveContainer aspect={1.2} maxHeight={window.screen.height / 3}>
        <LineChart data={data} title={title}>
          <XAxis dataKey={xLineDataKey} fontSize={10} />
          <YAxis tickFormatter={(value) => `${value}%`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey={lineDataKey}
            stroke={lineColor}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default QALineChart;
