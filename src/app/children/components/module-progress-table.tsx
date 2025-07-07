import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Typography } from '@/components';
import React from 'react';

export interface ModuleProgressTableProps {
  modules: Array<{
    name: string;
    coverUrl: string;
    availableGames: number;
    inProgressGames: number;
    completedGames: number;
    progressPercentage: number;
  }>;
}

const ModuleProgressTable: React.FC<ModuleProgressTableProps> = ({ modules }) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Jeux à débloquer</TableHead>
          <TableHead>Jeux en cours</TableHead>
          <TableHead>Jeux terminés</TableHead>
          <TableHead className="text-right">Progression</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {modules.map((mod) => (
          <TableRow key={mod.name}>
            <TableCell align='left'>
              <div className="flex  gap-4">
                <img
                  src={mod.coverUrl}
                  alt={mod.name}
                  className="w-20 h-20 rounded-2xl"
                />
                <Typography
                  color="primary"
                  weight="bold"
                  styleCase="uppercase"
                >
                  {mod.name}
                </Typography>
              </div>
            </TableCell>
            <TableCell className="min-w-[100px]">{mod.availableGames}</TableCell>
            <TableCell className="min-w-[100px]">{mod.inProgressGames}</TableCell>
            <TableCell className="min-w-[100px]">{mod.completedGames}</TableCell>
            <TableCell className="min-w-[100px] text-right">{mod.progressPercentage}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ModuleProgressTable;
