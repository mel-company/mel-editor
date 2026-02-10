import { useState } from "react";
import ColorPickerBar from "../../../../../../shared/components/ui/color-picker-bar";
import { useStoreSettingsStore } from "../../../../../../shared/store/editor/store-settings";
import { LinkItem } from "./link-item";
import { LinkForm } from "./link-form";
import { AddLinkButton } from "./add-link-button";
import { useNavigationLinks } from "./use-navigation-links";

const NavigationLinks = () => {
  const {
    links,
    sections,
    isAdding,
    editingId,
    newLabel,
    newUrl,
    newLinkType,
    newSectionId,
    urlError,
    handleAdd,
    handleUpdate,
    handleDelete,
    startEdit,
    startAdd,
    cancelEdit,
    cancelAdd,
    setNewLabel,
    handleUrlChange,
    setNewLinkType,
    setNewSectionId,
  } = useNavigationLinks();

  return (
    <div className="mt-6 border-t pt-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="title text-sm">شريط التنقل</h4>
      </div>

      <div className="flex flex-col gap-1.5">
        {links.map((link) => (
          editingId === link.id ? (
            <LinkForm
              key={link.id}
              isEditing={true}
              newLabel={newLabel}
              newUrl={newUrl}
              newLinkType={newLinkType}
              newSectionId={newSectionId}
              urlError={urlError}
              sections={sections}
              onLabelChange={setNewLabel}
              onUrlChange={handleUrlChange}
              onLinkTypeChange={setNewLinkType}
              onSectionIdChange={setNewSectionId}
              onCancel={cancelEdit}
              onSave={() => handleUpdate(link.id)}
              onUrlChangeWithValidation={handleUrlChange}
            />
          ) : (
            <LinkItem
              key={link.id}
              link={link}
              onEdit={startEdit}
              onDelete={handleDelete}
            />
          )
        ))}

        {isAdding ? (
          <LinkForm
            isEditing={false}
            newLabel={newLabel}
            newUrl={newUrl}
            newLinkType={newLinkType}
            newSectionId={newSectionId}
            urlError={urlError}
            sections={sections}
            onLabelChange={setNewLabel}
            onUrlChange={handleUrlChange}
            onLinkTypeChange={setNewLinkType}
            onSectionIdChange={setNewSectionId}
            onCancel={cancelAdd}
            onSave={handleAdd}
            onUrlChangeWithValidation={handleUrlChange}
          />
        ) : (
          <AddLinkButton onAdd={startAdd} />
        )}
      </div>
    </div>
  );
};

const NavigationStyles = () => {
  const { storeSettings, updateStoreSettings } = useStoreSettingsStore();
  const [open, setOpen] = useState("");

  const headerStyles = storeSettings.header?.styles || {
    backgroundColor: "#FFFFFF",
    textColor: "#1D293D",
  };

  const updateHeaderStyles = (newStyles: Partial<typeof headerStyles>) => {
    updateStoreSettings({
      header: {
        ...storeSettings.header,
        styles: {
          ...headerStyles,
          ...newStyles,
        },
      },
    });
  };

  return (
    <div className="editor-nav-section">
      <h3 className="title">{"أنماط شريط التنقل"}</h3>

      <div className="flex flex-col gap-3">
        <div>
          <h4 className="sub-title mb-2">{"لون الخلفية"}</h4>
          <ColorPickerBar
            label="الخلفية"
            value={headerStyles.backgroundColor || "#FFFFFF"}
            onChange={(value) => updateHeaderStyles({ backgroundColor: value })}
            open={open}
            setOpen={setOpen}
          />
        </div>

        <div>
          <h4 className="sub-title mb-2">{"لون النص"}</h4>
          <ColorPickerBar
            label="النص"
            value={headerStyles.textColor || "#1D293D"}
            onChange={(value) => updateHeaderStyles({ textColor: value })}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>

      <NavigationLinks />


    </div>
  );
};

export default NavigationStyles;

