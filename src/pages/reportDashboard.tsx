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
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

import TestRunList from "@/components/testrun/testRunList";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

type LineChartProps = {
  title: string;
  data: Array<any>;
  xLineDataKey: string;
  lineDataKey: string;
  lineColor: string;
};


const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload, label } ) => {
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

const DrawLineChart = ({
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
          {/* <Tooltip content={<CustomTooltip />}/> */}
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

const ReportDashboardPage = () => {
  const params = useParams();
  console.log(params);
  const data = [
    { date: "A", pass_rate: 100 },
    { date: "B", pass_rate: 50 },
    { date: "C", pass_rate: 95 },
    { date: "D", pass_rate: 30 },
    { date: "E", pass_rate: 60 },
    { date: "F", pass_rate: 45 },
    { date: "G", pass_rate: 0 },
  ];

  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row space-x-2">
          <div className="w-1/2 h-1/3 max-w-screen-md rounded-lg overflow-hidden shadow-lg p-4 bg-mac-light-card dark:bg-mac-dark-card text-primary-label dark:text-dark-primary-label">
            <DrawLineChart
              title="Operation"
              data={data}
              lineColor="#006Ff1"
              xLineDataKey="date"
              lineDataKey="pass_rate"
            />
          </div>
          <div className="w-1/2 h-1/3 max-w-screen-md rounded-lg overflow-hidden shadow-lg p-4 bg-mac-light-card dark:bg-mac-dark-card text-primary-label dark:text-dark-primary-label">
            <DrawLineChart
              title="product"
              data={data}
              lineColor="#006Ff1"
              xLineDataKey="date"
              lineDataKey="pass_rate"
            />
          </div>
          <div className="w-1/2 h-1/3 max-w-screen-md rounded-lg overflow-hidden shadow-lg p-4 bg-mac-light-card dark:bg-mac-dark-card text-primary-label dark:text-dark-primary-label">
            <DrawLineChart
              title="b2c"
              data={data}
              lineColor="#006Ff1"
              xLineDataKey="date"
              lineDataKey="pass_rate"
            />
          </div>
        </div>
        <TestRunList rows={8}/>
      </div>
    </>
  );
};

export default ReportDashboardPage;
