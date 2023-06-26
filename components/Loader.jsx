
import React from 'react'
import { Vortex } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center'>
            <Vortex
                visible={true}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={["#86198f",
                    "#6b21a8",
                    "#6d28d9",
                    "#172554",
                    "#2563eb",
                    "#65a30d",]}
            />
        </div>
    )
}

export default Loader;