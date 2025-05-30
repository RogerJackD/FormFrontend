
export const postFormData = async(data, URLAPI) => {
    try {
        console.log(data)
        const res = await fetch(URLAPI,{
            method : 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        })
        const responseData  = await res.json();
        
        if(!res.ok) {
            throw { 
                response: { 
                    status: res.status,
                    data: responseData },
                message: responseData.message || 'Error en la solicitud'}
        }

        return responseData;

    } catch (error) {
        console.error(`Fallo el envio POST ${error}`)
        throw error;
    }
}