"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop, Booking, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale/pt-BR";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { generateDayTimeList } from "../../_helpers/hours";
import { format } from "date-fns/format";
import { saveBooking } from "../../_actions/save-booking";
import { setHours } from "date-fns/setHours";
import { setMinutes } from "date-fns/setMinutes";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { pt } from "date-fns/locale/pt";
import { useRouter } from "next/navigation";
import { getDayBookings } from "../../_actions/get-day-bookings";
import { addDays } from "date-fns/addDays";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

interface ServiceItemProps {
   service: Service;
   isAuthenticated: boolean;
   barbershop: Barbershop;
}

const ServiceItem = ({ service, isAuthenticated, barbershop }: ServiceItemProps) => {

   const router = useRouter();
   const { data } = useSession();
   const [date, setDate] = useState<Date | undefined>(undefined)
   const [hour, setHour] = useState<string | undefined>();
   const [submitIsLoading, setSubmitIsLoading] = useState(false);
   const [sheetIsOpen, setSheetIsOpen] = useState(false);
   const [dayBookings, setDayBookings] = useState<Booking[]>([]);


   // Atualiza as horas sempre que a data for alterada.
   //console.log(dayBookings) // apresenta se já existe reservas no dia.

   useEffect(() => {
      if (!date) {
         return
      }

      const refreshAvailableHours = async () => {
         const _dayBookings = await getDayBookings(date, barbershop.id)

         setDayBookings(_dayBookings);
      }

      refreshAvailableHours();
   }, [date, barbershop.id])

   const handleDateClick = (date: Date | undefined) => {
      setDate(date);
      setHour(undefined);
   }

   const handleHourClick = (time: string) => {
      setHour(time);
   }

   const handleBookingClick = () => {

      if (!isAuthenticated) {
         return signIn('google');
      }

      // TODO: Abrir modal de agendamento
   };

   const handleBookingSubmit = async () => {

      setSubmitIsLoading(true);

      try {

         // Se não tiver data e hora, retorna da função.
         if (!hour || !date || !data?.user) {
            return
         }

         // Exemplo de hora "09:45"
         const dateHour = Number(hour.split(':')[0])
         const dateMinutes = Number(hour.split(':')[1])

         const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

         await saveBooking({
            serviceId: service.id,
            barbershopId: barbershop.id,
            date: newDate,
            userId: (data.user as any).id,
         })

         setSheetIsOpen(false); // Fecha a sheet após finalizar o agendamento.
         setHour(undefined);
         setDate(undefined);
         toast("Reserva realizada com sucesso!", { // Imprime mensagem de confirmação de agendamento
            description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.' ", {
               locale: ptBR,
            }),
            action: {
               label: "Visualizar",
               onClick: () => router.push("/bookings"),
            }
         })

      } catch (error) {
         console.log(error);
      } finally {
         setSubmitIsLoading(false);
      }


   }

   // Garante que a função só será executada quando houver alteração na lista de datas.
   const timeList = useMemo(() => {

      if (!date) {
         return []
      }

      // Gera a lista de horários filtrada, filtrando apenas para os agendamentos disponiveis.
      return generateDayTimeList(date).filter((time) => {
         //Time: 09:00
         //Se houver alguma reserva em dayBookings com a hora e minutos = time, não inclur.

         const timeHour = Number(time.split(":")[0]);
         const timeMinutes = Number(time.split(":")[1]);

         const booking = dayBookings.find((booking) => {

            const bookingHour = booking.date.getHours();
            const bookingMinutes = booking.date.getMinutes();

            //Verifica se tem a mesma hora e minutos
            return bookingHour === timeHour && bookingMinutes === timeMinutes;
         });

         if (!booking) {
            // Inclue opção na lista.
            return true;
         }

         return false;
      });
   }, [date, dayBookings]);

   return (
      <Card>
         <CardContent className="p-3">
            <div className="flex gap-4 items-center w-full">
               <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px] ">
                  <Image className="rounded-lg" alt={service.name} src={service.imageUrl} fill style={{ objectFit: "contain" }} ></Image>
               </div>
               <div className="flex flex-col w-full">
                  <h2 className="font-bold">{service.name}</h2>
                  <p className="text-sm text-gray-400">{service.description}</p>

                  <div className="flex items-center justify-between mt-3">
                     <p className="text-primary text-sm font-bold">{Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                     }).format(Number(service.price))}
                     </p>


                     <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                        <SheetTrigger asChild>
                           <Button variant="secondary" onClick={handleBookingClick}>Reservar
                           </Button>
                        </SheetTrigger>

                        <SheetContent className="p-0 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                           <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                              <SheetTitle>Fazer Reserva</SheetTitle>
                           </SheetHeader>

                           <div className="py-2">
                              <Calendar
                                 mode="single"
                                 selected={date}
                                 onSelect={handleDateClick}
                                 locale={ptBR}
                                 fromDate={addDays(new Date(), 1)}
                                 className="w-full" // Forçando o Calendar a ocupar toda a largura
                              />
                           </div>

                           {/*Mostrar lista de horários apenas se alguma data estiver selecionada */}
                           {date && (
                              <div className="flex gap-3 overflow-x-auto py-6 px-5 border-top border-t border-solid border-secondary [&::-webkit-scrollbar]:hidden">
                                 {timeList.map((time) => (
                                    <Button
                                       onClick={() => handleHourClick(time)}
                                       variant={
                                          hour === time ? 'default' : 'outline'
                                       }
                                       className="rounded-full" key={time}>{time}
                                    </Button>
                                 ))}
                              </div>
                           )}
                           <div className="py-6 px-5 border-t border-solid border-secondary">
                              <Card>
                                 <CardContent className="p-3 gap-3 flex flex-col">

                                    <div className="flex justify-between">
                                       <h2 className="font-bold">{service.name}</h2>
                                       <h3 className="font-bold text-sm">
                                          {""}
                                          {Intl.NumberFormat("pt-BR", {
                                             style: "currency",
                                             currency: "BRL",
                                          }).format(Number(service.price))}</h3>
                                    </div>
                                    {date && (
                                       <div className="flex justify-between">
                                          <h3 className="text-gray-400 text-sm">Data</h3>
                                          <h4 className="text-sm">
                                             {format(date, "dd 'de' MMM", {
                                                locale: ptBR,
                                             })}</h4>
                                       </div>
                                    )}

                                    {hour && (
                                       <div className="flex justify-between">
                                          <h3 className="text-gray-400 text-sm">Horário</h3>
                                          <h4 className="text-sm">{hour}</h4>
                                       </div>
                                    )}

                                    <div className="flex justify-between">
                                       <h3 className="text-gray-400 text-sm">Barbearia</h3>
                                       <h4 className="text-sm">{barbershop.name}</h4>
                                    </div>

                                 </CardContent>
                              </Card>
                           </div>

                           <SheetFooter className="px-5 mb-4">
                              <Button onClick={handleBookingSubmit} disabled={(!hour || !date) || submitIsLoading}>{submitIsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Confirmar reserva</Button>
                           </SheetFooter>
                        </SheetContent>
                     </Sheet>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card >
   );
};

export default ServiceItem;