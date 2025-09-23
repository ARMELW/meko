import { useEffect } from "react";
import GamePlay from "@/app/game-sessions/components/unity/game-play";
import { GamePlayApiResponse } from "../hooks/use-game-play-api";
import { setupGameEventBusListeners } from "@/services/unity/events/setup-game-events";
import { createGameEventListener } from "../events/register";

interface GameSimulationViewProps {
	isOpen: boolean;
	onClose: () => void;
	game: GamePlayApiResponse;
	displayedTime: number;
	handleStartSession: () => Promise<void>;
	handleCompleteSession: () => Promise<void>;
	handleAbandonSession: () => Promise<void>;
	completeSessionPending: boolean;
}

function formatDisplayedTime(seconds: number): string {
	const min = Math.floor(seconds / 60).toString().padStart(2, '0');
	const sec = (seconds % 60).toString().padStart(2, '0');
	return `${min}:${sec}`;
}

export function GameSimulationView({
	isOpen,
	onClose,
	game,
	displayedTime,
	handleStartSession,
	handleCompleteSession,
	handleAbandonSession,
}: GameSimulationViewProps) {

	useEffect(() => {
		const listenerInstance = createGameEventListener(game.name, {
			handleCompleteSession,
			handleAbandonSession,
		});
		const listeners = listenerInstance ? listenerInstance.getListeners() : {};
		const cleanup = setupGameEventBusListeners({
			game: game.name,
			listeners,
		});
		return cleanup;
	}, [
		game.name,
		handleStartSession,
		handleCompleteSession,
		handleAbandonSession,
	]);

	const handleClose = () => {
		onClose();
		handleAbandonSession();
	};

	// Gérer l'échap pour fermer
	useEffect(() => {
		if (!isOpen) return;
		
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		// Empêcher le scroll du body
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black z-50 flex flex-col">
			{/* Header avec contrôles */}
			<div className="relative flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent z-10">
			

				{/* Bouton fermer */}
				<button
					onClick={handleClose}
					className="ml-auto p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/20"
					aria-label="Fermer le jeu"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			{/* Zone de jeu - prend tout l'espace restant */}
			<div className="flex-1 flex items-center justify-center p-4">
				<div className="w-full h-full max-w-none flex items-center justify-center">
					<GamePlay game={game} start={handleStartSession} timer={formatDisplayedTime(displayedTime)} completed={handleCompleteSession} onClose={handleClose} />
				</div>
			</div>

			{/* Footer optionnel avec contrôles supplémentaires */}
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
				<div className="flex items-center gap-4 bg-white/10 dark:bg-black/30 rounded-full px-6 py-2 backdrop-blur-md border border-white/20 dark:border-gray-700">
					<span className="text-white/70 text-sm font-medium">
						{game.name}
					</span>
					
				</div>
			</div>
		</div>
	);
}