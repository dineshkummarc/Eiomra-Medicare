import {
  Activity,
  Ambulance,
  Banknote,
  BedDouble,
  CalendarCheck,
  ClipboardPlus,
  FileHeart,
  FlaskConical,
  HeartPulse,
  Pill,
  ShieldCheck,
  Stethoscope,
  UserRoundCheck,
  UsersRound
} from 'lucide-react';

export const brand = {
  name: 'Eiomra MediCare',
  primary: '#0c7ff2'
};

export const services = [
  { icon: HeartPulse, title: 'Patient Records', text: 'Centralized patient profiles, visits, allergies, vitals and clinical notes.' },
  { icon: CalendarCheck, title: 'Appointments', text: 'Schedule consultations, follow-ups, triage, doctor availability and reminders.' },
  { icon: FileHeart, title: 'Medical Records', text: 'Secure diagnosis history, prescriptions, documents and care plans.' },
  { icon: Banknote, title: 'Billing', text: 'Manage invoices, payments, balances, insurance and revenue reports.' },
  { icon: Pill, title: 'Pharmacy', text: 'Track inventory, prescriptions, stock alerts, pricing and expiry dates.' },
  { icon: FlaskConical, title: 'Lab Results', text: 'Manage sample requests, result upload, review status and patient reports.' }
];

export const metrics = [
  { title: 'Active Patients', value: '2,784', delta: '+14.8%', icon: UsersRound },
  { title: 'Doctors & Staff', value: '186', delta: '+8 this month', icon: Stethoscope },
  { title: 'Today\'s Appointments', value: '94', delta: '18 urgent', icon: CalendarCheck },
  { title: 'Available Rooms', value: '52', delta: '82% capacity', icon: BedDouble },
  { title: 'Monthly Revenue', value: '₦8.7m', delta: '+12.4%', icon: Banknote },
  { title: 'Lab Reports', value: '231', delta: '39 pending', icon: FlaskConical }
];

export const appointments = [
  { time: '08:30 AM', patient: 'Esther Flores', type: 'Follow-up', doctor: 'Dr. David Brown', status: 'Confirmed' },
  { time: '09:15 AM', patient: 'Jane Cooper', type: 'Pediatrics', doctor: 'Dr. Caroline Henry', status: 'Waiting' },
  { time: '10:00 AM', patient: 'Robert Fox', type: 'Cardiology', doctor: 'Dr. Arlene McCoy', status: 'Confirmed' },
  { time: '12:30 PM', patient: 'Guy Hawkins', type: 'Lab Review', doctor: 'Dr. Jonathan Wallace', status: 'Pending' }
];

export const patients = [
  { id: 'PAT-1001', name: 'Esther Flores', age: 38, gender: 'Female', condition: 'Back Pain', phone: '+234 805 450 0154', status: 'Active' },
  { id: 'PAT-1002', name: 'Jane Cooper', age: 24, gender: 'Female', condition: 'Fever', phone: '+234 806 320 0045', status: 'Review' },
  { id: 'PAT-1003', name: 'Robert Fox', age: 71, gender: 'Male', condition: 'Hypertension', phone: '+234 807 111 2200', status: 'Active' },
  { id: 'PAT-1004', name: 'Albert Flores', age: 42, gender: 'Male', condition: 'Diabetes', phone: '+234 808 776 5512', status: 'Stable' },
  { id: 'PAT-1005', name: 'Annette Black', age: 31, gender: 'Female', condition: 'Pregnancy Care', phone: '+234 809 230 8877', status: 'Active' }
];

export const doctors = [
  { name: 'Dr. Arlene McCoy', specialty: 'Cardiology', rating: '4.9', patients: '1,537', image: '/assets/images/doctor-card.jpg' },
  { name: 'Dr. David Brown', specialty: 'Family Medicine', rating: '4.8', patients: '2,598', image: '/assets/images/hero-doctor.jpg' },
  { name: 'Dr. Caroline Henry', specialty: 'Pediatrics', rating: '4.7', patients: '1,224', image: '/assets/images/doctors-team.jpg' }
];

export const records = [
  { date: 'Feb 12, 2026', type: 'Prescription', specialist: 'Dr. Caroline Henry', status: 'Signed' },
  { date: 'Feb 13, 2026', type: 'X-Ray Result', specialist: 'Dr. Robert Fox', status: 'Reviewed' },
  { date: 'Feb 14, 2026', type: 'Ultrasound', specialist: 'Dr. Floyd Miles', status: 'Pending' },
  { date: 'Feb 15, 2026', type: 'Lab Panel', specialist: 'Dr. Darnell Stewart', status: 'Completed' }
];

export const pharmacyItems = [
  { sku: 'MED-001', name: 'Paracetamol 500mg', category: 'Analgesic', stock: 180, reorder: 30, status: 'Available' },
  { sku: 'MED-002', name: 'Amoxicillin 250mg', category: 'Antibiotic', stock: 18, reorder: 25, status: 'Low stock' },
  { sku: 'MED-003', name: 'ORS Sachet', category: 'Rehydration', stock: 320, reorder: 50, status: 'Available' },
  { sku: 'MED-004', name: 'Insulin Pen', category: 'Diabetes', stock: 9, reorder: 15, status: 'Low stock' }
];

export const labResults = [
  { sample: 'LAB-1001', patient: 'Jane Cooper', test: 'Full Blood Count', requested: 'Dr. Caroline Henry', status: 'Completed' },
  { sample: 'LAB-1002', patient: 'Robert Fox', test: 'Lipid Profile', requested: 'Dr. Arlene McCoy', status: 'Pending' },
  { sample: 'LAB-1003', patient: 'Esther Flores', test: 'X-Ray Spine', requested: 'Dr. David Brown', status: 'Reviewed' },
  { sample: 'LAB-1004', patient: 'Annette Black', test: 'Pregnancy Scan', requested: 'Dr. Floyd Miles', status: 'Processing' }
];

export const roleCards = [
  { title: 'Super Admin', description: 'Full access to all hospital modules.', icon: ShieldCheck },
  { title: 'Doctor', description: 'Patients, records, prescriptions and lab reviews.', icon: Stethoscope },
  { title: 'Receptionist', description: 'Registration, appointments and billing desk.', icon: ClipboardPlus },
  { title: 'Emergency Team', description: 'Ambulance, triage and emergency room workflow.', icon: Ambulance },
  { title: 'Nurse', description: 'Vitals, wards, prescriptions and patient care.', icon: UserRoundCheck },
  { title: 'Pharmacist', description: 'Inventory, prescriptions and drug dispensing.', icon: Pill },
  { title: 'Lab Scientist', description: 'Samples, diagnostics and lab result publishing.', icon: FlaskConical },
  { title: 'Operations', description: 'Reports, settings, departments and compliance.', icon: Activity }
];
