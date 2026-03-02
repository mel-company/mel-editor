
// Our Story 1: Text with Image
export const OurStorySection1 = ({
    title,
    description,
    photos,
}: {
    title?: string;
    description?: string;
    photos?: any[];
}) => {
    const photoUrl = photos?.[0]?.url || photos?.[0]?.base64Content;

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="order-2 md:order-1 relative">
                        <img
                            src={photoUrl || ""}
                            alt={title || "قصتنا"}
                            className={`w-full h-auto rounded-2xl shadow-xl object-cover ${!photoUrl ? "min-h-[300px] opacity-0" : ""}`}
                            data-type="image"
                            data-title="الصورة"
                            data-name="main_image"
                        />
                        {!photoUrl && (
                            <div className="absolute inset-0 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center">
                                <span className="text-slate-400">أضف صورة</span>
                            </div>
                        )}
                    </div>
                    <div className="order-1 md:order-2">
                        {title && (
                            <h2
                                className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6"
                                data-type="text"
                                data-name="title"
                                data-title="العنوان"
                            >
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p
                                className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed whitespace-pre-line"
                                data-type="textarea"
                                data-name="description"
                                data-title="الوصف"
                            >
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Our Story 2: Centered Text
export const OurStorySection2 = ({
    title,
    description,
}: {
    title?: string;
    description?: string;
}) => {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
                {title && (
                    <h2
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 sm:mb-8"
                        data-type="text"
                        data-name="title"
                        data-title="العنوان"
                    >
                        {title}
                    </h2>
                )}
                {description && (
                    <p
                        className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed whitespace-pre-line"
                        data-type="textarea"
                        data-name="description"
                        data-title="الوصف"
                    >
                        {description}
                    </p>
                )}
            </div>
        </section>
    );
};

// Our Story 3: Timeline Style
export const OurStorySection3 = ({
    title,
    description,
    photos,
}: {
    title?: string;
    description?: string;
    photos?: any[];
}) => {
    const photoUrl = photos?.[0]?.url || photos?.[0]?.base64Content;

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
            <div className="max-w-5xl mx-auto">
                {title && (
                    <h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-8 sm:mb-12 text-center"
                        data-type="text"
                        data-name="title"
                        data-title="العنوان"
                    >
                        {title}
                    </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                        <img
                            src={photoUrl || ""}
                            alt={title || "قصتنا"}
                            className={`w-full h-auto rounded-xl shadow-lg object-cover ${!photoUrl ? "min-h-[300px] opacity-0" : ""}`}
                            data-type="image"
                            data-title="الصورة"
                            data-name="main_image"
                        />
                        {!photoUrl && (
                            <div className="absolute inset-0 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center">
                                <span className="text-slate-400">أضف صورة</span>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col justify-center">
                        {description && (
                            <p
                                className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed whitespace-pre-line"
                                data-type="textarea"
                                data-name="description"
                                data-title="الوصف"
                            >
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
