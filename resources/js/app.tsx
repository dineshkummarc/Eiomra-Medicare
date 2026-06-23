import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  ArrowRight,
  Bell,
  CalendarCheck,
  ChevronDown,
  ClipboardList,
  FileHeart,
  FlaskConical,
  HeartPulse,
  Home as HomeIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Pill,
  Search,
  Settings,
  ShieldCheck,
  Stethoscope,
  UserRound,
  UsersRound,
  WalletCards,
  X
} from 'lucide-react';
import '../css/app.css';
import { appointments, doctors, labResults, metrics, patients, pharmacyItems, records, roleCards, services } from './mainData';

type IconType = React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

type NavItem = {
  label: string;
  path: string;
  icon: IconType;
};

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Patients', path: '/patients', icon: UsersRound },
  { label: 'Doctors', path: '/doctors', icon: Stethoscope },
  { label: 'Appointments', path: '/appointments', icon: CalendarCheck },
  { label: 'Medical Records', path: '/records', icon: FileHeart },
  { label: 'Billing', path: '/billing', icon: WalletCards },
  { label: 'Pharmacy', path: '/pharmacy', icon: Pill },
  { label: 'Lab Results', path: '/labs', icon: FlaskConical },
  { label: 'Settings', path: '/settings', icon: Settings }
];

function Logo() {
  return (
    <a className="logo" href="/">
      <span className="logo-mark"><HeartPulse size={24} /></span>
      <span><strong>Eiomra</strong><small>MediCare</small></span>
    </a>
  );
}

function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  React.useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return path;
}

function go(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function SmartLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} className={className} onClick={(e) => { e.preventDefault(); go(href); }}>{children}</a>;
}

function Home() {
  return (
    <main className="home-page">
      <header className="home-header">
        <Logo />
        <nav className="home-nav">
          <SmartLink href="/">Home</SmartLink>
          <a href="#services">Services</a>
          <a href="#records">Records</a>
          <a href="#contact">Contact</a>
        </nav>
        <SmartLink href="/login" className="btn btn-primary">Staff Login</SmartLink>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Hospital & Clinic Management</span>
          <h1>Modern healthcare management for every patient journey.</h1>
          <p>
            Eiomra MediCare helps hospitals and clinics manage patient records, appointments,
            billing, prescriptions, lab results, pharmacy stock and staff workflows from one clean platform.
          </p>
          <div className="hero-actions">
            <SmartLink href="/register" className="btn btn-primary">Create Account</SmartLink>
            <SmartLink href="/admin" className="btn btn-soft">View Dashboard</SmartLink>
          </div>
          <div className="hero-stats">
            <div><strong>278K+</strong><span>Patient Records</span></div>
            <div><strong>94%</strong><span>Faster Check-ins</span></div>
            <div><strong>86+</strong><span>Care Modules</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <img src="/assets/images/hero-doctor.jpg" alt="Eiomra MediCare doctor" />
          <div className="floating-card regular-checkup"><HeartPulse size={18} /> Regular Checkup</div>
          <div className="floating-card doctor-stack">
            <span>Available Doctors</span>
            <div className="avatar-row"><i></i><i></i><i></i><b>+</b></div>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <span className="section-kicker">Our Services</span>
        <h2>Everything your hospital needs in one place</h2>
        <div className="service-grid">
          {services.map((service) => <ServiceCard key={service.title} {...service} />)}
        </div>
      </section>

      <section className="split-section" id="records">
        <div className="split-image skewed"><img src="/assets/images/xray-consult.jpg" alt="Doctor reviewing x-ray" /></div>
        <div className="split-copy">
          <span className="eyebrow">Digital Medical Records</span>
          <h2>Clean records, safe decisions, better patient care.</h2>
          <p>
            Keep treatment plans, prescriptions, vitals, lab documents, billing history and follow-up notes linked to each patient profile.
          </p>
          <div className="check-list">
            <p><ShieldCheck size={18} /> Role-based access for doctors, nurses, reception and admin staff.</p>
            <p><ShieldCheck size={18} /> Secure patient timelines with prescriptions and lab results.</p>
            <p><ShieldCheck size={18} /> Billing, pharmacy and appointments connected in one workflow.</p>
          </div>
          <SmartLink href="/patients" className="btn btn-primary">Manage Patients</SmartLink>
        </div>
      </section>

      <section className="emergency-section" id="contact">
        <div>
          <span className="eyebrow">Need emergency workflow?</span>
          <h2>Coordinate reception, triage, doctors, pharmacy and lab in real time.</h2>
          <p>Use Eiomra MediCare to reduce manual paperwork, speed up check-ins and keep every department aligned.</p>
        </div>
        <SmartLink href="/appointments" className="btn btn-light">Book Appointment <ArrowRight size={18} /></SmartLink>
      </section>

      <Footer />
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Logo />
      <p>© {new Date().getFullYear()} Eiomra MediCare. Built for hospitals, clinics and healthcare teams.</p>
      <div><SmartLink href="/login">Login</SmartLink><SmartLink href="/admin">Admin</SmartLink><SmartLink href="/dashboard">Patient Portal</SmartLink></div>
    </footer>
  );
}

