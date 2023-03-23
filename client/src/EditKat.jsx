import {useLocation} from "react-router-dom";
import "./assets/styles/EditKat.css";


function EditKat() {
    const location = useLocation();
    const {Katalog, KatalogID} = location.state;

    return(
        <div className="EditKat">
            <div className="EditCard">
                <header>
                    <h3>{Katalog}:</h3>
                    <div className="ActionIcons">
                        <button className="AddButton"></button>
                        <button className="DeleteButton"></button>
                    </div>
                </header>
                <main>

                </main>
            </div>
        </div>
    )
    
}

export default EditKat