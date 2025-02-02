import { useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const Home = () => {
	const canvas = useRef(null);

	return (
		<main className="h-full flex flex-col justify-center items-center">
			<ReactSketchCanvas
				className="!border !rounded-sm !bg-white"
				width="100%"
				height="50%"
				strokeWidth={1}
				strokeColor="black"
				onStroke={(e) => {
					if (e.paths.length === 1) return;
					if (!canvas.current) return;

					(canvas.current as any).loadPaths(e);
				}}
			/>
			<ReactSketchCanvas ref={canvas} className="!border !rounded-sm" width="100%" height="50%" strokeWidth={1} />
		</main>
	);
};

export default Home;
