import {
  Route,
  Routes,
  useRouteError,
  isRouteErrorResponse,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

import routes from "@/pages";
import Page from "@/components/page/page";
import { PageContent } from "@/components/page/pageContent";
import PageAlert from "@/components/pageAlert/pageAlert";
import Sidebar from "@/components/sidebar/sidebar";
import { PageAlertContextProvider } from "@/contexts/pageAlertContext";
import { PageLoaderContextProvider } from "@/contexts/pageLoaderContext";
import ComingSoonPage from "@/pages/coming_soon";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const handleSetCollapse = (collapse: boolean) => {
    // localStorage.setItem("sidebar_collapsed", `${collapse}`);
    setSidebarCollapsed(collapse);
  };
  const location = useLocation(); // Add this to get current path
  const navigate = useNavigate(); // Add this for navigation

  type FooterProps = {
    children: React.ReactNode;
  };

  const Footer = ({ children }: FooterProps) => {
    return (
      <footer
        className={`text-primary-label  bg-background flex flex-wrap items-center p-2 ${
          sidebarCollapsed ? "ml-16" : "ml-[310px]"
        } md:static md:translate-x-0 z-20 -translate-x-full`}
      >
        {children}
      </footer>
    );
  };
  const comingSoonPagesList = ["Test Plan", "Stress Test"];

  // Function to get page name from path
  const getPageNameFromPath = (path: string) => {
    const route = routes.find((r) => r.path === path);
    return route?.name || "Unknown Page";
  };

  // Function to go back
  const handleBack = () => {
    navigate(-1);
  };

  // Add this component for the header
  const PageHeader = () => {
    const pageName = getPageNameFromPath(location.pathname);
    const pathList: string[] = [];
    console.log(pageName === "Unknown Page");
    if (pageName === "Unknown Page") {
      location.pathname.split('/').slice(1).map(path => pathList.push(path))
    }
    console.log(pathList)

    return (
      <div className="flex items-center gap-4 p-4 bg-background border-b border-mac-light-border dark:border-mac-dark-border">
        <button
          onClick={handleBack}
          className="flex items-center text-primary-label hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-secondary-label">QA</span>
          <span className="text-secondary-label">/</span>
          {pathList.length > 0 ? (
            pathList.map((path, index) =>
              index + 1 === location.pathname.split("/").slice(1).length ? (
                <span className="text-primary-label font-medium">{path}</span>
              ) : (
                <span className="text-secondary-label">{path} /</span>
              )
            )
          ) : (
            <>
              <span className="text-primary-label font-medium">{pageName}</span>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <PageLoaderContextProvider>
        <PageAlertContextProvider>
          <div className="flex flex-col max-h-screen">
            <PageAlert />
            <div className="flex w-full flex-row overflow-x-hidden bg-background">
              <Sidebar
                title={"QA"}
                collapsed={sidebarCollapsed}
                setCollapsed={handleSetCollapse}
              />
              <Page>
                <PageHeader />
                <PageContent>
                  <Routes>
                    <Route path={"/coming_soon"} element={<ComingSoonPage />} />
                    {routes.map((page, index) => {
                      if (comingSoonPagesList.includes(page.name)) {
                        return (
                          <Route
                            key={index}
                            path={page.path}
                            element={<Navigate to="/coming_soon" replace />}
                          />
                        );
                      }
                      return (
                        <Route
                          path={page.path}
                          element={page.component}
                          key={index}
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
