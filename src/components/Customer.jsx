import { Form, useNavigate, redirect, useActionData } from "react-router-dom"
import { deleteCustomer } from "../api/customers"

export async function action({params}){
    await deleteCustomer(params.customerId)
    console.log("OK");
    return redirect('/')
}


function Customer({customer}) {

    const navigate = useNavigate()
    const { nombre, empresa, email, telefono, id } = customer

  return (
      <tr className="border-b">
          <td className="p-3 space-y-2">
              <p className="text-2xl text-gray-800">{nombre}</p>
              <p>{empresa}</p>
          </td>
          <td className="p-3">
              <p className="text-gray-600">
                  <span className="font-bold text-gray-800">Email: </span>
                  {email}
              </p>
              <p className="text-gray-600">
                  <span className="font-bold text-gray-800">Tel: </span>
                  {telefono}
              </p>
              <p>{empresa}</p>
          </td>
          <td className="p-6">
              <button
                  type="button"
                  className="text-blue-600 uppercase font-bold- text-xs"
                  onClick={() => navigate(`/customers/${id}/edit`)}
              >
                  Editar
              </button>
          </td>
          <td className="p-6">
              <Form
              method="post"
              action={`/customers/${id}/delete`}
              onSubmit={(e) => {
                if(!confirm('Do you want delete the user?')){
                    e.preventDefault()
                }
              }}
              >
                  <button
                      type="submit"
                      className="text-red-600 uppercase font-bold- text-xs"
                  >
                      Eliminar
                  </button>
              </Form>
          </td>
      </tr>
  )
}

export default Customer