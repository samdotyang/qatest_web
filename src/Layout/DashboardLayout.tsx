import { Route, Routes, useRouteError, isRouteErrorResponse } from "react-router-dom";

import routes from "@/pages";
import Page from "@/components/page/page";
import { PageContent } from "@/components/page/pageContent";
import PageAlert from "@/components/pageAlert/pageAlert";
import Sidebar from "@/components/sidebar/sidebar";
import { PageAlertContextProvider } from "@/contexts/pageAlertContext";
import { PageLoaderContextProvider } from "@/contexts/pageLoaderContext";
import { useState } from "react";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const handleSetCollapse = (collapse: boolean) => {
    // localStorage.setItem("sidebar_collapsed", `${collapse}`);
    setSidebarCollapsed(collapse);
  };
  type FooterProps = {
    children: React.ReactNode;
  };
  
  const Footer = ({ children }: FooterProps) => {
    return (
      <footer className={`text-primary-label dark:text-dark-primary-label bg-mac-light dark:bg-mac-dark flex flex-wrap items-center p-2 ${sidebarCollapsed ? "ml-16": "ml-[310px]"} md:static md:translate-x-0 z-20 -translate-x-full`}>
        {children}
      </footer>
    );
  };
  return (
    <>
      <PageLoaderContextProvider>
        <PageAlertContextProvider>
          <div className="flex flex-col max-h-screen">
            <PageAlert />
            <div className="flex w-full flex-row overflow-x-hidden bg-mac-light-background dark:bg-mac-dark-background">
              <Sidebar
                title={"QA"}
                collapsed={sidebarCollapsed}
                setCollapsed={handleSetCollapse}
              />
              <Page>
                <PageContent>
                  <Routes>
                    {routes.map((page, key) => {
                      return (
                        <Route
                          path={page.path}
                          element={page.component}
                          key={key}
                          errorElement={<RootBoundary />}
                        />
                      );
                    })}
                  </Routes>
                </PageContent>
              </Page>
            </div>
            {/* <Footer>
              <span>Copyright © 2024. All rights reserved.</span>
            </Footer> */}
          </div>
        </PageAlertContextProvider>
      </PageLoaderContextProvider>
    </>
  );  
};

function RootBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>;
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <div>Something went wrong</div>;
}

export default DashboardLayout;
