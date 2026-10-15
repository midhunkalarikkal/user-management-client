import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DeleteUserConfirmationProps } from "@/types/components";

const DeleteUserConfirmation = ({ user, onConfirm, onCancel }: DeleteUserConfirmationProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
          <Trash2 className="size-5" />
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-semibold">Delete user?</h3>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">
              {user.firstName} {user.lastName}
            </span>
            ? This action cannot be undone.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          size="sm"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="button"
          variant="destructive"
          className="cursor-pointer"
          size="sm"
          onClick={onConfirm}
        >
          <Trash2 className="size-4" />
          Yes, delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteUserConfirmation;
