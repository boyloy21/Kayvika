'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import Alert from '@/components/alerts/alert';
import Image from 'next/image';
import Quizback from '@/components/Quizback';
const quizQuestions = [
    {
        question: "What does the sign for 'Hello' look like?",
        options: ["Wave", "Thumbs Up", "Point", "Clap"],
        answer: "Wave",
        image: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/hello-webp.webp" // Add image URL
    },
    {
        question: "How do you sign 'Thank You'?",
        options: ["Touch chin and move hand forward", "Clap", "Shake hands", "Bow"],
        answer: "Touch chin and move hand forward",
        image: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/thank_you-webp.webp" // Add image URL
    },
    {
        question: "What is the sign for 'More'?",
        options: ["Open hands", "Clap", "Bring fingers together", "Tap fingers together"],
        answer: "Tap fingers together",
        image: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/more-webp.webp" // Add image URL
    },
    {
        question: "How do you sign 'Give' in sign language?",
        options: ["Move a flat hand forward", // Correct answer
                "Wipe chest with hand",
                    "Thumbs up",
                    "Point with index finger"
                ],
        answer: "Move a flat hand forward",
        image : "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/give-webp.webp" 
    },
    {
        question: "What does the sign for 'Yes' look like?",
        options: ["Nod head", "Shake head", "Raise hand", "Thumbs Up"],
        answer: "Thumbs Up",
        image: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/yes-webp.webp" // Add image URL
    }
];

const SignLanguageQuiz = () => {
    const [selectedAnswers, setSelectedAnswers] = useState(Array(quizQuestions.length).fill(null));
    const { handlerSuccessClick } = Alert(); // Alert functions
    const router = useRouter(); // Initialize useRouter

    const handleOptionChange = (questionIndex, option) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[questionIndex] = option;
        setSelectedAnswers(updatedAnswers);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let calculatedScore = 0;

        selectedAnswers.forEach((answer, index) => {
            if (answer === quizQuestions[index].answer) {
                calculatedScore += 1;
            }
        });

        // Show the score in an alert
        handlerSuccessClick(`Your Score: ${calculatedScore} out of ${quizQuestions.length}`);

        // Redirect to the quiz page after a short delay (optional)
        setTimeout(() => {
            router.push('/quiz'); // Change '/quiz' to your actual quiz route
        }, 3000); // Delay for 3 seconds before redirecting
    };

    return (
        <div className="flex flex-col h-full my-10 mx-10 relative">
            <Quizback nameroute={'/quiz/1'} />
            <h1 className="text-3xl font-bold mb-4 text-center py-4">Sign Language Quiz : Level4</h1>
            <form onSubmit={handleSubmit} className='flex flex-col justify-start w-full px-4 '>
                {quizQuestions.map((question, index) => (
                    <div key={index} className="mb-4">
                        <p className="font-semibold text-lg">{index + 1}. {" " + question.question}</p>
                        <Image src={question.image} alt={question.question} width={250} height={250} className="mb-4" /> {/* Image */}
                        {question.options.map((option) => (
                            <div key={option} className="flex items-center mb-1">
                                <input
                                    type="radio"
                                    id={`${index}-${option}`}
                                    name={`question-${index}`}
                                    value={option}
                                    checked={selectedAnswers[index] === option}
                                    onChange={() => handleOptionChange(index, option)}
                                    className="mr-2"
                                />
                                <label htmlFor={`${index}-${option}`}>{option}</label>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-1/2 my-4 items-center shadow-md hover:bg-blue-600 rounded">
                    Submit
                </button>
            </form>
        </div>
        
    );
};

export default SignLanguageQuiz;
