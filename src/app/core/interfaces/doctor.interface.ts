import { Patient } from './patient.interface';

export interface Doctor {
  id: number;
  name: string;
  speciality: string;
  patients: Patient[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdById: number;
  updatedById: number;
}

export interface DoctorCreate {
  name: string;
  speciality: string;
}
