import PageList from './PageList'

function Orders() {
  return (
    <PageList
      title="Orders"
      description="Recent sample orders from your customers."
      items={[
        { name: 'Order #1048', detail: 'Alex Morgan · $82.00', status: 'Processing' },
        { name: 'Order #1047', detail: 'Jamie Lee · $24.00', status: 'Shipped' },
        { name: 'Order #1046', detail: 'Sam Taylor · $58.00', status: 'Delivered' },
      ]}
    />
  )
}

export default Orders
