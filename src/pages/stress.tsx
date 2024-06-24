import { SmallCard } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

type Response = {
  messages: string;
  data: [];
};

const Stress = () => {
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

  const selectData = (data: string) => {
    setStressConfig((prev) => ({ ...prev, endpoint: data }));
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
    <>
      <SmallCard>
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
        <button
          className="text-white bg-blue-500 w-full border rounded-lg p-2"
          onClick={() => {
            console.log(stressConfig);
            handleSubmit();
          }}
        >
          Start
        </button>
      </SmallCard>
    </>
  );
};

export default Stress;
