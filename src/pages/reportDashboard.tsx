import TestRunList from "@/components/testrun/testRunList";

import { useParams } from "react-router-dom";

import { QALineChart } from "@/components/ui/chart";



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
            <QALineChart
              title="Operation"
              data={data}
              lineColor="#006Ff1"
              xLineDataKey="date"
              lineDataKey="pass_rate"
            />
          </div>
          <div className="w-1/2 h-1/3 max-w-screen-md rounded-lg overflow-hidden shadow-lg p-4 bg-mac-light-card dark:bg-mac-dark-card text-primary-label dark:text-dark-primary-label">
            <QALineChart
              title="product"
              data={data}
              lineColor="#006Ff1"
              xLineDataKey="date"
              lineDataKey="pass_rate"
            />
          </div>
          <div className="w-1/2 h-1/3 max-w-screen-md rounded-lg overflow-hidden shadow-lg p-4 bg-mac-light-card dark:bg-mac-dark-card text-primary-label dark:text-dark-primary-label">
            <QALineChart
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
