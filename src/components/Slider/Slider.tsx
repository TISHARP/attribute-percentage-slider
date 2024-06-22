import { DragEvent, useEffect, useRef, useState } from "react";
import { AttributeSliderProps } from "./@types";
import "./Slider.scss";
import { defaultColorPallete } from "../../utils/data";
import { blendHexColors } from "../../utils/helpers";

const Slider = ({value,colorPallete=defaultColorPallete,minVal=5,className='',step=1,onChange=(newVals:any)=>{}}: AttributeSliderProps) => {
    let deltaX = 0, startX = 0, actIdx = 0;
    const sliderTubeRef = useRef<HTMLDivElement>(null);
    const [sWidth, setSWidth] = useState(0);
    const oKeys = Object.keys(value);
    const pinRefs = useRef<HTMLDivElement[]>([]);
    const labelRefs = useRef<HTMLDivElement[]>([]);
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

    const updateElTransform = (el:any,newX:number,minX:number,maxX:number) => {
        const curX = parseFloat(el.style.transform.substring(11));
        //Check if we are above or below minX if so then set to the min/max respectively
        const updatedX = newX>=minX&&newX<=maxX?newX:(newX>=minX?maxX:minX);
        el.style.transform = 'translateX('+updatedX+'px)';
        return updatedX;
    }

    const handleMouseMove = (e:any) => {
        //Get the delta we've created
        deltaX = startX - e.clientX;
        //Set the new starting X of continued drag.
        // startX = e.clientX;
        //Get the transform and update the style inline.
        const pin = pinRefs.current[actIdx];
        const curX = parseFloat(pin.style.transform.substring(11));
        startX = startX - curX + updateElTransform(pin,curX-deltaX,((actIdx+1)*minVal/100)*sWidth,(1-(pinLocs.length-actIdx)*minVal/100)*sWidth);
        /*
            Since:
            curX - startX + e.clientX = updateLocation;
            Then e.clientX = updatedLocation - curX + startX
                Which can be rewritten startX - curX + updatedLocation
                updatedLocation is returned from the updateTransform function.
        */
        const labelA = labelRefs.current[actIdx];
        const labelB = labelRefs.current[actIdx+1];
        if(actIdx==0){
            labelA.style.setProperty("--left", (((curX-deltaX)/sWidth/2)*100)+'%');
            const pinB = pinRefs.current[actIdx+1];
            const curBX = parseFloat(pinB.style.transform.substring(11));
            labelB.style.setProperty("--left", (((curBX-deltaX+curX)/sWidth/2)*100)+"%");
        } else{
            if(actIdx===pinRefs.current.length-1){
                //last element
                const pinP = pinRefs.current[actIdx-1];
                const curPX = parseFloat(pinP.style.transform.substring(11));
                labelA.style.setProperty("--left", (((curPX-deltaX+curX)/sWidth/2)*100)+'%');
                labelB.style.setProperty("--left", (((curX-deltaX+sWidth)/sWidth/2)*100)+'%');
            } else{
                const pinB = pinRefs.current[actIdx+1];
                const curBX = parseFloat(pinB.style.transform.substring(11));
                labelA.style.setProperty("--left", (((curX-deltaX)/sWidth/2)*100)+'%');
                labelB.style.setProperty("--left", (((curBX-deltaX+curX)/sWidth/2)*100)+"%");
            }
        }
        //Check for collision with another tag
        //If collision within the minimum step we need to propagate
        //values through rest of array.
        //If cannot keep a minimum value, we'll be locked and unable
        //To go any further minimum at which point we just kinda have to reverse the update...
        if(actIdx>0){
            if(actIdx===pinLocs.length-1){
                //Last element
            } else{
                //Middle element
            }
        } else{
            //First element
            if(deltaX>0){
                //Moving to the left
            } else{
                //Moving to the right
            }
        }
        //Update the labels locations.
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

    console.log(`linear-gradient(90deg, ${colorPallete[0]} 0%, ${textLabelLocs.map((v:any,i)=>colorPallete[(i<=1?0:(i!==textLabelLocs.length-1?i-1:i-2))%colorPallete.length]+" "+v*100+"%").join(', ')})`);
    return (
        <div className={'sharp-attribute-slider '+(className)}>
            <div className="slider-titles">
                {oKeys.map((vkey,i)=>(
                    <div ref={(ref:HTMLDivElement)=>labelRefs.current[i]=ref}
                    className={'slider-segment-title'} 
                    key={vkey} 
                    style={{'--left': (100*(textLabelLocs[i+1]+textLabelLocs[i])/2)+"%"} as any}
                    >
                        <span>{vkey}</span>
                    </div>
                ))}
            </div>
            <div className={'slider-colored-tube'} ref={sliderTubeRef}
                style={{
                    background: `linear-gradient(90deg, ${colorPallete[0]} 0%, ${textLabelLocs.map((v:any,i)=>colorPallete[(i<=1?0:i-1)%colorPallete.length]+" "+(i===0?v:(v+textLabelLocs[i-1])/2)*100+"%").join(', ')})`
                }}>
                {pinLocs.map((v,i)=>(
                    <div ref={(ref:HTMLDivElement)=>pinRefs.current[i]=ref}
                    className={'slider-pin'} 
                    key={oKeys[i]+"-"+oKeys[i+1]}
                    onMouseDown={handleMouseDown(i)}
                    style={{backgroundColor: blendHexColors(colorPallete[i%colorPallete.length],colorPallete[(i+1)%colorPallete.length]), transform: 'translateX('+(v*sWidth)+'px)'}}
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