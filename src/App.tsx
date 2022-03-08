import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentStrokeSelector } from "./selectors";
import "./App.css";
import { beginStroke, endStroke, updateStroke } from "./actions";
import { drawStroke } from "./canvasUtils";
import { ColorPanel } from "./ColorPanel";

function App() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const currentStroke = useSelector(currentStrokeSelector);
	const dispatch = useDispatch();

	//Check whether there's been any drawing
	const isDrawing = !!currentStroke.points.length;

	const getCanvasWithContext = (canvas = canvasRef.current) => {
		return {
			canvas,
			context: canvas?.getContext("2d"),
		};
	};

	useEffect(() => {
		const { context } = getCanvasWithContext();
		if (!context) {
			return;
		}

		requestAnimationFrame(() =>
			drawStroke(context, currentStroke.points, currentStroke.color)
		);
	}, [currentStroke]);

	const startDrawing = ({
		nativeEvent,
	}: React.MouseEvent<HTMLCanvasElement>) => {
		const { offsetX, offsetY } = nativeEvent;
		dispatch(beginStroke(offsetX, offsetY));
	};

	const endDrawing = () => {
		if (isDrawing) {
			dispatch(endStroke());
		}
	};

	const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
		if (!isDrawing) {
			return;
		}
		const { offsetX, offsetY } = nativeEvent;
		dispatch(updateStroke(offsetX, offsetY));
	};

	return (
		<>
			<ColorPanel />
			<canvas
				ref={canvasRef}
				onMouseDown={startDrawing}
				onMouseUp={endDrawing}
				onMouseOut={endDrawing}
				onMouseMove={draw}
			/>
		</>
	);
}

export default App;
