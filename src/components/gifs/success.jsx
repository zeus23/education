import React from 'react';

import successGif from './assets/success.gif';

class Success extends React.Component{
    render() {
        return(
            <div>
                <img src={successGif} alt="success_gif" />
            </div>
        )
    }
}
export default Success;