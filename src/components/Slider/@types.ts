export interface AttributeSliderProps{
    value: {[key: string]: number},
    className?: string,
    step?: number,
    minVal?: number,
    onChange?: ()=>void,
}