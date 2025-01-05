
import ProfileList from "@/components/EditProfile";

export default function test() {
  const profiles = [
    {id: 1, name: "John"},
    {id: 2, name: "Yunboyloy"},
    {id: 3, name: "Jaeyun"},
    {id: 4, name: "Thomas"},
    {id: 5, name: "Eric"},
    {id: 6, name: "Hearcr"},
    {id: 7, name: "Rounjojo"},
    {id: 8, name: "gojo"},
    {id: 9, name: "Jin"},
    {id: 10, name: "Hearcr"},
    {id: 11, name: "Rounjojo"},
    {id: 12, name: "Snap"},
    {id: 13, name: "Jake"},
    {id: 14, name: "Jaken"},
    {id: 15, name: "Glass"},
    
  ]
  return (
    <>
      <ProfileList profiles={profiles}/>
    </>
  )
}