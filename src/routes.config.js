import LandingPage from "./components/LandingPage";
import RedirectToLandingPage from "./components/RedirectToLandingPage";
import FilterableDataGrid from "./components/FilterableDataGrid";

const ConfigRoutes = [
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/filters",
    Component: FilterableDataGrid,
  },
  {
    path: "*",
    Component: RedirectToLandingPage,
  },
];
export default ConfigRoutes;
