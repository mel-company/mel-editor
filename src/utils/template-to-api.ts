import { PageType } from "../types";
import { usePageStore } from "../store/editor/page";
import { useStoreSettingsStore } from "../store/editor/store-settings";

/**
 * Convert edited template back to API format
 * This converts the current editor state back to the JSON structure expected by the API
 */
export const convertEditorToApiFormat = (templateId: string) => {
  const { pages } = usePageStore.getState();
  const { storeSettings } = useStoreSettingsStore.getState();


  // Find footer section content across all pages
  let footerSectionContent: any = null;
  pages.forEach(page => {
    const footerSection = page.sections.find(s => s.type === "footer");
    if (footerSection) {
      const selectedOption = footerSection.options?.find(opt => opt.id === footerSection.section_id);
      if (selectedOption?.content) {
        // Helper to safely get content as array
        // Use the same safegaurd as established earlier for contentItems
        const items = (Array.isArray(selectedOption.content))
          ? selectedOption.content
          : [];

        footerSectionContent = {};
        items.forEach((item: any) => {
          if (item.value) {
            footerSectionContent[item.name] = item.value;
          }
        });
      }
    }
  });
  // Convert pages back to API format
  const apiPages = pages.map((page) => {


    const apiSections = page.sections
      .filter((section) => {
        // Filter out navigation and footer sections (they're in UI, not pages)
        if (section.type === "navigation" || section.type === "footer") {
          return false;
        }
        return true;
      })
      .map((section) => {
        // Get the selected option
        const selectedOption = section.options?.find(
          (opt) => opt.id === section.section_id
        );

        if (!selectedOption) {
          console.warn(`⚠️ No option found for section ${section.type} with id ${section.section_id}`);
          return null;
        }


        // Helper to safely get content as array
        const contentItems = (selectedOption.content && Array.isArray(selectedOption.content))
          ? selectedOption.content
          : [];

        // Convert section to API format
        const apiSection: any = {
          id: section.section_id,
          type: section.type,
          enabled: section.editable !== false,
          style: section.styles || {},
        };

        // Add content based on section type
        if (selectedOption.content && Array.isArray(selectedOption.content)) {
          const contentObj: any = {};
          selectedOption.content.forEach((item: any) => {
            if (item.value !== undefined && item.value !== null) {
              contentObj[item.name] = item.value;
            }
          });
          if (Object.keys(contentObj).length > 0) {
            apiSection.content = contentObj;
          }
        }

        // Add photos
        if (selectedOption.photos && selectedOption.photos.length > 0) {
          // For carousel sections, convert photos to slides
          if (section.type === "carouselHero" || section.type === "hero") {
            apiSection.slides = selectedOption.photos.map((photo: any, index: number) => ({
              id: photo.id || `slide-${index + 1}`,
              title: contentItems.find((c: any) => c.name === "title")?.value || "",
              subtitle: contentItems.find((c: any) => c.name === "description")?.value || "",
              backgroundImage: photo.url || photo.base64Content,
              style: {
                color: "#FFFFFF",
                textShadow: "0 4px 20px rgba(0,0,0,0.6)",
              },
              overlay: "rgba(0,0,0,0.45)",
            }));
          } else {
            apiSection.photos = selectedOption.photos;
          }
        }

        // Add products if available
        if (selectedOption.products && selectedOption.products.length > 0) {
          apiSection.products = selectedOption.products;
        }

        // Add categories if available
        if (selectedOption.categories && selectedOption.categories.length > 0) {
          apiSection.categories = selectedOption.categories;
        }

        // Add specific properties based on section type
        if (section.type === "productGrid" || section.type === "recentProducts") {
          apiSection.request = "getProducts";
          apiSection.requestParams = {
            limit: 8,
            featured: true,
          };
        }

        if (section.type === "categoryGrid" || section.type === "categories") {
          apiSection.request = "getCategories";
        }

        // Add title and subtitle if available
        const titleContent = contentItems.find((c: any) => c.name === "title");
        const descriptionContent = contentItems.find((c: any) => c.name === "description");

        if (titleContent?.value) {
          apiSection.title = titleContent.value;
        }
        if (descriptionContent?.value) {
          apiSection.subtitle = descriptionContent.value;
        }


        return apiSection;
      })
      .filter(Boolean); // Remove null sections



    return {
      id: page.id,
      title: page.name,
      route: `/${page.type}`,
      meta: {
        title: `${page.name} - ${storeSettings.name}`,
        description: storeSettings.description || "",
      },
      sections: apiSections,
    };
  });



  // Build the complete API body structure
  const apiBody = {
    ui: {
      header: {
        logo: storeSettings.header?.logo?.url || storeSettings.logo?.url || "",
        backgroundColor: storeSettings.header?.styles?.backgroundColor || "#FFFFFF",
        textColor: storeSettings.header?.styles?.textColor || "#000000",
        navigation: storeSettings.header?.navigationLinks?.map((link) => ({
          icon: "home",
          label: link.label,
          route: link.url,
        })) || [],
      },
      footer: {
        logo: storeSettings.footer?.logo?.url || storeSettings.logo?.url || "",
        backgroundColor: storeSettings.footer?.styles?.backgroundColor || "#0F172A",
        textColor: storeSettings.footer?.styles?.textColor || "#F8FAFC",
        social: storeSettings.footer?.socialLinks?.map((social) => ({
          platform: social.platform,
          icon: social.platform,
          url: social.url,
        })) || [],
        sections: storeSettings.footer?.links?.map((link) => ({
          title: link.label,
          links: [{ label: link.label, route: link.url }],
        })) || [],
        bottomBar: {
          text: footerSectionContent?.text || storeSettings.footer?.text || "",
          links: [],
        },
      },
    },
    pages: apiPages,
    store: {
      id: storeSettings.name.toLowerCase().replace(/\s+/g, "-"),
      name: storeSettings.name,
      description: storeSettings.description,
      logo: storeSettings.logo?.url || "",
      domain: storeSettings.name.toLowerCase().replace(/\s+/g, "-"),
      contact: {
        email: storeSettings.footer?.contactInfo?.email || "",
        phone: storeSettings.footer?.contactInfo?.phone || "",
        address: storeSettings.footer?.contactInfo?.address || "",
      },
      currency: "IQD",
    },
    design: {
      colors: {
        primary: storeSettings.colors?.primary || "#10B981",
        secondary: storeSettings.colors?.secondary || "#4272F0",
        text: storeSettings.colors?.text || "#0F172A",
        background: "#F8FAFC",
        surface: "#FFFFFF",
      },
      font: {
        primary: storeSettings.fonts?.heading || "Cairo, Arial, sans-serif",
        secondary: storeSettings.fonts?.body || "Tajawal, sans-serif",
      },
    },
  };

  return {
    templateId,
    body: apiBody,
  };
};

