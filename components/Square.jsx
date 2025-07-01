import { Button } from "@/components/ui/button";

export default function Square({ value, onClick }) {
    const textColor =
        value === "X" ? "text-red-500" : value === "O" ? "text-blue-500" : "";

    return (
        <Button
            onClick={onClick}
            className={`w-15 h-15 text-lg md:w-20 md:h-20 md:text-2xl font-bold p-0 hover:cursor-pointer border border-gray-400 ${textColor}`}
            variant="outline"
        >
        {value}
        </Button>
    );
}