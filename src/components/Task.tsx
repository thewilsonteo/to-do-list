import { Trash2 } from "lucide-react";

interface TaskProps {
    done: boolean;
    description: string;
    handleDelete: () => void;
    handleChange: () => void;
}

export const Task: React.FC<TaskProps> = ({
    done = false,
    description,
    handleDelete,
    handleChange,
}) => {
    return (
        <div>
            <div>
                <input
                    type="checkbox"
                    checked={done}
                    onChange={handleChange}
                />
                <p className={`${done ? "line-through" : ""}`}>
                    {description}
                </p>
                <button onClick={handleDelete}>
                    <Trash2 />
                </button>
            </div>
        </div>
    )
}