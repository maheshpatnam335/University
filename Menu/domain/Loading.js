import React from 'react'
import Loader from 'react-loaders'

function Loading() {
    return <div className="justify-content-center align-items-center pt-6">
        <Loader type="ball-spin-fade-loader" />
    </div>
}

export default Loading