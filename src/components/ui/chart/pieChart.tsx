import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  PieLabelRenderProps,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = { red: "#ff0000", green: "#00C49F", grey: "#E8EEFF" };

const QAPieChart = ({ data }: { data: Array<Record<string, any>> }) => {
  const radian = Math.PI / 180;
  const renderLabel: React.FC<PieLabelRenderProps> = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    // const radius =(innerRadius as number) + ((outerRadius as number) - (innerRadius as number)) * 0.5;
    const radius = (innerRadius as number) + (outerRadius as number) * 0.5;
    const x = (cx as number) + radius * Math.cos(-midAngle * radian);
    const y = (cy as number) + radius * Math.sin(-midAngle * radian);

    if ((percent as number) !== 0) {
      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > (cx as number) ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${((percent as number) * 100).toFixed(0)}%`}
        </text>
      );
    } else {
      return <></>;
    }
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderLabel}
          dataKey="value"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.color as keyof typeof COLORS]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default QAPieChart;
