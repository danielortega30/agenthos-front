import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { map, switchMap } from 'rxjs/operators';

import { AsyncPipe } from '@angular/common';
import { DoctorService } from '../../../core/services/doctor.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { PatientService } from '../../../core/services/patient.service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    AsyncPipe,
    MatSelectModule,
    MatDialogModule,
  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent {
  private patientService = inject(PatientService);
  private doctorService = inject(DoctorService);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  public NameDoctor: string = '';

  patients$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const doctorId = params.get('doctorId');
      return doctorId
        ? this.doctorService.getDoctor(+doctorId).pipe(
            map((doctor) => {
              this.NameDoctor = doctor.name;
              return doctor.patients || [];
            }),
          )
        : this.patientService.getPatients();
    }),
  );

  displayedColumns = ['name', 'age', 'diagnostic', 'actions'];

  deletePatient(id: number): void {
    if (confirm('¿Está seguro de eliminar este paciente?')) {
      this.patientService.deletePatient(id).subscribe({
        next: () => {
          this.patients$ = this.patientService.getPatients();
        },
        error: (error) => console.error('Error deleting patient:', error),
      });
    }
  }
}
