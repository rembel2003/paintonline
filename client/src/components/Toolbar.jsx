import React from 'react';
import '../styles/toolbar.scss'
import toolState from "../store/toolState";
import canvasState from "../store/CanvasState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import Erazer from "../tools/Erazer";

const Toolbar = () => {
    const changeColor=(e)=>{
        toolState.setStrokeColor(e.target.value)
        toolState.setFillColor(e.target.value)
    }
    const download=()=>{
        const dataUrl=canvasState.canvas.toDataURL()
        const a=document.createElement('a')
        a.href=dataUrl
        a.download=canvasState.sessionid+".jpg"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
    return (
        <div className="toolbar">
            <button className="toolbar__btn brush" onClick={()=>toolState.setTool(new Brush(canvasState.canvas,canvasState.socket,canvasState.sessionid))}></button>
            <button className="toolbar__btn rect" onClick={()=>toolState.setTool(new Rect(canvasState.canvas,canvasState.socket,canvasState.sessionid))}></button>
            <button className="toolbar__btn circle" onClick={()=>toolState.setTool(new Circle(canvasState.canvas))}></button>
            <button className="toolbar__btn eraser" onClick={()=>toolState.setTool(new Erazer(canvasState.canvas))}></button>
            <button className="toolbar__btn line" onClick={()=>toolState.setTool(new Line(canvasState.canvas))}></button>
            <input onChange={e=>changeColor(e)}
                type="color" style={{marginLeft:10}}/>
            <button className="toolbar__btn undo" onClick={()=>canvasState.undo()}></button>
            <button className="toolbar__btn redo" onClick={()=>canvasState.redo()}></button>
            <button className="toolbar__btn save" onClick={()=>download()}></button>
        </div>
    );
};

export default Toolbar;