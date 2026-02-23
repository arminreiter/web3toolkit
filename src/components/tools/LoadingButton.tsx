'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoadingButtonProps {
  loading?: boolean;
  loadingText?: string;
  onClick: () => void;
  children: React.ReactNode;
}

export function LoadingButton({ loading, loadingText, onClick, children }: LoadingButtonProps) {
  return (
    <Button size="lg" onClick={onClick} disabled={loading}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {loading ? (loadingText ?? 'Processing...') : children}
    </Button>
  );
}
