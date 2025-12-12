import { useState, useEffect } from 'react';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    placeholder?: string;
}

const LazyImage = ({ src, alt, className = '', placeholder = 'https://via.placeholder.com/400x300?text=Loading...' }: LazyImageProps) => {
    const [imageSrc, setImageSrc] = useState(placeholder);
    const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        let observer: IntersectionObserver;

        if (imageRef && imageSrc === placeholder) {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setImageSrc(src);
                            observer.unobserve(imageRef);
                        }
                    });
                },
                {
                    rootMargin: '50px'
                }
            );

            observer.observe(imageRef);
        }

        return () => {
            if (observer && imageRef) {
                observer.unobserve(imageRef);
            }
        };
    }, [imageRef, imageSrc, src, placeholder]);

    return (
        <img
            ref={setImageRef}
            src={imageSrc}
            alt={alt}
            className={`${className} ${imageSrc === placeholder ? 'blur-sm' : 'blur-0'} transition-all duration-300`}
            loading="lazy"
        />
    );
};

export default LazyImage;
