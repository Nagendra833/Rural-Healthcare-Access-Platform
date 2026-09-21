// Populates the database with sample data so the app is usable immediately after setup.
// Run with: npm run seed
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const User = require('../models/User');
const Appointment = require('../models/Appointment');
const HealthTip = require('../models/HealthTip');
const EmergencyContact = require('../models/EmergencyContact');
const MedicalRecord = require('../models/MedicalRecord');

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Appointment.deleteMany({}),
      HealthTip.deleteMany({}),
      EmergencyContact.deleteMany({}),
      MedicalRecord.deleteMany({}),
    ]);

    console.log('Seeding users...');
    const admin = await User.create({
      fullName: 'Platform Admin',
      email: 'admin@ruralhealth.org',
      phone: '9999999999',
      password: 'Admin@123',
      role: 'admin',
    });

    const doctor = await User.create({
      fullName: 'Dr. Ananya Rao',
      email: 'doctor@ruralhealth.org',
      phone: '9876543210',
      password: 'Doctor@123',
      role: 'doctor',
      specialization: 'General Physician',
      isApproved: true,
      availabilityStatus: 'available',
    });

    const healthWorker = await User.create({
      fullName: 'Sunita Devi',
      email: 'worker@ruralhealth.org',
      phone: '9876500000',
      password: 'Worker@123',
      role: 'health_worker',
      assignedVillage: 'Rampur',
    });

    const patient = await User.create({
      fullName: 'Ramesh Kumar',
      email: 'patient@ruralhealth.org',
      phone: '9123456789',
      password: 'Patient@123',
      role: 'patient',
      gender: 'male',
      address: 'Rampur Village, Dist. Sitapur',
    });

    console.log('Seeding appointments...');
    await Appointment.create({
      patient: patient._id,
      doctor: doctor._id,
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      timeSlot: '10:00 AM - 10:30 AM',
      reason: 'Persistent cough and mild fever',
      status: 'confirmed',
    });

    console.log('Seeding health tips...');
    await HealthTip.insertMany([
      {
        title: 'Drink Clean, Safe Water',
        content: 'Always boil or filter water before drinking to prevent waterborne diseases like diarrhea and typhoid.',
        category: 'general',
      },
      {
        title: 'Eat a Balanced Diet',
        content: 'Include seasonal vegetables, fruits, whole grains, and pulses in every meal for better immunity.',
        category: 'nutrition',
      },
      {
        title: 'Antenatal Checkups Matter',
        content: 'Pregnant women should attend at least 4 antenatal checkups to monitor the health of mother and baby.',
        category: 'maternal_care',
      },
      {
        title: 'Exclusive Breastfeeding',
        content: 'Babies should be exclusively breastfed for the first 6 months for optimal growth and immunity.',
        category: 'child_healthcare',
      },
      {
        title: "Don't Miss Vaccination Dates",
        content: 'Follow the government immunization schedule closely and keep the vaccination card updated.',
        category: 'vaccination',
      },
    ]);

    console.log('Seeding emergency contacts...');
    await EmergencyContact.insertMany([
      { name: 'National Ambulance Service', type: 'ambulance', phone: '108', region: 'All' },
      { name: 'District General Hospital', type: 'hospital', phone: '01234-567890', address: 'Main Road, Sitapur', region: 'Rampur' },
      { name: 'National Health Helpline', type: 'helpline', phone: '104', region: 'All' },
    ]);

    console.log('\nSeed complete! Sample login credentials:');
    console.log('  Admin:         admin@ruralhealth.org / Admin@123');
    console.log('  Doctor:        doctor@ruralhealth.org / Doctor@123');
    console.log('  Health Worker: worker@ruralhealth.org / Worker@123');
    console.log('  Patient:       patient@ruralhealth.org / Patient@123');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
