import React from "react";

class Backarrow extends React.Component {
    constructor(props) {
        super(props);
    
      }
    render (){
        return (<div className="back" onClick={this.props.handleBackNavigate}>back</div>)
    }
}

export default Backarrow;