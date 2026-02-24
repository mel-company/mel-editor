import { useState, useEffect } from "react";

const DebugStoresPage = () => {
    const [stores, setStores] = useState<any[]>([]);
    const [error, setError] = useState("");
    const url = import.meta.env.VITE_EDITOR_API_URL

    useEffect(() => {
        fetch(`${url}/debug/stores`)
            .then(res => res.json())
            .then(data => setStores(data.data))
            .catch(err => setError(err.message));
    }, []);

    if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Debug: Existing Stores</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 border-b">
                        <tr>
                            <th className="p-4">Store ID</th>
                            <th className="p-4">Subdomain</th>
                            <th className="p-4">JSON Size</th>
                            <th className="p-4">Published Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.map((store) => (
                            <tr key={store.store_id} className="border-b hover:bg-slate-50">
                                <td className="p-4 font-mono">{store.store_id}</td>
                                <td className="p-4 font-mono text-blue-600">{store.subdomain || "(none)"}</td>
                                <td className="p-4">{store.json_len ? (store.json_len / 1024).toFixed(2) + ' KB' : '-'}</td>
                                <td className="p-4">{store.pub_len ? (store.pub_len / 1024).toFixed(2) + ' KB' : '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DebugStoresPage;
