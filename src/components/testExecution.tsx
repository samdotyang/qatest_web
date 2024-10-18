import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography } from "@mui/material";
import { BsChevronCompactDown } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";

import TestExecutionItem from "@components/testExecutionItem";

type CaseExecution = {
  description: string;
  exc_time: string;
  name: string;
  status: string;
};

type TestExecution = {
  start_time: string;
  end_time: string;
  pass: number;
  fail: number;
  team: string;
  is_regression: boolean;
  cases: Record<string, CaseExecution[]>;
};

type TestExecutionListProps = {
  testExecution: TestExecution;
  itemClicked: (item: any) => void;
};

const isEmptyDict = (dict: {}) => {
  return Object.keys(dict).length === 0;
};

type FeatureAccordionProp = {
  title: string;
  data: CaseExecution[];
  children: React.ReactNode;
};

const FeatureAccordion = ({ title, data, children }: FeatureAccordionProp) => {
  var pass_count = 0;
  var fail_count = 0;
  data.forEach(function (item) {
    if (item.status === "Pass") {
      pass_count += 1;
    } else if (item.status === "Fail") {
      fail_count += 1;
    }
  });
  return (
    <Accordion
      key={title}
      className="mt-2 bd-mac-light-card dark:bg-mac-dark-card text-black dark:text-white"
      sx={{
        "& .MuiTypography-root": {
          fontSize: "20px",
        },
      }}
    >
      <AccordionSummary
        key={title}
        expandIcon={
          <BsChevronCompactDown className="text-black dark:text-white mr-2" />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography sx={{ width: "80%", flexShrink: 0 }}>{title}</Typography>
        <Typography sx={{ width: "10%" }}>
          <FcApproval className="inline-block mb-1 mr-1" />: {pass_count}
        </Typography>
        <Typography sx={{ width: "10%" }}>
          <FcHighPriority className="inline-block mb-1 mr-1" />: {fail_count}
        </Typography>
        <Typography></Typography>
      </AccordionSummary>
      <AccordionDetails key={title}>{children}</AccordionDetails>
    </Accordion>
  );
};

const TestExecutionList = ({
  testExecution,
  itemClicked,
}: TestExecutionListProps) => {
  if (!isEmptyDict(testExecution)) {
    return (
      <>
        {Object.entries(testExecution.cases).map(([key, value], index) => {
          if (value.length !== 0) {
            return (
              <FeatureAccordion
                key={`${key}_${index}`}
                title={key}
                data={value}
              >
                <div className="flex p-2">
                  <div className="basis-2/12">Case ID</div>
                  <div className="basis-6/12">Description</div>
                  <div className="basis-2/12">Execution Time</div>
                  <div className="basis-2/12">Result</div>
                </div>
                <hr className="p-2"></hr>
                {value.map((value, index) => (
                  <TestExecutionItem key={`item_${index}`} value={value} onItemClick={itemClicked} />
                ))}
              </FeatureAccordion>
            );
          } else {
            return (
              <>
                <div key={`${index}`}></div>
              </>
            );
          }
        })}
      </>
    );
  } else {
    return <div>No test execution data found.</div>;
  }
};

export default TestExecutionList;
