import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"
import { addCustomer } from "../api/customers"

export async function action({request}) {
    const formDat = await request.formData()

    const datos = Object.fromEntries(formDat)
    const email = formDat.get("email")

    // console.log([...formDat])
    // console.log(datos)


    // Validacion
    const errores = []
    if(Object.values(datos).includes('')){
        errores.push("Todos los campos son obligatorios")
    }

    let regex = new RegExp(
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    )

    if(!regex.test(email)){
        errores.push('El email no es válido')
    }

    if(Object.keys(errores).length){
        console.log("Sí hay errores", errores)

        console.log("errores", errores)

        return errores
    }

    console.log("formDat:", datos)
    await addCustomer(datos) // con el await no se ejecuta el siguiente linea de codigo hasta que termine esta funcioon de agregar cliente

    return redirect('/')
}

function NewCustomer() {
  const errores = useActionData()
  const navigate = useNavigate()


  return (
      <>
          <h1 className="font-black text-4xl text-blue-900">New customer</h1>
          <p className="mt-3">Register customer</p>
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
                  <Formulario />
                  <input
                      type="submit"
                      className="mt-5 w-full bg-blue-800 p-3 uppercase text-white"
                      value="Register"
                  />
              </Form>
          </div>
      </>
  )
}

export default NewCustomer