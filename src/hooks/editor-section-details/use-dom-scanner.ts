import { useState, useEffect } from "react";
import { generateSchemaFromHtml } from "../../utils/dom-scanner";
import { SectionType } from "../../types";

export const useDomScannerEffect = (
    activeSectionId: string | null,
    section: SectionType | undefined
) => {
    const [scannedSchema, setScannedSchema] = useState<any[]>([]);

    useEffect(() => {
        if (activeSectionId && section) {
            // Prefer a "virtual id" attribute to avoid relying on global DOM ids.
            // Fallback to getElementById for backwards compatibility.
            const element =
                (document.querySelector(
                    `[data-section-instance-id="${activeSectionId}"]`
                ) as HTMLElement | null) || document.getElementById(activeSectionId);

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
