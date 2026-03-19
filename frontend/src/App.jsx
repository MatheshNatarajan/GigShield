import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CloudRain, Activity, CheckCircle, TrendingUp, AlertCircle, FileText, Download, ShieldCheck, User, Users, Lock, ChevronRight, UserPlus, Map, MapPin, Wallet, Bell, Play, LogOut } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './index.css';

// --- MOCK DATA ---
const payoutData = [
  { time: '10:00', amount: 0 },
  { time: '12:00', amount: 15 },
  { time: '14:00', amount: 80 },
  { time: '16:00', amount: 320 },
  { time: '18:00', amount: 450 }
];

const mockAlerts = [
  { id: 1, type: 'danger', icon: <Map size={16}/>, time: '10 mins ago', text: 'Location Spoofing Detected: Ravi Kumar. Claim Flagged.' },
  { id: 2, type: 'warning', icon: <CloudRain size={16}/>, time: '1 hr ago', text: 'Rainfall > 80mm in Bangalore South. Zone Risk: HIGH.' },
];

const workerPolicies = [
  { id: 'POL-9102', zone: 'Coimbatore', plan: 'Max Elite', premium: '₹255', status: 'Active', start: 'Oct 18, 2026', end: 'Oct 25, 2026' },
  { id: 'POL-8821', zone: 'Coimbatore', plan: 'Standard Pro', premium: '₹170', status: 'Expired', start: 'Oct 11, 2026', end: 'Oct 18, 2026' },
  { id: 'POL-7734', zone: 'Coimbatore', plan: 'Basic Shield', premium: '₹85', status: 'Expired', start: 'Oct 04, 2026', end: 'Oct 11, 2026' },
  { id: 'POL-6190', zone: 'Bangalore Core', plan: 'Standard Pro', premium: '₹170', status: 'Expired', start: 'Sep 27, 2026', end: 'Oct 04, 2026' }
];

const workerClaims = [
  { id: 'CLM-003', event: 'Heavy Rainfall', date: 'Oct 18, 2026', expected: '₹800', actual: '₹120', payout: '₹544', status: 'Claimed' },
  { id: 'CLM-002', event: 'Traffic Gridlock', date: 'Oct 11, 2026', expected: '₹900', actual: '₹400', payout: '₹350', status: 'Processing' },
  { id: 'CLM-001', event: 'AQI Severe', date: 'Sep 30, 2026', expected: '₹600', actual: '₹500', payout: '₹0', status: 'Rejected' }
];

export default function App() {
  const [userRole, setUserRole] = useState(null); // 'admin' | 'worker' | null
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (role) => {
    setUserRole(role);
    setActiveTab(role === 'admin' ? 'dashboard' : 'profile');
  };

  const handleLogout = () => {
    setUserRole(null);
    setActiveTab('');
  };

  if (!userRole) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Define tab headers
  const headerContent = {
    dashboard: "Admin Analytics Overview",
    risk: "Real-Time Risk Map",
    alerts: "Fraud & Alerts Monitoring",
    profile: "Gig Worker Profile",
    benefits: "Policy Rules & Benefits",
    policies: "My Parametric Policies",
    claims: "Payments & Claim History",
    payment: "Secure Checkout"
  };

  const subHeaderContent = {
    dashboard: "Real-time parametric insurance triggers & ecosystem health.",
    risk: "Geographic zones dynamically highlighted by API inputs.",
    alerts: "Live Anti-Spoofing system flags and threshold triggers.",
    profile: "Manage your income stability score and active quote status.",
    benefits: "Understand exactly how much you get paid when disaster strikes.",
    policies: "Review your currently active and historical policies.",
    claims: "Track your income recovery payouts generated automatically.",
    payment: "Complete your parametric insurance subscription payment."
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo logo-text">
          <ShieldCheck size={32} color="var(--primary-dark)" />
          GigShield AI
        </div>
        
        <nav className="nav-menu">
          {userRole === 'admin' ? (
            <>
              <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                <Activity size={20} /> Admin Dashboard
              </div>
              <div className={`nav-item ${activeTab === 'risk' ? 'active' : ''}`} onClick={() => setActiveTab('risk')}>
                <Map size={20} /> Risk Map
              </div>
              <div className={`nav-item ${activeTab === 'alerts' ? 'active' : ''}`} onClick={() => setActiveTab('alerts')}>
                <Bell size={20} /> Fraud Alerts
              </div>
            </>
          ) : (
            <>
              <div className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                <User size={20} /> My Profile
              </div>
              <div className={`nav-item ${activeTab === 'benefits' ? 'active' : ''}`} onClick={() => setActiveTab('benefits')}>
                <Shield size={20} /> Policy & Rules
              </div>
              <div className={`nav-item ${activeTab === 'policies' ? 'active' : ''}`} onClick={() => setActiveTab('policies')}>
                <FileText size={20} /> My Policies
              </div>
              <div className={`nav-item ${activeTab === 'claims' ? 'active' : ''}`} onClick={() => setActiveTab('claims')}>
                <Wallet size={20} /> Payments & Claims
              </div>
            </>
          )}
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <div className="nav-item" onClick={handleLogout} style={{ color: 'var(--accent)' }}>
            <LogOut size={20} /> Logout
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="header animate">
          <div>
            <h1>{headerContent[activeTab]}</h1>
            <p style={{ color: 'var(--text-muted)' }}>{subHeaderContent[activeTab]}</p>
          </div>
          <div style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', padding: '0.6rem 1.25rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(34, 197, 94, 0.1)' }}>
            <Activity size={18} /> System Online
          </div>
        </header>

        {userRole === 'admin' ? (
          <>
            {activeTab === 'dashboard' && <AdminDashboardView />}
            {activeTab === 'risk' && <AdminRiskMap />}
            {activeTab === 'alerts' && <AdminFraudAlerts />}
          </>
        ) : (
          <>
            {activeTab === 'profile' && <WorkerView setActiveTab={setActiveTab} />}
            {activeTab === 'benefits' && <WorkerBenefits setActiveTab={setActiveTab} />}
            {activeTab === 'policies' && <WorkerPolicies />}
            {activeTab === 'claims' && <WorkerClaims />}
            {activeTab === 'payment' && <DummyPaymentPage onComplete={() => setActiveTab('policies')} />}
          </>
        )}
      </main>
    </div>
  );
}

