import React from 'react';
import { Phone, Ambulance, Hospital, LifeBuoy, ShieldAlert, PhoneCall, HeartPulse } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { PageTransition, StaggerContainer, StaggerItem } from '../components/PageTransition';
import { CardSkeleton } from '../components/Skeleton';
import HoldEmergencyButton from '../components/HoldEmergencyButton';
import { useFetch } from '../hooks/useFetch';
import { getEmergencyContacts } from '../services/emergencyService';
import { useLanguage } from '../context/LanguageContext';

const typeIcons = { ambulance: Ambulance, hospital: Hospital, helpline: LifeBuoy };
const typeLabels = { ambulance: 'Ambulance Unit', hospital: 'Emergency Hospital', helpline: '24/7 Helpline' };

const Emergency = () => {
  const { t } = useLanguage();
  const { data, loading } = useFetch(getEmergencyContacts, []);

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <ShieldAlert size={22} className="text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">{t('emergency', 'Emergency SOS & Dispatch')}</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Immediate access to rural ambulance services, government helplines, and instant GPS beacon broadcasting.
          </p>
        </div>

        {/* SOS Radar Hold Button & Hero Banner */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <HoldEmergencyButton />
          </div>

          <div className="md:col-span-2 flex flex-col justify-between p-6 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-2xl shadow-elevated relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 pointer-events-none">
              <HeartPulse size={200} />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> National Rural Ambulance
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold mt-3">Dial 108 Emergency</h3>
              <p className="text-sm text-red-100 mt-2 max-w-lg leading-relaxed">
                Toll-free emergency medical response service operated 24 hours across rural villages. Dispatches nearest available ambulance with oxygen and first-aid kits.
              </p>
            </div>

            <div className="pt-6 flex flex-wrap gap-3">
              <a
                href="tel:108"
                className="bg-white text-red-700 font-bold px-6 py-3 rounded-xl shadow hover:bg-red-50 active:scale-95 transition flex items-center gap-2 text-sm"
              >
                <PhoneCall size={18} /> Call 108 Now
              </a>
              <a
                href="tel:104"
                className="bg-red-700/80 hover:bg-red-700 text-white font-semibold px-4 py-3 rounded-xl border border-red-500/50 active:scale-95 transition flex items-center gap-2 text-sm"
              >
                <LifeBuoy size={16} /> 104 Health Advice Helpline
              </a>
            </div>
          </div>
        </div>

        <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>Local Emergency Contacts</span>
        </h3>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <StaggerContainer className="grid md:grid-cols-2 gap-4">
            {(data?.contacts || []).map((contact) => {
              const Icon = typeIcons[contact.type] || Phone;
              return (
                <StaggerItem key={contact._id}>
                  <a
                    href={`tel:${contact.phone}`}
                    className="card card-hover flex items-center gap-4 border border-gray-100 hover:border-red-200 transition group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-red-50 group-hover:bg-red-100 flex items-center justify-center shrink-0 transition">
                      <Icon size={22} className="text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm group-hover:text-red-600 transition truncate">
                        {contact.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {typeLabels[contact.type]}
                        {contact.address ? ` • ${contact.address}` : ''}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-extrabold text-primary group-hover:text-red-600 text-base">
                        {contact.phone}
                      </p>
                      <span className="text-[10px] text-gray-400 font-medium">Tap to call</span>
                    </div>
                  </a>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </PageTransition>
    </DashboardLayout>
  );
};

export default Emergency;
