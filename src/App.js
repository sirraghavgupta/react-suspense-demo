import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import User from './containers/User';
import Welcome from './containers/Welcome';

// here default imports are compulsory, named imports will not work. 
// when react thinks that we need the component, it executes this arrow function, 
// and them import gives us the componnet dynamically.  
const Posts = React.lazy( () => import('./containers/Posts') );

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <nav>
            <NavLink to="/user">User Page</NavLink> |&nbsp;
            <NavLink to="/posts">Posts Page</NavLink>
          </nav>

          <Route path="/" component={Welcome} exact />
          <Route path="/user" component={User} />

          {/* 
          rather than using component prop, we need to use the render method. 
          we have to return the component inside the Suspense component. 
          */}
          <Route 
            path="/posts" 
            render={
              () => (
                /**
                 * fallback is required if react postpones the rendering of the 
                 * component as it may take time to download the new code. 
                 */
                <Suspense fallback = {<div>Loading..</div>}>
                  <Posts/>
                </Suspense>
              )
           } />

        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;


/**
 * earlier we saw a method of lazy loading in which we made asyncComponent. 
 * that is ok but twith react 16.6 and above, we have a new method called
 * lazy() which allows us to asynchrnously load the components, i.e. we will 
 * load the code behind that only when the component will be rendered. 
 * 
 * the advantage here is that, we can use it with if else and other places also, 
 * and not only in routing. 
 * 
 * 
 * here, we want to load the Posts and USers componnets lazily. so we are showing 
 * that. 
 * 
 * first we need to create the const object above, then use Suspense 
 * and then give fallback if we want. 
 * 
 * NOTE - this api will not work for server side rendering. its only for 
 * client side rendering. 
 * 
 * also note that, its beneficial when the app is big. else, 
 * it may even reduce the performance rather than improving. 
 */