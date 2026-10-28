
function Home() {
  return (
    <section className="dashboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>Dashboard</h1>
          <p className="page-description">
            Welcome back. Here's your store overview.
          </p>
        </div>

        <button type="button">Add product</button>
      </div>

      <div className="dashboard-card">
        <h2>Get started</h2>
        <p>
          Your admin workspace is ready.
          Use the menu to manage your store.
        </p>
      </div>
    </section>
  );
}
 
export default Home;
