import PageList from './PageList'

function Products() {
  return (
    <PageList
      title="Products"
      description="A sample list of products in your store."
      items={[
        { name: 'Classic T-Shirt', detail: 'SKU: TS-001 · $24.00', status: 'In stock' },
        { name: 'Canvas Backpack', detail: 'SKU: BP-014 · $58.00', status: 'Low stock' },
        { name: 'Travel Mug', detail: 'SKU: MG-008 · $18.00', status: 'In stock' },
      ]}
    />
  )
}

export default Products
