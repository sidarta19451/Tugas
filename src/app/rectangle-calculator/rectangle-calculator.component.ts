import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RectangleService, CalculationHistory, ShapeType } from '../rectangle.service';

@Component({
  selector: 'app-rectangle-calculator',
  templateUrl: './rectangle-calculator.component.html',
  styleUrls: ['./rectangle-calculator.component.css']
})
export class RectangleCalculatorComponent implements OnInit, OnDestroy {
  selectedShape: ShapeType = 'rectangle';
  dimensions: { [key: string]: number } = {};
  area: number = 0;
  perimeter: number = 0;
  history: CalculationHistory[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(private rectangleService: RectangleService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.rectangleService.area$.subscribe(area => this.area = area)
    );
    this.subscriptions.add(
      this.rectangleService.perimeter$.subscribe(perimeter => this.perimeter = perimeter)
    );
    this.subscriptions.add(
      this.rectangleService.history$.subscribe(history => this.history = history)
    );
    this.subscriptions.add(
      this.rectangleService.shape$.subscribe(shape => this.selectedShape = shape)
    );
    this.subscriptions.add(
      this.rectangleService.dimensions$.subscribe(dimensions => this.dimensions = { ...dimensions })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  errorMessage: string = '';

  onShapeChange(shape: ShapeType) {
    this.selectedShape = shape;
    this.rectangleService.setShape(shape);
    this.dimensions = {};
    this.rectangleService.setDimensions({});
    this.errorMessage = '';
  }

  onDimensionChange(key: string, value: string) {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      this.errorMessage = `${this.getLabel(key)} harus berupa angka positif lebih dari 0.`;
      this.dimensions[key] = 0;
    } else {
      this.errorMessage = '';
      this.dimensions[key] = numValue;
    }
    this.rectangleService.setDimensions(this.dimensions);
  }

  getLabel(key: string): string {
    const labels: { [key: string]: string } = {
      length: 'Panjang',
      width: 'Lebar',
      base: 'Alas',
      height: 'Tinggi',
      side1: 'Sisi 1',
      side2: 'Sisi 2',
      side3: 'Sisi 3'
    };
    return labels[key] || key;
  }

  getDimensionKeys(): string[] {
    if (this.selectedShape === 'rectangle') {
      return ['length', 'width'];
    } else if (this.selectedShape === 'triangle') {
      return ['base', 'height', 'side1', 'side2', 'side3'];
    }
    return [];
  }
}
