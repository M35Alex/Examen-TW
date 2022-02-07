import React from 'react';

function FounderRow(props) {
	return (
		<div className={`card background${props.index % 4 + 1}`}>
			<p>
				<a href={`#/founders/${props.founder.id}`}>{props.founder.name}</a>
			</p>
		</div>		
	);
}

export default FounderRow;