import SearchableSelect from "@/components/searchableSelect";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { MediumCard } from "@/components/ui/card";
import Terminal from "@/components/terminal/terminal";

type Option = {
  value: string;
  label: string;
};

const priority = ["None", "RAT", "FAST", "TOFT", "FET"];
const platform = ["Web", "Api", "iOS", "Android"];

const Automation = () => {
  const messageRef = useRef<HTMLPreElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [createSocket, setCreateSocket] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [content, setContent] = useState("");

  const [automationConfig, setAutomationConfig] = useState({
    cases: "",
    repeat: 1,
    platform: "Web",
    environment: "stage",
    ui_driver: false,
    use_element: false,
  });

  const [featureList, setFeatureList] = useState<Option[]>([]);

  const handleSelect = (option: Record<string, string>) => {
    setAutomationConfig((prev) => ({ ...prev, feature: option.value }));
  };

  const getFeatures = async () => {
    fetch(`${process.env.REACT_APP_BACKEND_API}/automation/features`)
      .then((res) =>
        res.json().then((data) => {
          const features: Option[] = [];
          data.data.map((feature: string) =>
            features.push({ value: feature, label: feature })
          );
          console.log(features);
          setFeatureList(features);
        })
      )
      .catch((err) => err);
  };

  const sendConfig = async () => {
    console.log(automationConfig);
    setButtonDisabled(true);
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}/automation/run`,
      automationConfig
    );
    setSocket(
      new (window.WebSocket as new (url: string) => WebSocket)(
        `${process.env.REACT_APP_BACKEND_API}/terminal/ws`
      )
    );
    console.log(res.data);
    setCreateSocket(true);
    setButtonDisabled(false);
  };

  useEffect(() => {
    console.log("USE EFFECT CALLED");
    getFeatures();
    if (socket) {
      socket.onopen = () => {
        console.log("WebSocket connection opened");
      };

      socket.onmessage = (event) => {
        console.log(event.data);
        if (messageRef.current) {
          messageRef.current.textContent += `${event.data}\n`;
        }
        setContent((prev) => (prev += `${event.data}\n`));
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    }
  }, [socket, messageRef]);

  // handle user input
  const handleCaseIds = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutomationConfig((prev) => ({ ...prev, cases: e.target.value }));
  };

  const handleEnvironment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutomationConfig((prev) => ({ ...prev, environment: e.target.value }));
  };

  const handlePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "None") {
      setAutomationConfig((prev) => ({ ...prev, priority: e.target.value }));
    }
  };

  const handlePlatform = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAutomationConfig((prev) => ({ ...prev, platform: e.target.value }));
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
                onChange={handleCaseIds}
              />
            </div>
            <hr className="h-px border-0 ml-10 bg-quaternary-label dark:bg-dark-quaternary-label" />
            <div className="grid grid-cols-3">
              <label htmlFor="" className="m-auto">
                Feature:
              </label>
              <span className="col-span-2">
                <SearchableSelect
                  options={featureList}
                  onSelect={handleSelect}
                />
              </span>
            </div>
            <hr className="h-px border-0 ml-10 bg-quaternary-label dark:bg-dark-quaternary-label" />
            <div className="grid grid-cols-3">
              <label className="m-auto">Environment:</label>
              <input
                className="col-span-2 rounded-lg border border-dark-quaternary-label dark:border-dark-quaternary-label p-2 bg-transparent"
                defaultValue={"stage"}
                onChange={handleEnvironment}
              />
            </div>
            <hr className="h-px border-0 ml-10 bg-quaternary-label dark:bg-dark-quaternary-label" />
            <div className="grid grid-cols-3">
              <label className="m-auto">Priority:</label>
              <select
                className="col-span-2 rounded-lg border border-dark-quaternary-label dark:border-dark-quaternary-label p-2 bg-transparent"
                onChange={handlePriority}
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
                className="col-span-2 rounded-lg border border-dark-quaternary-label dark:border-dark-quaternary-label p-2 bg-transparent"
                onChange={handlePlatform}
                value={automationConfig.platform}
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
                  className="m-2 p-2 bg-blue-500 rounded-lg w-full uppercase disabled:bg-blue-900"
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
      </div>
    </>
  );
};

export default Automation;
