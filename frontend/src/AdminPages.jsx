import React from 'react';

const registeredWorkers = [
  { id: 'GW-001', name: 'Kumar R.', platform: 'Swiggy', phone: '+91 98765 43210', zone: 'Coimbatore', aadhaar: 'XXXX-XXXX-4512', pan: 'ABCDE1234F', dl: 'TN38-20210045123', vehicle: 'TN38-BX-4419', bank: 'SBI XXXX4821', upi: 'kumar.r@oksbi', plan: 'Max Elite', status: 'Active', joined: 'Oct 01, 2026' },
  { id: 'GW-002', name: 'Ravi K.', platform: 'Zomato', phone: '+91 87654 32109', zone: 'Bangalore Core', aadhaar: 'XXXX-XXXX-8821', pan: 'FGHIJ5678K', dl: 'KA05-20190088412', vehicle: 'KA05-MN-7712', bank: 'HDFC XXXX3301', upi: 'ravikumar@okhdfc', plan: 'Standard Pro', status: 'Active', joined: 'Sep 28, 2026' },
  { id: 'GW-003', name: 'Priya S.', platform: 'Swiggy', phone: '+91 76543 21098', zone: 'Chennai Central', aadhaar: 'XXXX-XXXX-3301', pan: 'KLMNO9012P', dl: 'TN09-20220011987', vehicle: 'TN09-CD-8890', bank: 'ICICI XXXX2241', upi: 'priya.s@okicici', plan: 'Basic Shield', status: 'Suspended', joined: 'Sep 15, 2026' },
  { id: 'GW-004', name: 'Arjun M.', platform: 'Swiggy', phone: '+91 65432 10987', zone: 'Coimbatore', aadhaar: 'XXXX-XXXX-6677', pan: 'QRSTU3456V', dl: 'TN38-20180067234', vehicle: 'TN38-GH-2290', bank: 'Axis XXXX9987', upi: 'arjun.m@axisbank', plan: 'Standard Pro', status: 'Active', joined: 'Oct 10, 2026' },
  { id: 'GW-005', name: 'Sneha R.', platform: 'Zomato', phone: '+91 54321 09876', zone: 'Hyderabad West', aadhaar: 'XXXX-XXXX-2290', pan: 'VWXYZ7890A', dl: 'TS08-20230099001', vehicle: 'TS08-PQ-6612', bank: 'SBI XXXX1120', upi: 'sneha.r@oksbi', plan: 'Max Elite', status: 'Active', joined: 'Oct 14, 2026' },
];

const liveWorkers = [
  { id: 'GW-001', name: 'Kumar R.', zone: 'Neelambur, Coimbatore', platform: 'Swiggy', orders: 8, status: 'Delivering', risk: 'Low', earnings: '₹640' },
  { id: 'GW-004', name: 'Arjun M.', zone: 'RS Puram, Coimbatore', platform: 'Swiggy', orders: 4, status: 'Idle', risk: 'Medium', earnings: '₹320' },
  { id: 'GW-002', name: 'Ravi K.', zone: 'Koramangala, Bangalore', platform: 'Zomato', orders: 12, status: 'Delivering', risk: 'High', earnings: '₹960' },
  { id: 'GW-005', name: 'Sneha R.', zone: 'Banjara Hills, Hyderabad', platform: 'Zomato', orders: 6, status: 'Delivering', risk: 'Low', earnings: '₹480' },
];

