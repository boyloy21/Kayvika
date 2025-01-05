import HandLandmarks from "@/components/Hand_landMark";

export default function VideoCall({ params }) {
  const {id} = params;
  return (
    <>
      <HandLandmarks id={id}/>
    </>
  );
}