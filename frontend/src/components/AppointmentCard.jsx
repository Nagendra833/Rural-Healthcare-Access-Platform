import React from 'react';
import { Calendar, Clock, User, X, Edit2, Video, Phone } from 'lucide-react';
import { formatDate, statusColor } from '../utils/formatters';

const AppointmentCard = ({ appointment, viewerRole, onCancel, onReschedule, onJoinCall }) => {
  const docDisplayName = appointment.doctor?.fullName || appointment.doctorName || 'Doctor';
  const personLabel =
    viewerRole === 'doctor'
      ? appointment.patient?.fullName
      : docDisplayName.startsWith('Dr.')
      ? docDisplayName
      : `Dr. ${docDisplayName}`;

  const subLabel =
    viewerRole === 'doctor'
      ? appointment.patient?.phone
      : appointment.doctor?.specialization || 'General Physician';

  const canJoinCall = ['confirmed', 'rescheduled', 'pending'].includes(appointment.status);

  return (
    <div className="card card-hover border border-gray-100 hover:border-primary/40 transition">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <User size={18} className="text-primary" />
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900">{personLabel}</p>
            <p className="text-xs text-gray-500">{subLabel}</p>
          </div>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${statusColor(appointment.status)}`}>
          {appointment.status}
        </span>
      </div>

      <p className="text-xs text-gray-600 mt-3 bg-surface p-2.5 rounded-lg border border-gray-100">
        <span className="font-medium text-gray-700">Reason:</span> {appointment.reason || 'General Health Consultation'}
      </p>

      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Calendar size={13} /> {formatDate(appointment.date)}
        </span>
        <span className="flex items-center gap-1 font-medium text-gray-700">
          <Clock size={13} /> {appointment.timeSlot}
        </span>
      </div>

      {/* Action buttons including Telemedicine video room */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-gray-100">
        {canJoinCall && onJoinCall ? (
          <button
            onClick={() => onJoinCall(appointment)}
            className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
          >
            <Video size={13} /> Join Video Call
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-3 text-xs">
          {onReschedule && appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
            <button
              onClick={() => onReschedule(appointment)}
              className="flex items-center gap-1 text-primary hover:underline font-medium"
            >
              <Edit2 size={13} /> Reschedule
            </button>
          )}
          {onCancel && appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
            <button
              onClick={() => onCancel(appointment._id)}
              className="flex items-center gap-1 text-red-600 hover:underline font-medium"
            >
              <X size={13} /> Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
