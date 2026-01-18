import { useEffect, useState } from "react";
import RenderTemplate from "./index";
import { reactToJSON } from "../../../utils/react-to-json";
import { generateCodeFromJSON } from "../../../utils/json-to-code";
import { useTemplateStructure } from "../../../hooks/use-template-structure";

const TemplateJsonWrapper = () => {
    const { navigation, sections, footer } = useTemplateStructure();
    const [jsonOutput, setJsonOutput] = useState<any>(null);
    const [showDebug, setShowDebug] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [generatedCode, setGeneratedCode] = useState("");

    useEffect(() => {
        const generateJSON = () => {
            // 1. Navigation Node
            let navigationNode = null;
            if (navigation) {
                const { Component, props } = navigation;
                navigationNode = <Component {...props} />;
            }

            // 2. Sections Nodes
            const sectionNodes = sections.map((section) => {
                const { Component, props, id } = section;
                return <Component key={id} {...props} />;
            });

            // 3. Footer Node
            let footerNode = null;
            if (footer) {
                const { Component, props } = footer;
                footerNode = <Component {...props} />;
            }

            // Construct the full tree
            const fullTree = (
                <div className="template-root">
                    {navigationNode}
                    <main>
                        {sectionNodes}
                    </main>
                    {footerNode}
                </div>
            );

            return reactToJSON(fullTree);
        };

        const json = generateJSON();
        setJsonOutput(json);
        // Auto-generate code when JSON updates
        if (json) {
            setGeneratedCode(generateCodeFromJSON(json));
        }
    }, [navigation, sections, footer]);

    return (
        <div className="relative w-full h-full">
            {/* Actual Render */}
            <RenderTemplate />

            {/* Debug Visualizer Toggle */}
            <div className="absolute top-4 left-4 z-50 flex gap-2">
                <button
                    onClick={() => setShowDebug(!showDebug)}
                    className="bg-gray-800 text-white px-3 py-1 rounded text-xs opacity-50 hover:opacity-100 transition-opacity"
                >
                    {showDebug ? "Hide JSON" : "Show JSON"}
                </button>
                <button
                    onClick={() => setShowCode(!showCode)}
                    className="bg-blue-800 text-white px-3 py-1 rounded text-xs opacity-50 hover:opacity-100 transition-opacity"
                >
                    {showCode ? "Hide Code" : "Test Code Gen"}
                </button>
            </div>

            {/* JSON Output Display */}
            {showDebug && (
                <div className="absolute top-12 left-4 z-50 w-96 max-h-[80vh] overflow-auto bg-gray-900 text-green-400 p-4 rounded shadow-xl text-xs font-mono border border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-white">Template JSON Structure</span>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 2));
                                alert("JSON Copied!");
                            }}
                            className="text-gray-400 hover:text-white"
                        >
                            Copy
                        </button>
                    </div>
                    <pre>{JSON.stringify(jsonOutput, null, 2)}</pre>
                </div>
            )}

            {/* Generated Code Display */}
            {showCode && (
                <div className="absolute top-12 left-4 z-50 w-[600px] max-h-[80vh] overflow-auto bg-[#1e1e1e] text-blue-300 p-4 rounded shadow-xl text-xs font-mono border border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-white">Generated Server Code (Mock)</span>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(generatedCode);
                                alert("Code Copied!");
                            }}
                            className="text-gray-400 hover:text-white"
                        >
                            Copy
                        </button>
                    </div>
                    <pre className="whitespace-pre-wrap">{generatedCode}</pre>
                </div>
            )}
        </div>
    );
};

export default TemplateJsonWrapper;
