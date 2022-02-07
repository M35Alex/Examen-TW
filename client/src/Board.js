import {useState, useEffect} from 'react';
import Company from './Company';

function Board() {
  const [companies, setCompanies] = useState([]);
  const loadCompanies = async () => {
    const response = await fetch ('/models/companies');
    if (response.status === 200) {
      setCompanies(await response.json());
    }
  };
  useEffect(() => loadCompanies(), []);
  return (
  <div className="container">
    {
      companies.map((company, index) => <Company key={index} company={company} index={index} width={100 / companies.length - 1} />)
    }
  </div>
  )
}

export default Board;