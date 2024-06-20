import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Slider from './components/Slider/Slider';
import { colorExample, colorParams, weightedGraphExample } from './utils/data';

function App() {
  const [rgbAttr, setRGBAttr] = useState(colorExample);
  const [colorSpecs, setColorSpecs] = useState(colorParams);
  return (
    <div className="App">
      <Slider value={rgbAttr} />
      <div style={{height: 120}} />
      <Slider value={weightedGraphExample} />
    </div>
  );
}

export default App;
