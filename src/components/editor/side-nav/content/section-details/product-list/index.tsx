import { ImageIcon } from "lucide-react";
import useSectionDetails from "../../../../../../hooks/editor-section-details";

const EditorProductList = ({ sectionId }: { sectionId: string }) => {
  const { section } = useSectionDetails({ id: sectionId });

  return (
    <div className="flex flex-col gap-2">
      <h3 className="sub-title">{"المنتجات"}</h3>
      {section?.products?.map((product) => (
        <div
          key={product.id}
          className="flex items-center gap-2 justify-between"
        >
          <p className="sub-title">{product.name}</p>
          <div className="w-9 h-8 border border-slate-200 bg-slate-100 max-h-9 max-w-9 flex items-center justify-center aspect-square rounded-md overflow-hidden">
            <>
              {product.thumbnail ? (
                <img
                  src={product.thumbnail.url}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon strokeWidth={1.5} className="text-slate-500" />
              )}
            </>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditorProductList;
