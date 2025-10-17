import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ShapeType = 'rectangle' | 'triangle';

export interface CalculationHistory {
  shape: ShapeType;
  dimensions: { [key: string]: number };
  area: number;
  perimeter: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class RectangleService {
  private shapeSubject = new BehaviorSubject<ShapeType>('rectangle');
  shape$ = this.shapeSubject.asObservable();

  private dimensionsSubject = new BehaviorSubject<{ [key: string]: number }>({});
  dimensions$ = this.dimensionsSubject.asObservable();

  private areaSubject = new BehaviorSubject<number>(0);
  private perimeterSubject = new BehaviorSubject<number>(0);

  area$ = this.areaSubject.asObservable();
  perimeter$ = this.perimeterSubject.asObservable();

  private historySubject = new BehaviorSubject<CalculationHistory[]>([]);
  history$ = this.historySubject.asObservable();

  constructor() {
    this.shape$.subscribe(shape => {
      this.dimensions$.subscribe(dimensions => {
        const { area, perimeter } = this.calculate(shape, dimensions);
        this.areaSubject.next(area);
        this.perimeterSubject.next(perimeter);
        if (this.isValidDimensions(shape, dimensions)) {
          this.addToHistory(shape, dimensions, area, perimeter);
        }
      });
    });
  }

  setShape(shape: ShapeType) {
    this.shapeSubject.next(shape);
  }

  setDimensions(dimensions: { [key: string]: number }) {
    this.dimensionsSubject.next(dimensions);
  }

  private calculate(shape: ShapeType, dimensions: { [key: string]: number }): { area: number; perimeter: number } {
    if (shape === 'rectangle') {
      const length = dimensions['length'] || 0;
      const width = dimensions['width'] || 0;
      return {
        area: length * width,
        perimeter: 2 * (length + width)
      };
    } else if (shape === 'triangle') {
      const base = dimensions['base'] || 0;
      const height = dimensions['height'] || 0;
      const side1 = dimensions['side1'] || 0;
      const side2 = dimensions['side2'] || 0;
      const side3 = dimensions['side3'] || 0;
      return {
        area: (base * height) / 2,
        perimeter: side1 + side2 + side3
      };
    }
    return { area: 0, perimeter: 0 };
  }

  private isValidDimensions(shape: ShapeType, dimensions: { [key: string]: number }): boolean {
    if (shape === 'rectangle') {
      return (dimensions['length'] || 0) > 0 && (dimensions['width'] || 0) > 0;
    } else if (shape === 'triangle') {
      return (dimensions['base'] || 0) > 0 && (dimensions['height'] || 0) > 0 &&
             (dimensions['side1'] || 0) > 0 && (dimensions['side2'] || 0) > 0 && (dimensions['side3'] || 0) > 0;
    }
    return false;
  }

  private addToHistory(shape: ShapeType, dimensions: { [key: string]: number }, area: number, perimeter: number) {
    const currentHistory = this.historySubject.value;
    const newEntry: CalculationHistory = {
      shape,
      dimensions: { ...dimensions },
      area,
      perimeter,
      timestamp: new Date()
    };
    // Check if the new entry is different from the most recent one
    const isDuplicate = currentHistory.length > 0 &&
      JSON.stringify(currentHistory[0].dimensions) === JSON.stringify(newEntry.dimensions) &&
      currentHistory[0].shape === newEntry.shape;
    if (!isDuplicate) {
      const updatedHistory = [newEntry, ...currentHistory].slice(0, 4); // Keep last 4
      this.historySubject.next(updatedHistory);
    }
  }
}
