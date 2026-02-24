import { ImageIcon } from "lucide-react";
import useSectionDetails from "../../../../../hooks/editor-section-details";
import { ProductType } from "../../../../../../shared/types";
import { useEffect, useState } from "react";

const EditorProductList = () => {
  const { option } = useSectionDetails();

  const [products, setProducts] = useState<ProductType[]>([])

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_EDITOR_API_URL}/products`)
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    }
  }


  useEffect(() => {
    fetchProducts()
  }, [])

  if (!option?.products?.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="sub-title">{"المنتجات"}</h3>
      {option?.products?.map((product: ProductType) => (
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
