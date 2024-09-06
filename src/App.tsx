import React from "react";
// import logo from './logo.svg';
import "./App.css";
// import Sidebar from './components/sidebar/sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./Layout/DashboardLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* <Sidebar title="QATest" collapsed={false} setCollapsed={() => {}} shown={true}/> */}
            {/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */}
            {/* <Route path="/" element={<DashboardLayout />} /> */}
            <Route path="*" element={<DashboardLayout />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
