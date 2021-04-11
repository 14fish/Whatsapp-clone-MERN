import React from "react";

export const Message = () => {
	return (
		<>
			<p className="chat__message">
				<span className="chat__name">Qasim</span>
				This is a message
				<span className="chat__timestamp">
					{new Date().toUTCString()}
				</span>
			</p>
		</>
	);
};
