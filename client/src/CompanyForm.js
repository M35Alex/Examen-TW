import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import './confirmDialog';

function CompanyForm(props) {
	const navigate = useNavigate();
	const {companyId} = useParams();
	const [companies, setCompanies] = useState({
		name: '',
		date: ''
	});
	const loadCompanies = async (companyId) => {
		if (companyId && companyId !== 'new') {
			const response = await fetch(`/models/companies/${companyId}`);
			if (response.status === 200) {
				setCompanies(await response.json());
			}
		}
	};
	useEffect(() => loadCompanies(companyId), [companyId]);
	async function saveCompanies() {
		if (companyId === 'new') {
			const response = await fetch('/models/companies', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(companies)
			});
			if (response.status === 201) {
				navigate('/');
			}
		} else {
			const response = await fetch(`/models/companies/${companyId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(companies)
			});
			if (response.status === 204) {
				navigate('/');
			}
		}
	}
	async function deleteCompanies() {
		if (companyId && companyId !== 'new'
			&& await document.getElementById('dialog')
				.confirmDialog('Are you sure you want to remove this company?')) {
			const response = await fetch(`/models/companies/${companyId}`, {
				method: 'DELETE'
			});
			if (response.status === 204) {
				navigate('/');
			}
		}
	}
	function set(property, value) {
		const record = {...companies};
		record[property] = value;
		setCompanies(record);
	}
	return (
		<div className="form">
			<h1>company</h1>
			<form onSubmit={saveCompanies} onReset={() => navigate('/')}>
				<label>Name</label>
				<input type="text" value={companies.name}
					onChange={event => set('name', event.target.value)}/>
				<label>Date</label>
				<input date="{{yyyy/mm/zz}}" value={companies.date}
					onChange={event => set('date', event.target.value)}/>
				<div className="buttons">
					<input type="submit" value="Save"/>
					{companyId && companyId !== 'new' && <input type="button" className="delete"
						value="Delete" onClick={deleteCompanies}/>}
					<input type="reset" value="Cancel"/>
				</div>
			</form>
			<div id="dialog" className="modal-dialog"/>
		</div>		
	);
}

export default CompanyForm;