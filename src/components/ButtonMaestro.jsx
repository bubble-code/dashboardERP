import { Button } from "antd"
import {useNavigate} from 'react-router-dom'
import PropTypes from "prop-types";

export const ButtonMaestro = ({ text }) => {
    const navigate = useNavigate();
    const handleButtonClick = (path) => {
        navigate(path);
      };
    return (        
            <Button type="primary" ghost className="mr-2 mb-2" onClick={()=>handleButtonClick(`/maestros/${text}`)}>
                {text}
            </Button>
    )
}

ButtonMaestro.propTypes = {
    text: PropTypes.string,
};