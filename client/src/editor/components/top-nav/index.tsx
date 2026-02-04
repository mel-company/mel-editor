import { useState, useEffect } from "react";
import { UploadCloud } from "lucide-react";
import { usePageStore } from "../../../shared/store/editor/page";
import { publishStore, generateStyles } from "@/shared/api/production";
import classNames from "classnames";


const PublishButton = () => {
    const [isPublishing, setIsPublishing] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handlePublish = async () => {
        if (!showConfirm) {
            setShowConfirm(true);
            // Auto-hide confirmation after 3 seconds if not clicked again
            setTimeout(() => setShowConfirm(false), 3000);
            return;
        }

        setIsPublishing(true);
        setShowConfirm(false);
        setStatus("idle");

        try {
            await publishStore();
            setStatus("success");
            setTimeout(() => setStatus("idle"), 3000);
        } catch (error) {
            console.error("Publish error:", error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        } finally {
            setIsPublishing(false);
        }
    };

    let buttonText = "نشر";
    let buttonColor = "bg-blue-600 hover:bg-blue-700";

    if (isPublishing) {
        buttonText = "جاري النشر...";
        buttonColor = "bg-blue-400 cursor-wait";
    } else if (showConfirm) {
        buttonText = "متأكد؟";
        buttonColor = "bg-orange-500 hover:bg-orange-600";
    } else if (status === "success") {
        buttonText = "تم بنجاح!";
        buttonColor = "bg-green-600";
    } else if (status === "error") {
        buttonText = "فشل النشر";
        buttonColor = "bg-red-600";
    }

    return (
        <button
            onClick={handlePublish}
            disabled={isPublishing}
            className={`cursor-pointer w-20 line-clamp-1 text-nowrap flex items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-white ${buttonColor}`}
        >
            {!isPublishing && status === "idle" && !showConfirm && <UploadCloud className="w-4 h-4" />}
            <span className="text-sm">{buttonText}</span>
        </button>
    );
};

const SaveBtn = () => {

    const [saveStatus, setSaveStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSave = async () => {
        setSaveStatus("loading");
        try {
            await generateStyles();
            setSaveStatus("success");
            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch (e) {
            console.error(e);
            setSaveStatus("error");
            setTimeout(() => setSaveStatus("idle"), 3000);
        }
    };


    return (
        <button
            onClick={handleSave}
            className={
                classNames("cursor-pointer w-20 line-clamp-1 text-nowrap flex items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 font-medium ", {
                    "bg-green-600 text-white": saveStatus === "success",
                    "bg-blue-50 hover:bg-blue-100 text-blue-600": saveStatus === "idle",
                    "bg-blue-400 cursor-wait": saveStatus === "loading",
                    "bg-red-600 text-white": saveStatus === "error",
                })
            }
        >
            <span className="text-sm">
                {saveStatus === "success" ? "تم الحفظ" :
                    saveStatus === "loading" ? "جاري الحفظ..." :
                        saveStatus === "error" ? "فشل" : "حفظ"}
            </span>
        </button>
    )
}


const EditorTopNav = () => {

    const currentPageId = usePageStore((state) => state.currentPageId);

    useEffect(() => {
        if (currentPageId) {
            const url = new URL(window.location.href);
            url.searchParams.set("pageId", currentPageId);
            window.history.replaceState({}, "", url);
        }
    }, [currentPageId]);

    return (
        <header className="bg-white px-20 absolute top-0 left-0 right-64 p-2 text-sm font-medium flex gap-2 items-center justify-end overflow-hidden z-40" >
            {/* <TemplateJsonWrapper /> */}
            <SaveBtn />
            <PublishButton />
        </header>
    );
};

export default EditorTopNav;
