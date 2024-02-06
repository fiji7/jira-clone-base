import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import EditPage from "../components/EditPage/EditPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/edit/:id',
        element: <EditPage />
    }
]);