'use client';
import { Canvas } from "@react-three/fiber";
import React, {useState,} from "react";
import { OrbitControls } from "@react-three/drei";
import { Model } from "@/components/Avator";
import "./styles.css";

export default function Home() {
  const [allAnimation, setAllAnimation] = useState(["មិនកាយវិការ","សួរស្តី","អរគុណ","ផឹក","យំ","ទេ","តេទូរសព្ទ័","ខ្លាំង","មើលម៉ោង","រកមើល","អ្នក","សរសេរ","ជជែក"]);
  const [currentAnimationName, setCurrentAnimationName] = useState("មិនកាយវិការ");
  return (
   <div className="flex justify-between w-[100vh] h-[100vh]">
     <div className="flex justify-center  w-[100vh] h-[100vh]">
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 48 }}>  
          <OrbitControls />
          <ambientLight/>
          <directionalLight position={[-5, 5, 5]} />
          <Model currentAnimationName={currentAnimationName} position={[0.5, -2.2, 5]} scale={2.2}/>
        </Canvas>
     </div>
      <div className="overflow-y-auto fixed top-16 right-3 flex flex-col justify-center h-[100vh]">
          {allAnimation.map((name, index) => {
            return (
              <div key={index} className="cursor-pointer m-2 bg-green-500 hover:bg-green-600 rounded-2xl text-center">
                <button onClick={e => setCurrentAnimationName(name)} className=" p-2 w-full">{name}</button>
              </div>
            )
          })}
      </div>
      
     
   </div>
  );
}
