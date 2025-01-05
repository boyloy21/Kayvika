import Image from 'next/image';

export default function About() {
    return (
        <div className='w-full h-full'>
            <div className="w-full flex flex-row justify-between my-10">
                <div className="flex justify-items-start flex-col w-1/2 mx-10">
                    <h1 className="mx-10 text-4xl font-sans font-medium  text-start mb-10">Bridging Communication, Empowering Connections.</h1>
                    <h1 className='mx-10 text-3xl font-sans font-medium text-start'>At KAYVIKA, we believe that everyone deserves the opportunity to communicate freely, 
                        regardless of the language they use. Founded with a mission to bridge the gap between hearing and Deaf communities, 
                        our platform empowers users to learn, practice, 
                        and connect using sign language.
                    </h1>
                </div>
                <Image src="/pictures/about1.jpg" alt="about1" width={700} height={700} className='mx-10 my-10  rounded-3xl border-8 border-white'/>
                
                
            </div>
            <div className="mx-10 flex justify-center">
                <h1 className='px-10 text-3xl font-sans font-medium'>We understand that sign language is more than just gestures; it&apos;s a rich, 
                    expressive way to communicate that builds community and breaks down barriers. 
                    Our team, composed of passionate educators, language experts, and developers, 
                    is dedicated to creating an accessible, 
                    inclusive, and interactive space for learning sign language. Whether you are a beginner, 
                    a seasoned signer, or simply curious, we have resources, tools, and a supportive community ready to guide you every step of the way.
                </h1>
            </div>
            <div className='w-full flex justify-center my-10'>
                <video
                    controls
                    autoPlay
                    muted
                    loop
                    width="1200" // Set the width of the video
                    height="900" // Set the height of the video
                >
                    <source src="/videos/About_team.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className='w-1/2 mx-10 mb-10'>
                <h1 className='text-start text-2xl font-sans font-medium'>
                    Join us in our mission to create a world where everyone can be heard, seen, and understood. Together, 
                    we can make a difference—one sign at a time.
                </h1>
            </div>
        </div>
    );
}