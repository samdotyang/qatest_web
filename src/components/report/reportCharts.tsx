import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { QABarChart } from "@/components/ui/chart";

import { useGetPassRate } from "@/hooks";
import { Loader2 } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  isLoading: boolean;
};

type ChartSectionProps = {
  title: string;
  data: Array<any>;
  error?: any;
};

const StatCard = ({ title, value, isLoading }: StatCardProps) => (
  <Card className="bg-card backdrop-blur-xs">
    <CardContent className="pt-6">
      <div className="flex flex-col space-y-1">
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

const ChartSection = ({ title, data, error }: ChartSectionProps) => (
  <Card className="bg-card backdrop-blur-xs">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <>
        {error && error.message}
        {!error && <QABarChart title={title} data={data} />}
      </>
    </CardContent>
  </Card>
);

export const ReportCharts = () => {
  const {
    passRate: operationRegressionPassRate,
    isPassRateLoading: isOperationRegressionPassRateLoading,
    passRateError: operationRegressionPassRateError,
  } = useGetPassRate("operation", undefined, "regression");
  const {
    passRate: productRegressionPassRate,
    isPassRateLoading: isProductRegressionPassRateLoading,
    passRateError: productRegressionPassRateError,
  } = useGetPassRate("product", undefined, "regression");
  const {
    passRate: b2cRegressionPassRate,
    isPassRateLoading: isB2CRegressionPassRateLoading,
    passRateError: b2cRegressionPassRateError,
  } = useGetPassRate("b2c", undefined, "regression");
  const {
    passRate: operationDailyPassRate,
    isPassRateLoading: isOperationDailyPassRateLoading,
    passRateError: operationDailyPassRateError,
  } = useGetPassRate("operation", undefined, "daily");
  const {
    passRate: productDailyPassRate,
    isPassRateLoading: isProductDailyPassRateLoading,
    passRateError: productDailyPassRateError,
  } = useGetPassRate("product", undefined, "daily");
  const {
    passRate: b2cDailyPassRate,
    isPassRateLoading: isB2CDailyPassRateLoading,
    passRateError: b2cDailyPassRateError,
  } = useGetPassRate("b2c", undefined, "daily");
  const {
    passRate: dailyPassRate,
    isPassRateLoading: isDailyPassRateLoading,
    passRateError: dailyPassRateError,
  } = useGetPassRate(undefined, undefined, "daily");

  return (
    <>
      <div className="space-y-8 text-primary-label">
        <div>
          <h2 className="text-lg font-semibold mb-4">Regression Analysis</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <ChartSection
              title="Operation"
              data={
                !isOperationRegressionPassRateLoading
                  ? [...operationRegressionPassRate.data].reverse()
                  : []
              }
              error={operationRegressionPassRateError}
            />
            <ChartSection
              title="Product"
              data={
                !isProductRegressionPassRateLoading
                  ? [...productRegressionPassRate.data].reverse()
                  : []
              }
              error={productRegressionPassRateError}
            />
            <ChartSection
              title="B2C"
              data={
                !isB2CRegressionPassRateLoading
                  ? [...b2cRegressionPassRate.data].reverse()
                  : []
              }
              error={b2cRegressionPassRateError}
            />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Daily Analysis</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <ChartSection
              title="Operation"
              data={
                !isOperationDailyPassRateLoading
                  ? [...operationDailyPassRate.data].reverse()
                  : []
              }
              error={operationDailyPassRateError}
            />
            <ChartSection
              title="Product"
              data={
                !isProductDailyPassRateLoading
                  ? [...productDailyPassRate.data].reverse()
                  : []
              }
              error={productDailyPassRateError}
            />
            <ChartSection
              title="B2C"
              data={
                !isB2CDailyPassRateLoading
                  ? [...b2cDailyPassRate.data].reverse()
                  : []
              }
              error={b2cDailyPassRateError}
            />
          </div>
        </div>
        {/* Trends Section */}
        <div>
          <Card className="bg-card backdrop-blur-xs">
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
