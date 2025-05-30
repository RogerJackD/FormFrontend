

export const getFormDatas = async(URL) => {
    try {
        const res = await fetch(URL,{
            method : 'GET'
        });
        const response = await res.json();

        if(!res.ok){
            console.log("algo salio mal")
            console.log(res.status)
            console.log(res.statusText)
        }

        return response

    } catch (error) {
        console.error("error al hacer la solicitud GET");
        
    }
}