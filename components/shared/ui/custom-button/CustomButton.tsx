'use client';

interface Props {
    text: string;                      
    attachedFunction?: (...args: any[]) => void;
    className?: string;
    type?: "button" | "submit" | "reset" | undefined;              
    // [x: string]: any;                  
}

export const CustomButton = ({ text, attachedFunction, className = "", type }: Props) => {
    return (
        <button 
            onClick={attachedFunction} 
            className={`transition-all duration-300  text-base md:text-lg font-bold rounded px-4 py-2 ${ className }`} 
            { ...{ type } }
        >
            {text}
        </button>
    );
};
