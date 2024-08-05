import { MediumCard, Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useCallback, useState } from "react";
import JsonEditor from "@/components/jsonEditor";
import type { Content, OnChangeStatus } from "vanilla-jsoneditor";
import Terminal from "@/components/terminal/terminal";

type Response = {
  messages: string;
  data: [];
};

const Stress = () => {
  const [content, setContent] = useState<Content>({ json: {} });
  const [terminalContent, setTerminalContent] = useState("");
  const handler = useCallback(
    (content: Content, previousContent: Content, status: OnChangeStatus) => {
      console.log(content);
      setContent(content);
    },
    []
  );
  const [dataList, setDataList] = useState<Response | null>(null);
  const [stressConfig, setStressConfig] = useState({
    endpoint: "",
    users: 1,
    loop: 1,
    pool: false,
    is_debug: false,
  });
  const getData = async () => {
    fetch(`${process.env.REACT_APP_BACKEND_API}/stress/lists`)
      .then((res) => res.json().then((data) => setDataList(data)))
      .catch((err) => err);
  };

  const getDataContent = async (data: string) => {
    fetch(`${process.env.REACT_APP_BACKEND_API}/stress/data/${data}`)
      .then((res) =>
        res.json().then((data) => {
          setContent({ json: JSON.parse(data["data"]) });
        })
      )
      .catch((err) => console.log(err));
  };

  const selectData = (data: string) => {
    setStressConfig((prev) => ({ ...prev, endpoint: data }));
    getDataContent(data);
  };

  const handleUsersValue = (value: string) => {
    console.info("handleUsersValue", value);
    setStressConfig((prev) => ({ ...prev, users: parseInt(value) }));
  };

  const handleLoopsValue = (value: string) => {
    console.info("handleLoopsValue", value);
    setStressConfig((prev) => ({ ...prev, loop: parseInt(value) }));
  };

  const handleUsePoolValue = (value: boolean) => {
    console.info("handleUsePoolValue", value);
    setStressConfig((prev) => ({ ...prev, pool: value }));
  };

  const handleDebugValue = (value: boolean) => {
    console.info("handleDebugValue", value);
    setStressConfig((prev) => ({ ...prev, is_debug: value }));
  };

  const handleSubmit = async () => {
    console.log(stressConfig);
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}/stress/run`,
      stressConfig
    );
    console.log(res);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-4 h-1/2">
        <div className="flex flex-col space-y-2 bg-mac-light-card dark:bg-mac-dark-card shadow-lg rounded-lg max-w-screen-md overflow-hidden p-4 text-primary-label dark:text-dark-primary-label">
        <div className="space-y-2">
          <div className="grid grid-cols-3">
            <span className="m-auto">data:</span>
            <select
              className="col-span-2 block border rounded-lg p-2 dark:bg-mac-dark-card"
              defaultValue={""}
              onChange={(e) => {
                selectData(e.target.value);
              }}
            >
              {dataList &&
                dataList.data.map((data, key) => (
                  <option key={key}>{data}</option>
                ))}
              <option key={"none"}>{""}</option>
            </select>
          </div>
          <div className="grid grid-cols-3">
            <span className="m-auto">users:</span>
            <input
              type="number"
              value={stressConfig.users}
              onChange={(e) => handleUsersValue(e.target.value)}
              className="col-span-2 block border rounded-lg p-2 dark:bg-mac-dark-card"
            />
          </div>
          <div className="grid grid-cols-3">
            <span className="m-auto">loop:</span>
            <input
              type="number"
              value={stressConfig.loop}
              onChange={(e) => handleLoopsValue(e.target.value)}
              className="col-span-2 block border rounded-lg p-2 dark:bg-mac-dark-card"
            />
          </div>
          <div className="grid grid-cols-3">
            <input
              id="pool"
              type="checkbox"
              className="w-4 m-auto"
              checked={stressConfig.pool}
              onChange={(e) => handleUsePoolValue(e.target.checked)}
            />
            <label htmlFor="pool" className="col-span-2">
              Use MultiProcessing.Pool
            </label>
          </div>
          <div className="grid grid-cols-3">
            <input
              id="debug"
              type="checkbox"
              className="w-4 m-auto"
              checked={stressConfig.is_debug}
              onChange={(e) => handleDebugValue(e.target.checked)}
            />
            <label htmlFor="debug" className="col-span-2">
              Debug Mode
            </label>
          </div>
          </div>
          <div className="grow place-content-end">
          <button
            className=" text-white bg-blue-500 w-full border rounded-lg p-2"
            onClick={() => {
              console.log(stressConfig);
              handleSubmit();
            }}
          >
            Start
          </button>
          </div>
        </div>
        {/* </div> */}
        <div className="grow space-y-2 max-w-screen rounded-lg overflow-hidden shadow-lg p-4 bg-mac-light-card dark:bg-mac-dark-card text-primary-label dark:text-dark-primary-label">
          <JsonEditor content={content} onChange={handler} />
        </div>
      </div>
      <Terminal content={terminalContent} />
    </div>
  );
};

export default Stress;
