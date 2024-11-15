"use client"

import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { MoneyInput } from "./money-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { TRANSACTION_CATEGORY_OPTIONS, TRANSACTION_PAYMENT_METHOD_OPTIONS, TRANSACTION_TYPE_OPTIONS } from "../_constants/transactions";
import { DatePicker } from "./ui/date-picker";
import { z } from "zod"
import { TransactionCategory, TransactionPaymentMethod, TransactionType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertTransaction } from "../_actions/upsert-transactions";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

type FormSchema = z.infer<typeof formSchema>

interface UpsertTransactionDialogProps {
   isOpen: boolean,
   defaultValues?: FormSchema, // Para receber a operação de edição
   transactionId?: string; // Para receber a operação de edição
   setIsOpen: (isOpen: boolean) => void,
}

const formSchema = z.object({
   name: z.string().trim().min(1, {
      message: "O nome é obrigatório.",
   }),
   amount: z.number({
      required_error: "O valor é obrigatório.",
   }).positive({
      message: "O valor deve ser positivo.",
   }),
   type: z.nativeEnum(TransactionType, {
      required_error: "O tipo é obrigatório.",
   }),
   category: z.nativeEnum(TransactionCategory, {
      required_error: "A categoria é obrigatória.",
   }),
   paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
      required_error: "O método de pagamento é obrigatório.",
   }),
   date: z.date({
      required_error: "A data é obrigatória.",
   }),
})


const UpsertTransactionDialog = ({ isOpen, setIsOpen, transactionId, defaultValues }: UpsertTransactionDialogProps) => {

   const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: defaultValues ?? { // Se houver defaultValues passa o segundo defaultValues
         name: "",
         category: TransactionPaymentMethod.OTHER,
         amount: 50,
         type: TransactionType.EXPENSE,
         paymentMethod: TransactionPaymentMethod.CREDIT_CARD,
         // amount: undefined,
         // type: undefined,
         // paymentMethod: undefined,
         //category: TransactionCategory.OTHER,
         date: new Date(),
      },
   })

   const isUpdate = Boolean(transactionId);
   const [operationIsLoading, setOperationIsLoading] = useState(false)

   const onSubmit = async (data: FormSchema) => {
      setOperationIsLoading(true)
      try {
         //console.log(data)
         await upsertTransaction({ ...data, id: transactionId });
         setIsOpen(false); // Força o fechamento da janela de adição
         form.reset(); // Reseta os dados do formulário
         setOperationIsLoading(false)
         toast.success(`Transação ${isUpdate ? 'atualizada' : "adicionada"} realizada com sucesso!`);
      } catch (error) {
         console.log(error);
         setOperationIsLoading(false)
         toast.error(`Ocorreu um erro ao ${isUpdate ? 'atualizar' : "adicionar"} a transação.`);
      } finally {
         setOperationIsLoading(false)
      }
   };

   return (
      <Dialog open={isOpen} onOpenChange={(open) => {
         setIsOpen(open);
         if (!open) {
            form.reset(); // Reseta o formulário se ele não estiver aberto.
         }
      }}>
         <DialogTrigger asChild>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader className="items-center">
               <DialogTitle>{isUpdate ? 'Atualizar' : "Adicionar"} transação</DialogTitle>
               <DialogDescription>Insira as informações abaixo</DialogDescription>
            </DialogHeader>

            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/*CAMPO NOME*/}
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Título</FormLabel>
                           <FormControl>
                              <Input placeholder="Título" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  {/*CAMPO VALOR*/}
                  <FormField
                     control={form.control}
                     name="amount"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Valor</FormLabel>
                           <FormControl>
                              <MoneyInput
                                 placeholder="R$ 0.000,00"
                                 value={field.value}
                                 onValueChange={({ floatValue }) =>
                                    field.onChange(floatValue)
                                 }
                                 onBlur={field.onBlur}
                                 disabled={field.disabled}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  {/*CAMPO TIPO*/}
                  <FormField
                     control={form.control}
                     name="type"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Tipo da transação</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 {TRANSACTION_TYPE_OPTIONS.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                       {option.label}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  {/*CAMPO MÉTODO DE PAGAMENTO*/}
                  <FormField
                     control={form.control}
                     name="paymentMethod"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Método de Pagamento</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 {TRANSACTION_PAYMENT_METHOD_OPTIONS.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                       {option.label}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  {/*CAMPO CATEGORIAS*/}
                  <FormField
                     control={form.control}
                     name="category"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Categoria</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 {TRANSACTION_CATEGORY_OPTIONS.sort().map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                       {option.label}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  {/*CAMPO DATA*/}
                  <FormField
                     control={form.control}
                     name="date"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Data</FormLabel>
                           <DatePicker value={field.value} onChange={field.onChange} />
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <DialogFooter>
                     <DialogClose asChild>
                        <Button type="button" variant="outline">Cancelar</Button>
                     </DialogClose>
                     <Button type="submit" disabled={operationIsLoading}>{operationIsLoading && <Loader2Icon className="animate-spin" />} {isUpdate ? "Atualizar" : "Adicionar"}</Button>
                  </DialogFooter>
               </form>
            </Form>

         </DialogContent>
      </Dialog>
   );
}

export default UpsertTransactionDialog;