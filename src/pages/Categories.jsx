import PageList from './PageList'

function Categories() {
  return (
    <PageList
      title="Categories"
      description="Example categories used to organize your products."
      items={[
        { name: 'Clothing', detail: '12 products', status: 'Active' },
        { name: 'Accessories', detail: '8 products', status: 'Active' },
        { name: 'Home & Living', detail: '5 products', status: 'Draft' },
      ]}
    />
  )
}

export default Categories
