import {MotionProps, motion, Variants} from "framer-motion";
import React, {FC} from "react";
import {Transition} from "framer-motion/types/types";

interface AnimationPageProps {
    children: React.ReactElement,
    animation?: Variants,
    transition?: Transition
}

const defaultAnimation: Variants = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0}
};

const defaultTransition: Transition = {
    duration: 0.2
}

const AnimationPage: FC<AnimationPageProps> = (
    {
        children,
        animation = defaultAnimation,
        transition = defaultTransition
    }: AnimationPageProps) => {
    return (
        <motion.div
            variants={animation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
        >
            {children}
        </motion.div>
    )
}

export default AnimationPage;