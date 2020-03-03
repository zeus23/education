import React from 'react';

import loaderGif from './assets/loader.gif';

class Loader extends React.Component{
    render() {
        return(
            <div>
                <img src={loaderGif} alt="loader_gif" />
            </div>
        )
    }
}
export default Loader;