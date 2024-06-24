import { ReactElement, createContext, useState, useContext } from "react";

type PageAlertContextProviderProps = {
  children: React.ReactNode;
};

type PageAlertContextType = {
    showAlert: boolean;
  alertContent: {message?: any, type?: any};
  setAlert: (message: string, type: string) => void;
  closeAlert: () => void;
};

export const PageAlertContext = createContext<PageAlertContextType | null>(
  null
);

export function PageAlertContextProvider(
  props: PageAlertContextProviderProps
): ReactElement {
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({})

  function closeAlert(): void {
    setShowAlert(false);
    setAlertContent({});
  }

  const setAlert = (message: string, type: string) => {
    const newAlert = { message, type };
    setShowAlert(true)
    setAlertContent(newAlert)
  }

  return (
    <PageAlertContext.Provider value={{ showAlert, alertContent, setAlert, closeAlert }}>
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
