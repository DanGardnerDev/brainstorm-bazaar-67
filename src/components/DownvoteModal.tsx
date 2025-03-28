import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface DownvoteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export const DownvoteModal = ({ open, onClose, onConfirm }: DownvoteModalProps) => {
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  const handleConfirm = () => {
    if (!reason.trim()) {
      toast({
        title: "Missing Reason",
        description: "Please provide a reason for your downvote.",
        variant: "destructive",
      });
      return;
    }
    onConfirm(reason);
    setReason("");
    toast({
      title: "Downvote Submitted",
      description: "Your feedback has been recorded.",
    });
  };

  const handleClose = () => {
    onClose();
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Why are you downvoting?</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Please provide a reason for your downvote to help the author improve..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            className="bg-brand-orange hover:bg-brand-orange/90" 
            onClick={handleConfirm}
            disabled={!reason.trim()}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};