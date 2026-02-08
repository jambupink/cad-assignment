import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";
import Layout from "./components/layout/Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import LocationsPage from "./pages/LocationsPage.tsx";
import IssuesListPage from "./pages/IssuesListPage.tsx";
import ReportIssuePage from "./pages/ReportIssuePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import NotificationsPage from "./pages/NotificationsPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/issues" element={<IssuesListPage />} />
          <Route path="/report" element={<ReportIssuePage />} />
          <Route
            path="/notifications"
            element={<NotificationsPage />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);