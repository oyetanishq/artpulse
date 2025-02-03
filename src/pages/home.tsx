import { useEffect, useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { randomColor } from "@/lib/random-color";
import sketch from "/sketch.svg";

const Home = () => {
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [color] = useState(randomColor());
	const canvas = useRef(null);

	useEffect(() => {
		const ws = new WebSocket(import.meta.env.VITE_SOCKET_URL);
		ws.onopen = () => console.log("connected");
		ws.onclose = () => console.log("closed");
		ws.onmessage = ({ data }) => {
			if (!canvas.current) return;

			try {
				(canvas.current as any).loadPaths(JSON.parse(data).message);
			} catch (error) {
				console.error(error);
			}
		};

		setSocket(ws);

		return () => ws.close();
	}, []);

	if (!socket) return <main className="h-full flex justify-center items-center">connecting...</main>;

	return (
		<main className="h-full flex justify-center items-center relative">
			<img src={sketch} className="logo absolute top-8" alt="sketch text" />
			<ReactSketchCanvas
				className="!bg-white"
				width="100%"
				height="100%"
				ref={canvas}
				strokeWidth={1}
				strokeColor={color}
				onStroke={(e) => {
					if (e.paths.length === 1) return;
					socket.send(JSON.stringify({ type: "sendtoall", message: e }));
				}}
			/>
		</main>
	);
};

export default Home;
