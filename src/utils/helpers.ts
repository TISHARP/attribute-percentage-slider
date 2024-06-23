export const blendHexColors = (colorA:string, colorB:string) => {
    let ret = '#';
    ret+=((parseInt(colorA.substring(1,3),16)+parseInt(colorB.substring(1,3),16))/2).toString(16).substring(0,2).padStart(2, '0')
    ret+=((parseInt(colorA.substring(3,5),16)+parseInt(colorB.substring(3,5),16))/2).toString(16).substring(0,2).padStart(2, '0')
    ret+=((parseInt(colorA.substring(5,7),16)+parseInt(colorB.substring(5,7),16))/2).toString(16).substring(0,2).padStart(2, '0')
    return ret;
}