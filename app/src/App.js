import "./App.css";
import { useState } from "react";
import AlunniTable from "./AlunniTable";
function App() {
  const [alunni, setAlunni] = useState([]);
  const [caricamento, setCaricamento] = useState(false);
  const [elimina, setElimina] = useState(false);
  const [inserisci, setInserisci] = useState(false);

  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");

  //errori per l'inserimento di nome e cognome
  const [nomeErr, setNomeErr] = useState("");
  const [cognomeErr, setCognomeErr] = useState("");

  async function caricaAlunni() {
    setCaricamento(true);
    const data = await fetch("http://localhost:8080/alunni", { method: "GET" });
    const mieiDati = await data.json();
    setCaricamento(false);
    setAlunni(mieiDati);
  }

  async function salvaAlunno(){
    if (nome === ""){
      setNomeErr("Nome obbligatorio")
      return
    }
    if(cognome === ""){
      setCognomeErr("cognome obbligatorio")
      return
    }
    const data = await fetch("http://localhost:8080/alunni", { 
      method: "POST", 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({nome: nome, cognome: cognome})
     });
     setNome("");
     setNomeErr("");
     setCognomeErr("");
     setCognome("");
     caricaAlunni(); 
  }

  //function impostaNome(evento){
    //setNome(evento.target.value);//aggiungi il valore che scatena l'evento alla textbox 
  //}

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
              <input onChange={(e) => setNome(e.target.value)} type="text" ></input>
              { nomeErr !== ""&& <div>{nomeErr}</div> }
              <h5>cognome:</h5> 
              <input onChange={(e) => setCognome(e.target.value)} type="text" ></input>
              { cognomeErr !== ""&& <div>{cognomeErr}</div> }
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
