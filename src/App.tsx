import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Slider from './components/Slider/Slider';
import { colorExample, colorExamplePallete, colorParams, weightedGraphExample } from './utils/data';

function App() {
  const [rgbAttr, setRGBAttr] = useState(colorExample);
  const [colorSpecs, setColorSpecs] = useState(colorParams);
  const [weightedGraphAttr, setWeightedGraphAttr] = useState(weightedGraphExample);
  const onRGBChange = (vals:any) => {
    setRGBAttr(vals);
  }
  const onWeightedChange = (vals:any) => {
    setWeightedGraphAttr(vals);
  }
  return (
    <div className="App">
      <Slider colorPallete={colorExamplePallete} value={rgbAttr} onChange={onRGBChange}/>
      <div style={{height: 120}} />
      <Slider value={weightedGraphAttr} onChange={onWeightedChange}/>
    </div>
  );
}

export default App;
