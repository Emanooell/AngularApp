import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface HealthRecord {
  id?: number;
  exercise: string;
  duration: number;
  food: string;
  hydration: number;
  sleep: number;
}

@Component({
  selector: 'app-health-page',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/healthRecords';
  healthForm: FormGroup;
  healthRecords: HealthRecord[] = [];
  errorMessages: { [key: string]: string | null } = {
    exercise: null,
    duration: null,
    food: null,
    hydration: null,
    sleep: null,
  };

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.healthForm = this.formBuilder.group({
      exercise: [''],
      duration: [''],
      food: [''],
      hydration: [''],
      sleep: [''],
    });

    this.monitorFormChanges();
  }

  ngOnInit() {
    this.fetchHealthRecords();
  }

  monitorFormChanges() {
    Object.keys(this.healthForm.controls).forEach((key) => {
      this.healthForm.get(key)?.valueChanges.subscribe(() => {
        this.errorMessages[key] = null;
      });
    });
  }

  fetchHealthRecords() {
    this.http.get<HealthRecord[]>(this.apiUrl).subscribe((records) => {
      this.healthRecords = records;
    });
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    if (this.healthForm.valid) {
      const newHealthRecord: HealthRecord = this.healthForm.value;

      this.http.post<HealthRecord>(this.apiUrl, newHealthRecord).subscribe({
        next: (record) => {
          this.healthRecords.push(record);
          this.healthForm.reset();
          this.clearAllErrors();
        },
        error: (error) => {
          console.error('Erro ao adicionar registro de saúde', error);
        },
      });
    }
  }

  validateForm() {
    let isValid = true;
    Object.keys(this.healthForm.controls).forEach((key) => {
      const control = this.healthForm.get(key);
      if (control && !control.value) {
        this.errorMessages[key] = 'Este campo é obrigatório';
        isValid = false;
      }
    });

    return isValid;
  }

  clearAllErrors() {
    Object.keys(this.errorMessages).forEach((key) => {
      this.errorMessages[key] = null;
    });
  }

  deleteHealthRecord(id: number | undefined, index: number) {
    if (id !== undefined) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          this.healthRecords.splice(index, 1);
          console.log(`Registro de saúde com o id ${id} removido`);
        },
        error: (error) => {
          console.error('Erro ao remover o registro de saúde', error);
        },
      });
    }
  }
}
