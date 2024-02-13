import React from 'react'

import Button from 'components/theme/plain/Button'
import LocationIcon from 'components/icons/LocationIcon'
import IconText from 'components/theme/Diageo/DIconText'
import TileListing, {
	Tile,
	TileListingProps,
	TileProps,
} from 'components/theme/Diageo/DTileListing'

export default function TileListingVacancies(props: TileListingProps) {
	return (
		<TileListing
			{...props}
			// TileComponent={(props: TileProps) => (
			//   <Tile {...props} subtitle={<IconText icon={<LocationIcon fill="rgba(0,0,0,0.3)" />} text={props.subtitle} />} />
			// )}
			CtaComponent={() => (
				<>
					<Button buttonStyle="primary" text="View All Jobs" />
					{/* <br />
          <Button className="mt--s" buttonStyle="tertiary" text="Create job alerts" /> */}
				</>
			)}
		/>
	)
}
