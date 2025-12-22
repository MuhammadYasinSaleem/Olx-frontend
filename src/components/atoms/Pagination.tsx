import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (_page: number) => void;
  loading?: boolean;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
  loading = false,
  className = '',
}: PaginationProps) => {
  const handlePrevious = () => {
    if (hasPrevious && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNext && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={!hasPrevious || loading}
        className="flex items-center gap-1 px-3 py-2 text-sm"
      >
        <ChevronLeft size={16} />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {generatePageNumbers().map((pageNum) => (
          <Button
            key={pageNum}
            variant={pageNum === currentPage ? 'primary' : 'outline'}
            onClick={() => onPageChange(pageNum)}
            disabled={loading}
            className="min-w-10 px-3 py-2 text-sm"
          >
            {pageNum}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={handleNext}
        disabled={!hasNext || loading}
        className="flex items-center gap-1 px-3 py-2 text-sm"
      >
        Next
        <ChevronRight size={16} />
      </Button>

      <div className="text-sm text-gray-600 ml-4">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};
