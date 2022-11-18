import { useRef, useState } from 'react'
import { FaRegClipboard } from 'react-icons/fa'
import './App.css'

const ColorItem = ({color}) => {

  const col = useRef(null);
  const tooltip = useRef(null);

  const copyFunction = () => {
    navigator.clipboard.writeText(col.current.innerHTML)

    tooltip.current.innerHTML = "Copied";
  }

  const outFunc = () => {
    tooltip.current.innerHTML = "Copy";
  }

  return (
    <div
      className='h-[200px] flex flex-col justify-center gap-4 relative'
      style={{backgroundColor: `${color}`}}
    >
      <p className='text-2xl' ref={col}>{color}</p>
      <div 
        className='group max-w-fit mx-auto'
      >
        <FaRegClipboard 
          className='mx-auto text-3xl cursor-pointer'
          onClick={copyFunction} 
          onMouseOut={outFunc}
        />
        <span
          ref={tooltip}
          className='invisible w-[80px] bg-gray-800 text-center rounded-md px-1 py-2 absolute z-10 bottom-3 left-[28%] opacity-0 transition-opacity group-hover:visible group-hover:opacity-100'
        >
          Copy
        </span>
      </div>
    </div>
  )
}

const ColorItems = (props) => {
  const colors = props.colors
  return (
    colors.map((color, index) => <ColorItem color={color} key={index} />)
  )
};

const Alert = () => {
  return (
    <div className='w-full h-[30vh] border flex flex-col justify-center'>
      <p>Enter a number greater than 0 and then click on <span className='text-purple-600'>GENERATE</span>.</p>
    </div>
  )
};

const TestColor = (props) => {

  const {color, show, pasteFunction} = props

  return (
    <div className='mx-auto h-16 mb-10 w-full md:w-[50%] items-center'
      style={{display:  `${ show ? 'flex' : 'none'}`}}
    >
        <button
          className='w-[30%] h-16'
          onClick={pasteFunction}
          style={{backgroundColor: `${color}`}}
        >
          PASTE
        </button>
        <input 
          type="text"
          placeholder='Test the color here...'
          disabled
          className='border-0 bg-white text-slate-900 w-[70%] h-16 outline-none px-4 text-xl md:text-3xl'
        />
    </div>
  )
};

const InputNumber = (props) => {

  const {number, color, generateColors} = props;

  return (
    <div className='w-full flex flex-col md:flex-row mb-10'>
      <input 
        type="number"
        ref={number}
        min={1}
        className='border-0 text-slate-900 w-full md:w-[80%] h-16 outline-none px-4 text-3xl'
      />
      <button
        className='w-full md:w-[20%] h-16'
        onClick={generateColors}
        style={{backgroundColor: `${color}`}}
      >
        GENERATE
      </button>
    </div>
  )
}

function App() {

  const [colors, setColors] = useState([]);
  const [color, setColor] = useState("#9658e9");
  const [show, setShow] = useState(false);
  const number = useRef(0);

  const generator = () => {
    const code = "0123456789abcdef";
    var color = "#";
    for (let i = 0; i < 6; i++) {
      color += code[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const generateColors = () => {
    var colors = [];
    const num = number.current.value;
    for (let i = 0; i < num; i++) {
      colors.push(generator());
    }
    setColors(colors);
    if(colors.length === 0) 
      setShow(false);
    else setShow(true);
  } 

  const pasteFunction = (e) => {
    const input = e.target.parentNode.lastChild;
    navigator.clipboard.readText()
      .then((value) => {
        input.value = value;
        if(value.length == 7) 
          setColor(value)
        else {setColor('#9658e9'); input.value = ""};
      });
  }

  const ColorRender = () => {
    return (
      <div className='w-full max-h-fit grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5'>
        <ColorItems colors={colors} />
      </div>
    )
  };

  return (
    <div className="App">
      <h1 className='text-2xl md:text-7xl'>30 Days Of React</h1>
      <p className='my-10 text-lg md:text-3xl'>Hexadecimal Colors</p>

      <TestColor 
        color={color} 
        pasteFunction={pasteFunction} 
        show={show}
      />

      <div className="w-full h-[50vh]">
        
        <InputNumber 
          color={color} 
          generateColors={generateColors} 
          number={number}
        />

        { (number.current.value == null || number.current.value <= 0) ? <Alert /> : <ColorRender /> }

        <div className='my-10'>
          Designed with 💞 by Chaldrak | Copyright © Nov 2022
        </div>
      </div>
    </div>
  )
}

export default App
