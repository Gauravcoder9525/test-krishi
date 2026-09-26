import React from 'react';
import { FileCheck, ArrowLeft, AlertCircle, Scale, ShieldCheck } from 'lucide-react';

export default function TermsOfServiceTab({ lang = 'en', setActiveTab }) {
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
            <Scale className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isHi ? 'सेवा की शर्तें' : 'User Agreement'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isHi ? 'सेवा की शर्तें (Terms of Service)' : 'Terms of Service'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isHi 
              ? 'प्रभावी तिथि: 26 सितंबर 2026 • कृषि मंच उपयोग नियमावली'
              : 'Effective Date: September 26, 2026 • Agricultural Decision Support System Rules'}
          </p>
        </div>
      </div>

      {/* Terms Sections */}
      <div className="space-y-6 text-sm leading-relaxed text-slate-700">
        
        {/* Section 1 */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-700" />
            <span>{isHi ? '1. सेवा का दायरा एवं उद्देश्य' : '1. Scope of Agricultural Advisory'}</span>
          </h2>
          <p>
            {isHi
              ? 'कृषि प्लेटफॉर्म भारतीय किसानों और कृषि उत्पादकों को वैज्ञानिक दिशानिर्देश, मौसम आधारित छिड़काव सलाह, मिट्टी परीक्षण और पादप रोग निदान सहायता प्रदान करता है।'
              : 'The Krishi platform provides decision-support tools for Indian farmers, including plant disease diagnosis, soil classification, weather-based spray scheduling, and irrigation advisory.'}
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <span>{isHi ? '2. कृषि परामर्श एवं वैज्ञानिक अस्वीकरण' : '2. Agronomic Advisory & Scientific Disclaimer'}</span>
          </h2>
          <p>
            {isHi
              ? 'इस प्लेटफॉर्म पर उपलब्ध रोग निदान, खाद की मात्रा और छिड़काव की सिफारिशें भारतीय कृषि अनुसंधान परिषद (ICAR), कृषि विज्ञान केंद्रों (KVK) और मानक कृषि दिशानिर्देशों पर आधारित हैं। तथापि:'
              : 'All diagnostic models, fertilizer dosages, and spray windows are modeled after ICAR, Krishi Vigyan Kendra (KVK), and accredited agricultural extension guidelines. However:'}
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>
              {isHi
                ? 'सिफारिशें केवल निर्णय सहायता के लिए हैं और स्थानीय कृषि विस्तार अधिकारी या प्रमाणित कृषि वैज्ञानिक के भौतिक निरीक्षण का विकल्प नहीं हैं।'
                : 'Recommendations serve as decision support and do not replace physical field inspection by certified local agronomists or block agriculture officers.'}
            </li>
            <li>
              {isHi
                ? 'कीटनाशक व कवकनाशी का प्रयोग करते समय हमेशा उत्पाद के लेबल पर दिए गए निर्माता के आधिकारिक निर्देशों और सुरक्षा नियमों का पालन करें।'
                : 'Users must always adhere to the registered chemical label instructions, personal protective equipment (PPE) guidelines, and statutory pre-harvest intervals (PHI).'}
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span>{isHi ? '3. मौसम एवं टेलीमेट्री डेटा सटीकता' : '3. Weather & Telemetry Data'}</span>
          </h2>
          <p>
            {isHi
              ? 'मौसम पूर्वानुमान उपग्रह और सार्वजनिक मौसम एपीआई से प्राप्त किए जाते हैं। स्थानीय सूक्ष्म-जलवायु (Micro-climate) और अप्रत्याशित मौसमी परिवर्तनों के कारण वास्तविक वर्षा या हवा की गति में भिन्नता हो सकती है।'
              : 'Weather forecasts and spray advisories rely on satellite grids and open meteorological telemetry. Micro-climate variations may occur, and farmers are advised to observe immediate local field conditions before chemical application.'}
          </p>
        </section>

        {/* Section 4 */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-700" />
            <span>{isHi ? '4. लागू कानून एवं क्षेत्राधिकार' : '4. Governing Law'}</span>
          </h2>
          <p>
            {isHi
              ? 'ये शर्तें भारत के कानूनों के अनुसार शासित होंगी। किसी भी विवाद का निपटारा नई दिल्ली, भारत स्थित सक्षम न्यायालयों के क्षेत्राधिकार में होगा।'
              : 'These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.'}
          </p>
        </section>

      </div>
    </div>
  );
}
