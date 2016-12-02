import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserDetail extends Component {

    render() {
        console.log("user-detail", this.props.user);
        if (!this.props.user) {
            return (<div>Select a user...</div>);
        }

        return (
            <div>
                <img src={this.props.user.thumbnail}/>
                <h2>{this.props.user.first}</h2>
                <h3>Age:{this.props.user.age}</h3>
                <h3>Description:{this.props.user.description}</h3>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("mapStateToProps", state);
    return {
        user: state.activeUser
    };
}

export default connect(mapStateToProps)(UserDetail);
