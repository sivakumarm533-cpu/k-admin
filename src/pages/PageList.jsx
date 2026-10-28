function PageList({ title, description, items }) {
  return (
    <section className="dashboard-page" aria-labelledby="page-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1 id="page-title">{title}</h1>
          <p className="page-description">{description}</p>
        </div>
      </div>

      <div className="dummy-list">
        {items.map((item) => (
          <article className="dummy-list-item" key={item.name}>
            <div>
              <h2>{item.name}</h2>
              <p>{item.detail}</p>
            </div>
            <span className="dummy-status">{item.status}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PageList
