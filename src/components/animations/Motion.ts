import { Variants, Transition } from "framer-motion";

export const transition: Transition = {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1],
};

export const fadeUpVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 32,
    },
    visible: {
        opacity: 1,
        y: 0,
    },
};

export const fadeVariants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
};

export const staggerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};
