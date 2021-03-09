export function generateRandomPin(imgAspect,number){
    return Array.from({length:number},(_,i)=>({
            id:i,
            x:Math.round(Math.random() * imgAspect.width),
            y:Math.round(Math.random() * imgAspect.height),
    }))
}