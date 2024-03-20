import { useState, useEffect } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    console.log("componente termino de renderizar");
  }, []);

  useEffect(() => {
    console.log("useEffect todos: ", todos);
  }, [todos]);
  //cambia cada que cambia el textp del imput

  useEffect(() => {
    console.log("useEffect text: ", text);
  }, [text]);

  //se ejecuta cada que se cambia el tecto o el todos
  useEffect(() => {
    console.log("useEffect todos o texto: ", text, todos);
  }, [text, todos]);

  //add item
  function addHandler() {
    if (text.trim().length > 0) {
      setTodos([text.trim(), ...todos]);
      setText("");
    }
  }
  //escucha del enter
  function keyDownHandler(event) {
    if (event.key == "Enter") {
      addHandler();
    }
  }

  //removeritem / clojures
  function removeItem(index) {
    return () => {
      const filtered = todos.filter((item, innerIndex) => index !== innerIndex);
      setTodos(filtered);
    };
  }

  return (
    <main className="p-5 min-h-screen bg-slate-900 text-slate-300">
      <div className="w-full flex justify-center items-center gap-2">
        <input
          type="text"
          className="max-w-full p-2 rounded text-slate-800"
          onChange={(event) => setText(event.target.value)}
          onKeyDown={keyDownHandler}
          value={text}
        />

        <button
          onClick={addHandler}
          className="bg-indigo-400 text-slate-900 rounded p-2 "
        >
          Agregar
        </button>
      </div>

      <div className="w-full flex flex-col gap-2">
        {todos.map((item, index) => {
          return (
            <div
              key={`item-${index}`}
              className=" w-full flex justify-center items-center gap-2"
            >
              <p className=" max-w-sm w-full">{item}</p>

              <button
                onClick={removeItem(index)}
                className="bg-indigo-400 text-slate-900 rounded p-2 "
              >
                Done
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
