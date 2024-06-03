export async function getCustomers(){
    const clientes = await fetch(import.meta.env.VITE_API_URL)
    const respuesta = await clientes.json()
    return respuesta
}

export async function getCustomer(id) {
    const clientes = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    const respuesta = await clientes.json()
    return respuesta
}

export async function addCustomer(datos){
    try {
        const reponse = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await reponse.json() // Responde true o false
    } catch (error) {
        
    }
    console.log(datos);
}

export async function updateCustomer(id, datos){
    console.log("id", id)
   try {
       const reponse = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
           method: "PUT",
           body: JSON.stringify(datos),
           headers: {
               "Content-Type": "application/json",
           },
       })
       await reponse.json() // Responde true o false
   } catch (error) {}
   console.log(datos)
}

export async function deleteCustomer(id){
    try {
        const reponse = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: "DELETE"
        })
        await reponse.json() // Responde true o false
    } catch (error) {}
console.log("eliminando,..,.", id);
}