function ServiceCard({ icon: Icon, title, text }: { icon: IconType; title: string; text: string }) {
  return (
    <article className="service-card">
      <span><Icon size={25} /></span>
      <h3>{title}</h3>
      <p>{text}</p>
      <a href="#contact">Explore Now</a>
    </article>
  );
}

function AuthPage({ type }: { type: 'login' | 'register' }) {
  const isLogin = type === 'login';
  const [message, setMessage] = useState('');

  function submitDemoAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Demo mode: opening the dashboard. Add Laravel users/auth controllers when you are ready for real staff login.');
    window.setTimeout(() => go(isLogin ? '/admin' : '/dashboard'), 500);
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-visual">
          <Logo />
          <h1>{isLogin ? 'Welcome back to your care workspace.' : 'Create your hospital workspace.'}</h1>
          <p>{isLogin ? 'Access patient records, appointments, billing and clinical workflows securely.' : 'Start managing patients, doctors, labs, pharmacy and billing from one clean dashboard.'}</p>
          <img src="/assets/images/lab-diagnostics.jpg" alt="Hospital diagnostics" />
        </div>
        <form className="auth-form" onSubmit={submitDemoAuth}>
          <span className="eyebrow">{isLogin ? 'Staff Login' : 'Register'}</span>
          <h2>{isLogin ? 'Sign in to Eiomra MediCare' : 'Create your account'}</h2>
          {message && <p className="form-alert">{message}</p>}
          {!isLogin && <label>Full Name<input placeholder="Dr. Thompson Oboyi" /></label>}
          {!isLogin && <label>Hospital / Clinic Name<input placeholder="Eiomra Specialist Clinic" /></label>}
          <label>Email Address<input type="email" placeholder="admin@clinic.com" /></label>
          {!isLogin && <label>Phone Number<input placeholder="+234 800 000 0000" /></label>}
          <label>Password<input type="password" placeholder="••••••••" /></label>
          {!isLogin && <label>Confirm Password<input type="password" placeholder="••••••••" /></label>}
          <button className="btn btn-primary" type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
          <p className="auth-switch">
            {isLogin ? 'New to Eiomra MediCare?' : 'Already have an account?'}{' '}
            <SmartLink href={isLogin ? '/register' : '/login'}>{isLogin ? 'Create account' : 'Login'}</SmartLink>
          </p>
        </form>
      </section>
    </main>
  );
}

function DashboardShell({ children, title, subtitle, action }: { children: React.ReactNode; title: string; subtitle?: string; action?: React.ReactNode }) {
  const path = usePath();
  const [open, setOpen] = useState(false);
  return (
    <main className="app-shell">
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-top"><Logo /><button className="mobile-close" onClick={() => setOpen(false)}><X size={20} /></button></div>
        <nav className="sidebar-nav">
          {navItems.map(({ label, path: itemPath, icon: Icon }) => (
            <SmartLink href={itemPath} key={itemPath} className={path === itemPath ? 'active' : ''}>
              <Icon size={19} /> {label}
            </SmartLink>
          ))}
        </nav>
        <div className="sidebar-help">
          <span>Need Help?</span>
          <p>Clinic support and onboarding docs are available.</p>
        </div>
        <SmartLink href="/login" className="logout"><LogOut size={18} /> Log Out</SmartLink>
      </aside>
      <section className="main-panel">
        <header className="topbar">
          <button className="hamburger" onClick={() => setOpen(true)}><Menu size={22} /></button>
          <div className="search"><Search size={18} /><input placeholder="Search patients, doctors, invoices..." /></div>
          <div className="topbar-actions"><Bell size={19} /><Mail size={19} /><img src="/assets/images/doctor-card.jpg" alt="Admin" /><span>Dr. Arlene McCoy</span><ChevronDown size={16} /></div>
        </header>
        <div className="page-heading">
          <div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>
          {action}
        </div>
        {children}
      </section>
    </main>
  );
}

