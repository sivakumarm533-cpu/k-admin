import PageList from './PageList'

function Settings() {
  return (
    <PageList
      title="Settings"
      description="Example store settings. These are display-only for now."
      items={[
        { name: 'Store name', detail: 'Everyday Goods', status: 'Configured' },
        { name: 'Contact email', detail: 'hello@example.com', status: 'Configured' },
        { name: 'Currency', detail: 'USD ($)', status: 'Configured' },
      ]}
    />
  )
}

export default Settings
