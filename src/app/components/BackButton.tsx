import Link from "next/link";
import { useRouter } from "next/navigation";

const BackButton = () => { 

    const router = useRouter();
    
    return (
        <div className="relative inline-block text-left">
        <button
            className="bg-slate-500 text-white p-2 ml-2 rounded"
            onClick={() => router.push("/")}
        >
            Go Back
        </button>
        </div>
    );

};

export default BackButton;