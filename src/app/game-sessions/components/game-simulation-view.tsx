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

	   if (!isOpen) return null;
	   return (
		   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			   <div className="w-full max-w-4xl">
				   <div className="flex flex-col items-center justify-center mb-6">
					   <button
						   onClick={handleClose}
						   className="text-gray-400 hover:text-gray-600"
					   >
						<span className="sr-only">Close</span>
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
					{isOpen && (
						<div
							className="z-[9999] mt-3 flex items-center justify-center gap-2 bg-white/90 dark:bg-meko-blue-darker/90 rounded-full px-4 py-2 shadow-lg backdrop-blur-md select-none border border-meko-blue-light-1 dark:border-meko-blue-light-2"
							aria-label="Temps de jeu"
						>
							<svg className="w-5 h-5 text-meko-blue-darker dark:text-meko-blue-light-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
								<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
							</svg>
							<span className="text-base sm:text-lg font-semibold text-meko-blue-darker dark:text-meko-blue-light-1 tracking-wide">
								<span className="sr-only">Temps écoulé&nbsp;: </span>
								{formatDisplayedTime(displayedTime)}
							</span>
						</div>)}
				</div>
				<div className="relative w-full  max-w-4xl flex flex-col items-center justify-center min-h-[400px]">

					<GamePlay game={game} start={handleStartSession} />
				</div>
			</div>
		</div>
	);
}
