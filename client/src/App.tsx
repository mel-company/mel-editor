import { Routes, Route, Navigate } from 'react-router-dom'
import TemplateSelector from './editor/pages/template-selector'
import EditorPage from "./editor/pages/editor";
import StoreViewPage from "./production/pages/store-view";
import Dashboard from "./editor/pages/dashboard";
import ProductionPage from "./production/pages/production";
import ProductDetailPage from "./production/pages/product-detail";

import DebugStoresPage from "./production/pages/debug/stores";
import '@fontsource/ibm-plex-sans-arabic/400.css';
import '@fontsource/ibm-plex-sans-arabic/500.css';
import '@fontsource/ibm-plex-sans-arabic/600.css';
import '@fontsource/ibm-plex-sans-arabic/700.css';


function App() {
    return (
        <Routes>
            <Route path="/" element={<ProductionPage />} />
            <Route path="/templates" element={<TemplateSelector />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/store-view" element={<StoreViewPage />} />
            <Route path="/store-view/cart" element={<StoreViewPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/debug/stores" element={<DebugStoresPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
