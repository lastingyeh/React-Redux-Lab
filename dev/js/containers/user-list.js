import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser} from '../actions';

class UserList extends Component {

    createListItems() {

        return this.props.usersProp.map((user) => {
            return (
                <li
                    key={user.id}
                    onClick={() => this.props.selectUserClick(user)}
                >
                    {user.first} {user.last}
                </li>
            );
        });
    }

    render() {
        return (
            <ul>
                {this.createListItems()}
            </ul>
        );
    }
}

//state.users from './reducers/index.js'
//combineReducers({users: UserReducer,})
//convert to props users
function mapStateToProps(state) {
    return {
        usersProp: state.users
    };
}

//連接 '../action' selectUser方法 ＝＝ selectUserClick 屬性
function matchDispatchToProps(dispatch) {
    return bindActionCreators({selectUserClick: selectUser}, dispatch);
}

export default connect(
    mapStateToProps,
    matchDispatchToProps)(UserList);