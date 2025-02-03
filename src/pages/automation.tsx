import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import axios from "axios";
import { RefreshCw, PlayCircle, Server, Layers } from "lucide-react";
import {
  useAutomationFeatureList,
  useAutomationServiceList,
  useGetAutomationRunnerList,
} from "@/hooks";
import SearchableSelect from "@/components/searchableSelect";
import Terminal from "@/components/terminal/terminal";
import { usePageAlertContext } from "@/contexts/pageAlertContext";
import { AutomationRunnerList } from "@/components/automation/automationRunnerList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Editor from "@monaco-editor/react";
import { useThemeContext } from "@/contexts/themeContext";

const PRIORITY_OPTIONS = ["None", "RAT", "FAST", "TOFT", "FET"];
const PLATFORM_OPTIONS = ["Web", "Api", "iOS", "Android"];

const AutomationDashboard = () => {
  const { currentTheme } = useThemeContext();
  const pageAlertContext = usePageAlertContext();
  const messageRef = useRef<HTMLPreElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [content, setContent] = useState("");
  const { featuresIsFetching, features, featuresFetchError } =
    useAutomationFeatureList();
  const { servicesIsFetching, services, servicesFetchError } =
    useAutomationServiceList();

  const {
    isAutomationRunnerListFetching,
    automationRunnerList,
    automationRunnerListError,
    refetchRunnerList,
  } = useGetAutomationRunnerList();

  const [automationConfig, setAutomationConfig] = useState({
    cases: "",
    repeat: 1,
    platform: "Web",
    environment: "stage",
    feature: "",
    service: "",
    priority: "None",
  });

  const handleSelect = (field: string) => (option: Record<string, string>) => {
    setAutomationConfig((prev) => ({
      ...prev,
      [field]: option.value,
    }));
  };

  const sendConfig = async () => {
    setIsRunning(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/automation/run`,
        automationConfig
      );
      refetchRunnerList();
    } catch (error) {
      pageAlertContext.setAlert(`${error}`, "error");
    } finally {
      setIsRunning(false);
    }
  };

  // @ts-ignore
  const handleCodeConfigChange = (value, event) => {
    setAutomationConfig(JSON.parse(value));
  };

  const handleConfigChange = (field: string, value: string | boolean) => {
    setAutomationConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <div className="mx-auto p-4 space-y-4 text-primary-label ">
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center ">
                <Server className="mr-2" /> Automation Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="basic">
                <TabsList className="w-full">
                  <TabsTrigger value="basic" className="flex-1">
                    Basic
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex-1">
                    Code
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                  <div className="space-y-2">
                    {/* Case IDs */}
                    <div className="grid grid-cols-3 items-center gap-4">
                      <label className="flex items-center">
                        <Layers className="mr-2 size-4" /> Case IDs
                      </label>
                      <Input
                        placeholder="KQT-xxxx"
                        className="col-span-2"
                        value={automationConfig.cases}
                        onChange={(e) =>
                          handleConfigChange("cases", e.target.value)
                        }
                      />
                    </div>

                    {/* Feature Selector */}
                    <div className="grid grid-cols-3 items-center gap-4">
                      <label>Feature</label>
                      {featuresIsFetching ? (
                        <span>Loading...</span>
                      ) : featuresFetchError ? (
                        <span>Error loading features</span>
                      ) : (
                        <SearchableSelect
                          className="col-span-2"
                          value={automationConfig.feature}
                          options={features}
                          name="feature"
                          onSelect={handleSelect("feature")}
                        />
                      )}
                    </div>

                    {/* Service Selector */}
                    <div className="grid grid-cols-3 items-center gap-4">
                      <label>Service</label>
                      {servicesIsFetching ? (
                        <span>Loading...</span>
                      ) : servicesFetchError ? (
                        <span>Error loading services</span>
                      ) : (
                        <SearchableSelect
                          className="col-span-2"
                          options={services}
                          value={automationConfig.service}
                          name="service"
                          onSelect={handleSelect("service")}
                        />
                      )}
                    </div>

                    {/* Environment */}
                    <div className="grid grid-cols-3 items-center gap-4">
                      <label>Environment</label>
                      <Input
                        placeholder="stage/sit"
                        className="col-span-2"
                        value={automationConfig.environment}
                        onChange={(e) =>
                          handleConfigChange("environment", e.target.value)
                        }
                      />
                    </div>

                    {/* Priority */}
                    <div className="grid grid-cols-3 items-center gap-4">
                      <label>Priority</label>
                      <Select
                        value={automationConfig.priority}
                        onValueChange={(value) =>
                          handleConfigChange("priority", value)
                        }
                      >
                        <SelectTrigger className="col-span-2">
                          <SelectValue placeholder="Select Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          {PRIORITY_OPTIONS.map((priority) => (
                            <SelectItem key={priority} value={priority}>
                              {priority}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Platform */}
                    <div className="grid grid-cols-3 items-center gap-4 mt-4">
                      <label>Platform</label>
                      <Select
                        value={automationConfig.platform}
                        onValueChange={(value) =>
                          handleConfigChange("platform", value)
                        }
                      >
                        <SelectTrigger className="col-span-2">
                          <SelectValue placeholder="Select Platform" />
                        </SelectTrigger>
                        <SelectContent>
                          {PLATFORM_OPTIONS.map((platform) => (
                            <SelectItem key={platform} value={platform}>
                              {platform}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="code">
                  <Editor
                    height="40vh"
                    theme={`${currentTheme === "dark" ? "vs-dark" : "light"}`}
                    defaultLanguage="json"
                    defaultValue={JSON.stringify(automationConfig, null, 2)}
                    onChange={handleCodeConfigChange}
                    options={{ minimap: { enabled: false } }}
                  />
                </TabsContent>
              </Tabs>
              {/* Run Button */}
              <Button
                onClick={sendConfig}
                disabled={isRunning}
                className="w-full"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="mr-2 animate-spin" /> Running
                  </>
                ) : (
                  <>
                    <PlayCircle className="mr-2" /> Run Automation
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Runners */}
          <div className="space-y-2">
            {automationRunnerListError && (
              <Card>
                <CardContent className="text-destructive">
                  {automationRunnerListError.message}
                </CardContent>
              </Card>
            )}
            {!isAutomationRunnerListFetching && (
              <AutomationRunnerList runnerList={automationRunnerList.data} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AutomationDashboard;
