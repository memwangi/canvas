import React from "react";
import { useDispatch } from "react-redux";
import { setStrokeColor } from "./actions";

const COLORS = ["#000000", "#808080", "#C0C0C0", "#ffffff", "#800000"];

export const ColorPanel = () => {
    const dispatch = useDispatch()

    const onColorChange = (color: string) => {
        dispatch(setStrokeColor(color))
    }

	return (
		<div className="windows colors-panel">
			<div className="title-bar">
				<div className="title-bar-text">Colors</div>
			</div>

			<div className="window-body colors">
				{COLORS.map((color: string) => (
					<div
						key={color}
						onClick={() => {
							onColorChange(color);
						}}
						className="color"
                        style={{backgroundColor: color}}
					></div>
				))}
			</div>
		</div>
	);
};
