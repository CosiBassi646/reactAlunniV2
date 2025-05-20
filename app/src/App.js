import "./App.css";
import { useState } from "react";
import AlunniTable from "./AlunniTable";
function App() {
  const [alunni, setAlunni] = useState([]);
  const [caricamento, setCaricamento] = useState(false);
  const [elimina, setElimina] = useState(false);
  const [inserisci, setInserisci] = useState(false);
  async function caricaAlunni() {
    setCaricamento(true);
    const data = await fetch("http://localhost:8080/alunni", { method: "GET" });
    const mieiDati = await data.json();
    setCaricamento(false);
    setAlunni(mieiDati);
  }

  async function salvaAlunno(){
    const data = await fetch("http://localhost:8080/alunni", { 
      method: "POST", 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({nome: "guido", cognome: "lauto"})
     });
     caricaAlunni(); 
  }

//--PER IL CREATE
//curl -X POST http://localhost:8080/alunni -H "Content-Type: application/json" -d '{"nome": "guido", "cognome": "lauto"}'

  return (
    <div className="App">
      {alunni.length > 0 && !caricamento ? (   
        <div>
          <AlunniTable myArray={alunni} caricaAlunni={caricaAlunni} />
          {inserisci ? (
            <div>
              <h5>nome:</h5>
              <input type="text"></input>
              <h5>cognome:</h5> 
              <input type="text"></input>
              <br/>
              <button onClick={salvaAlunno}>Salva</button>
              <br/>
              <button onClick={() => setInserisci(false)}>Annulla</button>
            </div>
          ):(
            <button onClick={() => setInserisci(true)}>Inserisci nuovo alunno</button>
                        
          )}
        </div>
      ) : (
        <div>
          {caricamento ? (
            <div>caricamento in corso</div>
          ) : (
            <button onClick={caricaAlunni}>carica alunni</button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
