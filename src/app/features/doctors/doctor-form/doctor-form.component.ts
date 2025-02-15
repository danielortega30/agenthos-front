import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { DoctorService } from '../../../core/services/doctor.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ToastService } from '../../../core/services/toast.service';

interface DoctorFormData {
  name: string;
  speciality: string;
}

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss'],
})
export class DoctorFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private doctorService = inject(DoctorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);

  doctorForm = this.fb.group({
    name: ['', Validators.required],
    speciality: ['', Validators.required],
  });

  isEditing = false;
  doctorId?: number;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.doctorId = +id;
      this.loadDoctor(this.doctorId);
    }
  }

  loadDoctor(id: number) {
    this.doctorService.getDoctor(id).subscribe({
      next: (doctor) => {
        this.doctorForm.patchValue({
          name: doctor.name,
          speciality: doctor.speciality,
        });
      },
      error: () => {
        this.toastService.error('Error loading doctor');
        this.router.navigate(['/doctors']);
      },
    });
  }

  onSubmit() {
    if (this.doctorForm.valid) {
      const formData: DoctorFormData = {
        name: this.doctorForm.value.name || '',
        speciality: this.doctorForm.value.speciality || '',
      };

      const request = this.isEditing
        ? this.doctorService.updateDoctor(this.doctorId!, formData)
        : this.doctorService.createDoctor(formData);

      request.subscribe({
        next: () => {
          this.toastService.success(
            this.isEditing
              ? 'Doctor updated successfully'
              : 'Doctor created successfully',
          );
          this.router.navigate(['/doctors']);
        },
        error: () => {
          this.toastService.error(
            this.isEditing ? 'Error updating doctor' : 'Error creating doctor',
          );
        },
      });
    }
  }
}
