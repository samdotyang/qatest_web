import { Loader2 } from "lucide-react";
import { HTMLAttributes, useState, useEffect } from "react";

// Reusable loading spinner component
export const LoadingSpinner = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div className={`flex items-center justify-center ${className}`} {...props}>
      <Loader2 className="h-6 w-6 animate-spin text-primary-label" />
    </div>
  );
  
  // Page loading skeleton
  export const PageSkeleton = () => (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-8 w-1/4 bg-sidebar-select rounded" />
      <div className="space-y-3">
        <div className="h-4 w-3/4 bg-sidebar-select rounded" />
        <div className="h-4 w-1/2 bg-sidebar-select rounded" />
      </div>
    </div>
  );
  
  // Delayed loading component to prevent flash of loading state
  export const DelayedLoading = ({ delay = 400 }: { delay?: number }) => {
    const [showLoading, setShowLoading] = useState(false);
    
    useEffect(() => {
      const timer = setTimeout(() => setShowLoading(true), delay);
      return () => clearTimeout(timer);
    }, [delay]);
    
    if (!showLoading) return null;
    
    return <LoadingSpinner className="h-full w-full min-h-[200px]" />;
  };
