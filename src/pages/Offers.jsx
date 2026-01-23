import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar"
import Navbar from "../components/Navbar"


const Offers = () => {
const navigate = useNavigate();


return (
<>

<TopBar />
<Navbar />

<div className="text-center py-20">
<h2 className="text-3xl font-bold mb-4">Exclusive Offers 🔥</h2>
<button
onClick={() => navigate("/")}
className="bg-sky-500 px-6 py-3 rounded-full"
>
Back to Home
</button>
</div>
 </>
);
};


export default Offers;