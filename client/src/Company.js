import React, {useState, useEffect} from 'react';
import FounderRow from './FounderRow';

function Company(props) {
	const [founders, setfounders] = useState([]);
	const style = {
		width: `${props.width}%`,
	};
	const loadfounders = async (companyId) => {
		const response = await fetch(`/models/founders?companyId=${companyId}`);
		if (response.status === 200) {
			setfounders(await response.json());
		}
	};
	useEffect(() => loadfounders(props.company.id), [props.company]);
	return (
		<div className={`column background${props.index % 4 + 1}`} style={style}>
			<p className="column-title">
				<a href={`#/companies/${props.company.id}`}>{props.company.name}</a>
				<a href={`#/founders/new?companyId=${props.company.id}`} className="add">+</a>
			</p>
			<div className="cards">
				{
					founders.map((founder, index) => <FounderRow founder={founder} index={props.index} key={index}/>)
				}
			</div>
		</div>
	);
}

export default Company;