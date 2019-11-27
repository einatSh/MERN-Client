import React from "react";

class Home extends React.Component {
    render() {
        return (
            <div style={{width: this.props.screenDimentions.screenWidth, height: this.props.screenDimentions.screenHeight-120}} >
                <h1>This is the main page</h1>
            </div>
        );
    }
}

export default Home;