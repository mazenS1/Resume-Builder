export const FullScreenLoader = ({ label = "Loading" }: { label?: string }) => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-muted-foreground px-4">
    <div className="h-12 w-12 sm:h-14 sm:w-14 animate-spin rounded-full border-4 border-muted border-t-primary" />
    <p className="text-xs sm:text-sm font-medium text-center">{label}...</p>
  </div>
);
