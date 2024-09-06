import { ReactElement, createContext, useState, useContext } from "react";

type PageAlertContextProviderProps = {
  children: React.ReactNode;
};

type PageAlertContextType = {
  /**
   * Show or hide the alert
   */
  showAlert: boolean;
  /**
   * The content of the alert
   */
  alertContent: { message?: any; type?: any };
  /**
   * Set the alert content and show the alert
   * @param message The message to display in the alert
   * @param type The type of alert (e.g. "success", "info", "error", "warning")
   */
  setAlert: (message: string, type: string) => void;
  /**
   * Close the alert
   */
  closeAlert: () => void;
};

export const PageAlertContext = createContext<PageAlertContextType | null>(
  null
);

export function PageAlertContextProvider(
  props: PageAlertContextProviderProps
): ReactElement {
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({});

  function closeAlert(): void {
    setShowAlert(false);
    setAlertContent({});
  }

  const setAlert = (message: string, type: string) => {
    const newAlert = { message, type };
    setShowAlert(true);
    setAlertContent(newAlert);
  };

  return (
    <PageAlertContext.Provider
      value={{ showAlert, alertContent, setAlert, closeAlert }}
    >
      {props.children}
    </PageAlertContext.Provider>
  );
}

export function usePageAlertContext() {
  const context = useContext(PageAlertContext);
  if (!context) {
    throw new Error(
      "usePageAlertContext must be used within a PageAlertContextProvider"
    );
  }
  return context;
}
