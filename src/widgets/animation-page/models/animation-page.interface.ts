import React from 'react'

import { Variants } from 'framer-motion'
import { Transition } from 'framer-motion/types/types'

export interface AnimationPageProps {
  children: React.ReactElement
  animation?: Variants
  transition?: Transition
}
