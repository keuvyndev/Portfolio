import { ReactElement } from "react";

interface PercentageItemProps {
   icon: ReactElement;
   title: string;
   value: number;
}

const PercentageItem = ({ icon, title, value }: PercentageItemProps) => {
   return (
      <div className="flex items-center justify-between">
         {/* ÍCONE */}
         <div className="flex items-center gap-3">
            <div className="bg-white bg-opacity-[3%] rounded-lg p-2">
               {icon}
            </div>
            <p className="text-sm text-muted-foreground">{title}</p>
         </div>
         <p className="text-sm font-bold">
            {value}%
         </p>
      </div>
   );
}

export default PercentageItem;