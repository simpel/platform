import React from 'react'

const TabsContext = React.createContext<{ activeTabId: string }>({
	activeTabId: '',
})
export default TabsContext
