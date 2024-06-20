import { AttributeSliderProps } from "./@types";

const Slider = ({value,minVal=5,className='',step=1,onChange=()=>{}}: AttributeSliderProps) => {
    const oKeys = Object.keys(value);
    if(oKeys.length==1){
        return (
            <div className={'sharp-attribute-slider-error '+(className)}>
                <p>Value must have at least 2 labels!!!</p>
            </div>
        )
    }
    let pinLocs = [];
    let cur = 0;
    for(let i = 0; i < oKeys.length-1; i+=1){
        cur+=value[oKeys[i]];
        pinLocs.push(cur);
    }
    return (
        <div className={'sharp-attribute-slider '+(className)}>
            <div className="slider-titles">
                {oKeys.map((vkey)=>(
                    <div className={'slider-segment-title'} key={vkey}>
                        <span>{vkey}</span>
                    </div>
                ))}
            </div>
            <div className={'slider-colored-tube'}>
                {pinLocs.map((v,i)=>(
                    <div className={'slider-pin'} key={oKeys[i]+"-"+oKeys[i+1]} style={{'--left': (v*100)+'%'} as any}>
                        <div>
                            {i}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Slider;