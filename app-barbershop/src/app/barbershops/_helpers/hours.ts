import { setHours, setMinutes, format, addMinutes } from "date-fns";
import { addHours } from "date-fns/addHours";

// Gera uma lista de horários com base em uma data.

// Garante que só podem ser feitos agendamentos a partir de 1 hora a frente.
const hourNow = addHours(new Date().getTime(), 1).getHours();

export function generateDayTimeList(date: Date): string[] {
    
   // Set start time to 09:00
    const startTime = setMinutes(setHours(date, hourNow), 0);
    
    // Set end time to 21:00
    const endTime = setMinutes(setHours(date, 21), 0);
    
    // Interval in minutes
    const interval = 45;
    const timeList: string[] = [];

    let currentTime = startTime;

    while (currentTime < endTime) {
        timeList.push(format(currentTime, "HH:mm"));
        currentTime = addMinutes(currentTime, interval);
    }

    return timeList;
}
