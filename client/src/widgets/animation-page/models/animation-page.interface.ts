import React from 'react'

import { Variants, Transition } from 'framer-motion'

export interface AnimationPageProps {
  children: React.ReactElement
  animation?: Variants
  transition?: Transition
  classes?: string
}
