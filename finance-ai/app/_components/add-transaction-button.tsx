"use client"

import { ArrowDownUp } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { TransactionCategory, TransactionPaymentMethod, TransactionType } from "@prisma/client";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { MoneyInput } from "./money-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { TRANSACTION_CATEGORY_OPTIONS, TRANSACTION_PAYMENT_METHOD_OPTIONS, TRANSACTION_TYPE_OPTIONS } from "../_constants/transactions";
import { DatePicker } from "./ui/date-picker";
import { addTransaction } from "../_actions/add-transactions";
import { useState } from "react";

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

type FormSchema = z.infer<typeof formSchema>
const AddTransactionButton = () => {

   // Para verificar se a operação ocorreu ou está ocorrendo.
   const [dialogIsOpen, setDiaLogIsOpen] = useState(false);

   const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: "",
         amount: 50,
         type: undefined,
         paymentMethod: undefined,
         category: undefined,
         //type: TransactionType.EXPENSE,
         //paymentMethod: TransactionPaymentMethod.CASH,
         //category: TransactionCategory.OTHER,
         date: new Date(),
      },
   })

   const onSubmit = async (data: FormSchema) => {

      try {
         //console.log(data)
         await addTransaction(data);
         setDiaLogIsOpen(false); // Força o fechamento da janela de adição
         form.reset(); // Reseta os dados do formulário
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Dialog open={dialogIsOpen} onOpenChange={(open) => {
         setDiaLogIsOpen(open);
         if (!open) {
            form.reset(); // Reseta o formulário se ele não estiver aberto.
         }
      }}>
         <DialogTrigger asChild>
            <Button className="rounded-full font-bold"> Adicionar Transação <ArrowDownUp /></Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Adicionar Transação</DialogTitle>
               <DialogDescription>Insira as informações abaixo</DialogDescription>
            </DialogHeader>

            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/*CAMPO NOME*/}
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Nome</FormLabel>
                           <FormControl>
                              <Input placeholder="Digite o nome..." {...field} />
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
                                 placeholder="Digite o valor..."
                                 value={field.value}

                                 // Necessário para tratar o change do valor
                                 onValueChange={(floatValue) =>
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
                           <FormLabel>Tipo</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                 <SelectTrigger className={field.value ? "" : "text-gray-400"}>
                                    <SelectValue placeholder="Selecione o tipo de transação..." />
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
                  {/*CAMPO CATEGORIAS*/}
                  <FormField
                     control={form.control}
                     name="category"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Categoria</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                 <SelectTrigger className={field.value ? "" : "text-gray-400"}>
                                    <SelectValue placeholder="Selecione a categoria..." />
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
                  {/*CAMPO MÉTODO DE PAGAMENTO*/}
                  <FormField
                     control={form.control}
                     name="paymentMethod"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Método de Pagamento</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                 <SelectTrigger className={field.value ? "" : "text-gray-400"}>
                                    <SelectValue placeholder="Selecione o método de pagamento..." />
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
                     <Button type="submit">Adicionar</Button>
                  </DialogFooter>
               </form>
            </Form>

         </DialogContent>
      </Dialog>
   );
}

export default AddTransactionButton;