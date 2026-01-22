import { useState, useEffect } from "react";
import { generateSchemaFromHtml } from "../../utils/dom-scanner";
import { SectionType } from "../../types";

export const useDomScannerEffect = (
    activeSectionId: string | null,
    section: SectionType | undefined
) => {
    console.log("[DomScanner Hook] Called with:", { activeSectionId, sectionId: section?.id || section?.section_id });
    const [scannedSchema, setScannedSchema] = useState<any[]>([]);

    useEffect(() => {
        if (activeSectionId && section) {
            // Find the DOM element for the section
            const elementId = section.id || section.section_id;
            const element = document.getElementById(elementId || activeSectionId);

            if (element) {
                // Use a small delay to ensure DOM is fully rendered
                // Generate schema from the current HTML, passing the live element to get actual values
                const timeoutId = setTimeout(() => {
                    const schema = generateSchemaFromHtml(element.innerHTML, element);
                    setScannedSchema(schema);
                }, 100);
                
                return () => clearTimeout(timeoutId);
            } else {
                setScannedSchema([]);
            }
        } else {
            setScannedSchema([]);
        }
    }, [activeSectionId, section]);

    return scannedSchema;
};
