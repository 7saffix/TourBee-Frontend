import { AlertTriangle, X, Trash2 } from "lucide-react";

const DeleteModal = ({ target, onClose, onConfirm, isDeleting = false }) => {
  if (!target) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-background border border-border w-full max-w-sm rounded-xl p-5 shadow-lg text-left z-10 animate-scaleIn">
        {/* Close Icon */}
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* Header content layout */}
        <div className="flex gap-3 items-start">
          <div className="p-2 bg-destructive/10 text-destructive rounded-lg shrink-0">
            <AlertTriangle size={18} />
          </div>
          <div className="space-y-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground">
              Confirm Deletion
            </h3>
            <p className="text-xs text-muted-foreground leading-normal">
              Are you sure you want to delete this record? This action cannot be
              reversed.
            </p>
          </div>
        </div>

        {/* Action button triggers */}
        <div className="flex items-center justify-end gap-2 mt-5 pt-4 border-t border-border/50">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="h-8 px-3 border border-border rounded-lg text-xs font-semibold hover:bg-muted cursor-pointer transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="h-8 px-3 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-hover flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {isDeleting ? (
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Trash2 size={12} />
            )}
            <span>{isDeleting ? "Deleting..." : "Delete"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
