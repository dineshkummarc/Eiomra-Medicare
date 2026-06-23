<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        return Patient::latest()->paginate(12);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'email' => ['nullable', 'email', 'max:150'],
            'phone' => ['required', 'string', 'max:50'],
            'gender' => ['nullable', 'string', 'max:30'],
            'date_of_birth' => ['nullable', 'date'],
            'blood_group' => ['nullable', 'string', 'max:10'],
            'address' => ['nullable', 'string'],
            'emergency_contact' => ['nullable', 'string', 'max:100'],
            'status' => ['nullable', 'string', 'max:30'],
        ]);

        $data['patient_code'] = 'PAT-' . now()->format('ymd') . '-' . random_int(1000, 9999);
        $data['status'] = $data['status'] ?? 'active';

        return Patient::create($data);
    }

    public function show(Patient $patient)
    {
        return $patient->load(['appointments.doctor', 'medicalRecords.doctor']);
    }

    public function update(Request $request, Patient $patient)
    {
        $patient->update($request->only([
            'first_name', 'last_name', 'email', 'phone', 'gender', 'date_of_birth',
            'blood_group', 'address', 'emergency_contact', 'status'
        ]));

        return $patient;
    }

    public function destroy(Patient $patient)
    {
        $patient->delete();
        return response()->noContent();
    }
}
