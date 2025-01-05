"use client";
import { Canvas, useThree } from "@react-three/fiber";
import React from "react";
import { Avatorhome } from "@/components/Avatorhome";
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import "./globals.css";
import { useTheme } from "next-themes";
import Image from "next/image";
export default function Home() {
    const { theme, setTheme } = useTheme();
    function BackgroundPlane() {
                const texture = useTexture("/textures/Angkor_Wat.jpeg");
                const { viewport } = useThree((state) => state);
                const planeWidth = viewport?.width /1.2; ;  // Fallback width
                const planeHeight = viewport?.height/1.0 ; // Fallback height
            return (
                <mesh>
                    {/* The plane will cover the entire viewport */}
                    <planeGeometry args={[planeWidth, planeHeight]}  />
                    <meshBasicMaterial map={texture} />
                </mesh>
                );
            }
    return (
        <div className="w-full h-screen my-10 items-center justify-center">
            <h1 className="text-6xl font-bold underline text-center my-10 text-blue-600  ">
                WELCOME TO KAYVIKA !
            </h1>
            <div className="flex justify-center mb-10">
                <h1 className="flex-none ml-4  text-4xl font-bold text-blue-600 text-center">KAYVIKA</h1>
                <h1 className="flex-initial text-4xl font-bold text-center ">is a sign language for translation from movement of hands to speech and text and have AI voice to speak.</h1>
            </div>
            <div className="flex justify-center mb-10">
                <div className="flex flex-col mx-10">
                    <Image src="/pictures/I Love You.jpeg" alt="iloveyou" width={600} height={600} className="shadow-xl shadow-blue-700 transform hover:scale-110 hover:mb-4 transition duration-75 ease-linear"/>
                    <h1 className="mt-2 flex justify-center text-4xl font-bold pb-14">ខ្ញំុស្រឡាញ់អ្នក</h1>
                </div>
                <div className="flex flex-col mx-10">
                    <Image src="/pictures/Thank You.jpeg" alt="thankyou" width={600} height={600} className="shadow-xl shadow-blue-700 transform hover:scale-110 hover:mb-4 transition duration-75 ease-linear"/>
                    <h1 className="mt-2 flex justify-center text-4xl font-bold pb-10">អរគុណ</h1>
                </div>
            </div>
            {/* <Canvas shadows camera={{ position: [0, 0, 10], fov: 42 }}>
                <color attach="background" args={theme === "dark" ? ["#1E293B"] : ["#0EA5E9"]} />
                <OrbitControls enableZoom={false}/>
                <Avatorhome  position={[0, -2.0, 3]} scale={2.0}/>
                <Environment preset="sunset" />
                <BackgroundPlane />             
            </Canvas> */}
            <div className="py-10 mx-10">
                <h1 className="text-4xl italic font-sans font-bold text-center">Please use me now to get to easy communicate with other people and this website has alot short course video , pictures and 3D animations for study about sign language. </h1>
            </div>
        </div>
    );
}