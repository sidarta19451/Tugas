import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  private celsiusSubject = new BehaviorSubject<number>(0);
  private fahrenheitSubject = new BehaviorSubject<number>(32);

  celsius$ = this.celsiusSubject.asObservable();
  fahrenheit$ = this.fahrenheitSubject.asObservable();

  // Computed observables for conversions
  celsiusToFahrenheit$ = this.celsius$.pipe(
    map(celsius => (celsius * 9/5) + 32)
  );

  fahrenheitToCelsius$ = this.fahrenheit$.pipe(
    map(fahrenheit => (fahrenheit - 32) * 5/9)
  );

  // Combined observable for current values
  temperatureState$ = combineLatest([this.celsius$, this.fahrenheit$]).pipe(
    map(([celsius, fahrenheit]) => ({ celsius, fahrenheit }))
  );

  setCelsius(value: number) {
    this.celsiusSubject.next(value);
    // Update fahrenheit based on celsius
    const fahrenheit = (value * 9/5) + 32;
    this.fahrenheitSubject.next(fahrenheit);
  }

  setFahrenheit(value: number) {
    this.fahrenheitSubject.next(value);
    // Update celsius based on fahrenheit
    const celsius = (value - 32) * 5/9;
    this.celsiusSubject.next(celsius);
  }
}
