import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  const [visivel, setVisivel] = useState(false);

  async function handleSearch() {
    if (input === '') {
      alert('Preencha algum CEP');
      return;
    }

    try 
    {
      const response = await api.get(`${input}/json`);
      console.log(response.data);
      setVisivel(true);
      setCep(response.data);
      setInput("");
    } 
    catch 
    {
      setVisivel(false);
      setInput("");
      alert("Ops error ao buscar o CEP!");
    }
  }

  return (
    <div className="container">
      <header className="container-header">

       <h1 className='title'>BUSCAR CEP</h1>

       <div className='containerInput'>
        <input 
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(e) => setInput(e.target.value) }
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
       </div>

      {visivel === true && (
        <main className="main">
        <h3>CEP: {cep.cep}</h3>
        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
       </main>
      )}
       
      </header>
    </div>
  );
}

export default App;
