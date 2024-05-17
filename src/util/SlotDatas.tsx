import { getFutureDate } from "../util/GetCurrentDateAndTIme";

const date_1 = getFutureDate(0)
const date_2 = getFutureDate(1)
const date_3 = getFutureDate(2)

export const availableShift = [
  {
    doctorId: "",
    date: date_1,
    methods: [
      { method: "In-Person Consultancy", status: true },
      { method: "Phone Consultancy", status: true },
      { method: "Video Consultancy", status: true },
    ],
    shifts: [
      {
          shift: "Morning",
          slots: [
            { time: "10:00 AM", status: true},
            { time: "10:15 AM", status: true},
            { time: "10:30 AM", status: true},
            { time: "10:45 AM", status: true},
            { time: "11:00 AM", status: true},
            { time: "11:15 AM", status: true},
            { time: "11:30 AM", status: true},
            { time: "11:45 AM", status: true},
          ],
        },
        {
          shift: "Afternoon",
          slots: [
            { time: "02:00 PM", status: true},
            { time: "02:15 PM", status: true},
            { time: "02:30 PM", status: true},
            { time: "02:45 PM", status: true},
            { time: "03:00 PM", status: true},
            { time: "03:15 PM", status: true},
            { time: "03:30 PM", status: true},
            { time: "03:45 PM", status: true},
          ],
        },
        {
          shift: "Evening",
          slots: [
            { time: "07:00 PM", status: true},
            { time: "07:15 PM", status: true},
            { time: "07:30 PM", status: true},
            { time: "07:45 PM", status: true},
            { time: "08:00 PM", status: true},
            { time: "08:15 PM", status: true},
            { time: "08:30 PM", status: true},
            { time: "08:45 PM", status: true},
          ],
        },
    ],
  },
  {
    date: date_2,
    methods: [
      { method: "In-Person Consultancy", status: true },
      { method: "Phone Consultancy", status: true },
      { method: "Video Consultancy", status: true },
    ],
    shifts: [
      {
        shift: "Morning",
        slots: [
          { time: "10:00 AM", status: true},
          { time: "10:15 AM", status: true},
          { time: "10:30 AM", status: true},
          { time: "10:45 AM", status: true},
          { time: "11:00 AM", status: true},
          { time: "11:15 AM", status: true},
          { time: "11:30 AM", status: true},
          { time: "11:45 AM", status: true},
        ],
      },
      {
        shift: "Afternoon",
        slots: [
          { time: "02:00 PM", status: true},
          { time: "02:15 PM", status: true},
          { time: "02:30 PM", status: true},
          { time: "02:45 PM", status: true},
          { time: "03:00 PM", status: true},
          { time: "03:15 PM", status: true},
          { time: "03:30 PM", status: true},
          { time: "03:45 PM", status: true},
        ],
      },
      {
        shift: "Evening",
        slots: [
          { time: "07:00 PM", status: true},
          { time: "07:15 PM", status: true},
          { time: "07:30 PM", status: true},
          { time: "07:45 PM", status: true},
          { time: "08:00 PM", status: true},
          { time: "08:15 PM", status: true},
          { time: "08:30 PM", status: true},
          { time: "08:45 PM", status: true},
        ],
      },
    ],
  },
  {
    date: date_3,
    methods: [
      { method: "In-Person Consultancy", status: true },
      { method: "Phone Consultancy", status: true },
      { method: "Video Consultancy", status: true },
    ],
    shifts: [
      {
          shift: "Morning",
          slots: [
            { time: "10:00 AM", status: true},
            { time: "10:15 AM", status: true},
            { time: "10:30 AM", status: true},
            { time: "10:45 AM", status: true},
            { time: "11:00 AM", status: true},
            { time: "11:15 AM", status: true},
            { time: "11:30 AM", status: true},
            { time: "11:45 AM", status: true},
          ],
        },
        {
          shift: "Afternoon",
          slots: [
            { time: "02:00 PM", status: true},
            { time: "02:15 PM", status: true},
            { time: "02:30 PM", status: true},
            { time: "02:45 PM", status: true},
            { time: "03:00 PM", status: true},
            { time: "03:15 PM", status: true},
            { time: "03:30 PM", status: true},
            { time: "03:45 PM", status: true},
          ],
        },
        {
          shift: "Evening",
          slots: [
            { time: "07:00 PM", status: true},
            { time: "07:15 PM", status: true},
            { time: "07:30 PM", status: true},
            { time: "07:45 PM", status: true},
            { time: "08:00 PM", status: true},
            { time: "08:15 PM", status: true},
            { time: "08:30 PM", status: true},
            { time: "08:45 PM", status: true},
          ],
        },
    ],
  },
];
