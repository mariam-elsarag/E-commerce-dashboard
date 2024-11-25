import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./Context/AuthProvider";
// Routes
const AppLayout = lazy(() => import("./pages/AppLayout"));

const App = () => {
  const { token } = useAuth();

  return (
    <Suspense>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AppLayout />} />
      </Routes>
    </Suspense>
  );
};

export default App;
