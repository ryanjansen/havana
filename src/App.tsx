import { Route, Routes } from "react-router";
import { Chatbot } from "@/pages/Chatbot";

// const Details = lazy(async () =>
//     import("@/pages/Details").then((m) => ({ default: m.Details }))
// );

export function App() {
    return (
        <Routes>
            <Route element={<Chatbot />} index={true} />
        </Routes>
    );
}
