import Link from "next/link";
import Image from "next/image";

export default function Quiz() {
    const ListQuiz = [
        {id: 1, name: "Easy"},
        {id: 2, name: "Medium"},
        {id: 3, name: "Hard"},
        {id: 4, name: "Expert"},
        {id: 5, name: "Master"},
        {id: 6, name: "Legend"},
        {id: 7, name: "GOD"},
        {id: 8, name: "HOD"},
        {id: 9, name: "GODLIKE"},
        {id: 10, name: "HODLIKE"},  
    ]
    return (
        <>
        <div className="flex justify-center items-center bg-green-600 w-full px-4 py-4 text-4xl px-4 text-center font-bold my-4 text-white">
            <h1 className=" text-4xl  text-center font-bold  text-white hover:underline transition duration-300 ease-in-out">Quiz</h1>
            <Image src="/quiz/quiz-symbol.jpeg" alt="quiz symbol" width={80} height={80} className="ml-4 border-4 border-white rounded-xl" />
        </div>
        
        <ul className="grid grid-cols-2 gap-4 list-none px-4">
            {ListQuiz.map(({ id, name }) => (
                <Link key={id} href={`/quiz/${id}`} prefetch={false}>
                    <li className="bg-white shadow-md rounded-md p-4 text-green-600 text-2xl font-bold  hover:text-green-600/50 transition duration-500 ease-in-out">
                        Level{id} : {name}
                    </li>
                </Link>
            ))}
        </ul>   
        </>
    )
}