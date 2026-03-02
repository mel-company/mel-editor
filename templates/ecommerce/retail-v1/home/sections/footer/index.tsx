import React from "react";
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
} from "lucide-react";
import { FileType } from "@/shared/types";

interface FooterProps {
    logo?: FileType;
    text?: string;
    title?: string;
    description?: string;
    contactInfo?: {
        email?: string;
        phone?: string;
        address?: string;
    };
    navigationLinks?: Array<{
        id: string;
        label: string;
        url: string;
        pageId?: string;
    }>;
    socialLinks?: Array<{ id: string; platform: string; url: string }>;
    onLinkClick?: (pageId?: string) => void;
    styles?: {
        backgroundColor?: string;
        textColor?: string;
        padding?: string;
        margin?: string;
    };
    isEditor?: boolean;
}

// Helper to get editor data if in editor context
const useEditorData = (isEditor?: boolean) => {
    if (!isEditor) return { getContentValue: (key: string) => '' };
    
    // For footer, editor data would come from a different store or context
    // For now, return empty since footer doesn't use the same page store structure
    return { getContentValue: (key: string) => '' };
};

// Footer 1: Simple with Links
export const Footer1 = ({
    logo,
    text,
    title,
    description,
    contactInfo,
    navigationLinks,
    socialLinks,
    onLinkClick,
    styles,
    isEditor = false,
}: FooterProps) => {
    const { getContentValue } = useEditorData(isEditor);
    
    // Use editor content if available, otherwise props
    const finalText = getContentValue('text') || text;
    const finalTitle = getContentValue('title') || title;
    const finalDescription = getContentValue('description') || description;
    
    const logoUrl = (() => {
        if (!logo) return null;
        const base64 = logo.base64Content?.trim();
        const url = logo.url?.trim();
        const isEmpty = !logo.id && !logo.name && !base64 && !url;
        if (isEmpty) return null;
        return base64 || url || null;
    })();

    const platformIconMap: Record<string, any> = {
        Facebook,
        Instagram,
        Twitter,
        Linkedin,
        YouTube: Linkedin,
        TikTok: Linkedin,
        Snapchat: Linkedin,
    };

    const platformLabelMap: Record<string, string> = {
        Facebook: "فيسبوك",
        Instagram: "انستغرام",
        Twitter: "تويتر",
        Linkedin: "لينكد إن",
        YouTube: "يوتيوب",
        TikTok: "تيك توك",
        Snapchat: "سناب شات",
    };

    const socialLinksList =
        socialLinks?.map((social) => ({
            icon: platformIconMap[social.platform] || Facebook,
            href: social.url || "#",
            label: platformLabelMap[social.platform] || social.platform,
        })) || [];

    return (
        <footer
            className="w-full text-white mt-auto"
            dir="rtl"
            style={{
                backgroundColor: styles?.backgroundColor || "#1e293b",
                color: styles?.textColor || "#ffffff",
                padding: styles?.padding,
                margin: styles?.margin,
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
                    <div className="lg:col-span-2">
                        {/* Logo and Description */}
                        <div className="mb-6">
                            {logoUrl ? (
                                <img
                                    className="h-10 w-auto mb-4"
                                    src={logoUrl}
                                    alt="Company logo"
                                    {...(isEditor && {
                                        "data-type": "image",
                                        "data-name": "logo",
                                        "data-title": "شعار الشركة"
                                    })}
                                />
                            ) : (
                                <div className="h-10 w-32 bg-slate-600 rounded mb-4 flex items-center justify-center">
                                    <span className="text-slate-400 text-sm">Logo</span>
                                </div>
                            )}
                            {finalTitle && (
                                <h3 
                                    className="text-xl font-bold mb-2"
                                    {...(isEditor && {
                                        "data-type": "text",
                                        "data-title": "عنوان الفوتر",
                                        "data-name": "title"
                                    })}
                                >
                                    {finalTitle}
                                </h3>
                            )}
                            {finalDescription && (
                                <p 
                                    className="text-slate-300 leading-relaxed"
                                    {...(isEditor && {
                                        "data-type": "textarea",
                                        "data-title": "وصف الفوتر",
                                        "data-name": "description"
                                    })}
                                >
                                    {finalDescription}
                                </p>
                            )}
                            {finalText && (
                                <p 
                                    className="text-slate-300 leading-relaxed"
                                    {...(isEditor && {
                                        "data-type": "textarea",
                                        "data-title": "نص الفوتر",
                                        "data-name": "text"
                                    })}
                                >
                                    {finalText}
                                </p>
                            )}
                        </div>

                        {/* Social Links */}
                        {socialLinksList.length > 0 && (
                            <div className="flex space-x-reverse space-x-4">
                                {socialLinksList.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors"
                                            aria-label={social.label}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Quick Links */}
                    {navigationLinks && navigationLinks.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
                            <ul className="space-y-2">
                                {navigationLinks.map((link) => (
                                    <li key={link.id}>
                                        <a
                                            href={link.url}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (onLinkClick && link.pageId) {
                                                    onLinkClick(link.pageId);
                                                }
                                            }}
                                            className="text-slate-300 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Contact Info */}
                    {(contactInfo?.email || contactInfo?.phone || contactInfo?.address) && (
                        <div>
                            <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
                            <div className="space-y-2">
                                {contactInfo.email && (
                                    <div className="flex items-center space-x-reverse space-x-2">
                                        <Mail className="w-4 h-4 text-slate-400" />
                                        <a
                                            href={`mailto:${contactInfo.email}`}
                                            className="text-slate-300 hover:text-white transition-colors"
                                        >
                                            {contactInfo.email}
                                        </a>
                                    </div>
                                )}
                                {contactInfo.phone && (
                                    <div className="flex items-center space-x-reverse space-x-2">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                        <a
                                            href={`tel:${contactInfo.phone}`}
                                            className="text-slate-300 hover:text-white transition-colors"
                                        >
                                            {contactInfo.phone}
                                        </a>
                                    </div>
                                )}
                                {contactInfo.address && (
                                    <div className="flex items-start space-x-reverse space-x-2">
                                        <MapPin className="w-4 h-4 text-slate-400 mt-1" />
                                        <span className="text-slate-300">{contactInfo.address}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Copyright */}
                <div className="border-t border-slate-700 pt-4 sm:pt-6 text-center text-slate-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} جميع الحقوق محفوظة</p>
                </div>
            </div>
        </footer>
    );
};

// Footer 2: Minimal
export const Footer2 = ({
    logo,
    text,
    title,
    description,
    contactInfo,
    navigationLinks,
    socialLinks,
    onLinkClick,
    styles,
    isEditor = false,
}: FooterProps) => {
    const { getContentValue } = useEditorData(isEditor);
    
    const finalText = getContentValue('text') || text;
    const logoUrl = (() => {
        if (!logo) return null;
        const base64 = logo.base64Content?.trim();
        const url = logo.url?.trim();
        const isEmpty = !logo.id && !logo.name && !base64 && !url;
        if (isEmpty) return null;
        return base64 || url || null;
    })();

    const platformIconMap: Record<string, any> = {
        Facebook,
        Instagram,
        Twitter,
        Linkedin,
        YouTube: Linkedin,
        TikTok: Linkedin,
        Snapchat: Linkedin,
    };

    const socialLinksList =
        socialLinks?.map((social) => ({
            icon: platformIconMap[social.platform] || Facebook,
            href: social.url || "#",
        })) || [];

    return (
        <footer
            className="w-full text-white mt-auto"
            dir="rtl"
            style={{
                backgroundColor: styles?.backgroundColor || "#0f172a",
                color: styles?.textColor || "#ffffff",
                padding: styles?.padding,
                margin: styles?.margin,
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0">
                        {logoUrl ? (
                            <img
                                className="h-8 w-auto mb-4"
                                src={logoUrl}
                                alt="Company logo"
                                {...(isEditor && {
                                    "data-type": "image",
                                    "data-name": "logo",
                                    "data-title": "شعار الشركة"
                                })}
                            />
                        ) : (
                            <div className="h-8 w-24 bg-slate-700 rounded mb-4 flex items-center justify-center">
                                <span className="text-slate-400 text-xs">Logo</span>
                            </div>
                        )}
                        {finalText && (
                            <p 
                                className="text-slate-400 text-sm"
                                {...(isEditor && {
                                    "data-type": "textarea",
                                    "data-title": "نص الفوتر",
                                    "data-name": "text"
                                })}
                            >
                                {finalText}
                            </p>
                        )}
                    </div>

                    <div className="flex space-x-reverse space-x-6">
                        {socialLinksList.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="border-t border-slate-700 mt-8 pt-6 text-center text-slate-500 text-xs">
                    <p>&copy; {new Date().getFullYear()} جميع الحقوق محفوظة</p>
                </div>
            </div>
        </footer>
    );
};

// Footer 3: Detailed with Columns
export const Footer3 = ({
    logo,
    text,
    title,
    description,
    contactInfo,
    navigationLinks,
    socialLinks,
    onLinkClick,
    styles,
    isEditor = false,
}: FooterProps) => {
    const { getContentValue } = useEditorData(isEditor);
    
    const finalText = getContentValue('text') || text;
    const finalTitle = getContentValue('title') || title;
    const finalDescription = getContentValue('description') || description;
    
    const logoUrl = (() => {
        if (!logo) return null;
        const base64 = logo.base64Content?.trim();
        const url = logo.url?.trim();
        const isEmpty = !logo.id && !logo.name && !base64 && !url;
        if (isEmpty) return null;
        return base64 || url || null;
    })();

    const platformIconMap: Record<string, any> = {
        Facebook,
        Instagram,
        Twitter,
        Linkedin,
        YouTube: Linkedin,
        TikTok: Linkedin,
        Snapchat: Linkedin,
    };

    const socialLinksList =
        socialLinks?.map((social) => ({
            icon: platformIconMap[social.platform] || Facebook,
            href: social.url || "#",
            label: social.platform,
        })) || [];

    return (
        <footer
            className="w-full text-white mt-auto"
            dir="rtl"
            style={{
                backgroundColor: styles?.backgroundColor || "#1e293b",
                color: styles?.textColor || "#ffffff",
                padding: styles?.padding,
                margin: styles?.margin,
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        {logoUrl ? (
                            <img
                                className="h-12 w-auto mb-6"
                                src={logoUrl}
                                alt="Company logo"
                                {...(isEditor && {
                                    "data-type": "image",
                                    "data-name": "logo",
                                    "data-title": "شعار الشركة"
                                })}
                            />
                        ) : (
                            <div className="h-12 w-40 bg-slate-600 rounded mb-6 flex items-center justify-center">
                                <span className="text-slate-400 text-sm">Logo</span>
                            </div>
                        )}
                        {finalTitle && (
                            <h3 
                                className="text-2xl font-bold mb-4"
                                {...(isEditor && {
                                    "data-type": "text",
                                    "data-title": "عنوان الفوتر",
                                    "data-name": "title"
                                })}
                            >
                                {finalTitle}
                            </h3>
                        )}
                        {finalDescription && (
                            <p 
                                className="text-slate-300 leading-relaxed mb-6"
                                {...(isEditor && {
                                    "data-type": "textarea",
                                    "data-title": "وصف الفوتر",
                                    "data-name": "description"
                                })}
                            >
                                {finalDescription}
                            </p>
                        )}
                        {finalText && (
                            <p 
                                className="text-slate-400 text-sm"
                                {...(isEditor && {
                                    "data-type": "textarea",
                                    "data-title": "نص الفوتر",
                                    "data-name": "text"
                                })}
                            >
                                {finalText}
                            </p>
                        )}

                        {/* Social Links */}
                        {socialLinksList.length > 0 && (
                            <div className="flex space-x-reverse space-x-3 mt-6">
                                {socialLinksList.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors"
                                            aria-label={social.label}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Navigation Links */}
                    {navigationLinks && navigationLinks.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold mb-6">روابط سريعة</h4>
                            <ul className="space-y-3">
                                {navigationLinks.map((link) => (
                                    <li key={link.id}>
                                        <a
                                            href={link.url}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (onLinkClick && link.pageId) {
                                                    onLinkClick(link.pageId);
                                                }
                                            }}
                                            className="text-slate-300 hover:text-white transition-colors text-sm"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Contact Info */}
                    {(contactInfo?.email || contactInfo?.phone || contactInfo?.address) && (
                        <div>
                            <h4 className="text-lg font-semibold mb-6">معلومات الاتصال</h4>
                            <div className="space-y-4">
                                {contactInfo.email && (
                                    <div className="flex items-center space-x-reverse space-x-3">
                                        <Mail className="w-5 h-5 text-slate-400" />
                                        <div>
                                            <p className="text-sm text-slate-400">البريد الإلكتروني</p>
                                            <a
                                                href={`mailto:${contactInfo.email}`}
                                                className="text-slate-300 hover:text-white transition-colors"
                                            >
                                                {contactInfo.email}
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {contactInfo.phone && (
                                    <div className="flex items-center space-x-reverse space-x-3">
                                        <Phone className="w-5 h-5 text-slate-400" />
                                        <div>
                                            <p className="text-sm text-slate-400">الهاتف</p>
                                            <a
                                                href={`tel:${contactInfo.phone}`}
                                                className="text-slate-300 hover:text-white transition-colors"
                                            >
                                                {contactInfo.phone}
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {contactInfo.address && (
                                    <div className="flex items-start space-x-reverse space-x-3">
                                        <MapPin className="w-5 h-5 text-slate-400 mt-1" />
                                        <div>
                                            <p className="text-sm text-slate-400">العنوان</p>
                                            <span className="text-slate-300">{contactInfo.address}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-700 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <p className="text-slate-400 text-sm mb-4 md:mb-0">
                            &copy; {new Date().getFullYear()} جميع الحقوق محفوظة
                        </p>
                        <p className="text-slate-500 text-xs">
                            صُمم بكل ❤️ بواسطة فريقنا
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
