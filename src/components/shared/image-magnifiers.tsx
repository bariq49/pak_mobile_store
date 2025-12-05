import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// Type definitions for props
interface MagnifierProps {
    src: string;
    alt: string;
    width?: string;
    height?: string;
    zoomLevel?: number;
    magnifierSize?: number;
    largeSrc?: string;

}

// Component 1: Basic Magnifying Glass (Fixed imgSize.height issue)
const GlassMagnifier: React.FC<MagnifierProps> = ({
                                                      src,
                                                      alt,
                                                      width = '100%',
                                                      height = 'auto',
                                                      zoomLevel = 2,
                                                      magnifierSize = 150,
                                                  }) => {
    const [showMagnifier, setShowMagnifier] = useState<boolean>(false);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [imgSize, setImgSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const imgRef = useRef<HTMLImageElement>(null);

    // Update image size on mount, resize, and image load
    useEffect(() => {
        const currentImg = imgRef.current; // Store reference at start
        const updateImgSize = () => {
            if (currentImg) {
                const width = currentImg.offsetWidth;
                const height = currentImg.offsetHeight;
                setImgSize({ width, height });
            }
        };

        updateImgSize();
        if (currentImg) {
            if (currentImg.complete) {
                updateImgSize();
            } else {
                currentImg.addEventListener('load', updateImgSize);
            }
        }
        window.addEventListener('resize', updateImgSize);

        const interval = setInterval(() => {
            if (currentImg && currentImg.offsetHeight > 0) {
                updateImgSize();
                clearInterval(interval);
            }
        }, 100);

        return () => {
            window.removeEventListener('resize', updateImgSize);
            if (currentImg) {
                currentImg.removeEventListener('load', updateImgSize);
            }
            clearInterval(interval);
        };
    }, [src]);

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!imgRef.current) return;

        const { left, top } = imgRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        // Ensure magnifier stays within image bounds
        const boundedX = Math.max(0, Math.min(x, imgSize.width));
        const boundedY = Math.max(0, Math.min(y, imgSize.height));

        // Debugging logs (uncomment to inspect values)
        // console.log({ x, y, boundedX, boundedY, imgSize });

        setPosition({ x: boundedX, y: boundedY });
    };

    return (
        <div className="relative" style={{ width, height }}>
            <Image
                ref={imgRef}
                src={src}
                alt={alt}
                width={imgSize.width || 1000}
                height={imgSize.height || 1000}
                priority // Add priority to optimize LCP
                className="w-full h-auto object-cover cursor-crosshair"
                onLoad={() => {
                    if (imgRef.current) {
                        setImgSize({
                            width: imgRef.current.offsetWidth,
                            height: imgRef.current.offsetHeight,
                        });
                    }
                }}
                onMouseEnter={() => setShowMagnifier(true)}
                onMouseLeave={() => setShowMagnifier(false)}
                onMouseMove={handleMouseMove}
            />
            {showMagnifier && imgSize.width > 0 && imgSize.height > 0 && (
                <div
                    className="absolute border-3 border-black/50 bg-white  pointer-events-none rounded-full"
                    style={{
                        width: `${magnifierSize}px`,
                        height: `${magnifierSize}px`,
                        top: `${position.y - magnifierSize / 2}px`,
                        left: `${position.x - magnifierSize / 2}px`,
                        backgroundImage: `url(${src})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: `${imgSize.width * zoomLevel}px ${imgSize.height * zoomLevel}px`,
                        backgroundPositionX: `${-position.x * zoomLevel + magnifierSize / 2}px`,
                        backgroundPositionY: `${-position.y * zoomLevel + magnifierSize / 2}px`,
                    }}
                />
            )}
        </div>
    );
};

// Component 2: Side-by-Side Magnifier (Updated for in-place zoom with sample code styling)
const SideBySideMagnifier: React.FC<MagnifierProps> = ({
                                                           src,
                                                           largeSrc,
                                                           alt,
                                                           width = '100%',
                                                           zoomLevel = 2,
                                                       }) => {
    const [showMagnifier, setShowMagnifier] = useState<boolean>(false);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [imgSize, setImgSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const currentImg = imgRef.current; // Store reference at start
        const updateImgSize = () => {
            if (currentImg) {
                const width = currentImg.offsetWidth;
                const height = currentImg.offsetHeight;
                setImgSize({ width, height });
            }
        };

        updateImgSize();
        if (currentImg) {
            if (currentImg.complete) {
                updateImgSize();
            } else {
                currentImg.addEventListener('load', updateImgSize);
            }
        }
        window.addEventListener('resize', updateImgSize);
        const interval = setInterval(() => {
            if (currentImg && currentImg.offsetHeight > 0) {
                updateImgSize();
                clearInterval(interval);
            }
        }, 100);

        return () => {
            window.removeEventListener('resize', updateImgSize);
            if (currentImg) {
                currentImg.removeEventListener('load', updateImgSize);
            }
            clearInterval(interval);
        };
    }, [src]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imgRef.current) return;
        const { left, top } = imgRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        const boundedX = Math.max(0, Math.min(x, imgSize.width));
        const boundedY = Math.max(0, Math.min(y, imgSize.height));

        setPosition({ x: boundedX, y: boundedY });
    };

    // Magnifier dimensions match original image size
    const magnifierSize = imgSize.width;
    const magnifierHeight = imgSize.height;

    // Calculate zoomed image dimensions
    const zoomedWidth = imgSize.width * zoomLevel;
    const zoomedHeight = imgSize.height * zoomLevel;

    // Calculate translation to center the zoomed area under the cursor
    const translateX = position.x * zoomLevel - magnifierSize / 2;
    const translateY = position.y * zoomLevel - magnifierHeight / 2;

    // Clamp translation to keep zoomed image within magnifier bounds
    const maxTranslateX = zoomedWidth - magnifierSize;
    const maxTranslateY = zoomedHeight - magnifierHeight;
    const clampedTranslateX = Math.max(0, Math.min(translateX, maxTranslateX));
    const clampedTranslateY = Math.max(0, Math.min(translateY, maxTranslateY));

    return (
        <div className="relative">
            {/* Original Image Container */}
            <div className=" w-full h-full" style={{ width: imgSize.width || '100%', height: imgSize.height || 'auto' }}>
                <Image
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    width={imgSize.width || 1000} // Fallback width
                    height={imgSize.height || 1000} // Fallback height
                    className="w-full h-auto object-cover"
                    onLoad={() => {
                        if (imgRef.current) {
                            setImgSize({
                                width: imgRef.current.offsetWidth,
                                height: imgRef.current.offsetHeight,
                            });
                        }
                    }}
                    onMouseEnter={() => setShowMagnifier(true)}
                    onMouseLeave={() => setShowMagnifier(false)}
                    onMouseMove={handleMouseMove}
                />
            </div>

            {/* Magnifier Container (Positioned Absolutely) */}
            {showMagnifier && imgSize.width > 0 && imgSize.height > 0 && (
                <div
                    className={"shadow-lg"}
                    style={{
                        position: 'absolute',
                        boxSizing: 'border-box',
                        pointerEvents: 'none',
                        width: `${magnifierSize}px`,
                        height: `${magnifierHeight}px`,
                        top: '0px',
                        left: '0px', // Overlaps the original image
                        opacity: showMagnifier ? 1 : 0,
                        transition: 'opacity 0.4s',
                        zIndex: 100,
                        overflow: 'hidden',
                        border: '1px solid #ddd',
                    }}
                >
                    <Image
                        src={largeSrc || src}
                        alt=""
                        width={zoomedWidth}
                        height={zoomedHeight}
                        style={{
                            position: 'absolute',
                            boxSizing: 'border-box',
                            display: 'block',
                            top: '0px',
                            left: '0px',
                            transform: `translate(-${clampedTranslateX}px, -${clampedTranslateY}px)`,
                            zIndex: 1,
                            visibility: 'visible',
                        }}
                    />
                </div>
            )}
        </div>
    );
};


// Component 3: PictureInPictureMagnifier
const PictureInPictureMagnifier: React.FC<MagnifierProps> = ({
                                                                 src,
                                                                 largeSrc,
                                                                 alt,
                                                                 width = '100%',
                                                                 height = 'auto',
                                                                 zoomLevel = 1.5,
                                                             }) => {
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [showMagnifier, setShowMagnifier] = useState<boolean>(false);
    const [imgSize, setImgSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const currentImg = imgRef.current;
        const updateImgSize = () => {
            if (currentImg) {
                setImgSize({
                    width: currentImg.offsetWidth,
                    height: currentImg.offsetHeight,
                });
            }
        };

        updateImgSize();
        window.addEventListener('resize', updateImgSize);
        return () => window.removeEventListener('resize', updateImgSize);
    }, [src]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imgRef.current) return;
        const { left, top } = imgRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        setPosition({ x, y });
    };

    return (
        <div className="relative" style={{ width, height }}>
            <Image
                ref={imgRef}
                src={src}
                alt={alt}
                width={imgSize.width || 1000}
                height={imgSize.height || 1000}
                className="w-full h-auto object-cover"
                onLoad={() => {
                    if (imgRef.current) {
                        setImgSize({
                            width: imgRef.current.offsetWidth,
                            height: imgRef.current.offsetHeight,
                        });
                    }
                }}
                onMouseEnter={() => setShowMagnifier(true)}
                onMouseLeave={() => setShowMagnifier(false)}
                onMouseMove={handleMouseMove}
            />
            {showMagnifier && imgSize.width > 0 && imgSize.height > 0 && (
                <div className="absolute bottom-0 right-0 w-32 h-32 border border-gray-300 bg-white opacity-80">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `url(${largeSrc || src})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: `${imgSize.width * zoomLevel}px ${imgSize.height * zoomLevel}px`,
                            backgroundPositionX: `${-position.x * zoomLevel + 64}px`,
                            backgroundPositionY: `${-position.y * zoomLevel + 64}px`,
                        }}
                    />
                </div>
            )}
        </div>
    );
};

