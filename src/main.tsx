import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router';
import '@/index.css';
import ClientRoutes from "@/routes/client.tsx";
import AdminRoutes from "@/routes/admin.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <Routes>
            {ClientRoutes()}
            {AdminRoutes()}
        </Routes>
    </BrowserRouter>
);
