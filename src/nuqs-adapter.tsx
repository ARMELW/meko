import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { ReactNode } from 'react';

export function NuqsProvider({ children }: { children: ReactNode }) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
