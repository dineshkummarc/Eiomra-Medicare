<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index()
    {
        return Appointment::with(['patient', 'doctor'])->latest('scheduled_at')->paginate(15);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'patient_id' => ['required', 'exists:patients,id'],
            'doctor_id' => ['required', 'exists:doctors,id'],
            'scheduled_at' => ['required', 'date'],
            'reason' => ['required', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:60'],
            'status' => ['nullable', 'string', 'max:60'],
            'notes' => ['nullable', 'string'],
        ]);

        $data['appointment_no'] = 'APT-' . now()->format('ymd') . '-' . random_int(1000, 9999);
        $data['status'] = $data['status'] ?? 'scheduled';
        $data['type'] = $data['type'] ?? 'consultation';

        return Appointment::create($data)->load(['patient', 'doctor']);
    }

    public function show(Appointment $appointment)
    {
        return $appointment->load(['patient', 'doctor']);
    }

    public function update(Request $request, Appointment $appointment)
    {
        $appointment->update($request->only(['scheduled_at', 'reason', 'type', 'status', 'notes']));
        return $appointment->load(['patient', 'doctor']);
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
        return response()->noContent();
    }
}
