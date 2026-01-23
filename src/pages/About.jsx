import { useEffect } from "react";
import TopBar from "../components/TopBar"
import Navbar from "../components/Navbar"


const About = () => {
useEffect(() => {
document.title = "Flyit – About";
}, []);


return (
<>
 
    <TopBar />
    <Navbar />

<div className="text-center py-20">About Flyit Airlines ✈️</div>
</>
)
};


export default About;