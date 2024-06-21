import { DragEvent, useEffect, useRef, useState } from "react";
import { AttributeSliderProps } from "./@types";
import "./Slider.scss";

const Slider = ({value,minVal=5,className='',step=1,onChange=(newVals:any)=>{}}: AttributeSliderProps) => {
    let deltaX = 0, startX = 0, actIdx = 0;
    const sliderTubeRef = useRef<HTMLDivElement>(null);
    const [sWidth, setSWidth] = useState(0);
    const oKeys = Object.keys(value);
    const pinRefs = useRef<HTMLDivElement[]>([]);
    const updateDims = () => {
        setSWidth(sliderTubeRef.current?.clientWidth!);
    }
    useEffect(()=>{
        updateDims();
        window.addEventListener("resize",updateDims);
        return () => window.removeEventListener("resize", updateDims);
    },[updateDims]);
    if(oKeys.length===1){
        return (
            <div className={'sharp-attribute-slider-error '+(className)}>
                <p>Value must have at least 2 labels!!!</p>
            </div>
        )
    }
    let pinLocs = [] as number[];
    let cur = 0;
    for(let i = 0; i < oKeys.length-1; i+=1){
        cur+=value[oKeys[i]];
        pinLocs.push(cur);
    }
    let textLabelLocs = [0, ...pinLocs, 1];

    const handleMouseMove = (e:any) => {
        deltaX = startX - e.clientX;

        startX = e.clientX;
        const pin = pinRefs.current[actIdx];
        const curX = parseFloat(pin.style.transform.substring(11));
        pin.style.transform = 'translateX('+(curX - deltaX) + 'px)';
    }

    const handleMouseUp = (e:any) => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        //Call onChange to update the state of the values.
    }

    const handleMouseDown = (idx: number) => (e:any) => {
        startX = e.clientX;
        actIdx = idx;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    return (
        <div className={'sharp-attribute-slider '+(className)}>
            <div className="slider-titles">
                {oKeys.map((vkey,i)=>(
                    <div className={'slider-segment-title'} key={vkey} style={{'--left': (100*(textLabelLocs[i+1]+textLabelLocs[i])/2)+"%"} as any}>
                        <span>{vkey}</span>
                    </div>
                ))}
            </div>
            <div className={'slider-colored-tube'} ref={sliderTubeRef}>
                {pinLocs.map((v,i)=>(
                    <div ref={(ref:HTMLDivElement)=>pinRefs.current[i]=ref} 
                    className={'slider-pin'} 
                    key={oKeys[i]+"-"+oKeys[i+1]}
                    onMouseDown={handleMouseDown(i)}
                    style={{transform: 'translateX('+(v*sWidth)+'px)'}}
                    >
                        <div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Slider;