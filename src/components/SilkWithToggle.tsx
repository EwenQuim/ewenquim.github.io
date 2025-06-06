import { useState, useEffect, useCallback } from "react";
import Silk from "../Silk/Silk";
import SilkToggle from "./SilkToggle";

interface SilkWithToggleProps {
	speed?: number;
	scale?: number;
	noiseIntensity?: number;
	rotation?: number;
}

const SilkWithToggle: React.FC<SilkWithToggleProps> = ({
	speed = 4,
	scale = 1,
	noiseIntensity = 2,
	rotation = 0,
}) => {
	const [isPaused, setIsPaused] = useState(false);
	const [isAutoPaused, setIsAutoPaused] = useState(false);

	// Check if current URL matches pattern "/a-z/*" (starts with letter followed by anything)
	const shouldAutoPause = useCallback(() => {
		if (typeof window === "undefined") return false;
		const path = window.location.pathname;
		// Match URLs that start with "/" followed by a letter and then anything
		const pattern = /^\/(articles|nouvelles|projects)+\//;
		return pattern.test(path);
	}, []);

	useEffect(() => {
		const checkUrl = () => {
			setIsAutoPaused(shouldAutoPause());
		};

		// Check on mount
		checkUrl();

		// Listen for navigation changes (for client-side routing)
		const handlePopState = () => {
			checkUrl();
		};

		window.addEventListener("popstate", handlePopState);

		// Also check periodically in case of client-side navigation
		const interval = setInterval(checkUrl, 100);

		return () => {
			window.removeEventListener("popstate", handlePopState);
			clearInterval(interval);
		};
	}, [shouldAutoPause]);

	// const handleToggle = (paused: boolean) => {
	// 	setIsPaused(paused);
	// };

	// Animation is paused if either manually paused or auto-paused due to URL
	const finalPaused = isPaused || isAutoPaused;

	return (
		<>
			<Silk
				speed={speed}
				scale={scale}
				noiseIntensity={noiseIntensity}
				rotation={rotation}
				paused={finalPaused}
			/>
			{/* <SilkToggle onToggle={handleToggle} /> */}
		</>
	);
};

export default SilkWithToggle;
