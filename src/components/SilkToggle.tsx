import { useState } from "react";

interface SilkToggleProps {
	onToggle: (paused: boolean) => void;
}

const SilkToggle: React.FC<SilkToggleProps> = ({ onToggle }) => {
	const [isPaused, setIsPaused] = useState(false);

	const handleToggle = () => {
		const newPausedState = !isPaused;
		setIsPaused(newPausedState);
		onToggle(newPausedState);
	};

	return (
		<button
			type="button"
			onClick={handleToggle}
			className="fixed cursor-pointer bottom-6 right-6 z-50 w-12 h-12 bg-gray-800/40 hover:bg-gray-700/90 dark:bg-gray-200/40 dark:hover:bg-gray-300/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-200 flex items-center justify-center group"
			title={isPaused ? "Resume Silk effect" : "Pause Silk effect"}
			aria-label={isPaused ? "Resume Silk effect" : "Pause Silk effect"}
		>
			{isPaused ? (
				<svg
					className="w-5 h-5 text-white dark:text-gray-800 group-hover:scale-110 transition-transform"
					fill="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<title>Play icon</title>
					<path d="M8 5v14l11-7z" />
				</svg>
			) : (
				<svg
					className="w-5 h-5 text-white dark:text-gray-800 group-hover:scale-110 transition-transform"
					fill="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<title>Pause icon</title>
					<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
				</svg>
			)}
		</button>
	);
};

export default SilkToggle;