// Component 4: ClickToZoomMagnifier
const ClickToZoomMagnifier: React.FC<MagnifierProps> = ({
                                                            src,
                                                            largeSrc,
                                                            alt,
                                                            width = '100%',
                                                            height = 'auto',
                                                            zoomLevel = 2,
                                                        }) => {
    const [isZoomed, setIsZoomed] = useState<boolean>(false);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [imgSize, setImgSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const currentImg = imgRef.current;
        const updateImgSize = () => {
            if (currentImg) {
                setImgSize({
                    width: currentImg.offsetWidth,
                    height: currentImg.offsetHeight,
                });
            }
        };

        updateImgSize();
        window.addEventListener('resize', updateImgSize);
        return () => window.removeEventListener('resize', updateImgSize);
    }, [src]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imgRef.current) return;
        const { left, top } = imgRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        setPosition({ x, y });
    };

    const handleClick = () => {
        setIsZoomed((prev) => !prev);
    };

    return (
        <div className="relative" style={{ width, height }}>
            <Image
                ref={imgRef}
                src={src}
                alt={alt}
                width={imgSize.width || 1000}
                height={imgSize.height || 1000}
                className="w-full h-auto object-cover cursor-pointer"
                onLoad={() => {
                    if (imgRef.current) {
                        setImgSize({
                            width: imgRef.current.offsetWidth,
                            height: imgRef.current.offsetHeight,
                        });
                    }
                }}
                onClick={handleClick}
                onMouseMove={handleMouseMove}
            />
            {isZoomed && imgSize.width > 0 && imgSize.height > 0 && (
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${largeSrc || src})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: `${imgSize.width * zoomLevel}px ${imgSize.height * zoomLevel}px`,
                        backgroundPositionX: `${-position.x * zoomLevel + imgSize.width / 2}px`,
                        backgroundPositionY: `${-position.y * zoomLevel + imgSize.height / 2}px`,
                    }}
                />
            )}
        </div>
    );
};

