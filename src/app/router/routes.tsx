import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../layout/app/App";
import FRONTEND_ROUTES from "../common/constants/frontend-routes.constants";
import Lab1Page from "../../pages/lab1-page/Lab1Page";
import MainPage from "../../pages/main-page/MainPage";
import Lab2Page from "../../pages/lab2-page/Lab2Page";

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
        <Route
            path={FRONTEND_ROUTES.PAGES.LAB_2}
            element={<Lab2Page />}
        />
    </Route>,
));

export default router;