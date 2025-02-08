import React, { useState } from "react";
import { useGetStressDataList, useGetStressData } from "@/hooks";
import SearchableSelect from "../searchableSelect";

type StressDataProps = {
  stressData?: Record<string, string>;
};

type EditablePreProps = {
  key: string;
  content: string;
};

const EditablePre = ({ key, content }: EditablePreProps) => {
  return (
    <pre
      contentEditable={true}
      key={key}
      className="dark:bg-black p-4 rounded-lg overflow-hidden overflow-x-auto overflow-y-auto max-h-96"
    >
      {content}
    </pre>
  );
};

export const StressData = ({ stressData }: StressDataProps) => {

  return (
    <>
      <div className="flex">
        <span className="py-2 pr-4">url:</span>
        <input
          name="url"
          onChange={() => {}}
          defaultValue={stressData ? stressData.url : ""}
          className="w-full border rounded-lg p-2 bg-card"
        />
      </div>
      <div className="flex">
        <span className="py-2 pr-4">method:</span>
        <select
          name="method"
          defaultValue={stressData ? stressData.method : "GET"}
          onChange={() => {}}
          className="w-full border rounded-lg p-2 bg-card"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div>headers: (json format)</div>
      <EditablePre
        key="headers"
        content={
          stressData ? JSON.stringify(stressData.headers, null, "\t") : ""
        }
      />
      <div>body:</div>
      <EditablePre
        key="body"
        content={
          stressData ? JSON.stringify(stressData.payload, null, "\t") : ""
        }
      />
    </>
  );
};

/** STRESS CONFIG */

type StressConfigProps = {
  onSubmit: (config: any) => void;
};

export const StressPanel = ({ onSubmit }: StressConfigProps) => {
  const [selectedPresetFilename, setSelectedPresetFilename] = useState("");
  const { isStressDataListFetching, stressDataList, stressDataListError } =
    useGetStressDataList();
  const { isStressDataFetching, stressData, stressDataError } =
    useGetStressData(selectedPresetFilename);
  const [stressConfig, setStressConfig] = useState({
    endpoint: "",
    concurrency: 1,
    loop: 1,
    pool: false,
    is_debug: false,
  });

  const selectData = (filename: string) => {
  
    setSelectedPresetFilename(filename);
    setStressConfig((prev) => ({ ...prev, endpoint: filename }));
  };

  const handleConfigChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (event.target.name === "concurrency" || event.target.name === "loop") {
      if (parseInt(event.target.value) < 1) {
        window.alert("Should be greate than 1 or just 1");
        event.target.value = "1";
      }
    }
  
    setStressConfig((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSelect = (field: string) => (option: Record<string, string>) => {
    setStressConfig((prev) => ({
      ...prev,
      [field]: option.value,
    }));
  };

  return (
    <>
      <div className="flex flex-col space-y-2 bg-card shadow-lg rounded-lg max-w-(--breakpoint-md) overflow-hidden p-4 text-primary-label ">
        <div className="space-y-2">
          <div className="grid grid-cols-3">
            <span className="m-auto">preset data:</span>
            {/* <Select value={} /> */}
            <SearchableSelect
              options={[]}
              value={""}
              name="endpoint"
              onSelect={handleSelect("endpoint")}
            />
            <select
              className="col-span-2 block border rounded-lg p-2 bg-card"
              defaultValue={""}
              name="endpoint"
              onChange={(e) => {
                selectData(e.target.value);
              }}
            >
              {!isStressDataListFetching &&
                !stressDataListError &&
                stressDataList.data.map((data: string, key: number) => (
                  <option key={key}>{data}</option>
                ))}
              <option key={"none"}>{""}</option>
            </select>
          </div>
          <div className="grid grid-cols-3">
            <span className="m-auto">concurrency:</span>
            <input
              type="number"
              name="concurrency"
              value={stressConfig.concurrency}
              onChange={handleConfigChange}
              className="col-span-2 block border rounded-lg p-2 bg-card"
            />
          </div>
          <div className="grid grid-cols-3">
            <span className="m-auto">loop:</span>
            <input
              type="number"
              name="loop"
              value={stressConfig.loop}
              onChange={handleConfigChange}
              className="col-span-2 block border rounded-lg p-2 bg-card"
            />
          </div>
          <div className="grid grid-cols-3">
            <label htmlFor="debug" className="m-auto">
              Debug Mode
            </label>
            <input
              id="debug"
              name="is_debug"
              type="checkbox"
              className="w-4 col-span-2"
              checked={stressConfig.is_debug}
              onChange={handleConfigChange}
            />
          </div>
        </div>
        <div className="grow place-content-end">
          <button
            className=" text-white bg-blue-500 w-full border rounded-lg p-2"
            onClick={() => {
              onSubmit(stressConfig);
            }}
          >
            Start
          </button>
        </div>
      </div>
      <div className="grow space-y-2 max-w-screen rounded-lg overflow-hidden shadow-lg p-4 bg-card text-primary-label ">
        <StressData
          stressData={
            !isStressDataFetching &&
            !stressDataError &&
            stressData &&
            selectedPresetFilename !== ""
              ? stressData[0]
              : {}
          }
        />
      </div>
    </>
  );
};