// --- ADMIN: REGISTERED WORKERS PAGE ---
export function AdminRegisteredWorkers() {
  const [expanded, setExpanded] = React.useState(null);
  return (
    <div className="dashboard-grid">
      <div className="glass-panel animate" style={{ gridColumn: 'span 12' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 className="card-title" style={{ margin: 0 }}>
            Registered Gig Workers&nbsp;
            <span style={{ background: 'var(--primary)', color: 'white', borderRadius: '20px', padding: '2px 12px', fontSize: '0.85rem' }}>{registeredWorkers.length}</span>
          </h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>KYC Verified Documents</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Worker ID</th>
              <th>Name</th>
              <th>Platform</th>
              <th>Phone</th>
              <th>Zone</th>
              <th>Active Plan</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Documents</th>
            </tr>
          </thead>
          <tbody>
            {registeredWorkers.map(w => (
              <React.Fragment key={w.id}>
                <tr style={{ cursor: 'pointer' }} onClick={() => setExpanded(expanded === w.id ? null : w.id)}>
                  <td><strong>{w.id}</strong></td>
                  <td style={{ fontWeight: 700 }}>{w.name}</td>
                  <td>{w.platform}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{w.phone}</td>
                  <td>{w.zone}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: w.plan === 'Max Elite' ? 'var(--warning)' : w.plan === 'Standard Pro' ? 'var(--primary)' : 'var(--text-secondary)' }}>
                      {w.plan}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${w.status === 'Active' ? 'success' : 'danger'}`}>{w.status}</span>
                  </td>
                  <td style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>{w.joined}</td>
                  <td>
                    <button style={{ background: 'transparent', border: '1px solid var(--border-highlight)', color: 'var(--primary)', padding: '0.3rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}>
                      {expanded === w.id ? 'Hide ▲' : 'View ▼'}
                    </button>
                  </td>
                </tr>
                {expanded === w.id && (
                  <tr>
                    <td colSpan={9}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', padding: '1.25rem', background: 'var(--bg-base)', borderRadius: '10px', margin: '0.25rem 0' }}>
                          {/* Row 1 */}
                          <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-highlight)' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginBottom: '0.4rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>📋 Aadhaar Card</p>
                            <p style={{ fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>{w.aadhaar}</p>
                            <span className="badge success">Verified</span>
                          </div>
                          <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-highlight)' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginBottom: '0.4rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>🪪 PAN Card</p>
                            <p style={{ fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>{w.pan}</p>
                            <span className="badge success">Verified</span>
                          </div>
                          <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-highlight)' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginBottom: '0.4rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>🚗 Driving Licence</p>
                            <p style={{ fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>{w.dl}</p>
                            <span className="badge success">Verified</span>
                          </div>
                          {/* Row 2 */}
                          <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-highlight)' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginBottom: '0.4rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>🛵 Vehicle Registration</p>
                            <p style={{ fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>{w.vehicle}</p>
                            <span className="badge success">Verified</span>
                          </div>
                          <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-highlight)' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginBottom: '0.4rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>🏦 Bank Account</p>
                            <p style={{ fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.25rem' }}>{w.bank}</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem' }}>UPI: {w.upi}</p>
                            <span className="badge success">Linked</span>
                          </div>
                          <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-highlight)' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginBottom: '0.4rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>📸 Profile Photo</p>
                            <p style={{ fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>selfie_kyc_{w.id.toLowerCase()}.jpg</p>
                            <span className="badge success">Uploaded</span>
                          </div>
                        </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- ADMIN: LIVE WORKERS PAGE ---
export function AdminLiveWorkers() {
  const delivering = liveWorkers.filter(w => w.status === 'Delivering').length;
  const idle = liveWorkers.filter(w => w.status === 'Idle').length;
  return (
    <div className="dashboard-grid">
      <div className="glass-panel animate status-card" style={{ gridColumn: 'span 3', background: 'linear-gradient(135deg, rgba(34,197,94,0.1), transparent)' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '0.5rem' }}>Total Live Online</p>
        <p style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--success)', margin: 0, lineHeight: 1 }}>{liveWorkers.length}</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>GigShield-covered &amp; Active</p>
      </div>
      <div className="glass-panel animate status-card" style={{ gridColumn: 'span 3', background: 'linear-gradient(135deg, rgba(37,99,235,0.1), transparent)' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '0.5rem' }}>Currently Delivering</p>
        <p style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', margin: 0, lineHeight: 1 }}>{delivering}</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>Orders in progress</p>
      </div>
      <div className="glass-panel animate status-card" style={{ gridColumn: 'span 3', background: 'linear-gradient(135deg, rgba(245,158,11,0.1), transparent)' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '0.5rem' }}>Idle / Waiting</p>
        <p style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--warning)', margin: 0, lineHeight: 1 }}>{idle}</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>Available for orders</p>
      </div>
      <div className="glass-panel animate status-card" style={{ gridColumn: 'span 3', background: 'linear-gradient(135deg, rgba(239,68,68,0.1), transparent)' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '0.5rem' }}>High Risk Zones</p>
        <p style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent)', margin: 0, lineHeight: 1 }}>{liveWorkers.filter(w => w.risk === 'High').length}</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>Workers in alert zones</p>
      </div>

      <div className="glass-panel animate" style={{ gridColumn: 'span 12' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 className="card-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="pulse-alert" style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }}></span>
            Live Worker Feed
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Synced every 30 mins via Partner API</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Worker ID</th>
              <th>Name</th>
              <th>Platform</th>
              <th>Current Zone</th>
              <th>Orders Today</th>
              <th>Today's Earnings</th>
              <th>Zone Risk</th>
              <th>Live Status</th>
            </tr>
          </thead>
          <tbody>
            {liveWorkers.map(w => (
              <tr key={w.id}>
                <td><strong>{w.id}</strong></td>
                <td style={{ fontWeight: 700 }}>{w.name}</td>
                <td>{w.platform}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{w.zone}</td>
                <td style={{ fontWeight: 600 }}>{w.orders}</td>
                <td style={{ color: 'var(--success)', fontWeight: 700 }}>{w.earnings}</td>
                <td><span className={`badge ${w.risk === 'Low' ? 'success' : w.risk === 'Medium' ? 'warning' : 'danger'}`}>{w.risk}</span></td>
                <td><span className={`badge ${w.status === 'Delivering' ? 'success' : 'warning'}`}>{w.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
