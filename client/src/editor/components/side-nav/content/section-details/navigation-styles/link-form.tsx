import { X, Check } from "lucide-react";

interface LinkFormProps {
  isEditing: boolean;
  newLabel: string;
  newUrl: string;
  newLinkType: 'external' | 'section';
  newSectionId: string;
  urlError: string;
  sections: any[];
  onLabelChange: (value: string) => void;
  onUrlChange: (value: string) => void;
  onLinkTypeChange: (type: 'external' | 'section') => void;
  onSectionIdChange: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
  onUrlChangeWithValidation: (url: string) => void;
}

export const LinkForm = ({
  isEditing,
  newLabel,
  newUrl,
  newLinkType,
  newSectionId,
  urlError,
  sections,
  onLabelChange,
  onLinkTypeChange,
  onSectionIdChange,
  onCancel,
  onSave,
  onUrlChangeWithValidation,
}: LinkFormProps) => {
  return (
    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col gap-2">

      <div className="flex gap-1 bg-white p-1 rounded-xl">
        <button
          onClick={() => {
            onLinkTypeChange('external');
            // Clear errors when switching types
          }}
          className={`flex-1 text-xs py-1 px-3 transition-colors rounded-lg ${newLinkType === 'external'
            ? 'bg-blue-100 text-blue-600'
            : 'bg-slate-50 text-slate-600 hover:border-blue-400'
            }`}
        >
          رابط خارجي
        </button>
        <button
          onClick={() => {
            onLinkTypeChange('section');
            // Clear errors when switching types
          }}
          className={`flex-1 text-xs py-2 px-3 rounded-lg transition-colors ${newLinkType === 'section'
            ? 'bg-blue-100 text-blue-600'
            : 'bg-slate-50 text-slate-600 hover:border-blue-400'
            }`}
        >
          قسم
        </button>
      </div>

      <input
        type="text"
        placeholder="عنوان"
        className="w-full text-sm p-2 rounded-lg border"
        value={newLabel}
        onChange={(e) => onLabelChange(e.target.value)}
      />

      {newLinkType === 'external' ? (
        <div>
          <input
            type="text"
            placeholder="الرابط"
            className={`w-full text-sm p-2 rounded-lg border ${urlError ? 'border-red-400' : 'border'}`}
            value={newUrl}
            onChange={(e) => onUrlChangeWithValidation(e.target.value)}
          />
          {urlError && (
            <p className="text-xs text-red-500 mt-1">{urlError}</p>
          )}
        </div>
      ) : (
        <select
          className="w-full text-sm p-2 rounded border"
          value={newSectionId}
          onChange={(e) => onSectionIdChange(e.target.value)}
        >
          <option value="">اختر قسم</option>
          {sections.map((section, index) => (
            <option key={section.target_id || section.id} value={section.target_id || section.id}>
              {section.options?.[0]?.title || `قسم ${index + 1}`}
            </option>
          ))}
        </select>
      )}
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={onCancel}
          className="text-slate-500 hover:text-slate-700 p-1.5 rounded hover:bg-slate-100 transition-colors"
          title="إلغاء"
        >
          <X className="w-4 h-4" />
        </button>
        <button
          onClick={onSave}
          className="bg-blue-600 text-white p-1.5 rounded-lg hover:bg-blue-700 transition-colors"
          title={isEditing ? "حفظ" : "إضافة"}
        >
          <Check className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
