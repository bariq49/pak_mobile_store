"use client";
import React, {useEffect} from "react";
import Image from "@/components/shared/image";
import {GlassMagnifier, SideBySideMagnifier} from "@/components/shared/image-magnifiers" ;
import {Product} from "@/services/types";
import cn from "classnames";
import {productGalleryPlaceholder} from "@/assets/placeholders";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipe from "photoswipe";
import "photoswipe/style.css";


interface GalleryProps {
    className?: string;
    variant?: "default" |"glass"| "innerZoom";
    galleryID?: string;
    data?: Product;
}

interface GalleryItem {
    id?: string | number;
    original: string;
    largeImage?: string;
    width?: number;
    height?: number;
}

const ProductImageGrid: React.FC<GalleryProps> = ({data, variant = 'glass', className, galleryID="simpleGallery"}) => {
    
    useEffect(() => {
        const lightbox = new PhotoSwipeLightbox({
            gallery: `#${galleryID}`,
            children: "a",
            pswpModule: () => import("photoswipe"),
            padding: {top: 20, bottom: 40, left: 20, right: 20},
            showHideAnimationType: "zoom",
            zoomAnimationDuration: 400,
            bgOpacity: 0.9,
        });
        
        lightbox.on("uiRegister", () => {
            lightbox.pswp?.ui?.registerElement({
                name: "download-button",
                order: 8,
                isButton: true,
                tagName: "a",
                html: {
                    isCustomSVG: true,
                    inner: '<path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-6 4v-2h12v2H6z" />',
                    outlineID: "pswp__icn-download",
                },
                onInit: (el: HTMLElement, pswp: PhotoSwipe) => {
                    const anchorEl = el as HTMLAnchorElement;
                    anchorEl.setAttribute("download", "");
                    anchorEl.setAttribute("target", "_blank");
                    anchorEl.setAttribute("rel", "noopener");
                    
                    // Safely access currSlide
                    anchorEl.href = pswp.currSlide?.data.src || "";
                    
                    pswp.on("change", () => {
                        anchorEl.href = pswp.currSlide?.data.src || "";
                    });
                },
            });
        });
        
        lightbox.init();
        
        return () => {
            lightbox.destroy();
        };
    }, [galleryID]);
    
    
    return (
        <div id={galleryID} className={cn(
            "pswp-gallery text-center ",
            {'space-y-2 xl:space-y-5': variant === 'default'},
            {'grid gird-cols-1 md:grid-cols-2 ': variant === 'innerZoom'},
            className
        )}>
            {data?.gallery?.map((item: GalleryItem, index: number) => (
                <div key={`${galleryID}-${index}`}>
                    {(() => {
                        switch (variant) {
                            case 'glass':
                                return (
                                    <a
                                        className={"block"}
                                        href={item.original}
                                        data-pswp-width={item.width || 1000}
                                        data-pswp-height={item.height || 1000}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <div className=" mx-auto magnifier-image-container" style={{
                                            width: `${item.width || 650}px`,
                                            maxWidth: '100%',
                                        }}>
                                            <GlassMagnifier
                                                src={item.original ?? productGalleryPlaceholder}
                                                alt={`Product gallery ${item.id || index}`}
                                            />
                                        </div>
                                    </a>
                                )
                               
                            case 'innerZoom':
                               return(
                                   <div className=" mx-auto magnifier-image-container">
                                       <SideBySideMagnifier
                                           src={item.original ?? productGalleryPlaceholder}
                                           largeSrc={item.largeImage ?? item.original ?? productGalleryPlaceholder}
                                           alt={`Product gallery ${item.id || index}`}
                                       />
                                   </div>
                               )
                            
                            default:
                                return(
                                    <a
                                        className={"block cursor-zoom-in"}
                                        href={item.original}
                                        data-pswp-width={item.width || 1000}
                                        data-pswp-height={item.height || 1000}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Image
                                            src={item.original ?? productGalleryPlaceholder}
                                            alt={`Product gallery ${item.id || index}`}
                                            width={650}
                                            height={590}
                                            className="mx-auto rounded-lg object-cover"
                                        />
                                    </a>
                                )
                        }
                    })()}
                </div>
            ))}
        </div>
    );
}
export default ProductImageGrid;
