import {
  setHours,
  setMinutes,
  format,
  addMinutes,
  isAfter,
  max,
} from "date-fns";

// Gera uma lista de horários com base em uma data.
// Define o horário de início com base na hora atual, limitado ao máximo de 21:00.

export function generateDayTimeList(date: Date): string[] {
  // Horário de abertura da barbearia (09:00) e fechamento (21:00)
  const openingTime = setMinutes(setHours(date, 9), 0);
  const closingTime = setMinutes(setHours(date, 21), 0);

  // Horário de início é o máximo entre a hora atual mais uma hora ou o horário de abertura
  const startTime = max([openingTime, addMinutes(new Date(), 60)]);

  // Intervalo em minutos
  const interval = 45;
  const timeList: string[] = [];
  let currentTime = startTime;

  // Gera a lista de horários até o horário de fechamento
  while (
    isAfter(closingTime, currentTime) ||
    currentTime.getTime() === closingTime.getTime()
  ) {
    timeList.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, interval);
  }

  return timeList;
}
