import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TemperatureService } from './temperature.service';

@Component({
  selector: 'app-temperature-converter',
  templateUrl: './temperature-converter.component.html',
  styleUrls: ['./temperature-converter.component.css']
})
export class TemperatureConverterComponent implements OnInit, OnDestroy {
  celsius: number = 0;
  fahrenheit: number = 32;

  private subscriptions: Subscription = new Subscription();

  constructor(private temperatureService: TemperatureService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.temperatureService.celsius$.subscribe(celsius => {
        this.celsius = celsius;
      })
    );
    this.subscriptions.add(
      this.temperatureService.fahrenheit$.subscribe(fahrenheit => {
        this.fahrenheit = fahrenheit;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onCelsiusChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const numValue = parseFloat(target.value) || 0;
    this.temperatureService.setCelsius(numValue);
  }

  onFahrenheitChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const numValue = parseFloat(target.value) || 0;
    this.temperatureService.setFahrenheit(numValue);
  }
}
