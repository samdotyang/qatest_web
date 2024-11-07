import { useState, SyntheticEvent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useGetAutomationTestCase } from "@/hooks";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Header = ({
  value,
  handleTabChange,
}: {
  value: number;
  handleTabChange: (event: SyntheticEvent, newValue: number) => void;
}) => {
  return (
    <Tabs value={value} onChange={handleTabChange}>
      {["Log", "Screenshot", "Case"].map((item, index) => (
        <Tab
          className="text-primary-label dark:text-dark-primary-label"
          key={index}
          label={item}
        ></Tab>
      ))}
    </Tabs>
  );
};

const LogView = ({ path, selected }: { path: string; selected: string }) => {
  const [content, setContent] = useState("");
  const [logList, setLogList] = useState<Array<string>>([]);
  const [showList, setShowList] = useState(false);
  const [selectedLog, setSelectedLog] = useState(selected);
  const getLog = () => {
    fetch(`${process.env.REACT_APP_BACKEND_API}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fp: path }),
    })
      .then((response) => response.json())
      .then((response) => {
        if ("data" in response) {
          setShowList(true);
          response.data.forEach((element: string) => {
            setLogList((prev) => [...prev, element]);
          });
          setLogList(response.data);
        } else {
          setContent(response.message);
        }
      })
      .catch((error) => setContent(error));
  };

  const getLogContent = (logName: string) => {
    fetch(
      `${process.env.REACT_APP_BACKEND_API}/logs?` +
        new URLSearchParams({
          date: path.split("/")[0],
          host: path.split("/")[1],
          folder: path.split("/")[2],
          feature: path.split("/")[3],
          logName: logName,
          ext: "log"
        }).toString()
    )
      .then((response) => response.json())
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => setContent(error));
  };

  useEffect(() => {
    getLog();
    if (selected) {
        getLogContent(selected);
    }
  }, []);

  const handleLogSelect = (logName: string) => {
    const filename = logName.split(".")[0];
    setSelectedLog(filename);
    getLogContent(filename);
  };

  return (
    <>
      {showList && (
        <>
          <ul className="bg-mac-light-card dark:bg-mac-sidebar-dark p-2 rounded-lg mb-2 text-primary-label dark:text-dark-primary-label">
            {logList.map((logName, index) => (
              <li
                key={index}
                className={`${
                  logName === selectedLog + ".log"
                    ? " bg-mac-sidebar-light-select dark:bg-mac-sidebar-dark-select"
                    : ""
                } p-1 rounded-lg hover:bg-mac-sidebar-dark-select hover:cursor-pointer`}
                onClick={() => handleLogSelect(logName)}
              >
                {logName}
              </li>
            ))}
          </ul>
        </>
      )}
      <pre className="text-black dark:text-white bg-zinc-400 dark:bg-zinc-600 p-4 rounded-lg overflow-x-auto overflow-y-auto h-4/6 max-h-max md:max-h-screen">
        {true && <code>{content ? content : "No content"}</code>}
      </pre>
    </>
  );
};

const ScreenshotView = ({ path }: { path: string }) => {
  const [imageList, setImageList] = useState<Array<string>>([]);
  const [showList, setShowList] = useState(false);
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState("")
  const getImageList = () => {
    fetch(`${process.env.REACT_APP_BACKEND_API}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fp: path, ext: "png" }),
    })
      .then((response) => response.json())
      .then((response) => {
        if ("data" in response) {
          setShowList(true);
          response.data.forEach((element: string) => {
            setImageList((prev) => [...prev, element]);
          });
          setImageList(response.data);
        } else {
          setContent(response.message);
        }
      })
      .catch((error) => setContent(error));
  };
  const getImageContent = (imageName: string) => {
    fetch(
      `${process.env.REACT_APP_BACKEND_API}/logs?` +
        new URLSearchParams({
          date: path.split("/")[0],
          host: path.split("/")[1],
          folder: path.split("/")[2],
          feature: path.split("/")[3],
          logName: imageName,
          ext: "png",
        }).toString()
    )
      .then((response) => response.json())
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {setContent(error)});
  };
  useEffect(() => {
    getImageList();
  }, []);

  const handleImageSelect = (imageName: string) => {
    const filename = imageName.split(".")[0];
    setSelectedImage(filename);
    getImageContent(filename);
  };
  return (
    <>
      {/* No Images to show */}
      {showList && (
        <>
          <ul className="bg-mac-light-card dark:bg-mac-sidebar-dark p-2 rounded-lg mb-2 text-primary-label dark:text-dark-primary-label">
            {imageList.map((image, index) => (
              <li
                key={index}
                className={`${selectedImage === image.split('.')[0] ? "bg-mac-sidebar-light-select dark:bg-mac-sidebar-dark-select": ""} p-1 rounded-lg hover:bg-mac-sidebar-dark-select hover:cursor-pointer`}
                onClick={() => handleImageSelect(image)}
              >
                {image}
                {/* <img
                                src={`${process.env.REACT_APP_BACKEND_API}/logs/${path}/${image}`}
                                alt={image}
                                width="100%"
                            /> */}
              </li>
            ))}
          </ul>
        </>
      )}
      <pre className="text-black dark:text-white bg-zinc-400 dark:bg-zinc-600 p-4 rounded-lg overflow-x-auto overflow-y-auto h-4/6 max-h-max md:max-h-screen">
        {/* {true && <code>{content ? `data:image/png;base64,${content}` : "No content"}</code>} */}
        {true && <img src={content ? `data:image/png;base64,${content}` : ""} alt={""}/>}
      </pre>
    </>
  );
};

