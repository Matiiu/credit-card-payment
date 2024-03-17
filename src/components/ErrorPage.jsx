import { Link } from "react-router-dom"

import '../assets/styles/Errorpage.css';
export default function ErrorPage() {

    return (
        <div className='error-page'>
            <h1>Error 404</h1>
            <p>
                An error has occurred, you may want to 
                <Link to="/" className="return-link"> return to the store.</Link>
            </p>
        </div>
    )
}