import React from "react"
import axios from "axios"
import "../scss/components/weather/weather-result-component.scss"
import windLogo from "../static/wind.svg"

export default class Weather extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            city : null,
            temp : null,
            wind : null,
            weather :{
                main : null,
                description: null
            },
            icon: null,
            placeholder : props.placeholder
        }
    }

    fetchData = () => {
         setTimeout(() => {
            let instance = axios.create();
                delete instance.defaults.headers.common['Accept'];
                delete instance.defaults.headers.common['X-Requested-With'];
                delete instance.defaults.headers.common['X-CSRF-TOKEN'];
            instance.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.field.value}&appid=${process.env.REACT_APP_WEATHER_APP_ID}`)
                .then((res) => {
                    if(res){
                        this.setState({
                            city : res.data.name,
                            temp : res.data.main.temp - 273.15,
                            wind : res.data.wind.speed,
                            weather : {
                                main :res.data.weather[0].main,
                                description : res.data.weather[0].description,
                                icon : res.data.weather[0].icon
                            }
                        })

                        console.log(this.state)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

          }, 1000);
    }

    degres = (str) => {
        let degres = str.toString()
        if( degres < 3){
            return degres.substr(0,3)
        }
        else{
            return degres
        }
    }
      
   render() {
    return (
        <div>
            <div>
               <input ref={(ref) => this.field = ref} 
                className={"text-input-component"}
                placeholder={this.state.placeholder}
                onChange={this.fetchData}
                required 
                />
            </div>
           <div className={"weather-result-component"}>
                {this.state.city ? 
                   <div>
                        <p className={"city-title"}>{this.state.city}</p>
                        <div className={'wrapper-result'}>
                           <div className={"item-result"}>
                           <img src={"https://openweathermap.org/img/wn/" + this.state.weather.icon + "@4x.png"} alt={this.state.weather.main}/>
                            <p>{this.state.weather.main}</p>
                            <p>{this.degres(this.state.temp)}°C</p>
                           </div>
                           <div className={"item-result"}>
                            <img src={windLogo} alt="wind icon" />
                            <p>{this.state.wind} m/s</p>
                           </div>
                        </div>
                        <p>{this.state.weather.description}</p>
                   </div>
                  
                : ""
                }
                
           </div>
        </div>
    )
   }
}