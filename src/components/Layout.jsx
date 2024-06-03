import { Outlet, Link, useLocation } from "react-router-dom";

function Layout() {
    const location = useLocation()

    // console.log(location);
    
  return (
      <div className="md: flex md:min-h-screen">
          <aside className="md:w-1/4 bg-blue-900 px-5 py-10">
              <h2 className="text-2xl text-center text-white">CRM DEVVOP</h2>
              <nav className="mt-10">
                  <Link
                      className={`${
                          location.pathname === "/"
                              ? "text-blue-300"
                              : "text-white"
                      } text-2xl block mt-2 hover:text-blue-300`}
                      to="/"
                  >
                      Customers
                  </Link>
                  <Link
                      className={`${
                          location.pathname == "/customer/new"
                              ? "text-blue-300"
                              : "text-white"
                      } text-2xl block mt-2 hover:text-blue-300`}
                      to="/customer/new"
                  >
                      New customer
                  </Link>
              </nav>
          </aside>

          <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
              <Outlet />
          </main>
      </div>
  )
}

export default Layout