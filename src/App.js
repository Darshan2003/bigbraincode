import React,{Component}  from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation.js';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import 'tachyons';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Sigin/Signin';
import Register from './Components/Register/Register'

const particlesParams={
  particles:{
    number:{
      value:60,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}
const initialState={
  input:'',
  imgUrl:'',
  boxImg:{},
  route: 'signin',
  isSignedIn: false,
  user:{
    id: '',
    name:'',
    email:'',
    entries:0,
    joined:''
    
  }
}
class App extends Component{
  constructor()
  {
    super();
    this.state=initialState;
    
  }

  calulateBoxLocation=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputImage');
    const width = Number(img.width);
    const height = Number(img.height);
    return {
      left: clarifaiFace.left_col * width,
      top: clarifaiFace.top_row * height,
      right: width -(clarifaiFace.right_col * width),
      bottom: height -(clarifaiFace.bottom_row * height)
    }

  }

  onRouteChange=(route)=>{
    if(route==='signout')
    {
      this.setState(initialState)

    }
    else if(route==='home')
    {
      this.setState({isSignedIn: true})
    }
    
    this.setState({route:route});
  }
  drawBox=(box)=>{
    this.setState({boxImg: box});
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value})
  }
  onPictureSubmit=()=>{
    this.setState({imgUrl:this.state.input})
    fetch(' https://whispering-dawn-52923.herokuapp.com/imageUrl',{
          method:'post',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
              input: this.state.input
          })
        })
    .then(response=>{
      if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
      }
      return response.json()})
    .then(response=>{
      if (response) {
        fetch(' https://whispering-dawn-52923.herokuapp.com/image',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })
        })
        .then(response=>response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}))
       
        })
        .catch(console.log)
        this.drawBox(this.calulateBoxLocation(response))
      }
    })
    .catch(err=>console.log(err));
  }


  loadUser=(data)=>{
    this.setState({user:{
      id: data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }
  render()
  {
    return(
      <div className='App'>
        <Particles className='Particles' params={particlesParams}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} currentRoute={this.state.route}/>
        {this.state.route==='home'
        ?<>
        <Logo/>
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
       
       <ImageLinkForm 
       onInputChange={this.onInputChange}
       onButtonClick={this.onPictureSubmit}
       />
      
      <FaceRecognition boxLocation={this.state.boxImg} imgUrl={this.state.imgUrl}/>
       </>: 
        (
          this.state.route==='register'?
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :<Signin  loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )

       
        }
      </div>
    );
  }
}
export default App;
