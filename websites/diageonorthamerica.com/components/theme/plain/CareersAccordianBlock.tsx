import { CareersAccordianBlockProps } from 'components/propTypes'
import Accordions from 'components/styled-components/Careers/Accordions/Accordions'
import React from 'react'

export default function CareersAccordianBlock(
	props: CareersAccordianBlockProps,
) {
	return <Accordions {...props} />
}
