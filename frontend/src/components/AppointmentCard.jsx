import React from 'react';
import { Calendar, Clock, User, X, Edit2 } from 'lucide-react';
import { formatDate, statusColor } from '../utils/formatters';

const AppointmentCard = ({ appointment, viewerRole, onCancel, onReschedule }) => {
  const personLabel = viewerRole === 'doctor' ? appointment.patient?.fullName : `Dr. ${appointment.doctor?.fullName}`;
  const subLabel = viewerRole === 'doctor' ? appointment.patient?.phone : appointment.doctor?.specialization;

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            <User size={18} className="text-primary" />
          </div>
          <div>
            <p className="font-medium">{personLabel}</p>
            <p className="text-xs text-gray-500">{subLabel}</p>
          </div>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusColor(appointment.status)}`}>
          {appointment.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mt-3">{appointment.reason}</p>

      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Calendar size={14} /> {formatDate(appointment.date)}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} /> {appointment.timeSlot}
        </span>
      </div>

      {(onCancel || onReschedule) && appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
        <div className="flex gap-2 mt-4">
          {onReschedule && (
            <button
              onClick={() => onReschedule(appointment)}
              className="text-sm flex items-center gap-1 text-primary hover:underline"
            >
              <Edit2 size={14} /> Reschedule
            </button>
          )}
          {onCancel && (
            <button
              onClick={() => onCancel(appointment._id)}
              className="text-sm flex items-center gap-1 text-red-600 hover:underline"
            >
              <X size={14} /> Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
