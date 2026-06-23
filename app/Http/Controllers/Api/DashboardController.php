<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Invoice;
use App\Models\LabResult;
use App\Models\Medication;
use App\Models\Patient;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'stats' => [
                'patients' => Patient::count(),
                'doctors' => Doctor::count(),
                'appointments_today' => Appointment::whereDate('scheduled_at', now())->count(),
                'pending_labs' => LabResult::where('status', 'pending')->count(),
                'pharmacy_alerts' => Medication::whereColumn('stock_quantity', '<=', 'reorder_level')->count(),
                'revenue' => Invoice::sum('paid_amount'),
            ],
            'appointments' => Appointment::with(['patient', 'doctor'])->latest('scheduled_at')->take(6)->get(),
            'recent_patients' => Patient::latest()->take(5)->get(),
        ]);
    }
}
