import { Doctor } from './doctor.interface';

export interface Patient {
  id: number;
  name: string | null;
  age: string | null;
  diagnostic: string | null;
  doctorId: string | null;
  doctor?: Doctor;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdById: number;
  updatedById: number;
}

export interface PatientCreate {
  name: string;
  age: string;
  diagnostic: string;
  doctorId: string;
}
