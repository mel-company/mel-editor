import React, { useEffect, useState } from "react";
import { useSectionStore } from "../../../store/editor/section";
import { usePageStore } from "../../../store/editor/page";
import { useStoreSettingsStore } from "../../../store/editor/store-settings";
import RenderTemplate from "./index";
import { reactToJSON } from "../../../utils/react-to-json";
import { mockTemplate } from "../../../mock/template";
import { Navigation1 } from "../../../mock/template/sections/navigation";
import { footer_sections } from "../../../mock/template/sections/footer";
import { getSectionProps } from "../../../utils/section-props";

import { generateCodeFromJSON } from "../../../utils/json-to-code";

const TemplateJsonWrapper = () => {
    const { pages, currentPageId } = usePageStore();
    const { storeSettings } = useStoreSettingsStore();
    const [jsonOutput, setJsonOutput] = useState<any>(null);
    const [showDebug, setShowDebug] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [generatedCode, setGeneratedCode] = useState("");

    useEffect(() => {
        // Logic to reconstruct the tree structure similar to RenderTemplate
        // This allows us to capture the "virtual" React tree as JSON
        const generateJSON = () => {
            const page = pages.find((p) => p.id === currentPageId);
            const currentPage = { ...page, ...mockTemplate };

            const sections = currentPage?.sections.filter(
                (s) => s.type !== "navigation" && s.type !== "footer"
            ) || [];

            // 1. Navigation Node (Reconstructing logic from RenderTemplate)
            let navigationNode = null;
            if (storeSettings.type !== "restaurant") {
                navigationNode = (
                    <Navigation1
                        logo={storeSettings.logo}
                        navigationLinks={storeSettings.header?.navigationLinks}
                        primaryColor={storeSettings.colors?.primary}
                    />
                );
            }

            // 2. Sections Nodes
            const sectionNodes = sections.map((section) => {
                const selected_options = section.options?.find(
                    (option) => option.id === section.section_id
                );

                if (!selected_options || !selected_options.component) return null;

                const Component = selected_options.component as any;

                // Use shared prop logic to get FULL props including styles and resolved content
                const props = getSectionProps(section, storeSettings);

                if (!props) return null;

                return <Component key={section.id} {...props} />;
            });

            // 3. Footer Node
            let footerNode = null;
            if (storeSettings.type !== "restaurant" && storeSettings.footer?.showFooter !== false) {
                const footerVariant = storeSettings.footer?.footerVariant || "1";
                const variantIndex = footerVariant ? parseInt(footerVariant) - 1 : 0;
                const FooterComponent = footer_sections[variantIndex]?.component || footer_sections[0]?.component;

                if (FooterComponent) {
                    footerNode = <FooterComponent
                        logo={storeSettings.logo}
                        text={storeSettings.footer?.text}
                        title={storeSettings.footer?.title}
                        description={storeSettings.footer?.description}
                        contactInfo={storeSettings.footer?.contactInfo}
                        navigationLinks={storeSettings.header?.navigationLinks}
                        socialLinks={storeSettings.footer?.socialLinks}
                        styles={storeSettings.footer?.styles}
                    />;
                }
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
    }, [pages, currentPageId, storeSettings]);

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
