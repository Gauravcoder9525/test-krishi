import React from 'react';
import { Shield, ArrowLeft, Lock, Database, Eye, FileText, CheckCircle } from 'lucide-react';

export default function PrivacyPolicyTab({ lang = 'en', setActiveTab }) {
  const isHi = lang === 'hi';

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-24 text-slate-800">
      
      {/* Back button & Header */}
      <div className="space-y-4">
        <button
          onClick={() => {
            setActiveTab('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isHi ? 'मुख्य पृष्ठ पर वापस जाएं' : 'Back to Home'}</span>
        </button>

        <div className="border-b border-slate-200 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
            <Shield className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isHi ? 'कानूनी एवं डेटा सुरक्षा' : 'Legal & Data Governance'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isHi ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isHi 
              ? 'अंतिम संशोधन: 26 सितंबर 2026 • डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP Act, 2023) के अनुरूप'
              : 'Last Updated: September 26, 2026 • Compliant with Digital Personal Data Protection Act (DPDP Act, 2023)'}
          </p>
        </div>
      </div>

      {/* Policy Content Sections */}
      <div className="space-y-6 text-sm leading-relaxed text-slate-700">
        
        {/* Section 1 */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-700" />
            <span>{isHi ? '1. हम कौन सा डेटा एकत्र करते हैं' : '1. Information We Collect'}</span>
          </h2>
          <p>
            {isHi
              ? 'कृषि प्लेटफॉर्म केवल वही कृषि संबंधी जानकारी एकत्र करता है जो आपको फसल स्वास्थ्य, मौसम सलाह और मिट्टी विश्लेषण प्रदान करने के लिए आवश्यक है:'
              : 'Krishi collects only agronomic and operational information strictly necessary to provide crop diagnosis, precision weather advisories, and soil health reports:'}
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>
              <strong>{isHi ? 'फसल व पत्ती की छवियां:' : 'Crop & Leaf Photographs:'}</strong> {isHi ? 'रोग पहचान के लिए उपयोगकर्ता द्वारा अपलोड की गई पत्ती या मिट्टी की तस्वीरें।' : 'Photographs captured or uploaded by you for disease or soil identification.'}
            </li>
            <li>
              <strong>{isHi ? 'भौगोलिक स्थिति (स्थान):' : 'Geographic Location:'}</strong> {isHi ? 'मौसम पूर्वानुमान एवं स्थानीय कृषि सलाह के लिए जिला, तहसील या जीपीएस निर्देशांक।' : 'District, tehsil, or device GPS coordinates used strictly for localized weather forecasts and agronomic spray windows.'}
            </li>
            <li>
              <strong>{isHi ? 'आईओटी एवं मिट्टी डेटा:' : 'Sensor & Soil Data:'}</strong> {isHi ? 'खेत में लगे सेंसर से प्राप्त तापमान, आर्द्रता और मिट्टी की नमी के आंकड़े।' : 'Telemetry parameters such as ambient temperature, humidity, and soil moisture transmitted via MQTT sensors.'}
            </li>
            <li>
              <strong>{isHi ? 'खाता जानकारी:' : 'Account Credentials:'}</strong> {isHi ? 'गूगल साइन-इन या फोन प्रमाणीकरण के माध्यम से प्राप्त नाम और ईमेल पता।' : 'Name and verified email address provided via Google Authentication.'}
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-700" />
            <span>{isHi ? '2. डेटा का उपयोग कैसे किया जाता है' : '2. How We Use Your Data'}</span>
          </h2>
          <p>
            {isHi
              ? 'आपके डेटा का उपयोग केवल निम्नलिखित प्रत्यक्ष कृषि सेवाओं के लिए किया जाता है:'
              : 'Your data is utilized strictly for direct agricultural advisory functions:'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-800 text-xs mb-1">{isHi ? 'रोग एवं मिट्टी निदान' : 'Diagnostic Analysis'}</h3>
              <p className="text-xs text-slate-600">{isHi ? 'अपलोड की गई पत्तियों में बीमारी की पहचान और उपचार सुझाव।' : 'Inference on uploaded imagery to identify leaf diseases and soil types.'}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-800 text-xs mb-1">{isHi ? 'छिड़काव एवं सिंचाई समय' : 'Spray & Water Scheduling'}</h3>
              <p className="text-xs text-slate-600">{isHi ? 'वर्षा और हवा के अनुसार सुरक्षित छिड़काव अवधि की गणना।' : 'Calculating safe chemical spray windows to prevent droplet runoff.'}</p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-700" />
            <span>{isHi ? '3. डेटा सुरक्षा और गोपनीयता गारंटी' : '3. Data Security & Storage'}</span>
          </h2>
          <p>
            {isHi
              ? 'हम किसानों के डेटा की पूर्ण सुरक्षा के लिए प्रतिबद्ध हैं:'
              : 'We adhere to stringent data protection standards:'}
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>
              <strong>{isHi ? 'कोई डेटा बिक्री नहीं:' : 'No Data Monetization:'}</strong> {isHi ? 'हम किसी भी तीसरे पक्ष या विज्ञापन नेटवर्क को आपका व्यक्तिगत या कृषि डेटा नहीं बेचते हैं।' : 'We do not sell, rent, or trade your personal or agronomic data to third-party advertisers.'}
            </li>
            <li>
              <strong>{isHi ? 'एन्क्रिप्शन:' : 'Encryption in Transit:'}</strong> {isHi ? 'सभी नेटवर्क संचार HTTPS एवं SSL/TLS एन्क्रिप्शन के माध्यम से सुरक्षित हैं।' : 'All communication between your device and our servers is secured with TLS 1.3.'}
            </li>
            <li>
              <strong>{isHi ? 'डेटा नियंत्रण:' : 'Farmer Ownership:'}</strong> {isHi ? 'आप किसी भी समय अपना खाता और सहेजा गया इतिहास हटाने का अनुरोध कर सकते हैं।' : 'You retain full ownership of your data and can request deletion of your telemetry records at any time.'}
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700" />
            <span>{isHi ? '4. संपर्क एवं शिकायत अधिकारी' : '4. Grievance Officer & Contact'}</span>
          </h2>
          <p>
            {isHi
              ? 'गोपनीयता या डेटा संबंधी किसी भी प्रश्न के लिए हमारे नोडल अधिकारी से संपर्क करें:'
              : 'For any privacy inquiries or data rights requests, contact our designated Grievance Officer:'}
          </p>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 font-mono text-slate-700">
            <p><strong>Krishi Support & Grievance Cell</strong></p>
            <p>Email: privacy@krishi-platform.in</p>
            <p>Jurisdiction: New Delhi, India</p>
          </div>
        </section>

      </div>
    </div>
  );
}
