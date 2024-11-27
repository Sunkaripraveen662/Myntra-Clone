import HomeItem from "../components/HomeItem";
import {useSelector} from "react-redux";

const Home=()=>{
    const items=useSelector((state)=>state.items);
    if (!Array.isArray(items)) {
      return <div>Loading...</div>; // Or display a message if items are not available
    }

    return <main>
    <div className="items-container">
    {items.map((item)=> (<HomeItem key={item.id} item={item}/>))}
   </div> 
     </main>
};

export default Home;