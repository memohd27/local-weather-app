import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { ICurrentWeather } from '../interfaces'

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    const uriParams = new HttpParams().set('q', 'London').set('appId', environment.appId)

    return this.httpClient
      .get<ICurrentWeatherData>('http://api.openweathermap.org/data/2.5/weather', {
        params: uriParams,
      })
      .pipe(map((data) => this.transformToICurrentWeather(data)))
  }

  private transformToICurrentWeather(data: ICurrentWeatherData) {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: 'assets/img/sol.jpeg',
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: 'Memo',
    }
  }

  private convertKelvinToFahrenheit(kelvin: number) {
    return (kelvin * 9) / 5 - 459.67
  }
}

interface ICurrentWeatherData {
  weather: [
    {
      description: String
      icon: string
    }
  ]
  main: {
    temp: number
  }
  sys: {
    country: string
  }
  dt: number
  name: String
}
