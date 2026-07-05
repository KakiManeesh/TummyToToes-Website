"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FadeInWhenVisibleProps {
    children: ReactNode;
    className?: string;
    delay?: number; // stagger delay in ms
    threshold?: number;
}

/**
 * Wraps children in a div that fades + slides up when it enters the viewport.
 * Uses IntersectionObserver — disconnects after first trigger so it only fires once.
 */
export const FadeInWhenVisible = ({
    children,
    className = "",
    delay = 0,
    threshold = 0.12,
}: FadeInWhenVisibleProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(22px)",
                transition: `opacity 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
};
