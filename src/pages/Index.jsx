import { useLoaderData } from "react-router-dom"
import Customer from "../components/Customer"
import { getCustomers } from "../api/customers";

// mediante esta funcion se puede crear un state o consultar una api
// Get registros
export function loader() {
  const customers = getCustomers()



    console.log(import.meta.env);

  return customers
}

function Index() {
  const customers = useLoaderData()

  console.log(customers)

  return (
      <>
          <h1 className="font-black text-4xl text-blue-900">Customers</h1>
          <p className="mt-3">Administra tus clientes</p>

          {customers.length ? (
              <table className="w-full bg-white shadow mt-5 table-auto">
                  <thead>
                      <tr>
                          <th className="p-2">Customers</th>
                          <th className="p-2">Contacts</th>
                          <th className="p-2">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      { customers.map( customer => (
                          <Customer
                          customer={customer}
                          key={customer.id}
                          />
                      ))}
                  </tbody>
              </table>
          ) : (
              <p>No hay clientes</p>
          )}
      </>
  )
}

export default Index