import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(15);
  const [numberallowed, SetNumberallowed] = useState(false);
  const [charallowed, SetCharallowed] = useState(false);
  const [password, Setpassword] = useState("");
  const passwordRef=useRef(null)
  const passwordgenertaor = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIjKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) str += "0123456789";
    if (charallowed) str += "!@#%^&*(){}+_~";

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    Setpassword(pass);
  }, [length, numberallowed, charallowed, Setpassword]);
  const copy=useCallback(()=>{
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordgenertaor()
  }, [length, numberallowed, charallowed, passwordgenertaor]);
  return (
    <>
      <div
        className="w-full max-w-md mx-auto shadow-md
     rounded-lg px-9  py-5 my-8 text-orange-500 bg-gray-800"
      >
        <h1 className="text-center my-3">Password Generator</h1>

        <div>
          <input
            type="text"
            value={password}
            className="outline-none w-full py-4 px-3 rounded-xl"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline to-black bg-blue-600 text-white
          px-3 py-0.5 shrink-0 rounded-md bg-center"
            onClick={copy}
          >
            Copy
          </button>
        </div>

        {/* <button
          className="outline to-black bg-blue-600 text-white
          px-3 py-0.5 shrink-0 rounded-md bg-center" onClick={copy}
        >
          Copy
        </button> */}
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              className="cursor-pointer
            "
              onChange={() => {
                setLength(e.target.value);
              }}
            />
            <label>length:{length}</label>
            <div className="flex items-center gap-x-3">
              <input
                type="checkbox"
                defaultValue={numberallowed}
                id="numberInput"
                onChange={() => {
                  SetNumberallowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                type="checkbox"
                defaultValue={charallowed}
                id="characterInput"
                onChange={() => {
                  SetCharallowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
