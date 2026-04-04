import React, { useState, useEffect, useCallback } from 'react';
import { Shield, AlertTriangle, CloudRain, Activity, CheckCircle, TrendingUp, AlertCircle, FileText, Download, ShieldCheck, User, Users, Lock, ChevronRight, UserPlus, Map, MapPin, Wallet, Bell, Play, LogOut, Sun, Wind, Thermometer, Droplets, Zap } from 'lucide-react';
import './index.css';

const API_BASE = 'http://localhost:8000';

export default function App() {
  const [user, setUser] = useState(null); // { id, name, phone, city, platform, weekly_income }
  const [activePolicy, setActivePolicy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [view, setView] = useState('auth'); // 'auth', 'register', 'dashboard'

  const fetchActivePolicy = useCallback(async (userId) => {
    if (!userId) return;
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/policies`);
      if (res.ok) {
        const data = await res.json();
        const active = data.find(p => p.active_status);
        setActivePolicy(active);
      }
    } catch (err) {
      console.error("Error fetching policy:", err);
    }
  }, []);

  // Persistent user session
  useEffect(() => {
    const savedUser = localStorage.getItem('gs_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setView('dashboard');
      fetchActivePolicy(parsedUser.id);
    }
  }, [fetchActivePolicy]);

  const handleLogout = () => {
    localStorage.removeItem('gs_user');
    setUser(null);
    setActivePolicy(null);
    setView('auth');
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('gs_user', JSON.stringify(userData));
    setView('dashboard');
    fetchActivePolicy(userData.id);
  };

  return (
    <div className="app-container">
      {view === 'auth' && <LoginScreen setView={setView} onLogin={handleLoginSuccess} />}
      {view === 'register' && <RegisterScreen setView={setView} onLogin={handleLoginSuccess} />}
      
      {view === 'dashboard' && user && (
        <>
          {/* Sidebar Navigation */}
          <aside className="sidebar">
            <div className="logo logo-text">
              <ShieldCheck size={32} color="var(--primary-dark)" />
              Kavach AI
            </div>
            
            <nav className="nav-menu">
              <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                <Activity size={20} /> My Dashboard
              </div>
              <div className={`nav-item ${activeTab === 'policy' ? 'active' : ''}`} onClick={() => setActiveTab('policy')}>
                <Shield size={20} /> Policy & Protection
              </div>
              <div className={`nav-item ${activeTab === 'claims' ? 'active' : ''}`} onClick={() => setActiveTab('claims')}>
                <Wallet size={20} /> Payout History
              </div>
            </nav>

            <div style={{ marginTop: 'auto' }}>
               <div className="user-mini-profile" style={{ padding: '1rem', borderRadius: '12px', background: 'var(--bg-base)', marginBottom: '1rem', border: '1px solid var(--border-light)' }}>
                <p style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{user.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user.platform} • {user.city}</p>
              </div>
              <div className="nav-item" onClick={handleLogout} style={{ color: 'var(--accent)' }}>
                <LogOut size={20} /> Logout
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="main-content">
            <header className="header animate">
              <div>
                <h1>{activeTab === 'dashboard' ? 'Live Monitoring' : activeTab === 'policy' ? 'Insurance Policy' : 'Payout History'}</h1>
                <p style={{ color: 'var(--text-muted)' }}>
                  {activeTab === 'dashboard' ? 'Real-time risk assessment and disruption monitoring.' : activeTab === 'policy' ? 'Calculate premium and activate your parametric shield.' : 'Review your automated income recovery payouts.'}
                </p>
              </div>
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', padding: '0.6rem 1.25rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(34, 197, 94, 0.05)' }}>
                <Activity size={18} className="pulse-alert" /> System Online
              </div>
            </header>

            {activeTab === 'dashboard' && <WorkerDashboard user={user} activePolicy={activePolicy} refreshPolicy={() => fetchActivePolicy(user.id)} />}
            {activeTab === 'policy' && <PolicyManager user={user} activePolicy={activePolicy} refreshPolicy={() => fetchActivePolicy(user.id)} />}
            {activeTab === 'claims' && <ClaimsHistory user={user} />}
          </main>
        </>
      )}
    </div>
  );
}

// --- AUTH COMPONENTS ---

function LoginScreen({ setView, onLogin }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/users/phone/${phone}`);
      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      onLogin(data);
    } catch (err) {
      setError('User not found. Please register.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="glass-panel animate login-box" style={{ maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <ShieldCheck size={64} color="var(--primary-dark)" style={{ marginBottom: '1rem' }} />
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontWeight: 800 }}>Kavach AI</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Parametric Income Protection</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Phone Number</label>
            <input 
              type="tel" 
              placeholder="Enter Registered Phone" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required 
              style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border-highlight)', background: 'var(--bg-base)' }} 
            />
          </div>
          
          {error && <p style={{ color: 'var(--accent)', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}
          
          <button type="submit" disabled={loading} className="btn-simulate" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
          New to Kavach? <span style={{ color: 'var(--primary-dark)', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setView('register')}>Register Now</span>
        </p>
      </div>
    </div>
  );
}

function RegisterScreen({ setView, onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Chennai',
    gig_platform: 'Swiggy',
    weekly_income: 7000
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Registration failed');
      const data = await res.json();
      onLogin(data);
    } catch (err) {
      alert('Registration failed. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="glass-panel animate login-box" style={{ maxWidth: '500px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <UserPlus size={48} color="var(--primary-dark)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Join Kavach AI</h2>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Full Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-highlight)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Phone Number</label>
            <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-highlight)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>City</label>
              <select value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-highlight)' }}>
                <option>Chennai</option>
                <option>Bangalore</option>
                <option>Coimbatore</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Platform</label>
              <select value={formData.gig_platform} onChange={(e) => setFormData({...formData, gig_platform: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-highlight)' }}>
                <option>Swiggy</option>
                <option>Zomato</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Weekly Income (₹)</label>
            <input type="number" value={formData.weekly_income} onChange={(e) => setFormData({...formData, weekly_income: parseFloat(e.target.value)})} required style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-highlight)' }} />
          </div>
          
          <button type="submit" disabled={loading} className="btn-simulate" style={{ width: '100%', justifyContent: 'center', padding: '1rem', marginTop: '1rem', background: 'var(--primary-dark)' }}>
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
          Back to <span style={{ color: 'var(--primary-dark)', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setView('auth')}>Login</span>
        </p>
      </div>
    </div>
  );
}

// --- WORKER DASHBOARD ---

function WorkerDashboard({ user, activePolicy, refreshPolicy }) {
  const [notifications, setNotifications] = useState([]);

  const simulateEvent = async (type, value) => {
    try {
      const res = await fetch(`${API_BASE}/webhooks/simulate-trigger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, trigger_type: type, value })
      });
      const data = await res.json();
      
      if (data.status === 'Success') {
        const newNotif = {
          id: Date.now(),
          type: 'success',
          text: data.message,
          time: 'Just now'
        };
        setNotifications([newNotif, ...notifications]);
      } else {
         const newNotif = {
          id: Date.now(),
          type: 'warning',
          text: data.message,
          time: 'System check'
        };
        setNotifications([newNotif, ...notifications]);
      }
    } catch (err) {
      alert('Please activate your policy first!');
    }
  };

  return (
    <div className="dashboard-grid">
      {/* Live Status Card */}
      <div className="glass-panel animate" style={{ gridColumn: 'span 8', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: activePolicy ? '2px solid var(--success)' : '1px solid var(--border-light)' }}>
         <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
          <span className={`badge ${activePolicy ? 'success' : 'warning'}`} style={{ padding: '0.5rem 1rem' }}>
            ● {activePolicy ? 'POLICY ACTIVE' : 'NO ACTIVE POLICY'}
          </span>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <Activity size={64} color={activePolicy ? 'var(--success)' : 'var(--text-tertiary)'} style={{ marginBottom: '1.5rem' }} className={activePolicy ? 'pulse-alert' : ''} />
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Operating Zone: {user.city}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Risk Potential: <strong style={{ color: user.city === 'Chennai' ? 'var(--accent)' : user.city === 'Bangalore' ? 'var(--warning)' : 'var(--success)' }}>
              {user.city === 'Chennai' ? 'High' : user.city === 'Bangalore' ? 'Medium' : 'Low'}
            </strong>
          </p>
        </div>

        {activePolicy && (
          <div style={{ marginTop: '2rem', background: 'var(--bg-base)', padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-around' }}>
             <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Coverage</p>
                <p style={{ fontWeight: 800 }}>₹{activePolicy.coverage_amount}</p>
             </div>
             <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Weekly Premium</p>
                <p style={{ fontWeight: 800 }}>₹{activePolicy.weekly_premium}</p>
             </div>
          </div>
        )}
      </div>

      {/* Simulation Controls */}
      <div className="glass-panel animate" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Demo Triggers</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Simulate events to test auto-payouts.</p>
        
        <button onClick={() => simulateEvent('Heavy Rain', 120)} className="btn-simulate" style={{ background: '#3b82f6' }}>
          <CloudRain size={20} /> Simulate Heavy Rain
        </button>
        <button onClick={() => simulateEvent('Extreme Heat', 45)} className="btn-simulate" style={{ background: '#f59e0b' }}>
          <Thermometer size={20} /> Simulate Heat Wave
        </button>
        <button onClick={() => simulateEvent('Pollution', 400)} className="btn-simulate" style={{ background: '#64748b' }}>
          <Wind size={20} /> Simulate Toxic Air
        </button>
        <button onClick={() => simulateEvent('Order Drop', 5)} className="btn-simulate" style={{ background: '#ec4899' }}>
          <Droplets size={20} /> Simulate Order Drop
        </button>
        <button onClick={() => simulateEvent('Flood Alert', 1)} className="btn-simulate" style={{ background: '#ef4444' }}>
          <Zap size={20} /> Simulate Flood Alert
        </button>
      </div>

      {/* Live Alerts / Notifications */}
      <div className="glass-panel animate" style={{ gridColumn: 'span 12' }}>
         <h3 className="card-title">Live System Alerts</h3>
         <div className="alerts-list">
            {notifications.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '2rem' }}>No recent events detected in your zone.</p>
            ) : (
              notifications.map(n => (
                <div key={n.id} className={`alert-item ${n.type}`}>
                  <div className="alert-header">
                    <Activity size={16} /> {n.time}
                  </div>
                  <div className="alert-body">{n.text}</div>
                </div>
              ))
            )}
         </div>
      </div>
    </div>
  );
}

// --- POLICY MANAGER ---

function PolicyManager({ user, activePolicy, refreshPolicy }) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuote();
  }, [user]);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/policies/calculate-premium`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: user.city, weekly_income: user.weekly_income })
      });
      if (res.ok) {
        const data = await res.json();
        setQuote(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!quote) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/policies/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          weekly_premium: quote.premium,
          coverage_amount: quote.coverage
        })
      });
      if (res.ok) refreshPolicy();
    } catch (err) {
      alert('Subscription failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (activePolicy) {
    return (
      <div className="glass-panel animate" style={{ textAlign: 'center', padding: '4rem' }}>
        <CheckCircle size={80} color="var(--success)" style={{ marginBottom: '2rem' }} />
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Shield Active!</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem' }}>
          You are currently protected against weather and environmental disruptions in {user.city}.
        </p>
        <div style={{ background: 'var(--bg-base)', padding: '1.5rem', borderRadius: '16px', maxWidth: '400px', margin: '0 auto', border: '1px solid var(--border-light)' }}>
           <p style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Active Coverage: ₹{activePolicy.coverage_amount}</p>
           <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Expiry: {new Date(activePolicy.end_date).toLocaleDateString()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-grid">
      <div className="glass-panel animate" style={{ gridColumn: 'span 12', background: 'linear-gradient(135deg, var(--secondary) 0%, #1e293b 100%)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
           <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Weekly Parametric Quote</h2>
           <p style={{ color: 'rgba(255,255,255,0.7)' }}>Tailored for {user.platform} workers in {user.city}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
           <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Income Stability</p>
           <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>92.5/100</p>
        </div>
      </div>

      <div className="glass-panel animate" style={{ gridColumn: 'span 6', padding: '2.5rem' }}>
         <h3 style={{ marginBottom: '1.5rem' }}>Calculated Premium</h3>
         {loading ? <p>Calculating...</p> : quote && (
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <span>Risk Multiplier ({quote.risk_level})</span>
                <strong style={{ color: quote.risk_level === 'High' ? 'var(--accent)' : 'var(--success)' }}>
                  {quote.risk_level === 'High' ? 'x1.5' : quote.risk_level === 'Medium' ? 'x1.2' : 'x1.0'}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                 <span>Weekly Premium</span>
                 <strong style={{ fontSize: '2rem', color: 'var(--primary-dark)' }}>₹{quote.premium}</strong>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>* 1% of income adjusted for regional risk.</p>
           </div>
         )}
      </div>

      <div className="glass-panel animate" style={{ gridColumn: 'span 6', padding: '2.5rem' }}>
         <h3 style={{ marginBottom: '1.5rem' }}>Coverage Benefit</h3>
         {loading ? <p>Calculating...</p> : quote && (
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <span>Max Event Payout</span>
                <strong style={{ color: 'var(--success)', fontSize: '1.5rem' }}>₹{quote.coverage}</strong>
              </div>
              <div style={{ background: 'var(--bg-base)', padding: '1rem', borderRadius: '12px' }}>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                  When triggers like <strong>Rain &gt; 100mm</strong> occur, ₹{quote.coverage} will be credited instantly to your linked UPI.
                </p>
              </div>
              <button onClick={handleSubscribe} disabled={loading} className="btn-simulate" style={{ width: '100%', justifyContent: 'center', background: 'var(--success)' }}>
                Activate Policy Now
              </button>
           </div>
         )}
      </div>
    </div>
  );
}

// --- CLAIMS HISTORY ---

function ClaimsHistory({ user }) {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClaims();
    const interval = setInterval(fetchClaims, 5000); // Polling for demo: every 5s
    return () => clearInterval(interval);
  }, [user]);

  const fetchClaims = async () => {
    try {
      const res = await fetch(`${API_BASE}/webhooks/claims/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setClaims(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-grid">
      <div className="glass-panel animate" style={{ gridColumn: 'span 12' }}>
        <h3 className="card-title">Recovery Payouts</h3>
        {loading ? <p>Loading...</p> : claims.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-tertiary)' }}>No payouts recorded yet.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Event Date</th>
                <th>Status</th>
                <th>Coverage Payout</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {claims.map(claim => (
                <tr key={claim.id}>
                  <td>{new Date(claim.event_timestamp || Date.now()).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${claim.status === 'Paid' ? 'success' : claim.status === 'Processing' ? 'warning' : 'danger'}`}>
                      {claim.status}
                    </span>
                  </td>
                  <td><strong style={{ color: claim.status === 'Paid' ? 'var(--success)' : 'var(--text-primary)' }}>₹{claim.payout_amount}</strong></td>
                  <td>{claim.status === 'Paid' ? 'UPI (Instant)' : 'Pending Disruption End'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
