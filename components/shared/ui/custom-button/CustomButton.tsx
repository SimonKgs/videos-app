'use client';

interface Props {
    text: string;                      
    attachedFunction?: (...args: any[]) => void;
    className?: string;                
    // [x: string]: any;                  
}

export const CustomButton = ({ text, attachedFunction, className = "" }: Props) => {
    return (
        <button 
            onClick={attachedFunction} 
            className={`transition-all duration-300 text-base md:text-lg font-bold rounded px-4 py-2 ${ className }`} 
        >
            {text}
        </button>
    );
};
