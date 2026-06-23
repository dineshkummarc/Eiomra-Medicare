<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Department;
use App\Models\Doctor;
use App\Models\Invoice;
use App\Models\LabResult;
use App\Models\MedicalRecord;
use App\Models\Medication;
use App\Models\Patient;
use App\Models\Prescription;
use App\Models\StaffRole;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $departments = collect([
            ['name' => 'Cardiology', 'description' => 'Heart care, ECG, hypertension and cardiac reviews.', 'floor' => 'First Floor'],
            ['name' => 'General Medicine', 'description' => 'Primary consultations and follow-up care.', 'floor' => 'Ground Floor'],
            ['name' => 'Pediatrics', 'description' => 'Child healthcare, immunization and growth tracking.', 'floor' => 'Second Floor'],
            ['name' => 'Laboratory', 'description' => 'Diagnostics, blood work and sample processing.', 'floor' => 'Ground Floor'],
        ])->map(fn ($department) => Department::create($department));

        $doctors = collect([
            ['department_id' => $departments[0]->id, 'staff_code' => 'DR-1001', 'name' => 'Dr. Arlene McCoy', 'email' => 'arlene@eiomramedicare.test', 'phone' => '+234 801 112 3344', 'specialty' => 'Cardiologist', 'qualification' => 'MBBS, FWACP', 'consultation_fee' => 15000],
            ['department_id' => $departments[1]->id, 'staff_code' => 'DR-1002', 'name' => 'Dr. David Brown', 'email' => 'david@eiomramedicare.test', 'phone' => '+234 802 222 3344', 'specialty' => 'Family Physician', 'qualification' => 'MBBS', 'consultation_fee' => 9000],
            ['department_id' => $departments[2]->id, 'staff_code' => 'DR-1003', 'name' => 'Dr. Caroline Henry', 'email' => 'caroline@eiomramedicare.test', 'phone' => '+234 803 333 3344', 'specialty' => 'Pediatrician', 'qualification' => 'MBBS, FMCPaed', 'consultation_fee' => 12000],
        ])->map(fn ($doctor) => Doctor::create($doctor));

        $patients = collect([
            ['patient_code' => 'PAT-260623-1001', 'first_name' => 'Esther', 'last_name' => 'Flores', 'email' => 'esther@example.test', 'phone' => '+234 805 450 0154', 'gender' => 'Female', 'date_of_birth' => '1986-12-12', 'blood_group' => 'O+', 'address' => 'Ikeja, Lagos', 'emergency_contact' => '+234 808 111 7788'],
            ['patient_code' => 'PAT-260623-1002', 'first_name' => 'Jane', 'last_name' => 'Cooper', 'email' => 'jane@example.test', 'phone' => '+234 806 320 0045', 'gender' => 'Female', 'date_of_birth' => '1998-06-20', 'blood_group' => 'A+', 'address' => 'Yaba, Lagos', 'emergency_contact' => '+234 809 111 7788'],
            ['patient_code' => 'PAT-260623-1003', 'first_name' => 'Robert', 'last_name' => 'Fox', 'email' => 'robert@example.test', 'phone' => '+234 807 111 2200', 'gender' => 'Male', 'date_of_birth' => '1971-01-11', 'blood_group' => 'B-', 'address' => 'Lekki, Lagos', 'emergency_contact' => '+234 810 111 7788'],
        ])->map(fn ($patient) => Patient::create($patient));

        Appointment::create(['patient_id' => $patients[0]->id, 'doctor_id' => $doctors[1]->id, 'appointment_no' => 'APT-260623-1001', 'scheduled_at' => now()->addHours(4), 'reason' => 'Back pain review', 'type' => 'Follow-up', 'status' => 'confirmed']);
        Appointment::create(['patient_id' => $patients[1]->id, 'doctor_id' => $doctors[2]->id, 'appointment_no' => 'APT-260623-1002', 'scheduled_at' => now()->addDay(), 'reason' => 'Fever and cough', 'type' => 'Consultation', 'status' => 'scheduled']);
        Appointment::create(['patient_id' => $patients[2]->id, 'doctor_id' => $doctors[0]->id, 'appointment_no' => 'APT-260623-1003', 'scheduled_at' => now()->addDays(2), 'reason' => 'Blood pressure check', 'type' => 'Routine check', 'status' => 'confirmed']);

        MedicalRecord::create(['patient_id' => $patients[0]->id, 'doctor_id' => $doctors[1]->id, 'visit_date' => now()->subDays(12), 'diagnosis' => 'Lumbar strain', 'symptoms' => 'Back pain and stiffness', 'treatment_plan' => 'Physiotherapy, pain management and follow-up review.', 'vitals' => ['bp' => '118/78', 'pulse' => '76', 'temp' => '36.8'], 'allergies' => 'None known']);
        Prescription::create(['patient_id' => $patients[0]->id, 'doctor_id' => $doctors[1]->id, 'prescription_no' => 'RX-260623-1001', 'issued_at' => now(), 'medicines' => [['name' => 'Paracetamol', 'dose' => '500mg', 'frequency' => 'Twice daily'], ['name' => 'Ibuprofen gel', 'dose' => 'Topical', 'frequency' => 'Night only']], 'instructions' => 'Use after meals and return if symptoms persist.']);
        LabResult::create(['patient_id' => $patients[1]->id, 'doctor_id' => $doctors[2]->id, 'test_name' => 'Full Blood Count', 'sample_no' => 'LAB-260623-1001', 'result_summary' => 'Mild infection markers. Physician review required.', 'result_data' => ['WBC' => '12.2', 'RBC' => '4.7'], 'status' => 'completed', 'reported_at' => now()->subHours(2)]);
        Invoice::create(['patient_id' => $patients[0]->id, 'invoice_no' => 'INV-260623-1001', 'subtotal' => 24500, 'discount' => 0, 'tax' => 0, 'total' => 24500, 'paid_amount' => 14500, 'balance' => 10000, 'payment_status' => 'partial', 'due_date' => now()->addDays(7)]);

        collect([
            ['sku' => 'MED-001', 'name' => 'Paracetamol 500mg', 'category' => 'Analgesic', 'unit' => 'box', 'stock_quantity' => 180, 'reorder_level' => 30, 'selling_price' => 650, 'expiry_date' => now()->addYear()],
            ['sku' => 'MED-002', 'name' => 'Amoxicillin 250mg', 'category' => 'Antibiotic', 'unit' => 'pack', 'stock_quantity' => 18, 'reorder_level' => 25, 'selling_price' => 2200, 'expiry_date' => now()->addMonths(10)],
            ['sku' => 'MED-003', 'name' => 'ORS Sachet', 'category' => 'Rehydration', 'unit' => 'sachet', 'stock_quantity' => 320, 'reorder_level' => 50, 'selling_price' => 150, 'expiry_date' => now()->addMonths(18)],
        ])->each(fn ($medication) => Medication::create($medication));

        collect([
            ['name' => 'Super Admin', 'description' => 'Full access to all modules.', 'permissions' => ['dashboard', 'patients', 'doctors', 'appointments', 'billing', 'pharmacy', 'labs', 'settings']],
            ['name' => 'Doctor', 'description' => 'Access to consultations, records, prescriptions and lab review.', 'permissions' => ['dashboard', 'patients', 'appointments', 'records', 'prescriptions', 'labs']],
            ['name' => 'Receptionist', 'description' => 'Access to patient registration, appointments and billing.', 'permissions' => ['patients', 'appointments', 'billing']],
            ['name' => 'Pharmacist', 'description' => 'Access to pharmacy inventory and prescription fulfilment.', 'permissions' => ['pharmacy', 'prescriptions']],
        ])->each(fn ($role) => StaffRole::create($role));
    }
}
