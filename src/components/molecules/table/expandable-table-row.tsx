import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TableRow, TableCell } from '@/components';
import { cn } from '@/utils/style';

export interface ExpandableTableRowProps {
  isExpanded?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
  expandedContent?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
}

const ExpandableTableRow: React.FC<ExpandableTableRowProps> = ({
  isExpanded = false,
  onToggle,
  children,
  expandedContent,
  isLoading = false,
  className,
  disabled = false
}) => {
  return (
    <>
      <TableRow 
        className={cn(
          !disabled && "cursor-pointer hover:bg-meko-blue-transparent-1/50 transition-colors",
          disabled && "cursor-default",
          className
        )}
        onClick={disabled ? undefined : onToggle}
      >
        {children}
        {!disabled && (
          <TableCell className="w-12">
            <div className="flex justify-center">
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-meko-blue-light-1 border-t-transparent rounded-full animate-spin" />
              ) : isExpanded ? (
                <ChevronUp className="w-4 h-4 text-meko-blue-light-1" />
              ) : (
                <ChevronDown className="w-4 h-4 text-meko-blue-light-1" />
              )}
            </div>
          </TableCell>
        )}
      </TableRow>
      
      {!disabled && isExpanded && (
        <TableRow className="bg-meko-blue-transparent-1/30">
          <TableCell 
            colSpan={6} 
            asChild 
            className="p-0 w-full"
            containerClassName="px-12 min-h-0 block w-full"
          >
            <div className="w-full p-2">
              {expandedContent}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default ExpandableTableRow;
