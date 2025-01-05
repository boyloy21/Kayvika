import React from "react";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import Slider from "@/components/SliderImage";

export default function Course() {
    const images = [
        'https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/hello-webp.webp',
        'https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/happy-webp.webp',
        'https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/house-webp.webp',
        'https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/play-webp.webp',
        'https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/smile-webp.webp',
        'https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/want-webp.webp',
        'https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/go-webp.webp',
        'https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/water-webp.webp',
        'https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/i_love_you-webp.webp',
        'https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/again-webp.webp',
      ];
    const captions = [
        "សួស្តី",
        "រីករាយ",
        "ផ្ទះ",
        "លេង",
        "ញញឹម",
        "ចង់",
        "ទៅ",
        "ទឹក",
        "ស្រឡាញ់",
        "ម្តងទៀត",
    ] 
    const images2 = [
        'https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/what-webp',
        'https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/when-webp.webp',
        'https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/who-webp.webp',
        'https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/where-webp.webp',
        'https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/why-webp.webp',
        'https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_1414/BabySignLanguage/DictionaryPages/how-webp.webp'
    ]
    const captions2 = [
        "អ្វី",
        "ពេលណា",
        "នរណា",
        "កន្លែងណា",
        "ហេតុអ្វី",
        "ប៉ុន្មាន",
    ]
    const videoid = [
        'nhXz8th0LH4?si=7c4PisMuREcUPzyN',
        '4T0eEi5uyfY?si=bx2V0VPLJRdbAlWp',
        'KC2F5YE855o?si=pSYFpVgxNlaQtUTB',
        '-H183jnaEqc?si=irl0xT10524UNj3I',
        '3mh5FbKkHFo?si=j2hjstWOv26s7Zvn',
    ]
    
    return (
        <div className="flex flex-col justify-start h-screen w-full my-12 p-6">
            <div className="mx-10 mt-10">
                <h1 className="text-3xl font-sans font-bold mb-5">មេរៀនទី១ : អំពីពាក្យមូដ្ធានទំនាក់ទំនង</h1>
                <div className="flex flex-row">
                    <YouTubeEmbed videoId={videoid[0]} className="mx-5" />
                    <Slider images={images} captions={captions} autoSlide={false} className="mx-5"/>
                </div>
            </div>
            <div className="mx-10 mt-10">
                <h1 className="text-3xl font-sans font-bold mb-5">មេរៀនទី២ : សំណួរ</h1>
                <div className="flex flex-row">
                    <YouTubeEmbed videoId={videoid[1]} className="mx-5" />
                    <Slider images={images2} captions={captions2} autoSlide={false} className="mx-5"/>
                </div>
            </div>
            <div className="mx-10 mt-10">
                <h1 className="text-3xl font-sans font-bold mb-5">មេរៀនទី៣ : អំពីរថ្ងៃនៃសប្តាហ៍</h1>
                <YouTubeEmbed videoId={videoid[2]} />
            </div>
            <div className="mx-10 mt-10">
                <h1 className="text-3xl font-sans font-bold mb-5">មេរៀនទី៤ : ការណែនាំខ្លួនរបស់អ្នក </h1>
                <YouTubeEmbed videoId={videoid[3]} />
            </div>
            <div className="mx-10 my-10 mb-10">
                <h1 className="text-3xl font-sans font-bold mb-5">មេរៀនទី៥ : អារម្មណ៍</h1>
                <YouTubeEmbed videoId={videoid[4]} />
            </div>
        </div>
    );
}