import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Loader2Icon, TrashIcon } from "lucide-react";
import { deleteTransaction } from "../_actions/delete-transaction";
import { toast } from "sonner";
import { useState } from "react";

interface DeleteTransactionButtonProps {
   transactionId: string
}

const DeleteTransactionButton = ({ transactionId }: DeleteTransactionButtonProps) => {

   // Controla o estado de carregamento
   const [deletIsOperating, setdeletIsOperating] = useState(false)

   const handleConfirmDeleteClick = async () => {

      setdeletIsOperating(true);

      try {
         await deleteTransaction({ transactionId });
         toast.success("Transação deletada com sucesso!");
         setdeletIsOperating(false);
      } catch (error) {
         console.error(error);
         setdeletIsOperating(false);
         toast.error("Ocorreu um erro ao deletar a transação.");
      } finally {
         setdeletIsOperating(false);
      }
   }
   return (
      <>
         <AlertDialog>

            <AlertDialogTrigger asChild>
               <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <TrashIcon />
               </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>Você deseja realmente deletar esta transação?</AlertDialogTitle>
                  <AlertDialogDescription>
                     Essa ação não pode ser desfeita.
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                     onClick={handleConfirmDeleteClick}
                     disabled={deletIsOperating}>
                     {deletIsOperating && <Loader2Icon className="animate-spin" />} Continuar
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </>
   );
}

export default DeleteTransactionButton;