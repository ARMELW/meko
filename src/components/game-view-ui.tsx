import { Unity } from 'react-unity-webgl';

interface GameViewUIProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unityProvider: any;
  isLoaded: boolean;
  currentValue: number;
  currentGoalList: number;
  onClose: () => void;
  open: boolean;
}

export function GameViewUI({
  unityProvider,
  open
}: GameViewUIProps) {
  if (!open) return null;
  return (
    <div
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.7)' }}
    >
      <div className="relative bg-[#001f3f] rounded-lg shadow-xl w-full max-w-3xl h-[80vh] flex flex-col outline-none">
       
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4">
          <Unity
            unityProvider={unityProvider}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '0.5rem',
              maxHeight: 400,
            }}
          />
        
        </div>
      </div>
    </div>
  );
}
