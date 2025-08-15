// data.js

const appointments = [
  {
    patientName: "John Doe",
    appointmentDate: "2025-08-12",
    doctorName: "Dr. Emily Smith",
    reason: "General Checkup",
    files: [
      {
        filename: "blood_report.pdf",
        fileUrl: "https://example.com/files/blood_report.pdf",
        uploadedAt: new Date("2025-08-08T10:30:00Z"),
      },
      {
        filename: "xray_chest.png",
        fileUrl: "https://example.com/files/xray_chest.png",
        uploadedAt: new Date("2025-08-08T11:00:00Z"),
      },
    ],
  },
  {
    patientName: "Alice Johnson",
    appointmentDate: "2025-08-15",
    doctorName: "Dr. Robert Brown",
    reason: "Knee Pain",
    files: [
      {
        filename: "mri_knee_scan.jpg",
        fileUrl: "https://example.com/files/mri_knee_scan.jpg",
        uploadedAt: new Date("2025-08-09T09:15:00Z"),
      },
    ],
  },
  {
    patientName: "Michael Lee",
    appointmentDate: "2025-08-18",
    doctorName: "Dr. Sarah Miller",
    reason: "Diabetes Consultation",
    files: [
      {
        filename: "blood_sugar_report.pdf",
        fileUrl: "https://example.com/files/blood_sugar_report.pdf",
        uploadedAt: new Date("2025-08-10T14:45:00Z"),
      },
      {
        filename: "diet_chart.pdf",
        fileUrl: "https://example.com/files/diet_chart.pdf",
        uploadedAt: new Date("2025-08-10T15:00:00Z"),
      },
    ],
  },
  {
    patientName: "Sophia Davis",
    appointmentDate: "2025-08-20",
    doctorName: "Dr. Kevin White",
    reason: "Eye Checkup",
    files: [
      {
        filename: "eye_test_results.pdf",
        fileUrl: "https://example.com/files/eye_test_results.pdf",
        uploadedAt: new Date("2025-08-11T13:25:00Z"),
      },
    ],
  },
];

module.exports = appointments;
