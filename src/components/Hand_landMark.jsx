'use client';
// import dynamic from 'next/dynamic';
import {
	DrawingUtils,
	FilesetResolver,
	HandLandmarker,
} from '@mediapipe/tasks-vision';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { faArrowLeft, faFaceSmile, faHand, faLanguage, faList, faMicrophone, faMicrophoneSlash, faPallet, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import * as tf from '@tensorflow/tfjs';
import * as fp from "fingerpose";
import HelloGesture from './gestures/Hello';
import Thank from './gestures/Thank';
import iLoveYouGesture from './gestures/Loveyou';
import DrinkGesture from './gestures/Drink';
import YesGesture from './gestures/Yes';
import CallMeGesture from './gestures/CallMe';
import OKSignGesture from './gestures/Ok';
import MeetGesture from './gestures/Meet';
import Want from './gestures/Want';
import Home from './gestures/Home';
import YouI from './gestures/YouI';
import Eat from './gestures/Eat';
import Toilet from './gestures/Toilet';
import Rice from './gestures/Rice';
// const { FilesetResolver, HandLandmarker, DrawingUtils } = dynamic(() => import('@mediapipe/tasks-vision'), { ssr: false });
// const Webcam = dynamic(() => import('react-webcam'), { ssr: false });

export default function HandLandmarks({id}) {
	const [handsData, setHandsData] = useState([]);
	const [modelOutput, setModelOutput] = useState("");  // State for model output
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);
	const [model, setModel] = useState("");
	const [detectedSign, setDetectedSign] = useState("");
	const [loadingMessage, setLoadingMessage] = useState('Loading model...');
	const handLandmarkerRef = useRef(null);
	const drawingUtilsRef = useRef(null);
    const router = useRouter();
	const [transcript, setTranscript] = useState('');
	const [sentence, setSentence] = useState('');

	// State to track whether the button is hovered
	const [isHoveredBack, setIsHoveredBack] = useState(false);
	const [isHoveredVideo, setIsHoveredVideo] = useState(false);
	const [isHoveredMic, setIsHoveredMic] = useState(false);
	const [isHoveredList, setIsHoveredList] = useState(false);
	const [isDropdownList, setIsDropdownList] = useState(false);
	const [isHoveredPhone, setIsHoveredPhone] = useState(false);

	const handleMouseEnterBack = () => setIsHoveredBack(true);
    const handleMouseLeaveBack = () => setIsHoveredBack(false);

	const handleMouseEnterList = () => setIsHoveredList(true);
    const handleMouseLeaveList = () => setIsHoveredList(false);

    const handleMouseEnterVideo = () => setIsHoveredVideo(true);
    const handleMouseLeaveVideo = () => setIsHoveredVideo(false);

    const handleMouseEnterMic = () => setIsHoveredMic(true);
    const handleMouseLeaveMic = () => setIsHoveredMic(false);

    const handleMouseEnterPhone = () => setIsHoveredPhone(true);
    const handleMouseLeavePhone = () => setIsHoveredPhone(false);

	const [isClickedMic, setIsClickedMic] = useState(false);
	const [textToSpeak, setTextToSpeak] = useState("");

	const hadlerClickList = () => {
		setIsDropdownList(!isDropdownList);
	}
	const handleClickback = () => {
        router.push(`/videocall/${id}/call`);
    }
    const handleClickphone = () => {
        router.push(`/videocall/${id}/recents`);
    }
    const hadlerClickVideo = () => {
        router.push(`/videocall/${id}/call`);
    }
	
	const hadlerClickClearSentence = () => {
		setSentence('');
	}
	const hadlerClickMic = async () => {
		setIsClickedMic(!isClickedMic);
	
		if (!isClickedMic) {
		// Enable microphone and start recognition
		try {
			console.log("Microphone enabled and speech recognition started.");
	
			// Check for browser support for the Web Speech API
			const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
	
			if (!SpeechRecognition) {
			console.error("SpeechRecognition API is not supported in this browser.");
			return;
			}
	
			const recognition = new SpeechRecognition();
			recognition.lang = "en-US"; // Set language for recognition
			recognition.interimResults = false; // Return final results only
			recognition.continuous = true; // Keep recognizing until stopped
	
			recognition.onstart = () => {
			console.log("Speech recognition started.");
			};
	
			recognition.onresult = (event) => {
			const transcript = Array.from(event.results)
				.map((result) => result[0].transcript)
				.join("");
			console.log("Recognized text:", transcript);
			// You can update your state or display the transcribed text
			setTranscript(transcript);
			};
	
			recognition.onerror = (error) => {
			console.error("Speech recognition error:", error);
			};
	
			recognition.onend = () => {
			console.log("Speech recognition stopped.");
			};
	
			// Start recognition
			recognition.start();
	
			// Store recognition instance globally or in state to stop later
			window.recognitionInstance = recognition;
		} catch (err) {
			console.error("Failed to enable microphone: ", err);
		}
		} else {
		// Disable microphone and stop recognition
		console.log("Microphone and speech recognition disabled.");
		if (window.recognitionInstance) {
			window.recognitionInstance.stop();
			window.recognitionInstance = null; // Cleanup
		}
	
		// Stop all audio tracks to completely disable the microphone
		if (window.audioStream) {
			const tracks = window.audioStream.getTracks();
			tracks.forEach((track) => track.stop()); // Stops all tracks (audio in this case)
			window.audioStream = null; // Cleanup
		}
		}
	};
  
  // Function to handle text-to-speech
  const hadlerClickSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = "km-KH"; // Set language (optional)

      // Clear any ongoing speech to prevent queuing
      window.speechSynthesis.cancel();
  
      // Speak the text
      window.speechSynthesis.speak(utterance);
	  let voices = window.speechSynthesis.getVoices();
	  console.log(voices);
      // Log any errors that might occur
      utterance.onerror = (error) => console.error("Speech Synthesis Error:", error);
    } else {
      console.warn("Speech synthesis is not supported in this browser.");
    }
  };
  const handleKeyDown = (e) => {
	if (e.key === 'Enter') {
		hadlerClickSpeak();
	}
	};
	

	useEffect(() => {
		
		const initializeHandLandmarker = async () => {
			try {
				const vision = await FilesetResolver.forVisionTasks(
					'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
				);
				const handLandmarker = await HandLandmarker.createFromOptions(vision, {
					baseOptions: {
						modelAssetPath: '/models/hand_landmarker.task',
						delegate: 'GPU',
					},
					runningMode: 'VIDEO',
					numHands: 2,
					minHandDetectionConfidence: 0.8,
					minHandPresenceConfidence: 0.5,
					minTrackingConfidence: 0.5,
				});
				handLandmarkerRef.current = handLandmarker;
				console.log('Hand landmarker is created!');
				startCapture();
			
			} catch (error) {
				console.error('Error initializing hand landmarker:', error);
			};
		};
		initializeHandLandmarker();
	}, []);

	
	const updateSentence = (gesture) => {
		if (gesture && gesture !== "Unknown Gesture") {
			setSentence((prevSentence) => `${prevSentence} ${gesture}`.trim());
		}
	};
	const startCapture = async () => {
		if (
			webcamRef.current &&
			handLandmarkerRef.current &&
			webcamRef.current.video
		) {
			const video = webcamRef.current.video;
			if (video.currentTime > 0) {
				const result = await handLandmarkerRef.current.detectForVideo(
					video,
					performance.now()
				);
				if (result.landmarks && result.handedness) {
					const handsData = result.landmarks.map((landmark, index) => ({
						landmark,
						handedness: result.handedness[index][0].categoryName,
					}));
					setHandsData(handsData);
					// Detect gestures based on landmarks
                    // Detect gestures based on landmarks
					// const sign = detectSign(handsData[0].landmark, handsData[1].landmark);
					// setDetectedSign(sign);
					console.log(handsData.length);
					if (handsData.length === 1) {
						// Single hand detected
						detectSign(handsData[0].landmark, null, 1); // Pass single hand
						
					} else if (handsData.length === 2) {
						// Two hands detected
						
						 detectSign(
							handsData[0].landmark,
							handsData[1].landmark,
							2
						); // Pass both hands
						
					} 
					
				}
			}
		}
		requestAnimationFrame(startCapture);
	};

	// const processHandDataForModel = (handsData) => {
	// 	// You need to process the hand landmarks data to match the model input format
	// 	// This is a placeholder - adjust based on how your model is trained
	// 	const handFeatures = handsData.map(hand => hand.landmark.flat());  // Flatten landmarks
	// 	return tf.tensor2d(handFeatures);  // Convert to tensor
	//   };
	useEffect(() => {
		const ctx = canvasRef.current.getContext('2d');
		drawingUtilsRef.current = new DrawingUtils(ctx);
	}, []);

	let lastDetectedSign = null;
	let lastDetectionTime = 0;
	const detectSign = (landmarksLeft, landmarksRight, handlength) => {
		const DETECTION_DELAY = 1000; // 1500 milliseconds
		if (!landmarksLeft && !landmarksRight) {
			return "No Hands Detected";
		}
	
		// Convert landmarks for both hands
		const convertLandmarks = (landmarks) =>
			landmarks?.map((point) => [point.x, point.y, point.z]);
		// Convert landmarks for both hands
		const convertedLandmarksLeft = convertLandmarks(landmarksLeft);
		const convertedLandmarksRight = convertLandmarks(landmarksRight);

		// Detect Hello gesture based on index finger distance
		const calculateIndexDistance = (landmarks) => {
			if (!landmarks) return null;
			return Math.abs(landmarks[5][1] - landmarks[8][1]);
		};
		

		const indexRightDistance = calculateIndexDistance(convertedLandmarksRight);
		const indexLeftDistance = calculateIndexDistance(convertedLandmarksLeft);

		const Hello =
			(indexLeftDistance > 0.18 && indexLeftDistance < 0.24) ||
			(indexRightDistance > 0.18 && indexRightDistance < 0.24);

		const Meet = (Landmarkleft, Landmarkright) => {
			if (!Landmarkleft || !Landmarkright) return null;
			const YCompare = [4, 5, 6, 7, 9, 10, 11, 12, 13, 14];
			const isYLeftValid = YCompare.every((i) => Landmarkleft[8][1] < Landmarkleft[i][1]);
			const isYRightValid = YCompare.every((i) => Landmarkright[8][1] < Landmarkright[i][1]);
			const diffIndex = Landmarkleft[8][1] - Landmarkright[8][1];
			const rangIndex = diffIndex > 0.00 && diffIndex < 0.25;
			return rangIndex && isYLeftValid && isYRightValid;
		};
		const Yes = (landmarks) => {
			if (!landmarks) return null;
			const yCompare = [3, 4, 6, 7, 8, 10, 11, 12, 14, 15, 16];
			const zCompare = [6, 7, 8, 10, 11, 12, 14, 15, 16];
			// const zValuesLeft = indexCompare.every((i) => Landmarkleft[i][2] < -0.04);
			// const zValuesRight = indexCompare.every((i) => Landmarkright[i][2] < -0.04);
			const zCheck = zCompare.every((i) => (landmarks[5][2] > landmarks[i][2]) && (landmarks[9][2] > landmarks[i][2]) && (landmarks[13][2] > landmarks[i][2]));
			const yCheck = yCompare.every((i) => (landmarks[5][1] < landmarks[i][1]) && (landmarks[9][1] < landmarks[i][1]) && (landmarks[13][1] < landmarks[i][1]));
			return zCheck && yCheck;
		};

		const Love = (landmarks) => {
			if (!landmarks) return null;
			const PumbCompare = [1, 2, 3];
			const indexCompare = [5, 6, 7, 9, 10, 11, 12, 13];
			const pinkyCompare = [14, 15, 16, 17, 18];
			const pumb = PumbCompare.every((i) => landmarks[4][1] < landmarks[i][1]);
			const index = indexCompare.every((i) => landmarks[8][1] < landmarks[i][1]);
			const pinky = pinkyCompare.every((i) => landmarks[20][1] < landmarks[i][1]);
			return pumb && index && pinky;
		};

		// const Drink = (landmarks) => {
		// 	if (!landmarks) return null;
		// 	const ValueCompare = [5, 6, 7, 9, 10, 11, 12, 13, 14, 15];
		// 	const isYValid = ValueCompare.every((i) => landmarks[4][1] > landmarks[i][1]);
		// 	const diff = landmarks[4][1] - landmarks[8][1];
		// 	const rang = diff > 0.9 && diff < 1.6;
		// 	// console.log('Drink', diff);
		// 	return rang ;
		// };
	
		// Gesture Estimator
        const gestureEstimator = new fp.GestureEstimator([
			HelloGesture,
			iLoveYouGesture,
			DrinkGesture,
			YesGesture,
			CallMeGesture,
			MeetGesture,
            // Add more gestures here
        ]);

		const getGestureName = (landmarks) => {
			if (!landmarks) return "Unknown";
			const estimatedGestures = gestureEstimator.estimate(landmarks, 7.5);
			if (estimatedGestures.gestures.length > 0) {
				const confidenceSorted = estimatedGestures.gestures.sort(
					(a, b) => b.score - a.score
				);
				return confidenceSorted[0].name;
			}
			return "Unknown";
		};
	
		// Detect gestures for both hands
		const leftHandGesture = getGestureName(convertedLandmarksLeft);
		const rightHandGesture = getGestureName(convertedLandmarksRight);	
		
		let detectedSign = null;

		if (Thank(convertedLandmarksLeft, convertedLandmarksRight)) {
			detectedSign = "Thank You";
		} else if ((leftHandGesture === "love" && rightHandGesture !== "love" && Love(convertedLandmarksLeft)) || (rightHandGesture === "love" && leftHandGesture !== "love" && Love(convertedLandmarksRight))) {
			detectedSign = "I Love You";
		}
		else if ((leftHandGesture === "hello" && rightHandGesture !== "hello" && Hello ) || 
			(rightHandGesture === "hello" && leftHandGesture !== "hello" && Hello)) {
			detectedSign = "Hello";
		}
		else if ((YouI.I(convertedLandmarksLeft) && !YouI.I(convertedLandmarksRight) && handlength == 1) || 
			(YouI.I(convertedLandmarksRight) && !YouI.I(convertedLandmarksLeft) && handlength == 1)) {
			detectedSign = "I";
		}
		else if ( Meet(convertedLandmarksLeft, convertedLandmarksRight) ) {
			detectedSign = "Meet";
		}
		else if (
			(YouI.You(convertedLandmarksLeft) && (!YouI.You(convertedLandmarksRight) && handlength == 1)) ||
			(YouI.You(convertedLandmarksRight) && (!YouI.You(convertedLandmarksLeft) && handlength == 1))
		) {
			detectedSign = "You";
		}
		else if ((YouI.You(convertedLandmarksLeft) && YouI.You(convertedLandmarksRight))) {
			detectedSign = " go to";
		}
		else if (( leftHandGesture === "drink" && rightHandGesture !== "drink" ) || (rightHandGesture === "drink" )) {
			detectedSign = "Drink Water";
		}
		else if ( Home(convertedLandmarksLeft, convertedLandmarksRight)) {
			detectedSign = "Home";
		}
		else if ((leftHandGesture === "yes" && rightHandGesture !== "yes" && Yes(convertedLandmarksLeft) && handlength == 1) || (rightHandGesture === "yes" && leftHandGesture !== "yes" && Yes(convertedLandmarksRight) && handlength == 1)) {
			detectedSign = "Yes";
		}
		
		else if ((leftHandGesture === "call_me" && rightHandGesture !== "call_me") || (rightHandGesture === "call_me" && leftHandGesture !== "call_me")) {
			detectedSign = "Call Me";
		}
		// else if ((leftHandGesture === "ok" && rightHandGesture !== "ok") || (rightHandGesture === "ok" && leftHandGesture !== "ok")) {
		// 	detectedSign = "Ok";
		// }
		else if ( Want(convertedLandmarksLeft) || Want(convertedLandmarksRight)) {
			detectedSign = "Want to";
		}
		else if ( Eat(convertedLandmarksLeft) || Eat(convertedLandmarksRight)) {
			detectedSign = "Eat";
		}
		else if ( (Toilet(convertedLandmarksLeft) && handlength == 1) || (Toilet(convertedLandmarksRight) && handlength == 1) ) {
			detectedSign = "Toilet";
		}
		else if ( Rice(convertedLandmarksLeft) || Rice(convertedLandmarksRight)) {
			detectedSign = "Rice";
		}
		
		setDetectedSign(detectedSign);
		const currentTime = Date.now();

		if (detectedSign && detectedSign === lastDetectedSign) {
			if (currentTime - lastDetectionTime >= DETECTION_DELAY) {
				lastDetectionTime = currentTime;
	
				// Add detected sign to sentence
				updateSentence(detectedSign);
	
				return detectedSign;
			}
		} else {
			lastDetectedSign = detectedSign;
			lastDetectionTime = currentTime;
	
		}

		
		return null;
		
    };
	useEffect(() => {
		const ctx = canvasRef.current.getContext('2d');
		if (drawingUtilsRef.current) {
			ctx.clearRect(0, 0, 1280, 720);
			handsData.forEach(({ landmark, handedness }) => {
				const isLeftHand = handedness === 'Left';
				const handColor = isLeftHand ? '#FF0000' : '#00FF00';
				const handConnect = isLeftHand ? '#00FF00' : '#FF0000';

				// Draw hand connectors
				drawingUtilsRef.current.drawConnectors(
					landmark,
					HandLandmarker.HAND_CONNECTIONS,
					{
						color: handColor,
						lineWidth: 5,
					}
				);

				drawingUtilsRef.current.drawLandmarks(landmark, {
					color: handColor,
					radius: 5,
					lineWidth: 4,
					fillColor: handConnect,
				});
			});
		}
		
	}, [handsData]);
	
	return (
		<section>
			<div className='relative w-full pt-[56.25%]'>
                <div className='flex flex-row justify-between absolute top-0 z-10 p-4 w-full'>
					<div className=' absolute  left-2'>
						<FontAwesomeIcon 
                        icon={faArrowLeft} 
                        className=" h-14 w-14 text-white hover:text-gray-300  transition duration-200 ease-in-out cursor-pointer"
                        onClick={handleClickback} onMouseEnter={handleMouseEnterBack}
                                onMouseLeave={handleMouseLeaveBack}/>
                        {isHoveredBack && (
                            <p className='text-white text-xl font-bold mt-2'>Back</p>
                        )}
					</div>
                    
					<div className='absolute top-10 mt-2 left-1/2 transform -translate-x-1/2 h-16 w-3/4 bg-none border-2 border-blue-600 rounded-lg'>
						<h1 className='text-blue-600 text-3xl font-bold text-center mt-2'>{sentence}</h1>
					</div>
					<div className=' absolute top-0 right-2'>
						<FontAwesomeIcon icon={faList} className=" h-14 w-14 text-white hover:text-gray-600 transition duration-200 ease-in-out cursor-pointer" onClick={hadlerClickList}  />
						{isDropdownList && (
							 <div className='bg-none text-black font-bold text-xl mt-2 p-2 rounded shadow-lg absolute right-0'>
							 <ul>
								 <li className='flex flex-row items-center px-4 py-2 hover:bg-gray-200 cursor-pointer' >
									 <FontAwesomeIcon icon={faHand} className='mr-2 text-blue-500' />HandColor
								 </li>
								 <li className='flex flex-row items-center px-4 py-2 hover:bg-gray-200 cursor-pointer' >
									 <FontAwesomeIcon icon={faLanguage} className='mr-2' />Language
								 </li>
								 <li className='flex flex-row items-center px-4 py-2 hover:bg-gray-200 cursor-pointer' >
									 <FontAwesomeIcon icon={faFaceSmile} className='mr-2 text-green-500' />CloseFace
								 </li>
							 </ul>
						 </div>
						)}
					</div>
                    
                </div>
				<Webcam
					width='1280'
					height='720'
					mirrored
					id='webcam'
					audio={false}
					videoConstraints={{
						width: 1280,
						height: 720,
						facingMode: 'user',
					}}
					ref={webcamRef}
					className='absolute top-0 left-0 w-full h-full'
				/>
				<canvas
					ref={canvasRef}
					width='1280'
					height='720'
					style={{ transform: 'rotateY(180deg)' }}
					className='absolute top-0 left-0 w-full h-full'
				></canvas>
				 <h1 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-black text-3xl font-bold z-10">
					{detectedSign}
        		</h1> 
			</div>
			<div className='flex flex-row content-center z-10 p-2 w-full h-24 bg-white border-4 border-gray-400 rounded-lg'>
				<div className='flex justify-start items-center  w-3/5 h-16'>
					<input type="text" placeholder="Text To Sound" 
					className=" p-2 h-16 w-full items-center text-blue-600 cursor-pointer border-2 border-blue-500 rounded-xl transition duration-200 ease-in-out" 
					onChange={(e) => setSentence(e.target.value)} 
					onKeyDown={(e) => handleKeyDown(e)}/>
				</div>
				<div className='flex flex-row justify-between content-center items-center w-2/5 h-32'>
					<div className='mx-5 my-2 h-full w-full place-items-center'>
						<FontAwesomeIcon icon={faVideo} className="text-center h-12 w-12 text-blue-600 hover:text-blue-500 transition duration-200 ease-in-out cursor-pointer" onClick={hadlerClickVideo} onMouseEnter={handleMouseEnterVideo} onMouseLeave={handleMouseLeaveVideo}/>
                        {isHoveredVideo && (
                            <p className='text-blue text-xl font-bold'>Video</p>
                        )}
					</div>
					<div className='mx-5 my-2 h-full w-full place-items-center'onClick={hadlerClickMic} onMouseEnter={handleMouseEnterMic} onMouseLeave={handleMouseLeaveMic}>
                          {isClickedMic ?  <FontAwesomeIcon icon={faMicrophone} className=" text-center items-center h-12 w-12  text-blue-600 hover:text-blue-500 transition duration-200 ease-in-out" /> :  <FontAwesomeIcon icon={faMicrophoneSlash} className=" text-center items-center h-12 w-12  text-blue-600 hover:text-blue-500 transition duration-200 ease-in-out" />}
                          {isHoveredMic && (
                           <p className='text-blue text-xl font-bold'>Microphone</p>
                          )}
					</div>
					<div className='mx-2 my-2 h-full w-full place-items-center'>
						<button className=' h-12 w-24 text-center items-center text-white p-1 font-bold font-sans text-lg bg-green-600 hover:bg-green-500 transition duration-200 ease-in-out cursor-pointer border-4 border-blue-500 rounded-xl' onClick={hadlerClickSpeak}>Speack</button>
					</div>
					<div className='mx-2 mr-2 h-full w-full place-items-center'>
						<button className=' h-12 w-24 text-center items-center text-white p-1 font-bold font-sans text-lg bg-red-600 hover:bg-red-500 transition duration-200 ease-in-out cursor-pointer border-4 border-blue-500 rounded-xl' onClick={hadlerClickClearSentence}>Clear</button>
					</div>
					<div className='mx-5 my-2 h-full w-full place-items-center'>
						<FontAwesomeIcon icon={faPhone} className="  h-12 w-12 text-center items-center  text-red-600 hover:text-red-500 transition duration-200 ease-in-out cursor-pointer" onClick={handleClickphone} onMouseEnter={handleMouseEnterPhone} onMouseLeave={handleMouseLeavePhone}/>
                        {isHoveredPhone && (
                            <p className='text-blue text-xl font-bold'>CloseCall</p>
                        )}
					</div>
				</div>
            </div>
			
		</section>
	);
}