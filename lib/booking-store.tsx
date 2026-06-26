'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  calcBasePrice,
  calcExtraTaskPrice,
  SUPPLIES_FEE,
  HOME_OPTIONS,
} from './booking-catalog';

// Alias for backward compat
const SPACE_OPTIONS = HOME_OPTIONS;

// ─── Types ────────────────────────────────────────────────────────────────────

export type BookingType = 'self' | 'gift';

export type BookingService = {
  cleaningType: string | null;        // primary service id
  additionalServices: string[];       // standalone add-on ids
};

export type BookingSpace = {
  description: string;                // home type e.g. 'student', 'self-contained', '1-bed', 'laundry'
  bringSupplies: boolean;             // true = team brings supplies (+₦2,500)
};

export type BookingAddress = {
  full: string;
  landmark: string;
  accessPermission: 'access_code' | 'call_gate' | 'none';
  transportFee: number;
  area: string;
};

export type BookingSchedule = {
  preferredStaff: string | null;
  preferredGender: 'male' | 'female' | null;
  date: string;
  arrivalWindow: string;
  frequency: string;
  frequencyLabel: string;
};

export type ExtraTaskSelection = {
  taskId: string;
  quantity: number;
  frequency: string;
};

export type BookingFullPicture = {
  notes: string;
  additionalStaff: number;
};

export type BookingContact = {
  bookingForSomeoneElse: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export type BookingCheckout = {
  prepayMonths: 0 | 2 | 3;
  insurance: boolean;
};

export type Booking = {
  bookingType: BookingType | null;
  service: BookingService;
  space: BookingSpace | null;
  address: BookingAddress | null;
  schedule: BookingSchedule | null;
  extraTasks: ExtraTaskSelection[];
  fullPicture: BookingFullPicture;
  contact: BookingContact | null;
  checkout: BookingCheckout;
};

export type BookingTotals = {
  noOfBookings: number;
  basePrice: number;
  extraTasksPrice: number;
  insuranceFee: number;
  discount: number;
  transportFee: number;
  totalPayable: number;
  durationHrs: number;
  staffCount: number;
};

// ─── State & actions ──────────────────────────────────────────────────────────

const defaultBooking: Booking = {
  bookingType: null,
  service: { cleaningType: null, additionalServices: [] },
  space: null,
  address: null,
  schedule: null,
  extraTasks: [],
  fullPicture: { notes: '', additionalStaff: 0 },
  contact: null,
  checkout: { prepayMonths: 0, insurance: false },
};

type Action =
  | { type: 'SET_BOOKING_TYPE'; bookingType: BookingType }
  | { type: 'SET_SERVICE'; service: BookingService }
  | { type: 'SET_SPACE'; space: BookingSpace }
  | { type: 'SET_ADDRESS'; address: BookingAddress }
  | { type: 'SET_SCHEDULE'; schedule: BookingSchedule }
  | { type: 'SET_EXTRA_TASKS'; extraTasks: ExtraTaskSelection[] }
  | { type: 'SET_FULL_PICTURE'; fullPicture: BookingFullPicture }
  | { type: 'SET_CONTACT'; contact: BookingContact }
  | { type: 'SET_CHECKOUT'; checkout: BookingCheckout }
  | { type: 'RESET' };

function bookingReducer(state: Booking, action: Action): Booking {
  switch (action.type) {
    case 'SET_BOOKING_TYPE': return { ...state, bookingType: action.bookingType };
    case 'SET_SERVICE':      return { ...state, service: action.service };
    case 'SET_SPACE':        return { ...state, space: action.space };
    case 'SET_ADDRESS':      return { ...state, address: action.address };
    case 'SET_SCHEDULE':     return { ...state, schedule: action.schedule };
    case 'SET_EXTRA_TASKS':  return { ...state, extraTasks: action.extraTasks };
    case 'SET_FULL_PICTURE': return { ...state, fullPicture: action.fullPicture };
    case 'SET_CONTACT':      return { ...state, contact: action.contact };
    case 'SET_CHECKOUT':     return { ...state, checkout: action.checkout };
    case 'RESET':            return defaultBooking;
    default:                 return state;
  }
}

// ─── Totals calculation ───────────────────────────────────────────────────────

export function calcTotals(booking: Booking): BookingTotals {
  const { service, space, address, extraTasks, fullPicture, checkout } = booking;

  const spaceValue    = space?.description ?? '';
  const basePrice     = calcBasePrice(service.cleaningType, spaceValue);
  const suppliesFee   = space?.bringSupplies ? SUPPLIES_FEE : 0;
  const extraPrice    = extraTasks.reduce(
    (sum, t) => sum + calcExtraTaskPrice(t.taskId, t.quantity),
    0,
  );

  const subtotal       = basePrice + suppliesFee + extraPrice;
  const noOfBookings   = checkout.prepayMonths > 0 ? checkout.prepayMonths : 1;
  const insuranceFee   = checkout.insurance ? 1100 : 0;
  const discount       = 0;
  const transportFee   = address?.transportFee ?? 0;
  const totalPayable   = subtotal * noOfBookings + insuranceFee - discount + transportFee;

  const spaceOption    = SPACE_OPTIONS.find(s => s.value === spaceValue);
  const durationHrs    = spaceOption?.durationHrs ?? 0;
  const staffCount     = 1 + (fullPicture.additionalStaff ?? 0);

  return {
    noOfBookings,
    basePrice: subtotal,
    extraTasksPrice: extraPrice,
    insuranceFee,
    discount,
    transportFee,
    totalPayable,
    durationHrs,
    staffCount,
  };
}

// ─── Context ──────────────────────────────────────────────────────────────────

type BookingContextType = {
  booking: Booking;
  totals: BookingTotals;
  dispatch: React.Dispatch<Action>;
};

const BookingContext = createContext<BookingContextType | null>(null);

const STORAGE_KEY = 'czysty_booking_v2';

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [booking, dispatch] = useReducer(bookingReducer, defaultBooking, (initial) => {
    if (typeof window === 'undefined') return initial;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...initial, ...JSON.parse(saved) } : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
    } catch { /* storage unavailable */ }
  }, [booking]);

  const totals = calcTotals(booking);

  return (
    <BookingContext.Provider value={{ booking, totals, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
