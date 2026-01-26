"use client"

import { ShoppingCart, Menu } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../../../../store/cart";
import { FileType } from "../../../../../types";

interface NavigationLink {
    id: string;
    label: string;
    url: string;
    pageId?: string;
}

export const Navigation1 = ({
    logo,
    navigationLinks,
    primaryColor,
    onLinkClick,
}: {
    logo?: FileType;
    navigationLinks?: NavigationLink[];
    primaryColor?: string;
    onLinkClick?: (pageId?: string, url?: string) => void;
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { getItemCount } = useCartStore();
    const cartCount = getItemCount();
    const logoUrl = logo?.base64Content || logo?.url;
    const themeColor = primaryColor || "#4272FF";

    return (
        <nav className="w-full border-b sticky top-0 z-50 border-slate-200 bg-white shadow-sm">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Left Side */}
                    <div className="shrink-0">
                        {logoUrl ? (
                            <img className="h-10 w-auto" src={logoUrl} alt="logo" />
                        ) : (
                            <div className="h-10 w-32 bg-slate-200 rounded flex items-center justify-center">
                                <span className="text-slate-400 text-sm">Logo</span>
                            </div>
                        )}
                    </div>

                    {/* Desktop Navigation Links - Center */}
                    {navigationLinks && navigationLinks.length > 0 && (
                        <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-center">
                            {navigationLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        if (onLinkClick) {
                                            onLinkClick(link.pageId, link.url);
                                        } else {
                                            // Fallback: scroll to section if pageId exists
                                            if (link.pageId) {
                                                const element = document.querySelector(
                                                    `[data-page-id="${link.pageId}"]`
                                                );
                                                if (element) {
                                                    element.scrollIntoView({
                                                        behavior: "smooth",
                                                        block: "start",
                                                    });
                                                }
                                            }
                                        }
                                    }}
                                    className="text-slate-700 transition-colors font-medium text-sm relative group py-2 cursor-pointer"
                                    style={
                                        {
                                            "--hover-color": themeColor,
                                        } as React.CSSProperties
                                    }
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = themeColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "";
                                    }}
                                >
                                    {link.label}
                                    <span
                                        className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                                        style={{ backgroundColor: themeColor }}
                                    ></span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        {/* Shopping Cart */}
                        <button
                            onClick={() => navigate("/store-view/cart")}
                            className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors group"
                            onMouseEnter={(e) => {
                                const icon = e.currentTarget.querySelector("svg");
                                if (icon) icon.style.color = themeColor;
                            }}
                            onMouseLeave={(e) => {
                                const icon = e.currentTarget.querySelector("svg");
                                if (icon) icon.style.color = "";
                            }}
                        >
                            <ShoppingCart className="w-5 h-5 text-slate-700 transition-colors" />
                            {cartCount > 0 && (
                                <span
                                    className="absolute -top-1 -right-1 w-5 h-5 text-white text-xs rounded-full flex items-center justify-center font-bold"
                                    style={{ backgroundColor: themeColor }}
                                >
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            <Menu className="w-5 h-5 text-slate-700" />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {mobileMenuOpen && navigationLinks && navigationLinks.length > 0 && (
                    <div className="md:hidden border-t border-slate-200 py-4 animate-in slide-in-from-top">
                        <div className="flex flex-col gap-2">
                            {navigationLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setMobileMenuOpen(false);
                                        if (onLinkClick) {
                                            onLinkClick(link.pageId, link.url);
                                        } else {
                                            // Fallback: scroll to section if pageId exists
                                            if (link.pageId) {
                                                const element = document.querySelector(
                                                    `[data-page-id="${link.pageId}"]`
                                                );
                                                if (element) {
                                                    element.scrollIntoView({
                                                        behavior: "smooth",
                                                        block: "start",
                                                    });
                                                }
                                            }
                                        }
                                    }}
                                    className="text-slate-700 hover:bg-slate-50 transition-colors font-medium px-4 py-2 rounded-lg text-right"
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = themeColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "";
                                    }}
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
