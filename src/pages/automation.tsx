import SearchableSelect from "@/components/searchableSelect";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAutomationFeatureList, useAutomationServiceList, useGetAutomationRunnerList } from "@/hooks";

import { MediumCard } from "@/components/ui/card";
import Terminal from "@/components/terminal/terminal";
import { usePageAlertContext } from "@/contexts/pageAlertContext";
import { AutomationRunnerList } from "@/components/automation/automationRunnerList";

const priority = ["None", "RAT", "FAST", "TOFT", "FET"];
const platform = ["Web", "Api", "iOS", "Android"];

const Automation = () => {
  const pageAlertContext = usePageAlertContext();
  const messageRef = useRef<HTMLPreElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [content, setContent] = useState("");
  const { featuresIsFetching, features, featuresFetchError } =
    useAutomationFeatureList();
  const { servicesIsFetching, services, servicesFetchError } =
    useAutomationServiceList();

  const { isAutomationRunnerListFetching, automationRunnerList, automationRunnerListError } = useGetAutomationRunnerList();
  const [automationConfig, setAutomationConfig] = useState({
    cases: "",
    repeat: 1,
    platform: "Web",
    environment: "stage",
    ui_driver: false,
    use_element: false,
  });

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        setContent("");
      };

      socket.onmessage = (event) => {
        if (messageRef.current) {
          messageRef.current.textContent += `${event.data}\n`;
        }
        setContent((prev) => (prev += `${event.data}\n`));
      };

      socket.onclose = () => {};

      socket.onerror = (error) => {
        pageAlertContext.setAlert(`${error}`, "error");
      };
    }

    return () => {
      if (socket) {
        socket?.close();
      }
    };
  }, [socket, messageRef, pageAlertContext]);

  // const [featureList, setFeatureList] = useState<Option[]>([]);

  const handleSelect = (option: Record<string, string>) => {
    setAutomationConfig((prev) => ({ ...prev, feature: option.value }));
  };

  const sendConfig = async () => {
    setButtonDisabled(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/automation/run`,
        automationConfig
      );
      setSocket(
        new (window.WebSocket as new (url: string) => WebSocket)(
          `${process.env.REACT_APP_BACKEND_API}/terminal/ws/${response.data.data.request_id}`
        )
      );
      setButtonDisabled(false);
    } catch (error) {
      pageAlertContext.setAlert(`${error}`, "error");
    }
  };

  const handleConfigChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (event.target.name === "priority") {
      if (event.target.value !== "None") {
        setAutomationConfig((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
      }
    } else {
      setAutomationConfig((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleClickDriverClass = (value: boolean) => {
    setAutomationConfig((prev) => ({ ...prev, ui_driver: value }));
  };

  const handleClickElementClass = (value: boolean) => {
    setAutomationConfig((prev) => ({ ...prev, use_element: value }));
  };

  return (
    <>
      <div className="flex flex-col space-y-4 h-screen p-2 max-h-full md:max-h-full max-w-full md:max-w-full">
        <div className="grid grid-cols-2 space-x-4">
          <MediumCard className="relative space-y-2 rounded-lg overflow-hidden shadow-lg p-4 bg-mac-light-card dark:bg-mac-dark-card text-primary-label dark:text-dark-primary-label">
            <div className="grid grid-cols-3">
              <label className="m-auto">Case Ids:</label>
              <input
                className="p-2 col-span-2 rounded-lg border border-dark-quaternary-label dark:border-dark-quaternary-label bg-transparent"
                placeholder="KQT-xxxx"
                name="cases"
                onChange={handleConfigChange}
              />
            </div>
            <hr className="h-px border-0 ml-10 bg-quaternary-label dark:bg-dark-quaternary-label" />
            <div className="grid grid-cols-3">
              <label htmlFor="" className="m-auto">
                Feature:
              </label>
              {featuresIsFetching && <span className="p-2">Loading...</span>}
              {featuresFetchError && (
                <span className="p-2">Cannot load features...</span>
              )}
              {!featuresIsFetching && !featuresFetchError && (
                <span className="col-span-2">
                  <SearchableSelect
                    // @ts-ignore
                    options={features}
                    name="feature"
                    onSelect={handleSelect}
                  />
                </span>
              )}
            </div>
            <hr className="h-px border-0 ml-10 bg-quaternary-label dark:bg-dark-quaternary-label" />
            <div className="grid grid-cols-3">
              <label htmlFor="" className="m-auto">
                Service:
              </label>
              {servicesIsFetching && <span className="p-2">Loading...</span>}
              {servicesFetchError && (
                <span className="p-2">Cannot load services...</span>
              )}
              {!servicesIsFetching && !servicesFetchError && (
                <span className="col-span-2">
                  <SearchableSelect
                    // @ts-ignore
                    options={services}
                    name="service"
                    onSelect={handleSelect}
                  />
                </span>
              )}
            </div>
            <hr className="h-px border-0 ml-10 bg-quaternary-label dark:bg-dark-quaternary-label" />
            <div className="grid grid-cols-3">
              <label className="m-auto">Environment:</label>
              <input
                className="col-span-2 rounded-lg border border-dark-quaternary-label dark:border-dark-quaternary-label p-2 bg-transparent"
                defaultValue={"stage"}
                name="environment"
                onChange={handleConfigChange}
              />
            </div>
            <hr className="h-px border-0 ml-10 bg-quaternary-label dark:bg-dark-quaternary-label" />
            <div className="grid grid-cols-3">
              <label className="m-auto">Priority:</label>
              <select
                className="col-span-2 rounded-lg border-transparent border-r-8 outline outline-dark-quaternary-label dark:outline-dark-quaternary-label p-2 bg-transparent"
                name="priority"
                onChange={handleConfigChange}
              >
                {priority.map((priority, index) => (
                  <option key={index}>{priority}</option>
                ))}
              </select>
            </div>
            <hr className="h-px border-0 ml-10 bg-quaternary-label dark:bg-dark-quaternary-label" />
            <div className="grid grid-cols-3">
              <label className="m-auto">Platform:</label>
              <select
                className="col-span-2 rounded-lg border-transparent border-r-8 outline outline-dark-quaternary-label dark:outline-dark-quaternary-label p-2 bg-transparent"
                value={automationConfig.platform}
                name="platform"
                onChange={handleConfigChange}
              >
                {platform.map((priority, index) => (
                  <option key={index}>{priority}</option>
                ))}
              </select>
            </div>
          </MediumCard>
          <MediumCard className="relative space-y-2 rounded-lg overflow-hidden shadow-lg p-4 bg-mac-light-card dark:bg-mac-dark-card text-primary-label dark:text-dark-primary-label">
            <div className="grid grid-cols-3 gap-2 justify-items-stretch">
              <div className="col-start-1 col-end-2 justify-self-center">
                <input
                  type="checkbox"
                  className="rounded-sm p-2 w-4 h-4 m-auto"
                  onChange={(e) => handleClickDriverClass(e.target.checked)}
                />
              </div>
              <div className="col-start-2 col-end-4 justify-self-center">
                <label className="m-auto uppercase">use ui driver class</label>
              </div>
              <div className="col-start-1 col-end-4">
                <hr className="h-px border-0 ml-10 bg-quaternary-label dark:bg-dark-quaternary-label" />
              </div>
              <div className="col-start-1 col-end-2 justify-self-center">
                <input
                  type="checkbox"
                  className="rounded-sm p-2 w-4 h-4 m-auto"
                  onChange={(e) => handleClickElementClass(e.target.checked)}
                />
              </div>
              <div className="col-start-2 col-end-4 justify-self-center">
                <label className="m-auto uppercase self-end">
                  use element class
                </label>
              </div>
              <div className="absolute block max-w-full bottom-0 right-4 left-0">
                <button
                  className="m-2 p-2 bg-blue-500 rounded-lg w-full uppercase disabled:bg-blue-900 text-dark-primary-label"
                  onClick={() => sendConfig()}
                  disabled={buttonDisabled}
                >
                  Go
                </button>
              </div>
            </div>
          </MediumCard>
        </div>
        <Terminal content={content} />
        <div>
          {automationRunnerListError && <div>{automationRunnerListError.message}</div>}
          {!isAutomationRunnerListFetching && <AutomationRunnerList runnerList={automationRunnerList}/>}
        </div>
      </div>
    </>
  );
};

export default Automation;
