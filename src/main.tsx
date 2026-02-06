import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router"

import "./index.css"
import Layout from "./components/layout/layout.tsx"
import HomePage from "./pages/HomePage.tsx"
import LocationsPage from "./pages/LocationsPage.tsx"
import IssuesListPage from "./pages/IssuesListPage.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex justify-center w-screen">

        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/location" element={<LocationsPage />} />
            <Route path="/issues" element={<IssuesListPage />} />
          </Route>
        </Routes>
      </div>
      {/* <App /> */}
    </BrowserRouter>
  </StrictMode>
)
