import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router';
import '@/index.css';
import ClientRoutes from "@/routes/client.tsx";
import AdminRoutes from "@/routes/admin.tsx";
import {AuthProvider} from "@/common/context/provider/AuthContextProvider.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                {ClientRoutes()}
                {AdminRoutes()}
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);
