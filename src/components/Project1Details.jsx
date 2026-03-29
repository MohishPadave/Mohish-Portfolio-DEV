import React from 'react';

const Project1Details = () => {
  return (
    <div className="w-full h-full bg-[#f3f4f6] text-gray-900 overflow-y-auto pb-20 pt-8 text-left border-t border-transparent">
      {/* Page Container */}
      <div className="bg-white w-full max-w-5xl shadow-xl min-h-[100%] pb-16 mx-auto">
        
        {/* Main Header Box */}
        <div className="bg-black text-white rounded-t-lg mx-6 mt-6 p-10 flex flex-col md:flex-row justify-between items-stretch">
          <div className="flex flex-col justify-center w-full md:w-1/2 mb-8 md:mb-0">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xl font-medium tracking-wide">Facilities Tours & Travels</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter uppercase">
              Project<br/>Brief
            </h1>
            <p className="mt-6 text-gray-300 text-lg md:text-xl font-light uppercase tracking-widest">
              B2B Cab System
            </p>
            <p className="mt-4 text-sm text-gray-400 max-w-sm">
              From paper duty slips and phone calls to a real-time, four-role fleet management
              platform with automated invoicing, WhatsApp alerts, and Razorpay payments.
            </p>
          </div>
          
          <div className="w-full md:w-1/2 p-4 flex justify-end">
            <div className="w-full max-w-sm h-64 bg-gray-800 rounded-3xl overflow-hidden shadow-2xl relative">
              <img src="/assets/images/Projectsss/FTATProject.webp" alt="Datacircles B2B Cab System" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Info Rows */}
        <div className="mx-6 mt-8">
          <div className="bg-black text-white px-8 py-3 grid grid-cols-2 text-sm font-bold tracking-widest uppercase">
            <div>Category & Role</div>
            <div>Duration</div>
          </div>
          <div className="px-8 py-4 grid grid-cols-2 text-gray-800 font-medium border-b border-gray-200">
            <div>
              B2B SaaS Platform <span className="mx-2 text-gray-300">|</span> Lead Full-Stack Developer
            </div>
            <div className="flex gap-2 items-center">
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm border border-gray-200">
                4-6 Months
              </span>
              <span className="text-gray-500"> (2025-2026)</span>
            </div>
          </div>
        </div>

        {/* Section: The Problem */}
        <div className="mx-6 mt-12 mb-12">
          <div className="bg-black text-white px-8 py-4 mb-8">
            <h2 className="text-3xl font-bold uppercase tracking-wide">The Problem</h2>
          </div>
          
          <div className="px-8 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-black mb-4">When corporate fleet ops run on gut feel and paper slips</h3>
              <p className="text-gray-700 leading-relaxed text-lg max-w-3xl">
                B2B fleet management is deceptively complex. Every lost paper duty slip is lost revenue. 
                Every partial payment untracked is an accounting nightmare. Every phone-call booking is a dispatcher's cognitive load.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                  { title: 'Paper-based Duty Slips', body: 'Drivers losing physical duty slips meant extra KMs and billable hours disappeared with them — unbilled, unrecoverable.' },
                  { title: 'Manual Invoice Construction', body: 'Generating GST-compliant invoices with Indian Financial Year sequences manually consumed hours of accountant time per cycle.' },
                  { title: 'Zero Payment Visibility', body: 'Corporate clients paying ₹50,000 against ₹1,00,000 invoices left partial balances untracked — a ledger black hole.' },
                  { title: 'No Real-Time Communication', body: 'Booking confirmations, driver assignments, and OTP verification all happened over phone calls and WhatsApp chats — zero automation.' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
                  <h4 className="font-bold text-black mb-2 text-lg">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {[
                  { prefix: '~', value: '100', suffix: 'hrs', label: 'Wasted monthly on manual invoice construction and partial payment reconciliation' },
                  { prefix: '', value: '4', suffix: ' Roles', label: 'Super Admin, Admin, Driver, and Client — each with isolated permissions and distinct workflows' },
                  { prefix: '', value: '6', suffix: ' Integrations', label: 'Socket.IO · Twilio WhatsApp · SendGrid Email · Razorpay · Puppeteer PDFs · PostgreSQL Ledger' },
              ].map((stat, i) => (
                <div key={i} className="border border-black p-6 rounded-none flex flex-col items-center text-center">
                  <span className="text-4xl font-black text-black mb-2">{stat.prefix}{stat.value}<span className="text-xl">{stat.suffix}</span></span>
                  <span className="text-xs uppercase font-bold tracking-widest text-gray-500 mt-2 line-clamp-3">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden">
              <img src="/assets/images/Projectsss/ftatproblem.webp" alt="Problem Illustration" className="w-full mix-blend-multiply" />
            </div>
          </div>
        </div>

        {/* Section: RBAC Architecture */}
        <div className="mx-6 mt-12 mb-12 border-t border-gray-200">
          <div className="bg-black text-white px-8 py-4 my-8 relative -top-[1.1rem]">
            <h2 className="text-3xl font-bold uppercase tracking-wide">RBAC Architecture</h2>
          </div>
          
          <div className="px-8 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-black mb-4 uppercase">Four roles. Zero permission overlap.</h3>
              <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mb-8">
                Role-Based Access Control drives every decision in the system. Each actor sees only what they need — nothing more, nothing less.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                { tag: '01', title: 'Super Admin', headline: 'God-mode. Full system sovereignty.', desc: 'Creates and manages Admin accounts, controls system-wide configuration, payment gateway keys, and platform parameters. The Super Admin inherits all Admin capabilities plus the exclusive power to spin up or retire operator accounts.' },
                { tag: '02', title: 'Admin / Dispatcher', headline: 'The operational nerve centre.', desc: 'Manages the end-to-end daily operation: onboarding drivers and client companies, accepting/rejecting booking requests in real time, manually assigning driver+vehicle pairs, generating invoices, and bulk payment reconciliation.' },
                { tag: '03', title: 'Driver', headline: 'OTP-gated precision at every kilometer.', desc: 'Sees assigned trips with full client context. Initiates the two-OTP verification loop. Records odometer readings at both ends for billing accuracy.' },
                { tag: '04', title: 'Client', headline: 'Company employee or individual — two billing paths.', desc: 'Books rides with source, destination, date and time. Gets driver details via the portal and a WhatsApp confirmation. Participates in OTP-gated trip start and end.' },
              ].map((role, i) => (
                <div key={i} className="bg-gray-50 border border-t-4 border-black border-x-gray-200 border-b-gray-200 p-6 rounded-none">
                  <span className="text-black font-black text-2xl mb-2 opacity-20">{role.tag}</span>
                  <h4 className="font-bold text-black text-xl">{role.title}</h4>
                  <p className="font-bold text-gray-800 text-sm mb-3 mt-1">{role.headline}</p>
                  <p className="text-gray-600 text-sm">{role.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden">
              <img src="/assets/images/Projectsss/ftatworkflow.webp" alt="Role Workflow Architecture" className="w-full mix-blend-multiply" />
            </div>
          </div>
        </div>

        {/* Section: End-to-End Workflow */}
        <div className="mx-6 mt-12 mb-12 border-t border-gray-200">
          <div className="bg-black text-white px-8 py-4 my-8 relative -top-[1.1rem]">
            <h2 className="text-3xl font-bold uppercase tracking-wide">End-to-End Workflow</h2>
          </div>
          
          <div className="px-8 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-black mb-4 uppercase">Five steps. Zero manual handoffs.</h3>
              <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mb-8">
                Every stage of a trip lifecycle — from booking request to payment reconciliation — is automated, OTP-verified, and auditable.
              </p>
            </div>

            <div className="space-y-4">
              {[
                  { step: '01', title: 'Client Books a Ride', body: 'Client fills source, destination, date, time. Booking hits the DB as status: pending. Socket.IO fires a new_booking_request event to the Admin portal in real time.', tags: 'Socket.IO, PostgreSQL' },
                  { step: '02', title: 'Admin Accepts & Assigns', body: 'Admin sees the live request, selects an available driver and vehicle, and clicks Confirm. WhatsApp message fires to the client with details via Twilio.', tags: 'Socket.IO, Twilio WhatsApp' },
                  { step: '03', title: 'OTP-Gated Trip Start', body: 'Driver arrives and taps "Start Trip." A 6-digit Start OTP is sent to the client\'s phone. Client reads it to the driver.', tags: 'Twilio SMS, OTP Verification' },
                  { step: '04', title: 'OTP-Gated Trip End', body: 'At destination, driver taps "End Trip" and enters ending KMs. A 6-digit End OTP goes to the client. Duty slip auto-generated.', tags: 'Puppeteer PDF, SendGrid Email' },
                  { step: '05', title: 'Invoice & Payment', body: 'For company clients, Admin generates invoice at month-end. For individuals, Razorpay checkout is triggered immediately.', tags: 'Razorpay, GST Engine, Bulk Reconciliation' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-black flex items-center justify-center font-bold text-black bg-gray-50">{item.step}</div>
                  <div>
                    <h4 className="font-bold text-black text-lg mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{item.body}</p>
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-gray-100 px-2 py-1 rounded text-gray-500">{item.tags}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden">
              <img src="/assets/images/Projectsss/ftattechdiagram.webp" alt="Technical Diagram" className="w-full mix-blend-multiply" />
            </div>
          </div>
        </div>

        {/* Section: Integrations & Tech Challenges */}
        <div className="mx-6 mt-12 mb-12 border-t border-gray-200">
          <div className="bg-black text-white px-8 py-4 my-8 relative -top-[1.1rem]">
            <h2 className="text-3xl font-bold uppercase tracking-wide">Integrations & Tech</h2>
          </div>
          
          <div className="px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
                { name: 'Socket.IO', challenge: 'User needs real time updates on trip, Driver needs OTPs, Client needs confirmations, Admin needs trip updates.', fix: 'Implement WebSockets for OTPs, Trip Confirmation, Driver Assigned In-App Notifications, saving costs.' },
                { name: 'Twilio WhatsApp', challenge: 'Clients needed real-time driver details without checking the portal.', fix: 'Automated WhatsApp messages fire on driver assignment.' },
                { name: 'SendGrid & Puppeteer', challenge: 'Duty slips and invoices needed reliable delivery. They were just piles of papers.', fix: 'SendGrid delivers PDF attachments generated by Puppeteer — completely digitalizing paper trails.' },
                { name: 'Razorpay', challenge: '"Other" clients needed a frictionless payment path post-invoice.', fix: 'Order created server-side. Payment status webhooks update the bookings table atomically.' },
                { name: 'PostgreSQL Ledger', challenge: 'Binary paid/unpaid status fails when companies pay partially.', fix: 'Invoices track amount_paid and balance_due independently. Status moves only at true zero.' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
                <h4 className="font-bold text-black text-lg mb-4 pb-2 border-b border-gray-200">{item.name}</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-bold">Challenge</span>
                    <p className="text-gray-800 text-sm mt-1">{item.challenge}</p>
                  </div>
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-bold">Solution</span>
                    <p className="text-gray-800 text-sm mt-1">{item.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Billing Engine & Architecture */}
        <div className="mx-6 mt-12 mb-12 border-t border-gray-200">
          <div className="bg-black text-white px-8 py-4 my-8 relative -top-[1.1rem]">
            <h2 className="text-3xl font-bold uppercase tracking-wide">Core Infrastructure</h2>
          </div>
          
          <div className="px-8 space-y-12">
            
            {/* Billing Engine */}
            <div>
              <h3 className="text-2xl font-bold text-black mb-4 uppercase">The Intelligent Ledger System</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { title: 'One-to-Many Ledger', body: 'Invoices track amount_paid and balance_due independently. A ₹1L invoice receiving a ₹50K transfer stays open.' },
                    { title: 'Zero-Maintenance Indian FY', body: 'Invoice numbering (e.g. DC/INV/25-26/001) is computed dynamically from the UI date-picker — April 1 boundary logic.' },
                    { title: 'Dynamic GST', body: 'State code comparison determines local vs interstate tax split (CGST/SGST vs IGST) — automatically applied in every invoice.' },
                    { title: 'Package + Extras Billing', body: 'Supports 8hr/80km, 12hr/300km, or custom packages. Extra KMs, driver allowances, and tolls are line-itemised.' },
                ].map((item, i) => (
                  <div key={i} className="pl-4 border-l-2 border-black">
                    <h4 className="font-bold text-black mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture */}
            <div>
              <h3 className="text-2xl font-bold text-black mb-6 uppercase">Backend Built For Pressure</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <img src="/assets/images/Projectsss/ftatindividualinvoice.webp" alt="Individual Invoice Workflow" className="w-full object-contain mix-blend-multiply" />
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <img src="/assets/images/Projectsss/ftatmergedinvoice.webp" alt="Merged Invoice Workflow" className="w-full object-contain mix-blend-multiply" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'Real-Time Event Bus', body: 'Socket.IO rooms scoped per user role. Bidirectional, persistent.' },
                    { title: 'Merged + Individual Invoices', body: 'Invoice can be generated by merging many bookings into a single invoice or individually.' },
                    { title: 'Decoupled Duty Slips', body: 'Duty slips are denormalised snapshots — data is copied at trip-end, preserving billing data historically.' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-6">
                    <h4 className="font-bold text-black mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tech Stack */}
            <div>
              <h3 className="text-xl font-bold text-black mb-4 uppercase">Tech Stack</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { cat: 'Frontend', items: 'React.js, Vite, Tailwind CSS, Zustand, Socket.IO' },
                    { cat: 'Backend', items: 'Node.js, Express.js, Socket.IO, Sequelize, PostgreSQL' },
                    { cat: 'Integrations', items: 'Twilio, SendGrid, Razorpay, Puppeteer' },
                    { cat: 'Infrastructure', items: 'Linux VPS, Nginx, PM2, Git' },
                ].map((item, i) => (
                  <div key={i} className="bg-black text-white p-4">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 block mb-2">{item.cat}</span>
                    <p className="text-sm font-medium">{item.items}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Section: Key Learnings & Impact */}
        <div className="mx-6 mt-12 mb-12 border-t border-gray-200">
          <div className="bg-black text-white px-8 py-4 my-8 relative -top-[1.1rem]">
            <h2 className="text-3xl font-bold uppercase tracking-wide">Learnings & Impact</h2>
          </div>
          
          <div className="px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-black mb-4 uppercase">Architecture must respect edge cases</h3>
              <ul className="space-y-4">
                <li className="text-gray-700 text-sm"><strong className="text-black">GST Compliance is a UX problem:</strong> The system must tie invoice numbering to the UI date-picker's date — not the server timestamp. One off-by-day bug breaks an entire FY sequence.</li>
                <li className="text-gray-700 text-sm"><strong className="text-black">Ledgers, not toggles:</strong> Binary paid/unpaid flags fail immediately in B2B. A real accounting ledger tracking amount_paid and balance_due is non-negotiable.</li>
                <li className="text-gray-700 text-sm"><strong className="text-black">Infrastructure is part of the product:</strong> WebSocket Upgrade headers silently stripped by Nginx required deep server-level configuration.</li>
                <li className="text-gray-700 text-sm"><strong className="text-black">Offload aggregations to SQL:</strong> Dashboard KPIs cannot be computed in JavaScript on thousands of rows. Optimised SQL queries run in milliseconds.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-black mb-4 uppercase">What this actually changed</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col items-center text-center">
                  <span className="text-4xl font-black text-black mb-2">100%</span>
                  <span className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">Digital Traceability</span>
                  <p className="text-xs text-gray-600">OTP-verified e-signatures replaced paper duty slips entirely.</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col items-center text-center">
                  <span className="text-4xl font-black text-black mb-2">0</span>
                  <span className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">GST Errors</span>
                  <p className="text-xs text-gray-600">Safely backdate invoices across financial years without breaking sequence rules.</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col items-center text-center">
                  <span className="text-2xl font-black text-black mb-2">Real-Time</span>
                  <span className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">Accounting</span>
                  <p className="text-xs text-gray-600">Instant visibility into cash flow and trip P&L.</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col items-center text-center">
                  <span className="text-4xl font-black text-black mb-2">10x</span>
                  <span className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">Dispatcher Speed</span>
                  <p className="text-xs text-gray-600">Side-drawer booking UI eliminated page reloads.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Project1Details;
