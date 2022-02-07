import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, useLocation} from "react-router-dom";
import './confirmDialog';

function FounderForm(props) {
	const navigate = useNavigate();
	const {founderId} = useParams();
	const {search} = useLocation();
	const queryParameters = new URLSearchParams(search);
	const companyId = queryParameters.get('companyId');
	const [founder, setfounder] = useState({
		name: '',
		companyId: companyId ? companyId : 'new',
		role: '',
	});
	const [companies, setcompanies] = useState([]);
	const loadfounder = async (founderId) => {
		if (founderId && founderId !== 'new') {
			const response = await fetch(`/models/founders/${founderId}`);
			if (response.status === 200) {
				setfounder(await response.json());
			}
		}
	}
	const loadcompanies = async () => {
		const response = await fetch(`/models/companies`);
		if (response.status === 200) {
			setcompanies(await response.json());
		}
	};
	useEffect(() => loadcompanies(), []);
	useEffect(() => loadfounder(founderId), [founderId]);
	function set(property, value) {
		const record = {...founder};
		record[property] = value;
		setfounder(record);
	}
	async function savefounder() {
		if (founderId === 'new') {
			const response = await fetch(`/models/founders`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(founder)
			});
			if (response.status === 201) {
				navigate('/');
			}
		} else {
			const response = await fetch(`/models/founders/${founderId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(founder)
			});
			if (response.status === 204) {
				navigate('/');
			}
		}
	}
	async function deletefounder() {
		if (founder.id && founderId !== 'new'
			&& await document.getElementById('dialog')
				.confirmDialog('Are you sure you want to remove this founder?')) {
			const response = await fetch(`/models/founders/${founderId}`, {
				method: 'DELETE'
			});
			if (response.status === 204) {
				navigate('/');
			}
		}
	}
	return (
		<div className="form">
			<h1>founder</h1>
			<form onSubmit={savefounder} onReset={() => navigate('/')}>
				<label>Role</label>
				<input type="text" value={founder.role}
					onChange={event => set('role', event.target.value)}/>
				<label>name</label>
				<input type="text" value={founder.name}
					onChange={event => set('name', event.target.value)}/>
				<label>company</label>
				<div className="select">
					<select value={founder.companyId}
						onChange={event => set('companyId', event.target.value)}>
						<option value="new">-- New --</option>
						{
							companies.map((company, index) =>
								(<option key={index} value={company.id}>{company.name}</option>))
						}
					</select>		
					<input type="button" className="edit" value="Edit"
						onClick={() => navigate(`/companies/${founder.companyId}`)}/>
				</div>
				<div className="buttons">
					<input type="submit" value="Save"/>
					{founderId && founderId !== 'new' && <input type="button" className="delete"
						value="Delete" onClick={deletefounder}/>}
					<input type="reset" value="Cancel"/>
				</div>
			</form>
			<div id="dialog" className="modal-dialog"/>
		</div>
	);
}

export default FounderForm;