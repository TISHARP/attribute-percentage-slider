export interface AttributeSliderProps{
    value: {[key: string]: number},
    colorPallete?: string[],
    className?: string,
    step?: number,
    minVal?: number,
    onChange?: (newVals:any)=>void,
}