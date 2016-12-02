Redux 流程練習 可詳見 ./dev/map.txt
資料來源：https://github.com/buckyroberts/React-Redux-Boilerplate

s1. modify: './index.js'
    (1)import createStore from 'redux'
    (2)const store = createStore()

s2. create: './reducers/reducer-users.js'

s3. edit: './reducers/reducer-users.js'

s4. create: './reducers/index.js'

s5. edit: './reducers/index.js'
    (1)
    
        import {combineReducers} from 'redux';
        import UserReducer from './reducer-users';

        const allReducers = combineReducers({
           user: UserReducer,
        })
        export default allReducers

s6. edit: './index.js'
    (1)
    
        import allReducers from './reducers';
        const store = createStore(allReducers);

s7. create: './components/app.js'
    (1)
    
        const App = ()=>(
            <div>
                .....
            </div>
        )
    (2)
    
        require('../../scss/style.scss')
    (3)
    
        require unresolved issues
    
    menu > preferences > Languages and Frameworks > Node.js and NPM > Enabled
                                                  > Javascript > Libraries > Node.js core checked

s8. edit: './index.js'
    create Provider && components
    (1)
    
        import {Provider} from 'react-redux';
    (2)
    
        import App from '../components/app'
    (3)
    
        const store = createStore(allReducers);
    (4)
    
        <Provider store={store}>
            <App/>
        </Provider>

s9. create: './containers/user-list.js'
    edit:
    (1)
    
          import React, {Component} from 'react';
          import {bindActionCreators} from 'redux';
          import {connect} from 'react-redux';        
    (2)
    
          class UserList extends Component {
             render() {
                 return (
                     <ul>
                         <li>one</li>
                         <li>two</li>
                         <li>three</li>
                     </ul>
                 );
             }
          }

          export default UserList;
s10. edit './components/app'
     (1)
     
          import UserList from '../containers/user-list'    
     (2)
     
          const App = () => (
              <div>
                  <h2>Username List:</h2>
                  <UserList/>
                  <hr/>
                  <h2>User detail:</h2>
              </div>
          )
s11. edit './containers/user-list.js'
     將 'reducers/index.js' state.users 利用 mapStateToProp 轉換 usersProp,提供containers使用
     (1)
     
          function mapStateToProps(state) {
              return {
                  usersProp: state.users
              };
          }         
     (2)利用 connect串接 mapStateToProps && containers
     
          export default connect(mapStateToProps)(UserList)
     (3)取得 this.props.usersProp 運用在 containers
            
          createListItems() {

              console.log(this.props.usersProp);

              return this.props.usersProp.map((user) => {
                  return (<li key={user.id}>{user.first} {user.last}</li>);
              });
          }
          render() {
              return (
                  <ul>
                      {this.createListItems()}
                  </ul>
              );
          }
s12. create './actions/index.js'
     建立 委派方法提供 containers 使用  (type: eventName; payload: extras-params)

           export const selectUser = (user) => {
               console.log("You clicked on User: " + user.first);
               return {
                   type: 'USER_SELECTED',
                   payload: user
               }
           }
s13. edit './components/app.js'
     (1)
     
           import {selectUser} from '../actions/index'       
     (2)建立 matchDispatchToProps() 將 '../actions' selectUser 傳給 selectUserClick 屬性
     
           function matchDispatchToProps(dispatch){
               return bindActionCreators({selectUserClick: selectUser}, dispatch);
           }
     (3)
     
           export default connect(
              mapStateToProps,
              matchDispatchToProps)(UserList);                
     (4)利用 onClick > this.props.selectUserClick(user) > './actions' selectUser 函數 && 帶入 user 物件參數
         
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
s14. create '../reducers/reducer-active-user'
     (1) 進行 '../actions/index.js' 方法分類
     (2) 
     
             export default function (state = null, action) {
             switch (action.type) {
                 case "USER_SELECTED":
                     return action.payload;
                     break;
             }

                 return state;
             }           
     (對照 '../actions/index.js')
     
             export const selectUser = (user) => {
                 console.log("You clicked on User: " + user.first);
                 return {
                     type: 'USER_SELECTED',
                     payload: user
                 }
             };           
s15. edit '../reducers/index.js'

            import ActiveUserReducer from './reducer-active-user';   
            const allReducers = combineReducers({
                   users: UserReducer,
                   activeUser: ActiveUserReducer
            })
s16. create '..components/reducer-active-user.js'

            import React, {Component} from 'react';
            import {connect} from 'react-redux';

            class UserDetail extends Component {

                render() {
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
                return {
                    user: state.activeUser
                };
            }

            export default connect(mapStateToProps)(UserDetail);
s17. edit '../components/app.js'

     import UserDetail from '../containers/user-detail';
     const App = () => (
            <div>
                <h2>Username List:</h2>
                <UserList/>
                <hr/>
                <h2>User detail:</h2>
                <UserDetail/>
            </div>
        )
