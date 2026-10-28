import { useNavigate } from "react-router-dom";
import StockStatus from "../components/stockstatus";
import useAuth from "../context/useAuth";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>

    <section className="dashboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>Dashboard</h1>
          <p className="page-description">
            Welcome back. Here's your store overview.
          </p>
        </div>

        {user?.role === "admin" && (
          <button type="button" onClick={() => navigate("/products/new")}>
            Add product
          </button>
        )}
      </div>

      <div className="dashboard-card">
        <h2>Get started</h2>
        <p>
          Your admin workspace is ready.
          Use the menu to manage your store.
        </p>
      </div>
    </section>
      <StockStatus />
    </>
  );
}
 
export default Home;
