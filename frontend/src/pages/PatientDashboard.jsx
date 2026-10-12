import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Bot, MapPin, Phone, ShieldAlert, ArrowRight, HeartHandshake } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import DashboardCard from '../components/DashboardCard';
import AppointmentCard from '../components/AppointmentCard';
import HealthTipCard from '../components/HealthTipCard';
import { PageTransition, StaggerContainer, StaggerItem } from '../components/PageTransition';
import { CardSkeleton, DashboardStatsSkeleton } from '../components/Skeleton';
import PillTracker from '../components/PillTracker';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { useLanguage } from '../context/LanguageContext';
import { getAppointments } from '../services/appointmentService';
import { getTips } from '../services/tipService';

const PatientDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { data: apptData, loading: apptLoading } = useFetch(getAppointments, []);
  const { data: tipData, loading: tipLoading } = useFetch(() => getTips(), []);

  const upcoming = (apptData?.appointments || []).filter((a) =>
    ['pending', 'confirmed', 'rescheduled'].includes(a.status)
  );

  return (
    <DashboardLayout>
      <PageTransition>
        {/* Welcome Hero Banner */}
        <div className="card bg-gradient-to-r from-primary to-primary-dark text-white mb-6 p-6 shadow-glow relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-6">
            <HeartHandshake size={140} />
          </div>
          <div className="relative z-10 max-w-xl">
            <h2 className="text-2xl font-bold">
              {t('welcomeBack')}, {user?.fullName?.split(' ')[0]} 👋
            </h2>
            <p className="text-sm text-emerald-100 mt-1 leading-relaxed">
              {t('healthOverview', "Here's an overview of your health at a glance.")}
            </p>
          </div>
        </div>

        {/* Medication Routine / Pill Tracker Widget */}
        <div className="mb-6">
          <PillTracker />
        </div>

        {/* Stat Metric Cards */}
        {apptLoading ? (
          <DashboardStatsSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Link to="/appointments" className="block hover:-translate-y-0.5 transition-transform">
              <DashboardCard
                icon={Calendar}
                label={t('upcomingAppointments', 'Appointments')}
                value={upcoming.length}
              />
            </Link>
            <Link to="/records" className="block hover:-translate-y-0.5 transition-transform">
              <DashboardCard
                icon={FileText}
                label={t('records', 'Medical Records')}
                value="View"
                accentColor="text-blue-600"
              />
            </Link>
            <Link to="/ai-assistant" className="block hover:-translate-y-0.5 transition-transform">
              <DashboardCard
                icon={Bot}
                label={t('aiAssistant', 'AI Assistant')}
                value="Ask"
                accentColor="text-purple-600"
              />
            </Link>
            <Link to="/emergency" className="block hover:-translate-y-0.5 transition-transform">
              <DashboardCard
                icon={Phone}
                label={t('emergency', 'Emergency')}
                value="108"
                accentColor="text-red-600"
              />
            </Link>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column: Appointments and Quick Actions */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-sm">{t('upcomingAppointments')}</h3>
              <Link to="/appointments" className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
                View all <ArrowRight size={13} />
              </Link>
            </div>

            {apptLoading ? (
              <CardSkeleton />
            ) : upcoming.length === 0 ? (
              <div className="card text-center py-8 text-sm text-gray-500 border border-dashed border-gray-200">
                <p>No upcoming appointments.</p>
                <Link to="/appointments" className="btn-primary inline-block text-xs mt-3">
                  {t('bookAppointment', 'Book an Appointment')}
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {upcoming.slice(0, 2).map((appt) => (
                  <AppointmentCard key={appt._id} appointment={appt} viewerRole="patient" />
                ))}
              </div>
            )}

            {/* Quick Actions Grid */}
            <div className="pt-2">
              <h3 className="font-bold text-gray-800 text-sm mb-3">{t('quickActions', 'Quick Actions')}</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/health-centers"
                  className="card card-hover flex items-center gap-3 p-4 border border-gray-100 hover:border-primary/40"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-800 block">{t('nearbyCenters', 'Health Centers')}</span>
                    <span className="text-[11px] text-gray-400">Map & distance</span>
                  </div>
                </Link>

                <Link
                  to="/emergency"
                  className="card card-hover flex items-center gap-3 p-4 border border-gray-100 hover:border-red-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                    <ShieldAlert size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-800 block">{t('emergency', 'Emergency SOS')}</span>
                    <span className="text-[11px] text-gray-400">Ambulance & 108</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Health Tips */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-sm">{t('healthTips', 'Health Tips')}</h3>
              <Link to="/health-tips" className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
                More <ArrowRight size={13} />
              </Link>
            </div>

            {tipLoading ? (
              <div className="space-y-3">
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : (
              <div className="space-y-3">
                {(tipData?.tips || []).slice(0, 3).map((tip) => (
                  <HealthTipCard key={tip._id} tip={tip} />
                ))}
              </div>
            )}
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default PatientDashboard;
