import Link from "next/link";

export default function Quiz2() {
    return (
        <div className="flex flex-col h-full my-10 mx-10">  
            <h1 className="text-3xl font-sans font-bold text-center">Sign Language Quiz : Level2</h1>
            <Link href="/quiz/3">Move to Quiz 3</Link>
        </div>
    )
}