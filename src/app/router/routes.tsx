import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../layout/app/App";
import FRONTEND_ROUTES from "../common/constants/frontend-routes.constants";
import Lab1Page from "../../pages/lab1-page/lab1-page";
import MainPage from "../../pages/main-page/main-page";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path={FRONTEND_ROUTES.BASE} element={<App />}>
        <Route
            path={FRONTEND_ROUTES.BASE}
            element={<MainPage />}
        />
        <Route
            path={FRONTEND_ROUTES.PAGES.LAB_1}
            element={<Lab1Page />}
        />
    </Route>,
));

export default router;