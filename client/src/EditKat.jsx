import {useLocation} from "react-router-dom";
import "./assets/styles/EditKat.css";


function EditKat() {
    const location = useLocation();

    return(
        <div className="EditKat">
            <div className="EditCard">
                <header>
                    <h3>`${state.Katalog}:`</h3>
                </header>
                <main>

                </main>
            </div>
        </div>
    )
    
}

export default EditKat