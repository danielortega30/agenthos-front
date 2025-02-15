import { Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { DoctorService } from '../../../core/services/doctor.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    AsyncPipe,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
})
export class DoctorListComponent {
  private doctorService = inject(DoctorService);
  doctors$ = this.doctorService.getDoctors();
  displayedColumns = ['name', 'speciality', 'actions'];

  deleteDoctor(id: number): void {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorService.deleteDoctor(id).subscribe({
        next: () => {
          this.doctors$ = this.doctorService.getDoctors();
        },
        error: (error) => console.error('Error deleting doctor:', error),
      });
    }
  }
}
