import React, {useEffect, useState} from 'react';
import './Button.scss';
import {Link} from "react-router-dom";

interface BlueButtonProps{
    link?: number | string;
    name: string;
    onClick?: (email: string, password: string) => void;
    isActive?: boolean;
    style?: React.CSSProperties;
}

const Button: React.FC<BlueButtonProps> = ({link,
                                                   name,
                                                   onClick,
                                                   style,
                                               isActive}) => {
    let [linkValue, setLinkValue] = useState<number | string | undefined>(link);
    let [nameValue, setNameValue] = useState<string>(name);
    let [active, setIsActive] = useState<boolean | undefined>(false);
    useEffect(()=>{
        setLinkValue(link);
        setNameValue(name);
        setIsActive(isActive);
    }, [link, name, isActive, onClick])

    return (
        <>
            {link && onClick ? (
                <Link
                    to={'/item/' + link}
                    style={style}
                    className={`standard-btn`}
                >
                    {name}
                </Link>
            ) : (
                !link && !onClick ?
                <a
                    style={style}
                    className={`standard-btn`}
                >
                    {name}
                </a>

                    :
                    onClick ?
                    <button
                        style={style}
                        className={`standard-btn ${active ? 'standard-btn-active' : ''}`}
                        onClick={(e)=>{
                            e.preventDefault();
                        }}
                    >
                        {name}
                    </button> : <></>

            )}

        </>
    );
};

export default Button;