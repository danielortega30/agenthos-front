import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { DoctorService } from '../../../core/services/doctor.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PatientCreate } from '../../../core/interfaces/patient.interface';
import { PatientService } from '../../../core/services/patient.service';
import { RouteHistoryService } from '../../../core/services/route-history.service';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private patientService = inject(PatientService);
  private doctorService = inject(DoctorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private routeHistory = inject(RouteHistoryService);

  doctors$ = this.doctorService.getDoctors();

  patientForm = this.fb.group({
    name: ['', Validators.required],
    age: ['', [Validators.required, Validators.min(0)]],
    diagnostic: ['', Validators.required],
    doctorId: ['', Validators.required],
  });

  isEditing = false;
  patientId?: number;
  private returnUrl = '';

  constructor() {}

  ngOnInit(): void {
    debugger;
    const previousUrl = this.routeHistory.getPreviousUrl();
    this.returnUrl = previousUrl.includes('/doctors/')
      ? previousUrl
      : '/patients';
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.patientId) {
      this.isEditing = true;
      this.patientService.getPatient(this.patientId).subscribe((patient) => {
        this.patientForm.patchValue(patient);
      });
    }
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const formData = {
        name: this.patientForm.value.name || '',
        age: this.patientForm.value.age || '',
        diagnostic: this.patientForm.value.diagnostic || '',
        doctorId: this.patientForm.value.doctorId || '',
      };
      const operation = this.isEditing
        ? this.patientService.updatePatient(this.patientId!, formData)
        : this.patientService.createPatient({ ...formData });

      operation.subscribe({
        next: () => {
          debugger;
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => console.error('Error saving patient:', error),
      });
    }
  }

  goBack(): void {
    this.router.navigate([this.returnUrl]);
  }
}
