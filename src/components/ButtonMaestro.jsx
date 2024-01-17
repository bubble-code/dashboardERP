import { Button, Popover } from "antd"
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom'
import PropTypes from "prop-types";

export const ButtonMaestro = ({ text, isCompleted, fecha, check }) => {
    const navigate = useNavigate();
    const handleButtonClick = (path) => {
        navigate(path);
    };
    return (
        <Popover content={fecha}>
            <Button
                type="primary"
                ghost={!isCompleted}
                className="mr-2 mb-2"
                onClick={() => handleButtonClick(`/maestros/${text}`)}
                color={isCompleted ? 'green' : 'blue'}
                icon={check ? <CheckCircleTwoTone twoToneColor={"#52c42a"} /> : null}
            >
                {text}
            </Button>
        </Popover>
    )
}

ButtonMaestro.propTypes = {
    text: PropTypes.string,
    isCompleted: PropTypes.bool,
    fecha: PropTypes.string,
    check: PropTypes.bool
};