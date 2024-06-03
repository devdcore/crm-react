import {
    Form,
    useNavigate,
    useLoaderData,
    useActionData,
    redirect,
} from "react-router-dom"
import { getCustomer, updateCustomer } from "../api/customers"
import Formulario from "../components/Formulario"
import Error from "../components/Error"

export async function loader({params}){

  const cusrtomer = await getCustomer(params.customerId)
  // creando propios mensajes de error
  // Si no viene nada, error y detiene la ejecución del código
  if(Object.values(cusrtomer).length === 0){
    throw new Response('', {
      status: 404,
      statusText: 'No hay resultados'
    })
  }

    console.log("params", params)
    console.log("cusrtomer", cusrtomer)

    return cusrtomer
}

export async function action({request, params}){
const formDat = await request.formData()

const datos = Object.fromEntries(formDat)
const email = formDat.get("email")

// Validacion
const errores = []
if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son obligatorios")
}

let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
)

if (!regex.test(email)) {
    errores.push("El email no es válido")
}

if (Object.keys(errores).length) {
    console.log("Sí hay errores", errores)

    return errores
}

console.log("formDat:", datos)

// Update customer
await updateCustomer(params.customerId, datos) // con el await no se ejecuta el siguiente linea de codigo hasta que termine esta funcioon de agregar cliente

return redirect("/")
}

function EditCustomer() {
  const navigate = useNavigate()
  const customer = useLoaderData() // Recover the function Loader response
  const errores = useActionData()  // Recover the function Action response

//   console.log("errores::", errores)

  return (
      <>
          <h1 className="font-black text-4xl text-blue-900">Edit customer</h1>
          <p className="mt-3">Edit the customer</p>
          <div className="flex justify-end">
              <button
                  onClick={() => navigate(-1)}
                  className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
              >
                  Back
              </button>
          </div>
          <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-3">
              {errores?.length &&
                  errores?.map((error, i) => (
                      <Error key={i}>{String(error)}</Error>
                  ))}

              <Form method="post" noValidate>
                  <Formulario customer={customer} />
                  <input
                      type="submit"
                      className="mt-5 w-full bg-blue-800 p-3 uppercase text-white"
                      value="Update customer"
                  />
              </Form>
          </div>
      </>
  )
}

export default EditCustomer