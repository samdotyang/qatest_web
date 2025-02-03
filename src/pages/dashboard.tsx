import { ReactElement } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { QABarChart } from "@/components/ui/chart";

import {
  useAutomationCaseCount,
  useGetPassRate,
  useGetAutomationTestCaseCount,
} from "@/hooks";
import { Loader2 } from "lucide-react";
import { kMaxLength } from "buffer";

type StatCardProps = {
  title: string;
  value: string;
  isLoading: boolean;
};

const StatCard = ({ title, value, isLoading }: StatCardProps) => (
  <Card className="backdrop-blur-sm">
    <CardContent className="pt-6">
      <div className="flex flex-col space-y-1 md:text-wrap">
        <p className="text-sm text-muted-foreground">{title}</p>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <p className="text-2xl font-bold">{value}</p>
        )}
      </div>
    </CardContent>
  </Card>
);

type InfoCardProps = {
  title: string;
  children: ReactElement;
  isLoading: boolean;
};

const InfoCard = ({ title, isLoading, children }: InfoCardProps) => (
  <Card className="bg-transparent border-none">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="bg-card backdrop-blur-sm border rounded-lg shadow-sm p-0">
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </CardContent>
  </Card>
);

const CasesCountCard = ({
  isLoading,
  data,
  error,
}: {
  isLoading: boolean;
  data: Array<Record<string, number>>;
  error?: Error | null;
}) => (
  <Card className="bg-transparent border-none">
    <CardHeader>
      <CardTitle>Cases</CardTitle>
    </CardHeader>
    <CardContent className="bg-card backdrop-blur-sm border rounded-lg shadow-sm p-0">
      {error && error.message}
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
        {Object.entries(data[0]).map(([k, v], index) => (
          <div className={`${index + 1 !== Object.keys(data[0]).length ? "border-b" : ""} p-2`}>
            <div className="grid grid-cols-2">
              <span className="m-auto uppercase">{k}</span>
              <span className="m-auto">{v} cases</span>
            </div>
          </div>
        ))}
        </>
      )}
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { isPending, isFetching, automationCaseCount, error } =
    useAutomationCaseCount();

  const {
    automationTestCaseCountIsFetching,
    automationTestCaseCount,
    automationTestCaseCountError,
  } = useGetAutomationTestCaseCount();

  const {
    passRate: dailyPassRate,
    isPassRateLoading: isDailyPassRateLoading,
    passRateError: dailyPassRateError,
  } = useGetPassRate(undefined, undefined, "daily");

  const totalCases = error ? 0 : automationCaseCount?.data ?? 0;
  const isLoading = isPending || isFetching;

  return (
    <>
      <div className="space-y-8 text-primary-label">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Total Automation Cases"
            value={`${totalCases} cases`}
            isLoading={isLoading}
          />
          <StatCard
            title="Pass Rate (TO_BE_REPLCED)"
            value="85.5%"
            isLoading={isLoading}
          />
          <StatCard
            title="Test Coverage (FAKE DATA)"
            value="50%"
            isLoading={isLoading}
          />
        </div>
        <div>
          <div className="grid gap-4 md:grid-cols-4">
            <CasesCountCard
              isLoading={automationTestCaseCountIsFetching}
              data={automationTestCaseCount ? automationTestCaseCount.data : []}
              error={automationTestCaseCountError}
            />
            <InfoCard title="Recently Added cases" isLoading={isLoading}>
              <p>Content{/* Placeholder */}</p>
            </InfoCard>
            <InfoCard title="Coverage (FAKE DATA)" isLoading={isLoading}>
              <>
                <div className="border-b p-2">
                  <div className="grid grid-cols-2">
                    <span className="m-auto">OPERATION</span>
                    <span className="place-self-center">2 %</span>
                  </div>
                </div>
                <div className="border-b p-2">
                  <div className="grid grid-cols-2">
                    <span className="m-auto">PRODUCT</span>
                    <span className="place-self-center">2 %</span>
                  </div>
                </div>
                <div className="p-2">
                  <div className="grid grid-cols-2">
                    <span className="m-auto">B2C</span>
                    <span className="place-self-center">2 %</span>
                  </div>
                </div>
              </>
            </InfoCard>
            <InfoCard title="Team Activity" isLoading={isLoading}>
              <>
                <div className="border-b p-2">Operation - SOME BIG PROJECT</div>
                <div className="border-b p-2">Product - SOME BIG PROJECT</div>
                <div className="p-2">B2C - SOME BIG PROJECT</div>
              </>
            </InfoCard>
          </div>
        </div>
        <div>PLACEHOLDER</div>
        {/* Trends Section */}
        <div>
          <Card className="bg-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Daily Test Execution Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <>
                {dailyPassRateError && dailyPassRateError.message}
                {!dailyPassRateError && (
                  <QABarChart
                    data={
                      !isDailyPassRateLoading
                        ? [...dailyPassRate.data].reverse()
                        : []
                    }
                    title="Test Execution Trends"
                  />
                )}
              </>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
