import { useState } from "react";
import { useStoreSettingsStore } from "../../../../../../shared/store/editor/store-settings";
import { usePageStore } from "../../../../../../shared/store/editor/page";

// URL validation function
export const isValidUrl = (url: string): boolean => {
  if (!url.trim()) return false;

  try {
    const urlObj = new URL(url);
    // Allow http, https, mailto, tel, and ftp protocols
    const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:', 'ftp:'];
    return allowedProtocols.includes(urlObj.protocol);
  } catch {
    // If URL parsing fails, check if it starts with common protocols
    const urlLower = url.toLowerCase().trim();
    return urlLower.startsWith('http://') ||
      urlLower.startsWith('https://') ||
      urlLower.startsWith('mailto:') ||
      urlLower.startsWith('tel:') ||
      urlLower.startsWith('ftp://');
  }
};

export const useNavigationLinks = () => {
  const { storeSettings, updateStoreSettings } = useStoreSettingsStore();
  const { getCurrentPage } = usePageStore();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newLinkType, setNewLinkType] = useState<'external' | 'section'>('external');
  const [newSectionId, setNewSectionId] = useState("");
  const [urlError, setUrlError] = useState("");

  const links = storeSettings.header?.navigationLinks || [];
  const currentPage = getCurrentPage();
  // Filter out navigation and footer sections, only show content sections
  const allSections = currentPage?.sections || [];
  const sections = allSections.filter(s => s.type !== 'navigation' && s.type !== 'footer');

  const handleAdd = () => {
    // Clear previous errors
    setUrlError("");

    if (!newLabel) {
      return;
    }
    if (newLinkType === 'section' && !newSectionId) {
      return;
    }
    if (newLinkType === 'external' && !newUrl) {
      setUrlError("الرجاء إدخال رابط");
      return;
    }
    if (newLinkType === 'external' && !isValidUrl(newUrl)) {
      setUrlError("الرابط يجب أن يبدأ بـ https://, http://, mailto:, tel:, أو ftp://");
      return;
    }

    const newLink = {
      id: Date.now().toString(),
      label: newLabel,
      url: newLinkType === 'external' ? newUrl : "",
      linkType: newLinkType,
      sectionId: newLinkType === 'section' ? newSectionId : undefined,
      pageId: undefined, // Explicitly set to undefined to prevent page navigation
    };

    updateStoreSettings({
      header: {
        ...storeSettings.header,
        navigationLinks: [...links, newLink],
      },
    });
    resetForm();
  };

  const handleUpdate = (id: string) => {
    // Clear previous errors
    setUrlError("");

    if (!newLabel) return;
    if (newLinkType === 'section' && !newSectionId) return;
    if (newLinkType === 'external' && !newUrl) {
      setUrlError("الرجاء إدخال رابط");
      return;
    }
    if (newLinkType === 'external' && !isValidUrl(newUrl)) {
      setUrlError("الرابط يجب أن يبدأ بـ https://, http://, mailto:, tel:, أو ftp://");
      return;
    }

    const updatedLinks = links.map((link) =>
      link.id === id ? {
        ...link,
        label: newLabel,
        url: newLinkType === 'external' ? newUrl : "",
        linkType: newLinkType,
        sectionId: newLinkType === 'section' ? newSectionId : undefined,
        pageId: newLinkType === 'section' ? undefined : link.pageId, // Explicitly set to undefined to prevent page navigation
      } : link
    );
    updateStoreSettings({
      header: {
        ...storeSettings.header,
        navigationLinks: updatedLinks,
      },
    });
    resetForm();
  };

  const handleDelete = (id: string) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    updateStoreSettings({
      header: {
        ...storeSettings.header,
        navigationLinks: updatedLinks,
      },
    });
  };

  const startEdit = (link: any) => {
    setEditingId(link.id);
    setNewLabel(link.label);
    setNewUrl(link.url || "");
    setNewLinkType(link.linkType || 'external');
    setNewSectionId(link.sectionId || "");
    setIsAdding(false);
    setUrlError(""); // Clear errors when starting edit
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setNewLabel("");
    setNewUrl("");
    setNewLinkType('external');
    setNewSectionId("");
    setUrlError(""); // Clear errors when starting add
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const cancelAdd = () => {
    setIsAdding(false);
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setNewLabel("");
    setNewUrl("");
    setNewLinkType('external');
    setNewSectionId("");
  };

  const handleUrlChange = (url: string) => {
    setNewUrl(url);
    // Clear error when user starts typing
    if (urlError) {
      setUrlError("");
    }
  };

  return {
    // State
    links,
    sections,
    isAdding,
    editingId,
    newLabel,
    newUrl,
    newLinkType,
    newSectionId,
    urlError,

    // Actions
    handleAdd,
    handleUpdate,
    handleDelete,
    startEdit,
    startAdd,
    cancelEdit,
    cancelAdd,

    // Handlers
    setNewLabel,
    handleUrlChange,
    setNewLinkType,
    setNewSectionId,
  };
};
