import { useState, useEffect, useCallback } from "react";
import Silk from "../Silk/Silk";

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
	const [isAutoPaused, setIsAutoPaused] = useState(false);

	// Check if current URL matches content pages where animation should be paused
	const shouldAutoPause = useCallback(() => {
		if (typeof window === "undefined") return false;
		const path = window.location.pathname;
		const pattern = /^\/(articles|nouvelles|projects)+\/./;
		return pattern.test(path);
	}, []);

	useEffect(() => {
		const checkUrl = () => {
			setIsAutoPaused(shouldAutoPause());
		};

		// Check on mount
		checkUrl();

		// Listen for Astro view-transition navigations (replaces popstate + setInterval polling)
		document.addEventListener("astro:after-swap", checkUrl);

		return () => {
			document.removeEventListener("astro:after-swap", checkUrl);
		};
	}, [shouldAutoPause]);

	return (
		<Silk
			speed={speed}
			scale={scale}
			noiseIntensity={noiseIntensity}
			rotation={rotation}
			paused={isAutoPaused}
		/>
	);
};

export default SilkWithToggle;
