import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Board from './Board';
import CompanyForm from './CompanyForm';
import FounderForm from './FounderForm';

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Board />} />
      <Route path="/companies/:companyId" element={<CompanyForm />} />
      <Route path="/founders/:founderId" element={<FounderForm />} />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);