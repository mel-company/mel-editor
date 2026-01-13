import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import TemplateSelector from './pages/template-selector'
import EditorPage from "./pages/editor";
import StoreViewPage from "./pages/store-view";
import Dashboard from "./pages/dashboard";
import ProductDetailPage from "./pages/product-detail";
import CartPage from "./pages/cart";
import '@fontsource/ibm-plex-sans-arabic/400.css';
import '@fontsource/ibm-plex-sans-arabic/500.css';
import '@fontsource/ibm-plex-sans-arabic/600.css';
import '@fontsource/ibm-plex-sans-arabic/700.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TemplateSelector />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/store-view" element={<StoreViewPage />} />
        <Route path="/store-view/cart" element={<StoreViewPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>


    </BrowserRouter>
  );
}

export default App;
