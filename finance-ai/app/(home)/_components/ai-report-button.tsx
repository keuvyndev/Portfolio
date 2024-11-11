"use client"

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogContent, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/_components/ui/dialog"
import { BotIcon, Loader2Icon } from "lucide-react";
import { generateAiReport } from "../_actions/generation-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from 'react-markdown'

interface AiReportButtonProps {
   month: string;
}

const AiReportButton = ({ month }: AiReportButtonProps) => {

   // Obtem o report gerado pela AI
   const [report, setReport] = useState<string | null>(null);

   // Controla o estado de carregamento
   const [reportIsLoading, setReportIsLoading] = useState(false)

   // Chama a OPEN AI para gerar o relatório
   const handleGenerateReportClick = async () => {
      try {
         setReportIsLoading(true)
         const aiReport = await generateAiReport({ month });
         setReport(aiReport)
      } catch (error) {
         console.error(error)
      } finally {
         setReportIsLoading(false)
      }
   }

   return (
      <Dialog onOpenChange={(open) => {
         // Se o dialog não estiver aberto, limpa-o.
         if (!open) {
            //setReport(null)
         }
      }}>
         <DialogTrigger asChild>
            <Button variant="ghost">Relatório IA
               <BotIcon />
            </Button>
         </DialogTrigger>
         <DialogContent className="max-w-[600px]">
            <DialogHeader>
               <DialogTitle>Relatório IA</DialogTitle>
               <DialogDescription>
                  Use inteligência artificial para gerar um relatório com insights
                  sobre suas finanças.
               </DialogDescription>
            </DialogHeader>
            <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
               <Markdown>
                  {report}
               </Markdown>
            </ScrollArea>
            <DialogFooter>
               <DialogClose asChild>
                  <Button variant="ghost">Cancelar</Button>
               </DialogClose>
               <Button onClick={handleGenerateReportClick} disabled={reportIsLoading}>
                  {reportIsLoading && <Loader2Icon className="animate-spin" />}
                  Gerar Relatório
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}

export default AiReportButton;