import React from 'react';
import Icons from '../Icons';
import { IoClose } from 'react-icons/io5';

const PopupWrapper = (props) => {
    return <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center ">
        <div
            className="w-full h-full absolute glass-effect2"
            onClick={props.onHide}
        />
        <div
            className={`flex flex-col w-[500px] max-h-[80%] border-4 border-greyish-300 bg-greyish-600 relative z-10 rounded-3xl ${props.shortHeight ? "" : "min-h-[600px]"
                }`}
        >
            {!props.noHeader && (
                <div className="shrink-0 p-6 flex items-center justify-between border-b-4 border-greyish-300">
                    <h4 className="text-Gray-50 font-medium">
                        {props.title || ""}
                    </h4>
                    <Icons
                        size="small"
                        icon={<IoClose size={22} color='#fff' />}
                        onClick={props.onHide}
                    />
                </div>
            )}
            <div className="grow flex flex-col ">
                {props.children}
            </div>
        </div>
    </div>
};

export default PopupWrapper;