function StatCard({ title, value, delta, icon: Icon }: { title: string; value: string; delta: string; icon: IconType }) {
  return (
    <div className="stat-card">
      <span><Icon size={24} /></span>
      <div><p>{title}</p><strong>{value}</strong><small>{delta}</small></div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <DashboardShell title="Hospital Dashboard" subtitle="Monitor patients, staff, rooms, appointments, billing and clinical operations." action={<button className="btn btn-primary">Add Appointment</button>}>
      <div className="stats-grid">{metrics.map((metric) => <StatCard key={metric.title} {...metric} />)}</div>
      <div className="dashboard-grid">
        <section className="panel wide">
          <div className="panel-head"><h2>Patient Activity</h2><button>Month</button></div>
          <div className="bar-chart" aria-label="Patient activity chart">
            {[45, 62, 92, 58, 42, 70, 86, 78, 64].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
          </div>
        </section>
        <section className="panel report-panel">
          <div className="panel-head"><h2>Reports</h2><button>View all</button></div>
          <div className="report-card active"><ClipboardList size={22} /><p>42 new patient reports were created this week.</p></div>
          <div className="report-card"><FlaskConical size={22} /><p>39 lab reports waiting for doctor review.</p></div>
          <div className="report-card"><WalletCards size={22} /><p>₦1.2m outstanding balances need follow-up.</p></div>
        </section>
        <section className="panel table-panel wide">
          <div className="panel-head"><h2>Latest Patient Data</h2><button>Export</button></div>
          <DataTable rows={patients} columns={['id', 'name', 'age', 'gender', 'condition', 'status']} />
        </section>
        <section className="panel doctor-panel">
          <div className="panel-head"><h2>Best Doctor</h2><button>This week</button></div>
          <img src="/assets/images/doctor-card.jpg" alt="Doctor profile" />
          <h3>Dr. Jonathan Wallace</h3>
          <p>Endocrinologist · 8 years</p>
          <div className="mini-stats"><span><b>8</b>Years</span><span><b>2,598</b>Patients</span><span><b>1,537</b>Reviews</span></div>
        </section>
      </div>
    </DashboardShell>
  );
}

function UserDashboard() {
  return (
    <DashboardShell title="Patient Portal" subtitle="Your appointments, prescriptions, bills, documents and lab results." action={<button className="btn btn-primary">Upload Document</button>}>
      <div className="patient-profile-card">
        <img src="/assets/images/patient-care.jpg" alt="Patient profile" />
        <div>
          <span className="eyebrow">Patient</span>
          <h2>Esther Flores</h2>
          <p>Pneumonia follow-up · Patient ID PAT-1001</p>
        </div>
        <div className="profile-actions"><button><Mail size={18} /></button><button><CalendarCheck size={18} /></button></div>
      </div>
      <div className="patient-info-grid">
        {[
          ['Date of Birth', 'Dec 12, 1986'], ['Address', 'Back Pain'], ['Marital Status', 'Married'], ['Insurance', 'Delta Tech'],
          ['Social Number', '034824'], ['Phone Number', '+234 805 450 0154'], ['Gender', 'Female'], ['Registered On', '3 Feb, 2022']
        ].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
      </div>
      <div className="dashboard-grid patient-grid">
        <section className="panel wide">
          <div className="panel-head"><h2>Appointments</h2><button>Add Appointment</button></div>
          <AppointmentList />
        </section>
        <section className="panel">
          <div className="panel-head"><h2>Documents</h2><button>Add file</button></div>
          <DocumentList />
        </section>
        <section className="panel">
          <div className="panel-head"><h2>Medical Records</h2><button>Add record</button></div>
          <RecordList />
        </section>
      </div>
    </DashboardShell>
  );
}

function AppointmentList() {
  return <div className="appointment-list">{appointments.map((apt) => <div className="appointment-item" key={apt.time}><span>{apt.time}</span><b>{apt.patient}</b><small>{apt.type}</small><em>{apt.doctor}</em><strong>{apt.status}</strong></div>)}</div>;
}

function DocumentList() {
  return <div className="record-list">{['Prescription.pdf', 'X-Ray.pdf', 'Ultrasound.pdf', 'Lab-report.pdf'].map((doc) => <div key={doc}><FileHeart size={18} /><span>{doc}</span><button>Download</button></div>)}</div>;
}

function RecordList() {
  return <div className="record-list">{records.map((record) => <div key={record.date}><FileHeart size={18} /><span>{record.type}<small>{record.date} · {record.specialist}</small></span><button>{record.status}</button></div>)}</div>;
}

function PatientsPage() {
  return (
    <DashboardShell title="Patients" subtitle="Register, view and manage patient profiles and clinical records." action={<button className="btn btn-primary">Add Patient</button>}>
      <section className="panel table-panel"><DataTable rows={patients} columns={['id', 'name', 'age', 'gender', 'condition', 'phone', 'status']} /></section>
      <div className="form-grid">
        <FormPanel title="New Patient Registration" fields={['First Name', 'Last Name', 'Phone Number', 'Email Address', 'Gender', 'Blood Group', 'Address', 'Emergency Contact']} />
        <section className="panel image-card"><img src="/assets/images/patient-care.jpg" alt="Patient care" /><h2>Quick patient timeline</h2><p>View patient visits, vitals, diagnosis, prescriptions, lab results and invoices from one profile.</p></section>
      </div>
    </DashboardShell>
  );
}

function DoctorsPage() {
  return (
    <DashboardShell title="Doctors & Departments" subtitle="Manage doctors, specialties, shifts, departments and consultation fees." action={<button className="btn btn-primary">Add Doctor</button>}>
      <div className="doctor-grid">{doctors.map((doctor) => <article className="doctor-card" key={doctor.name}><img src={doctor.image} alt={doctor.name} /><h3>{doctor.name}</h3><p>{doctor.specialty}</p><div><span>Rating {doctor.rating}</span><span>{doctor.patients} patients</span></div></article>)}</div>
      <section className="panel"><div className="panel-head"><h2>Departments</h2><button>Create Department</button></div><div className="pill-grid">{['Cardiology', 'General Medicine', 'Pediatrics', 'Laboratory', 'Radiology', 'Dental Care', 'Emergency', 'Pharmacy'].map((item) => <span key={item}>{item}</span>)}</div></section>
    </DashboardShell>
  );
}

function AppointmentsPage() {
  return (
    <DashboardShell title="Appointments" subtitle="Schedule patient visits, follow-ups, triage and doctor calendars." action={<button className="btn btn-primary">New Appointment</button>}>
      <section className="panel"><AppointmentList /></section>
      <div className="form-grid"><FormPanel title="Book Appointment" fields={['Patient', 'Doctor', 'Appointment Date', 'Time', 'Reason', 'Type']} /><CalendarPanel /></div>
    </DashboardShell>
  );
}

function RecordsPage() {
  return (
    <DashboardShell title="Medical Records" subtitle="Prescriptions, documents, vitals, diagnosis and treatment history." action={<button className="btn btn-primary">Add Record</button>}>
      <div className="form-grid"><section className="panel"><RecordList /></section><FormPanel title="Clinical Note" fields={['Patient', 'Doctor', 'Symptoms', 'Diagnosis', 'Treatment Plan', 'Allergies']} /></div>
    </DashboardShell>
  );
}

function BillingPage() {
  const billingRows = [
    { invoice: 'INV-1001', patient: 'Esther Flores', amount: '₦24,500', paid: '₦14,500', balance: '₦10,000', status: 'Partial' },
    { invoice: 'INV-1002', patient: 'Jane Cooper', amount: '₦18,000', paid: '₦18,000', balance: '₦0', status: 'Paid' },
    { invoice: 'INV-1003', patient: 'Robert Fox', amount: '₦32,000', paid: '₦0', balance: '₦32,000', status: 'Unpaid' }
  ];
  return (
    <DashboardShell title="Billing" subtitle="Invoices, payments, outstanding balances and revenue summaries." action={<button className="btn btn-primary">Create Invoice</button>}>
      <div className="stats-grid compact">{metrics.slice(2, 5).map((metric) => <StatCard key={metric.title} {...metric} />)}</div>
      <section className="panel table-panel"><DataTable rows={billingRows} columns={['invoice', 'patient', 'amount', 'paid', 'balance', 'status']} /></section>
    </DashboardShell>
  );
}

function PharmacyPage() {
  return (
    <DashboardShell title="Pharmacy" subtitle="Drug inventory, stock levels, prescriptions, expiry dates and low-stock alerts." action={<button className="btn btn-primary">Add Medicine</button>}>
      <section className="panel table-panel"><DataTable rows={pharmacyItems} columns={['sku', 'name', 'category', 'stock', 'reorder', 'status']} /></section>
      <div className="form-grid"><FormPanel title="Dispense Prescription" fields={['Prescription No', 'Patient', 'Medicine', 'Quantity', 'Instructions']} /><section className="panel image-card"><img src="/assets/images/lab-diagnostics.jpg" alt="Pharmacy diagnostics" /><h2>Inventory alerts</h2><p>Track low stock, expiry dates and medicine categories before they affect patient care.</p></section></div>
    </DashboardShell>
  );
}

function LabsPage() {
  return (
    <DashboardShell title="Lab Results" subtitle="Sample tracking, diagnostic reports, result status and doctor review." action={<button className="btn btn-primary">New Lab Request</button>}>
      <section className="panel table-panel"><DataTable rows={labResults} columns={['sample', 'patient', 'test', 'requested', 'status']} /></section>
      <div className="form-grid"><section className="panel image-card"><img src="/assets/images/xray-consult.jpg" alt="Lab diagnostics" /><h2>Diagnostics workflow</h2><p>Connect laboratory requests with patient records, doctors and treatment decisions.</p></section><FormPanel title="Upload Lab Result" fields={['Sample No', 'Patient', 'Test Name', 'Result Summary', 'Status']} /></div>
    </DashboardShell>
  );
}

function SettingsPage() {
  return (
    <DashboardShell title="Staff Roles & Settings" subtitle="Manage permissions, staff access and operational settings." action={<button className="btn btn-primary">Create Role</button>}>
      <div className="role-grid">{roleCards.map(({ title, description, icon: Icon }) => <article className="role-card" key={title}><span><Icon size={22} /></span><h3>{title}</h3><p>{description}</p><button>Edit Permissions</button></article>)}</div>
    </DashboardShell>
  );
}

function FormPanel({ title, fields }: { title: string; fields: string[] }) {
  return (
    <section className="panel form-panel">
      <h2>{title}</h2>
      <form onSubmit={(e) => e.preventDefault()}>{fields.map((field) => <label key={field}>{field}<input placeholder={field} /></label>)}<button className="btn btn-primary">Save</button></form>
    </section>
  );
}

function CalendarPanel() {
  return (
    <section className="panel calendar-panel">
      <div className="panel-head"><h2>February 2026</h2><button>Today</button></div>
      <div className="calendar-grid">{['M','T','W','T','F','S','S', ...Array.from({ length: 35 }, (_, i) => String(i + 1))].map((day, index) => <span key={`${day}-${index}`} className={day === '23' ? 'selected' : ''}>{day}</span>)}</div>
    </section>
  );
}

function DataTable({ rows, columns }: { rows: any[]; columns: string[] }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead><tr>{columns.map((col) => <th key={col}>{col}</th>)}<th>Actions</th></tr></thead>
        <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{columns.map((col) => <td key={col}>{row[col]}</td>)}<td><button>Edit</button><button>View</button></td></tr>)}</tbody>
      </table>
    </div>
  );
}

function App() {
  const path = usePath();
  const page = useMemo(() => {
    switch (path) {
      case '/login': return <AuthPage type="login" />;
      case '/register': return <AuthPage type="register" />;
      case '/admin': return <AdminDashboard />;
      case '/dashboard': return <UserDashboard />;
      case '/patients': return <PatientsPage />;
      case '/doctors': return <DoctorsPage />;
      case '/appointments': return <AppointmentsPage />;
      case '/records': return <RecordsPage />;
      case '/billing': return <BillingPage />;
      case '/pharmacy': return <PharmacyPage />;
      case '/labs': return <LabsPage />;
      case '/settings': return <SettingsPage />;
      default: return <Home />;
    }
  }, [path]);

  return page;
}

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
