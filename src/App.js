import React, { Component, Suspense } from 'react';
import User from './containers/User';

// here default imports are compulsory, named imports will not work. 
// when react thinks that we need the component, it executes this arrow function, 
// and them import gives us the component dynamically.  
const Posts = React.lazy( () => import('./containers/Posts') );

class App extends Component { 

  state = {
    showPosts : false
  }

  toggleHandler = () => {
    this.setState( (prevState) => {
      return { showPosts : !prevState.showPosts}
    } );
  }

  render() {
    // here we show how to use Lazy loading in conditional rendering. 
    return (
      <React.Fragment>
        <button onClick = {this.toggleHandler } >Toggle content</button>
        {
          this.state.showPosts ? 
            (
              <Suspense fallback = {<div>Loading...</div>}>
                <Posts/>
              </Suspense>
            ) :
              <User/>
        }
      </React.Fragment>
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