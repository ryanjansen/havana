import { Route, Routes } from "react-router";
import { UserChat } from "@/pages/UserChat";
import Admin from "./pages/Admin";

// const Details = lazy(async () =>
//     import("@/pages/Details").then((m) => ({ default: m.Details }))
// );

export function App() {
    return (
        <Routes>
            <Route element={<UserChat />} index={true} />
            <Route element={<Admin />} path="/admin" />
        </Routes>
    );
}
