import { Typography } from '@/components';
import { LoadingSpinner } from '@/components/atoms/loading-spinner';

interface ErrorDisplayProps {
  message: string;
  className?: string;
}

interface LoadingDisplayProps {
  message: string;
  className?: string;
}

interface EmptyDisplayProps {
  message: string;
  className?: string;
}

export function ErrorDisplay({ message, className = "w-full home-wrapper px-36 flex justify-center items-center min-h-[400px]" }: ErrorDisplayProps) {
  return (
    <div className={className}>
      <Typography color="error">{message}</Typography>
    </div>
  );
}

export function LoadingDisplay({ message, className = "w-full home-wrapper px-36 flex justify-center items-center min-h-[400px]" }: LoadingDisplayProps) {
  return (
    <div className={className}>
      <LoadingSpinner />
      <Typography className="ml-4">{message}</Typography>
    </div>
  );
}

export function EmptyDisplay({ message, className = "w-full home-wrapper px-36 flex justify-center items-center min-h-[400px]" }: EmptyDisplayProps) {
  return (
    <div className={className}>
      <Typography>{message}</Typography>
    </div>
  );
}