// --- COMPONENTS ---
function LoginScreen({ onLogin }) {
  const [authMode, setAuthMode] = React.useState('roleSelect'); // 'roleSelect', 'workerLogin', 'adminLogin', 'register'
  
  // Hackathon Demo States
  const [loginId, setLoginId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');

  const handleDemoLogin = (e, role) => {
    e.preventDefault();
    if (loginId === '1' && password === '1') {
      onLogin(role);
    } else {
      setErrorMsg('Invalid Credentials. Please use ID: 1 and Pass: 1');
    }
  };

  if (authMode === 'roleSelect') {
    return (
      <div className="login-container">
        <div className="glass-panel animate login-box">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <Shield size={64} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 800 }}>GigShield AI</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Parametric Income Protection</p>
          </div>
          
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-primary)', fontSize: '1.25rem' }}>Choose your role to continue</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button className="btn-role btn-primary" onClick={() => { setAuthMode('adminLogin'); setErrorMsg(''); setLoginId(''); setPassword(''); }}>
              <Shield size={20} />
              Admin Dashboard
            </button>
            
            <button className="btn-role btn-secondary" onClick={() => { setAuthMode('workerLogin'); setErrorMsg(''); setLoginId(''); setPassword(''); }}>
              <User size={20} />
              Gig Worker Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (authMode === 'workerLogin') {
    return (
      <div className="login-container">
        <div className="glass-panel animate login-box" style={{ maxWidth: '400px', width: '100%', position: 'relative' }}>

          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <User size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', fontWeight: 800 }}>Worker Login</h2>
          </div>
          
          <form onSubmit={(e) => handleDemoLogin(e, 'worker')} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ background: 'rgba(250, 204, 21, 0.1)', border: '1px dashed var(--warning)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: '#b45309', fontWeight: 800, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Login with this Credential</p>
              <p style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 700 }}>ID: 1 &nbsp;|&nbsp; Pass: 1</p>
            </div>

            {errorMsg && (
              <div style={{ color: 'white', background: '#ef4444', padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem', textAlign: 'center', fontWeight: 600, animation: 'pulseAlert 1s' }}>
                {errorMsg}
              </div>
            )}

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email or Phone Number (ID)</label>
              <input 
                type="text" 
                placeholder="Enter 1" 
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                required 
                style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: `1px solid ${errorMsg ? '#ef4444' : 'var(--border-highlight)'}`, background: 'var(--bg-surface)' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Password</label>
              <input 
                type="password" 
                placeholder="Enter 1" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: `1px solid ${errorMsg ? '#ef4444' : 'var(--border-highlight)'}`, background: 'var(--bg-surface)' }} 
              />
            </div>
            
            <button type="submit" className="btn-simulate" style={{ width: '100%', padding: '1.1rem', background: 'var(--primary-dark)', color: 'white', marginTop: '0.5rem', justifyContent: 'center', fontWeight: 'bold' }}>
              Sign In to Dashboard
            </button>
          </form>
          
          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Don't have an account? <span style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setAuthMode('register')}>Register here</span>
          </p>
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }} onClick={() => { setAuthMode('roleSelect'); setErrorMsg(''); setLoginId(''); setPassword(''); }}>
              <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /> Back to Roles
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (authMode === 'adminLogin') {
    return (
      <div className="login-container">
        <div className="glass-panel animate login-box" style={{ maxWidth: '400px', width: '100%', position: 'relative' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Shield size={48} color="var(--primary-dark)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', fontWeight: 800 }}>Admin Login</h2>
          </div>
          
          <form onSubmit={(e) => handleDemoLogin(e, 'admin')} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ background: 'rgba(250, 204, 21, 0.1)', border: '1px dashed var(--warning)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: '#b45309', fontWeight: 800, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Login with this Credential</p>
              <p style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 700 }}>ID: 1 &nbsp;|&nbsp; Pass: 1</p>
            </div>

            {errorMsg && (
              <div style={{ color: 'white', background: '#ef4444', padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem', textAlign: 'center', fontWeight: 600, animation: 'pulseAlert 1s' }}>
                {errorMsg}
              </div>
            )}

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Admin ID (Email)</label>
              <input 
                type="text" 
                placeholder="Enter 1" 
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                required 
                style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: `1px solid ${errorMsg ? '#ef4444' : 'var(--border-highlight)'}`, background: 'var(--bg-surface)' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Password</label>
              <input 
                type="password" 
                placeholder="Enter 1" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: `1px solid ${errorMsg ? '#ef4444' : 'var(--border-highlight)'}`, background: 'var(--bg-surface)' }} 
              />
            </div>
            
            <button type="submit" className="btn-simulate" style={{ width: '100%', padding: '1.1rem', background: 'var(--primary-dark)', color: 'white', marginTop: '0.5rem', justifyContent: 'center', fontWeight: 'bold' }}>
              Secure Login
            </button>
          </form>
          
          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-tertiary)', fontSize: '0.85rem', fontStyle: 'italic' }}>
            Note: Admin registration is internal and processed by IT.
          </p>
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }} onClick={() => { setAuthMode('roleSelect'); setErrorMsg(''); setLoginId(''); setPassword(''); }}>
              <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /> Back to Roles
            </span>
          </p>
        </div>
      </div>
    );
  }

  // Register View
  return (
    <div className="login-container" style={{ padding: '2rem 1rem', height: 'auto', minHeight: '100vh', alignItems: 'flex-start' }}>
      <div className="glass-panel animate login-box" style={{ maxWidth: '750px', width: '100%', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <UserPlus size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: 800 }}>Create Gig Worker Account</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Join GigShield AI for Parametric Income Protection</p>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onLogin('worker'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ background: 'var(--bg-base)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-highlight)' }}>
            <label style={{ display: 'block', marginBottom: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>1. Platform Verification</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '1.5rem' }}>
              <label style={{ padding: '1.5rem 1rem', border: '2px solid rgba(252, 128, 25, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', cursor: 'pointer', background: 'rgba(252, 128, 25, 0.05)', transition: 'all 0.2s', textAlign: 'center' }}>
                <input type="radio" name="platform" value="swiggy" required />
                <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#fc8019', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>🍔 Connect Swiggy</span>
              </label>
              <label style={{ padding: '1.5rem 1rem', border: '2px solid rgba(226, 55, 68, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', cursor: 'pointer', background: 'rgba(226, 55, 68, 0.05)', transition: 'all 0.2s', textAlign: 'center' }}>
                <input type="radio" name="platform" value="zomato" required />
                <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#E23744', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>🛵 Connect Zomato</span>
              </label>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '1rem', textAlign: 'center' }}><ShieldCheck size={16} style={{ display: 'inline', verticalAlign: 'middle' }}/> Synced securely via Account Aggregator</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Legal Name</label>
              <input type="text" placeholder="As per Aadhar Card" required style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-highlight)', background: 'var(--bg-surface)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Phone Number</label>
              <input type="tel" placeholder="+91 XXXXX XXXXX" required style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-highlight)', background: 'var(--bg-surface)' }} />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email Address (Optional)</label>
              <input type="email" placeholder="worker@example.com" style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-highlight)', background: 'var(--bg-surface)' }} />
            </div>

            <div style={{ gridColumn: 'span 2', background: 'var(--bg-base)', padding: '1.5rem', margin: '0.5rem 0', borderRadius: '16px', border: '1px solid var(--border-highlight)' }}>
              <label style={{ display: 'block', marginBottom: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>2. Identity & KYC Documents</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Aadhar Card Number</label>
                  <input type="text" placeholder="XXXX XXXX XXXX" required style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-highlight)', background: 'var(--bg-surface)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>PAN Card Number</label>
                  <input type="text" placeholder="ABCDE1234F" required style={{ textTransform: 'uppercase', width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-highlight)', background: 'var(--bg-surface)' }} />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Upload Aadhar Photo</label>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px dashed var(--border-highlight)', borderRadius: '8px', padding: '0.5rem' }}>
                    <FileText size={20} color="var(--text-muted)" style={{ margin: '0 0.5rem' }} />
                    <input type="file" required accept="image/*,.pdf" style={{ width: '100%', color: 'var(--text-secondary)', fontSize: '0.9rem' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Past Week Income Proof</label>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px dashed var(--border-highlight)', borderRadius: '8px', padding: '0.5rem' }}>
                    <FileText size={20} color="var(--text-muted)" style={{ margin: '0 0.5rem' }} />
                    <input type="file" required accept="image/*,.pdf" style={{ width: '100%', color: 'var(--text-secondary)', fontSize: '0.9rem' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button type="submit" className="btn-simulate" style={{ width: '100%', padding: '1.25rem', background: 'var(--primary-dark)', color: 'white', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800, marginTop: '0.5rem', borderRadius: '12px' }}>
            Complete KYC & Register
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Already have an account? <span style={{ color: 'var(--primary)', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setAuthMode('workerLogin')}>Login here</span>
        </p>
      </div>
    </div>
  );
}

// --- ADMIN VIEWS ---
function AdminDashboardView() {
  return (
    <div className="dashboard-grid">
      <div className="glass-panel status-card animate" style={{ animationDelay: '0.1s' }}>
        <div className="status-header">
          <div className="status-icon" style={{ background: 'var(--primary-glow)', color: 'var(--primary-dark)' }}><ShieldCheck size={24} /></div>
        </div>
        <div className="status-value">1,492</div>
        <div className="status-label">Active Policies</div>
      </div>
      
      <div className="glass-panel status-card animate" style={{ animationDelay: '0.2s' }}>
        <div className="status-header">
          <div className="status-icon" style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)' }}><AlertTriangle size={24} /></div>
        </div>
        <div className="status-value">2</div>
        <div className="status-label">Active Zone Disruptions</div>
      </div>
      
      <div className="glass-panel status-card animate" style={{ animationDelay: '0.3s' }}>
        <div className="status-header">
          <div className="status-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}><User size={24} /></div>
        </div>
        <div className="status-value">14</div>
        <div className="status-label">Claims Flagged by AI</div>
      </div>
      
      <div className="glass-panel status-card animate" style={{ animationDelay: '0.4s' }}>
        <div className="status-header">
          <div className="status-icon" style={{ background: 'var(--secondary-glow)', color: 'var(--secondary)' }}><Wallet size={24} /></div>
        </div>
        <div className="status-value">₹84.2K</div>
        <div className="status-label">Total Payouts (INR)</div>
      </div>

      <div className="glass-panel heatmap-card animate" style={{ animationDelay: '0.5s', gridColumn: 'span 12' }}>
        <h3 className="card-title">Missed Opportunity Payout Tracker</h3>
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={payoutData}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="var(--text-muted)" />
            <YAxis stroke="var(--text-muted)" />
            <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '8px' }}/>
            <Area type="monotone" dataKey="amount" stroke="var(--primary)" fillOpacity={1} fill="url(#colorAmount)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function AdminRiskMap() {
  const [zones, setZones] = React.useState([
    { id: 1, name: 'North Bangalore', lat: 13.0285, lng: 77.5896, risk: 35 },
    { id: 2, name: 'Electronic City', lat: 12.8452, lng: 77.6602, risk: 15 },
    { id: 3, name: 'Whitefield', lat: 12.9698, lng: 77.7499, risk: 45 },
    { id: 4, name: 'Koramangala', lat: 12.9352, lng: 77.6245, risk: 85 }, // Critical zone
    { id: 5, name: 'Indiranagar', lat: 12.9784, lng: 77.6408, risk: 25 },
    { id: 6, name: 'Malleswaram', lat: 13.0031, lng: 77.5710, risk: 10 },
    { id: 7, name: 'HSR Layout', lat: 12.9121, lng: 77.6446, risk: 55 },
    { id: 8, name: 'Jayanagar', lat: 12.9250, lng: 77.5938, risk: 40 }
  ]);
  
  const [selectedZone, setSelectedZone] = React.useState(null);

  React.useEffect(() => {
    setSelectedZone(zones[3]); // Koramangala
    
    // Simulate real-time API weather sync
    const interval = setInterval(() => {
      setZones(prev => prev.map(z => {
        let newRisk = z.risk;
        if (z.id === 4) {
          newRisk = Math.min(100, Math.max(75, z.risk + (Math.random() * 8 - 4)));
        } else {
          newRisk = Math.min(65, Math.max(5, z.risk + (Math.random() * 6 - 3)));
        }
        return { ...z, risk: newRisk };
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const getZoneColor = (risk) => {
    if (risk > 75) return 'rgba(239, 68, 68, 1)'; // Red
    if (risk > 40) return 'rgba(245, 158, 11, 1)'; // Orange
    return 'rgba(34, 197, 94, 1)'; // Green
  };

  const getAIAction = (risk) => {
    if (risk > 75) return 'HALT DELIVERIES & TRIGGER PAYOUTS (Risk Critical)';
    if (risk > 40) return 'MONITOR API for +10% Peak Premium Surcharge';
    return 'Standard Operating Parameters Maintained';
  };

  const activeData = selectedZone ? zones.find(z => z.id === selectedZone.id) : null;

  return (
    <div className="dashboard-grid">
      <div className="glass-panel animate" style={{ gridColumn: 'span 8', padding: '1rem', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '500px' }}>
        <div style={{ padding: '0.5rem 1.5rem 1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', margin: '0 0 0.25rem 0', fontWeight: 800 }}>Live Google Maps Feed</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Interactive geospacial risk assessment map.</p>
          </div>
          <span className="badge pulse-alert" style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', fontWeight: 800 }}>● Connected to Maps API</span>
        </div>
        
        <div style={{ flex: 1, minHeight: '400px', position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-light)', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)' }}>
          <MapContainer 
            center={[12.9716, 77.5946]} 
            zoom={12} 
            style={{ height: '100%', width: '100%', zIndex: 0 }}
            zoomControl={false}
          >
            <TileLayer
              url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              attribution='&copy; Google Maps'
            />
            {zones.map(zone => (
              <CircleMarker
                key={zone.id}
                center={[zone.lat, zone.lng]}
                radius={zone.id === activeData?.id ? 25 : 15}
                eventHandlers={{ click: () => setSelectedZone(zone) }}
                pathOptions={{
                  fillColor: getZoneColor(zone.risk),
                  fillOpacity: zone.id === activeData?.id ? 0.9 : 0.6,
                  color: zone.id === activeData?.id ? '#ffffff' : getZoneColor(zone.risk),
                  weight: zone.id === activeData?.id ? 4 : 1
                }}
              >
                <Popup>
                  <strong>{zone.name}</strong><br/>
                  Risk Index: {zone.risk.toFixed(1)}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>
      
      <div className="glass-panel animate" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', background: 'var(--bg-base)', border: '1px solid var(--border-light)', padding: 0, overflow: 'hidden' }}>
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', margin: 0, fontWeight: 800 }}>Node Diagnostics</h3>
        </div>
        
        <div style={{ padding: '2rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {activeData ? (
            <div style={{ width: '100%' }}>
              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px' }}>Selected Region</p>
                <p style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 900, margin: 0 }}>{activeData.name}</p>
              </div>
              
              <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px' }}>Real-time Index</p>
                <p style={{ color: activeData.risk > 75 ? 'var(--accent)' : activeData.risk > 40 ? 'var(--warning)' : 'var(--success)', fontSize: '3.5rem', fontWeight: 900, margin: 0, lineHeight: 1 }}>
                  {activeData.risk.toFixed(1)}
                </p>
              </div>
              
              <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-highlight)' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 700, textTransform: 'uppercase' }}>Automated AI Action Engine</p>
                <p style={{ fontWeight: 800, color: activeData.risk > 75 ? 'var(--accent)' : 'var(--text-primary)', fontSize: '1rem', lineHeight: '1.4', margin: 0 }}>
                  <Activity size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-top' }}/>
                  {getAIAction(activeData.risk)}
                </p>
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontWeight: 600 }}>Tap a sector on the map to extract live diagnostic streams.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminFraudAlerts() {
  return (
    <div className="dashboard-grid">
      <div className="glass-panel alerts-card animate" style={{ gridColumn: 'span 12', height: 'auto' }}>
        <h3 className="card-title">System-Wide Real-Time Alerts</h3>
        <div className="alerts-list">
          {mockAlerts.map(alert => (
            <div key={alert.id} className={`alert-item ${alert.type}`}>
              <div className="alert-header">
                {alert.icon} {alert.time}
              </div>
              <div className="alert-body">{alert.text}</div>
            </div>
          ))}
          <div className={`alert-item success`}>
              <div className="alert-header">
                <ShieldCheck size={16}/> 2 hrs ago
              </div>
              <div className="alert-body">Automated Validation Step Passed: 45 policies approved for Zone East.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- GIG WORKER VIEWS ---
function WorkerView({ setActiveTab }) {
  return (
    <div className="dashboard-grid">
      {/* Top Profile Summary */}
      <div className="glass-panel worker-card animate" style={{ gridColumn: 'span 5', padding: '1.5rem' }}>
        <div className="profile-header" style={{ marginBottom: '1rem' }}>
          <div className="avatar" style={{ overflow: 'hidden', padding: 0, width: '50px', height: '50px', borderRadius: '50%' }}>
            <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="Suresh Raina" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Suresh Raina</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Zomato • ID: Z-91823</p>
          </div>
        </div>
        <div className="worker-stats" style={{ flexDirection: 'column', gap: '0.75rem' }}>
          <div className="stat-item" style={{ width: '100%', background: 'linear-gradient(135deg, var(--bg-surface), var(--bg-base))', border: '1px solid var(--border-highlight)', padding: '1rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
              <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>Synced Weekly Income</h4>
              <span style={{ fontSize: '0.65rem', background: 'rgba(226, 55, 68, 0.1)', color: '#E23744', padding: '0.2rem 0.5rem', borderRadius: '10px', fontWeight: 800 }}>Zomato Verified</span>
            </div>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 800, margin: '0' }}>₹8,500</p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
            <div className="stat-item" style={{ flex: 1, padding: '0.75rem 1rem', background: 'var(--bg-base)', border: '1px solid var(--border-light)', borderRadius: '10px' }}>
              <h4 style={{ fontSize: '0.8rem', margin: 0, color: 'var(--text-secondary)' }}>Trust Score</h4>
              <p style={{ color: 'var(--success)', fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>92.5 <CheckCircle size={14} style={{display:'inline', marginBottom:'-2px'}}/></p>
            </div>
            <div className="stat-item" style={{ flex: 1, padding: '0.75rem 1rem', background: 'var(--bg-base)', border: '1px solid var(--border-light)', borderRadius: '10px' }}>
              <h4 style={{ fontSize: '0.8rem', margin: 0, color: 'var(--text-secondary)' }}>Income Stability</h4>
              <p style={{ color: 'var(--warning)', fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>68.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Quote Box (Moved near Profile) */}
      <div className="glass-panel worker-card animate" style={{ gridColumn: 'span 7', animationDelay: '0.1s', display: 'flex', flexDirection: 'column', padding: '1.5rem', background: 'linear-gradient(135deg, var(--primary) 0%, #FBBF24 100%)', color: 'var(--secondary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 className="card-title" style={{ margin: 0, color: 'var(--secondary)', fontSize: '1.2rem' }}>Parametric Quote (This Week)</h3>
          <span style={{ fontSize: '0.7rem', background: 'rgba(15, 23, 42, 0.1)', color: 'var(--secondary)', padding: '0.25rem 0.75rem', borderRadius: '16px', fontWeight: 800, textTransform: 'uppercase' }}>
            AI Subsidized
          </span>
        </div>
        
        <p style={{ color: 'rgba(15, 23, 42, 0.75)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '1.5rem', maxWidth: '95%' }}>
          Due to upcoming heavy rains in your zone, the AI has generated a subsidized parametric premium. Guaranteed up to 75% loss coverage.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
          <div>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0', color: 'var(--secondary)', lineHeight: 1, letterSpacing: '-0.5px' }}>₹85 <span style={{fontSize: '0.85rem', fontWeight: 700, opacity: 0.6, letterSpacing: 'normal'}}>/ week</span></p>
            <p style={{ color: 'rgba(15, 23, 42, 0.6)', margin: '0.2rem 0 0 0', fontSize: '0.85rem', fontWeight: 700 }}>1% of average weekly income</p>
          </div>
          <button className="btn-simulate" onClick={() => setActiveTab('payment')} style={{ padding: '0.85rem 2rem', fontSize: '1rem', background: 'var(--secondary)', color: 'white', fontWeight: 800, borderRadius: '10px', transition: 'all 0.2s', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px -5px rgba(15, 23, 42, 0.3)' }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 15px -5px rgba(15, 23, 42, 0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px -5px rgba(15, 23, 42, 0.3)'; }}
          >
            Subscribe Now
          </button>
        </div>
      </div>
      {/* AI Weather Recommendation Engine */}
      <div className="glass-panel animate" style={{ gridColumn: 'span 12', animationDelay: '0.15s', border: '2px solid var(--accent)', background: 'linear-gradient(to right, rgba(239, 68, 68, 0.05), transparent)' }}>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
          <div className="pulse-alert" style={{ padding: '14px', background: 'var(--accent)', borderRadius: '16px', color: 'white' }}>
            <AlertTriangle size={32} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: '800' }}>
                <Activity size={20} color="var(--accent)" /> AI Weather Alert Recommendation
              </h3>
              <span className="badge pulse-alert" style={{ background: 'var(--accent)', color: 'white', padding: '0.5rem 1rem' }}>ACTION REQUIRED</span>
            </div>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 600, marginBottom: '1rem' }}>
              Our predictive engine detects a high probability of heavy rainfall in your operating zone tomorrow. We strongly recommend securing your expected income with Parametric Insurance today.
            </p>
            <div style={{ background: 'var(--bg-base)', padding: '1rem', borderRadius: '12px', border: '1px dashed rgba(239, 68, 68, 0.4)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', lineHeight: '1.5' }}>
                <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent)' }} />
                <span><strong>Disclaimer:</strong> This is a predictive recommendation. Rain may or may not occur. Apply for insurance at your own risk. GigShield AI is not responsible for unfulfilled weather predictions or premium losses.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkerBenefits({ setActiveTab }) {
  return (
    <div className="dashboard-grid">
      <div className="glass-panel animate" style={{ gridColumn: 'span 12', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', color: 'var(--text-primary)', fontWeight: 800 }}>Coverage & Fast Payout Rules</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.05rem', maxWidth: '800px', lineHeight: 1.6 }}>
          GigShield AI automatically tracks weather, traffic, and AQI disruptions. When a disaster is triggered by our live APIs, we calculate your lost daily wages based on your Swiggy/Zomato history and instantly transfer cash to your UPI without any manual claims.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
          
          {/* Basic Plan */}
          <div style={{ background: 'linear-gradient(to bottom right, #ffffff, #f3f4f6)', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#1f2937', marginBottom: '0.25rem', fontWeight: 800 }}>Basic Shield</h3>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1.25rem' }}>Essential protection for casual riders.</p>
            
            <div style={{ background: 'rgba(255, 255, 255, 0.7)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid #e5e7eb', backdropFilter: 'blur(4px)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.75rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>
                <span style={{ color: '#4b5563', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Weekly Premium</span>
                <strong style={{ color: '#111827', fontSize: '1.1rem' }}>1% of Income</strong>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: '#4b5563', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Payout Coverage</span>
                <strong style={{ color: '#3b82f6', fontWeight: 800, fontSize: '1.15rem' }}>40% of Loss</strong>
              </div>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.95rem', color: '#374151', flex: 1, marginBottom: '2rem' }}>
              <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}><CheckCircle size={16} color="#10b981"/> Rain & Flood Triggers</li>
              <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}><CheckCircle size={16} color="#10b981"/> Extreme Heat Wave</li>
              <li style={{ color: '#9ca3af', display: 'flex', gap: '0.5rem' }}><FileText size={16} color="#9ca3af"/> Payout usually on Sunday Evening</li>
            </ul>
            <button onClick={() => setActiveTab('payment')} style={{ width: '100%', padding: '0.85rem', background: 'transparent', border: '2px solid #3b82f6', color: '#3b82f6', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Select Basic</button>
          </div>

          {/* Standard Plan */}
          <div style={{ background: 'linear-gradient(135deg, #2563eb, #1e3a8a)', border: 'none', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.4)' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#fbbf24', color: '#78350f', padding: '4px 16px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>Most Popular</div>
            <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.25rem', fontWeight: 800 }}>Standard Pro</h3>
            <p style={{ fontSize: '0.9rem', color: '#bfdbfe', marginBottom: '1.25rem' }}>Balanced protection for daily workers.</p>
            
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(8px)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.15)', paddingBottom: '0.75rem' }}>
                <span style={{ color: '#bfdbfe', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Weekly Premium</span>
                <strong style={{ color: '#ffffff', fontSize: '1.1rem' }}>2% of Income</strong>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: '#bfdbfe', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Payout Coverage</span>
                <strong style={{ color: '#60a5fa', fontWeight: 800, fontSize: '1.25rem' }}>60% of Loss</strong>
              </div>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.95rem', color: '#f8fafc', flex: 1, marginBottom: '2rem' }}>
              <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}><CheckCircle size={16} color="#34d399"/> All Basic Triggers</li>
              <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}><CheckCircle size={16} color="#34d399"/> Traffic & Gridlock Tracking</li>
              <li style={{ color: '#93c5fd', display: 'flex', gap: '0.5rem' }}><FileText size={16} color="#93c5fd"/> Payout on Wednesdays and Sundays</li>
            </ul>
            <button onClick={() => setActiveTab('payment')} style={{ width: '100%', padding: '0.85rem', background: '#ffffff', border: 'none', color: '#1e3a8a', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>Select Standard</button>
          </div>

          {/* Premium Plan */}
          <div style={{ background: 'linear-gradient(135deg, #111827, #000000)', border: '1px solid #374151', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}></div>
            <h3 style={{ fontSize: '1.4rem', color: '#fbbf24', marginBottom: '0.25rem', fontWeight: 900, textShadow: '0 2px 10px rgba(251, 191, 36, 0.2)' }}>Max Elite</h3>
            <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '1.25rem' }}>Total peace of mind guaranteed.</p>
            
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.75rem' }}>
                <span style={{ color: '#9ca3af', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Weekly Premium</span>
                <strong style={{ color: '#f3f4f6', fontSize: '1.1rem' }}>3% of Income</strong>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: '#9ca3af', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Payout Coverage</span>
                <strong style={{ color: '#fbbf24', fontWeight: 900, fontSize: '1.35rem', textShadow: '0 0 10px rgba(251, 191, 36, 0.3)' }}>75% of Loss</strong>
              </div>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.95rem', color: '#f3f4f6', flex: 1, marginBottom: '2rem' }}>
              <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}><CheckCircle size={16} color="#34d399"/> All Standard Triggers</li>
              <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem', fontWeight: 700, color: '#fcd34d' }}><CloudRain size={16} /> AQI & Severe Smog Triggers</li>
              <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem', fontWeight: 700, color: '#fcd34d' }}><Activity size={16} /> Instant Payout After Disruption Hrs</li>
            </ul>
            <button onClick={() => setActiveTab('payment')} style={{ width: '100%', padding: '0.85rem', background: 'linear-gradient(90deg, #f59e0b, #ea580c)', border: 'none', color: '#ffffff', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', textShadow: '0 1px 2px rgba(0,0,0,0.3)', boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)' }}>Select Premium</button>
          </div>
          
        </div>

        <div style={{ marginTop: '2rem', background: 'var(--bg-base)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)', fontWeight: 800 }}>How the GigShield System Works</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 800, marginBottom: '0.75rem' }}><MapPin size={18}/> Hyper-Local API Syncs</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>The GigShield Engine strictly pulls your live GPS location, order metrics, and delivery history <strong>every 30 minutes</strong> natively from Swiggy/Zomato. You cannot manually declare your zone during a shift.</p>
            </div>
            
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontWeight: 800, marginBottom: '0.75rem' }}><TrendingUp size={18}/> Parametric Payment Triggers</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>Insurance payouts are NOT based on subjective claims. If the Regional Weather/Traffic APIs cross your plan's pre-set disaster threshold in your exact location, the Smart Contract triggers the payout automatically.</p>
            </div>

            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontWeight: 800, marginBottom: '0.75rem' }}><AlertTriangle size={18}/> Zero-Tolerance Fraud Detection</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>If anomalous data is detected (e.g. GPS spoofing, VPN routing, or simultaneous multi-device logins), Smart Contracts will auto-lock your policy. Your payouts will be frozen and flagged to the Admin for manual review.</p>
            </div>
            
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F59E0B', fontWeight: 800, marginBottom: '0.75rem' }}><Lock size={18}/> Secured by Smart Contracts</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>All funds are held in transparent smart contracts. Once the disruption parameter is met, the system instantly executes a Direct Bank Transfer (DBT) via UPI without human intervention.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkerPolicies() {
  return (
    <div className="dashboard-grid">
      <div className="glass-panel animate" style={{ gridColumn: 'span 12' }}>
        <h3 className="card-title">My Policy History</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Policy ID</th>
              <th>Operating Region</th>
              <th>Coverage Tier</th>
              <th>Weekly Premium</th>
              <th>Status</th>
              <th>Valid Dates</th>
            </tr>
          </thead>
          <tbody>
            {workerPolicies.map(p => (
              <tr key={p.id}>
                <td><strong>{p.id}</strong></td>
                <td>{p.zone}</td>
                <td><span style={{ fontWeight: 700, color: p.plan === 'Max Elite' ? 'var(--warning)' : p.plan === 'Standard Pro' ? 'var(--primary)' : 'var(--text-secondary)' }}>{p.plan}</span></td>
                <td style={{ fontWeight: 600 }}>{p.premium}</td>
                <td>
                  <span className={`badge ${p.status === 'Active' ? 'success' : 'warning'}`}>
                    {p.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>{p.start} to {p.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function WorkerClaims() {
  return (
    <div className="dashboard-grid">
      <div className="glass-panel animate" style={{ gridColumn: 'span 12' }}>
        <h3 className="card-title">Payments & Claim History</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Disruption Event</th>
              <th>Date</th>
              <th>Expected Earnings</th>
              <th>Actual Earnings</th>
              <th>Auto Payout Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {workerClaims.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.event}</td>
                <td>{c.date}</td>
                <td>{c.expected}</td>
                <td>{c.actual}</td>
                <td style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{c.payout}</td>
                <td>
                  <span className={`badge ${c.status === 'Claimed' ? 'success' : c.status === 'Processing' ? 'warning' : 'danger'}`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// --- DUMMY PAYMENT PAGE ---
function DummyPaymentPage({ onComplete }) {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  // Dynamic Pricing States
  const [weeklyIncome, setWeeklyIncome] = React.useState(8500);
  const [insurancePlan, setInsurancePlan] = React.useState('Basic'); // 'Basic' | 'Standard' | 'Premium'
  
  // Region Pre-booking States
  const [selectedRegion] = React.useState('Coimbatore');
  
  // Dynamic AI Auto-Calculated Risk based on Regional Baseline
  const riskLevel = 'Low'; 
  const riskSurcharge = 0;

  // Calculate Premium Logic
  let planMultiplier = 0.01;
  if (insurancePlan === 'Standard') planMultiplier = 0.02;
  if (insurancePlan === 'Premium') planMultiplier = 0.03;
  
  const basePremium = Math.round(weeklyIncome * planMultiplier);
  const totalPremium = basePremium + riskSurcharge;

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
        <div className="glass-panel animate" style={{ width: '100%', maxWidth: '600px', height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--success)', color: 'white', padding: '24px', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)' }}>
            <CheckCircle size={64} />
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Payment Successful!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Your Parametric Insurance policy is now active.</p>
          <p style={{ color: 'var(--text-tertiary)', marginTop: '2rem' }}>Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
      <div className="glass-panel animate" style={{ width: '100%', maxWidth: '650px' }}>
        <h3 className="card-title" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Lock size={20} color="var(--primary-dark)" /> Secure Checkout
        </h3>

        {/* Dynamic Calculator Section */}
        <div style={{ background: 'var(--bg-base)', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>Premium Calculator</h4>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
            
            <div style={{ gridColumn: 'span 2', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '1.25rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'var(--primary-dark)', color: 'white', padding: '12px', borderRadius: '50%', flexShrink: 0 }}>
                <Map size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Partner App Sync: Active Zone</label>
                <p style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.4rem', margin: '0 0 0.25rem 0' }}>
                  {selectedRegion}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  <ShieldCheck size={14} color="var(--success)" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                  Policy unlocks coverage for all operating areas within {selectedRegion}.
                </p>
              </div>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Weekly Income (₹)</label>
              <input 
                type="number" 
                value={weeklyIncome} 
                readOnly
                style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-highlight)', background: 'var(--bg-base)', color: 'var(--text-secondary)', cursor: 'not-allowed', fontSize: '1rem', outline: 'none' }} 
              />
            </div>

            <div style={{ gridColumn: 'span 2', background: 'rgba(59, 130, 246, 0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid var(--primary)', marginTop: '-0.5rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                Live API sync locked to <strong>{selectedRegion}</strong>.<br/>
                <span style={{ color: 'var(--primary)', fontWeight: 700, display: 'inline-block', marginTop: '4px' }}>Hyper-local payouts:</span> Smart contracts will scan the specific exact area you deliver in (e.g. Neelambur) for active disasters before paying you out.
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Select Coverage Plan</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {['Basic', 'Standard', 'Premium'].map(plan => (
                <div 
                  key={plan}
                  onClick={() => setInsurancePlan(plan)}
                  style={{ 
                    padding: '1rem 0.5rem', 
                    borderRadius: '12px', 
                    border: `2px solid ${insurancePlan === plan ? 'var(--primary-dark)' : 'var(--border-light)'}`,
                    background: insurancePlan === plan ? 'rgba(250, 204, 21, 0.1)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    transform: insurancePlan === plan ? 'translateY(-2px)' : 'none',
                    boxShadow: insurancePlan === plan ? '0 4px 12px rgba(250, 204, 21, 0.2)' : 'none'
                  }}>
                  <p style={{ fontWeight: 800, marginBottom: '0.25rem', color: insurancePlan === plan ? 'var(--primary-dark)' : 'var(--text-primary)' }}>{plan}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {plan === 'Basic' ? '1%' : plan === 'Standard' ? '2%' : '3%'} <span style={{opacity: 0.7}}>of Income</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ borderTop: '1px dashed var(--border-highlight)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Wallet size={14} color="var(--primary)" /> Base Premium ({insurancePlan})
              </p>
              <p style={{ fontWeight: 600, fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.2rem', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                ₹{basePremium} <span style={{fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600}}>/ wk</span>
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0 }}>
                Calculated strictly as <strong>{insurancePlan === 'Basic' ? '1%' : insurancePlan === 'Standard' ? '2%' : '3%'}</strong> of your ₹{weeklyIncome} income.
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Total Dynamic Premium</p>
              <p style={{ fontWeight: 800, fontSize: '2rem', color: 'var(--primary-dark)', margin: 0 }}>₹{totalPremium}<span style={{fontSize: '1rem', color: 'var(--text-secondary)'}}>/wk</span></p>
            </div>
          </div>
        </div>

        <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>UPI ID or Virtual Payment Address (VPA)</label>
            <input 
              type="text" 
              placeholder="username@upi" 
              required
              style={{ width: '100%', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-highlight)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '1.1rem', outline: 'none' }} 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isProcessing}
            className="btn-simulate" 
            style={{ width: '100%', justifyContent: 'center', padding: '1.25rem', fontSize: '1.2rem', background: isProcessing ? 'var(--text-tertiary)' : 'var(--success)', color: 'white', opacity: isProcessing ? 0.7 : 1 }}
          >
            {isProcessing ? 'Processing Payment...' : `Verify & Pay ₹${totalPremium}`}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-tertiary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <ShieldCheck size={16} /> Powered by MockPay Secure Gateway
        </div>
      </div>
    </div>
  );
}
