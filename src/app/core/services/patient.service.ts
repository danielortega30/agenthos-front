import { Patient, PatientCreate } from '../interfaces/patient.interface';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private readonly API_URL = `${environment.apiUrl}/patients`;

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.API_URL);
  }

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.API_URL}/${id}`);
  }

  createPatient(patient: PatientCreate): Observable<Patient> {
    return this.http.post<Patient>(this.API_URL, patient);
  }

  updatePatient(id: number, patient: Partial<Patient>): Observable<Patient> {
    return this.http.patch<Patient>(`${this.API_URL}/${id}`, patient);
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  assignDoctor(patientId: number, doctorId: number): Observable<Patient> {
    return this.http.put<Patient>(
      `${this.API_URL}/${patientId}/doctor/${doctorId}`,
      {},
    );
  }
}
