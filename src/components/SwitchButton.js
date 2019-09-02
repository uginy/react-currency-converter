import React from "react";

const SwitchButton = props => (
	<div className="column column-20">
		<div className="center-column h-100 py-1">
			<button
				type="button"
				className="button shadow w-100"
				onClick={props.switchCurrency}
			>
				Switch
			</button>
		</div>
	</div>
);

export default SwitchButton;