// Component 5: TouchFriendlyMagnifier
const TouchFriendlyMagnifier: React.FC<MagnifierProps> = ({
                                                              src,
                                                              alt,
                                                              width = '100%',
                                                              height = 'auto',
                                                              zoomLevel = 2,
                                                              magnifierSize = 150,
                                                          }) => {
    const [showMagnifier, setShowMagnifier] = useState<boolean>(false);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [imgSize, setImgSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const currentImg = imgRef.current;
        const updateImgSize = () => {
            if (currentImg) {
                setImgSize({
                    width: currentImg.offsetWidth,
                    height: currentImg.offsetHeight,
                });
            }
        };

        updateImgSize();
        window.addEventListener('resize', updateImgSize);
        return () => window.removeEventListener('resize', updateImgSize);
    }, [src]);

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0];
        if (!imgRef.current) return;
        const { left, top } = imgRef.current.getBoundingClientRect();
        const x = touch.clientX - left;
        const y = touch.clientY - top;
        setPosition({ x, y });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imgRef.current) return;
        const { left, top } = imgRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        setPosition({ x, y });
    };

    return (
        <div className="relative" style={{ width, height }}>
            <Image
                ref={imgRef}
                src={src}
                alt={alt}
                width={imgSize.width || 1000}
                height={imgSize.height || 1000}
                className="w-full h-auto object-cover cursor-crosshair"
                onLoad={() => {
                    if (imgRef.current) {
                        setImgSize({
                            width: imgRef.current.offsetWidth,
                            height: imgRef.current.offsetHeight,
                        });
                    }
                }}
                onTouchStart={() => setShowMagnifier(true)}
                onTouchEnd={() => setShowMagnifier(false)}
                onTouchMove={handleTouchMove}
                onMouseEnter={() => setShowMagnifier(true)}
                onMouseLeave={() => setShowMagnifier(false)}
                onMouseMove={handleMouseMove}
            />
            {showMagnifier && imgSize.width > 0 && imgSize.height > 0 && (
                <div
                    className="absolute border-3 border-black/50 bg-white pointer-events-none rounded-full"
                    style={{
                        width: `${magnifierSize}px`,
                        height: `${magnifierSize}px`,
                        top: `${position.y - magnifierSize / 2}px`,
                        left: `${position.x - magnifierSize / 2}px`,
                        backgroundImage: `url(${src})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: `${imgSize.width * zoomLevel}px ${imgSize.height * zoomLevel}px`,
                        backgroundPositionX: `${-position.x * zoomLevel + magnifierSize / 2}px`,
                        backgroundPositionY: `${-position.y * zoomLevel + magnifierSize / 2}px`,
                    }}
                />
            )}
        </div>
    );
};

export {
    GlassMagnifier,
    SideBySideMagnifier,
    PictureInPictureMagnifier,
    ClickToZoomMagnifier,
    TouchFriendlyMagnifier,
};