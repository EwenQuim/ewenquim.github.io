import { useState } from "react";
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

	const handleToggle = (paused: boolean) => {
		setIsPaused(paused);
	};

	return (
		<>
			<Silk
				speed={speed}
				scale={scale}
				noiseIntensity={noiseIntensity}
				rotation={rotation}
				paused={isPaused}
			/>
			<SilkToggle onToggle={handleToggle} />
		</>
	);
};

export default SilkWithToggle;
