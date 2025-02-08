import TestRunList from "@/components/testrun/testRunList";
import { ReportCharts } from "@/components/report";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReportDashboardPage = () => {
  return (
    <div className="text-primary-label">
      <Tabs defaultValue="charts">
        <TabsList className="w-full">
          <TabsTrigger value="charts" className="flex-1">
            Charts
          </TabsTrigger>
          <TabsTrigger value="list" className="flex-1">
            History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="charts">
          <ReportCharts />
        </TabsContent>
        <TabsContent value="list">
          <div className="flex flex-col space-x-2">
            <TestRunList rows={8} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportDashboardPage;
