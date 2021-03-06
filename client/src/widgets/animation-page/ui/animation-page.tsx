import React, { FC } from 'react'

import cn from 'classnames'
import { motion, Variants, Transition } from 'framer-motion'

import { AnimationPageProps } from '@widgets/animation-page/models/animation-page.interface'


const defaultAnimation: Variants = {
  initial: {opacity: 0},
  animate: {opacity: 1},
  exit: {opacity: 0},
}

const defaultTransition: Transition = {
  duration: 0.2,
}

const AnimationPage: FC<AnimationPageProps> = ({
  children,
  animation = defaultAnimation,
  transition = defaultTransition,
  classes = ''
}) => {
  return (
    <motion.div
      className={ cn('h-full', classes) }
      variants={ animation }
      initial="initial"
      animate="animate"
      exit="exit"
      transition={ transition }
    >
      {children}
    </motion.div>
  )
}

export { AnimationPage }
