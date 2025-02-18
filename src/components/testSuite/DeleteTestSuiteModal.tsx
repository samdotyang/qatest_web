import { Dialog, DialogTitle, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeleteTestSuiteConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    onDelete: () => void
}



export const DeleteTestSuiteConfirmModal = ({ isOpen, onClose, onDelete }: DeleteTestSuiteConfirmModalProps) => {
    return (
        <Dialog open={isOpen}>
            <DialogContent className="text-primary-label">
            <DialogTitle>Delete Test Suite</DialogTitle>
                Are you sure you want to delete this test suite?
            
            <DialogFooter>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="destructive" onClick={onDelete}>Delete</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
