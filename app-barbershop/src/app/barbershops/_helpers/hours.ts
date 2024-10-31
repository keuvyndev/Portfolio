import { setHours, setMinutes, format, addMinutes } from "date-fns";

// Gera uma lista de horários com base em uma data.

export function generateDayTimeList(date: Date): string[] {
    
   // Set start time to 09:00
    const startTime = setMinutes(setHours(date, 9), 0);
    
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