const CaseView = ({ caseId }: { caseId: string }) => {
  const {
    automationTestCase,
    automationTestCaseError,
    automationTestCaseIsFetching,
  } = useGetAutomationTestCase(caseId);

  if (automationTestCaseError) {
    return <>Error: {automationTestCaseError.message}</>;
  }

  return (
    <>
      <pre className="text-black dark:text-white bg-zinc-400 dark:bg-zinc-600 p-4 rounded-lg overflow-x-auto overflow-y-auto h-4/6 max-h-max md:max-h-screen">
        <code>
          {!automationTestCaseIsFetching && automationTestCase.data && (
            <>
              {automationTestCase.data.case_id}
              {"\n"}
              {"\t"}platform: {automationTestCase.data.platform}
              {"\n"}
              {"\t"}priority: {automationTestCase.data.priority}
              {"\n"}
              {"\t"}feature: {automationTestCase.data.feature}
              {"\n"}
              {"\t"}description: {automationTestCase.data.description}
              {"\n"}
              {"\t"}steps: {"\n"}
              {automationTestCase.data.test_steps.map((v: string) => {
                const step = JSON.parse(v);

                if (Object.keys(step.args).length !== 0) {
                  return `\t\t- ${step.name}\n${Object.entries(step.args).map(
                    ([k, v]) => {
                      return `\t\t\t${k}: ${v}\n`;
                    }
                  )}`;
                } else {
                  return `\t\t- ${step.name}\n`;
                }
              })}
            </>
          )}
        </code>
      </pre>
    </>
  );
};

const LogsPage = () => {
  let [searchParams, _] = useSearchParams();
  const date = searchParams.get("date");
  const host = searchParams.get("host");
  const folder = searchParams.get("folder");
  const feature = searchParams.get("feature");
  const name = searchParams.get("name");
  const caseId = name?.split("_")[0];
  const [value, setValue] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <Header value={value} handleTabChange={handleTabChange} />
      </div>
      <TabPanel value={value} index={0}>
        <div>
          <LogView
            path={`${date}/${host}/${folder}/${feature}/${name}`}
            selected={name!}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <ScreenshotView
            path={`${date}/${host}/${folder}/${feature}/${name}`}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
          <CaseView caseId={caseId!} />
        </div>
      </TabPanel>
    </>
  );
};

export default LogsPage;
