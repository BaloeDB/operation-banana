import { Link, Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <header>
        <nav>
          <Link to="">
            <h1>Banana Webshop</h1>
          </Link>
          <div className="flex gap-2">
            <Link to="">Home</Link>
            <Link to="banana-clicker">Banana Clicker</Link>
            <Link to="create">Order Banana</Link>
            <Link to="banana-recipe">Banana Recipe</Link>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Root;
