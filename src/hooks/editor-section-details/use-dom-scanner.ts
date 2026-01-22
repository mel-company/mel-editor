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
                // Generate schema from the current HTML
                const schema = generateSchemaFromHtml(element.innerHTML);
                setScannedSchema(schema);
            } else {
                setScannedSchema([]);
            }
        } else {
            setScannedSchema([]);
        }
    }, [activeSectionId, section]);

    return scannedSchema;
};
