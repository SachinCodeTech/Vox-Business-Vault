export type UserRole = 'customer' | 'vendor' | 'admin';

export type Language = 'en' | 'gu' | 'hi';

export interface CityArea {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
  gujaratiName: string;
  hindiName: string;
  popular?: boolean;
  lat: number;
  lng: number;
  areas: string[];
}

export interface Subcategory {
  id: string;
  name: string;
  services: string[];
}

export interface Category {
  id: string;
  name: string;
  gujaratiName: string;
  hindiName: string;
  iconName: string;
  popular?: boolean;
  subcategories: Subcategory[];
}

export interface BusinessHours {
  days: string;
  openTime: string; // e.g. "09:00"
  closeTime: string; // e.g. "20:00"
  isOpenToday: boolean;
}

export interface Vendor {
  id: string;
  businessName: string;
  ownerName: string;
  phone: string;
  whatsapp: string;
  email?: string;
  categoryId: string;
  subcategoryId: string;
  services: string[];
  state: 'Gujarat';
  city: string;
  area: string;
  address: string;
  pincode: string;
  lat: number;
  lng: number;
  description: string;
  experienceYears: number;
  startingPrice?: number;
  rating: number;
  reviewCount: number;
  verificationStatus: 'verified' | 'pending' | 'rejected' | 'suspended';
  isPhoneVerified: boolean;
  isLocationVerified: boolean;
  isDocsVerified: boolean;
  isFeatured?: boolean;
  businessHours: BusinessHours;
  serviceAtCustomerLocation?: boolean;
  logoUrl: string;
  bannerUrl?: string;
  photos: string[];
  currentSnaps?: string[];
  liveVideoUrl?: string;
  stats: {
    views: number;
    calls: number;
    whatsapp: number;
    directions: number;
    qrScans: number;
    enquiries: number;
    totalEarnings: number;
  };
  qrToken: string;
  createdAt: string;
}

export interface Review {
  id: string;
  vendorId: string;
  customerName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  userCity?: string;
  verifiedBooking?: boolean;
  status: 'approved' | 'pending' | 'flagged';
  vendorReply?: string;
}

export interface EnquiryLead {
  id: string;
  vendorId: string;
  customerName: string;
  customerPhone: string;
  customerArea: string;
  service: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
  status: 'new' | 'contacted' | 'booked' | 'completed' | 'cancelled';
  createdAt: string;
  quotedPrice?: number;
  advancePaid?: number;
  paymentRef?: string;
}

export interface ChatMessage {
  id: string;
  vendorId: string;
  customerPhone?: string;
  sender: 'customer' | 'vendor';
  text: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  type: 'order' | 'promo' | 'inquiry' | 'review' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  vendorId?: string;
  amount?: number;
}

export interface ReportItem {
  id: string;
  vendorId: string;
  vendorName: string;
  reason: 'wrong_phone' | 'wrong_location' | 'duplicate' | 'fake_business' | 'abuse' | 'other';
  details: string;
  reporterName: string;
  reporterPhone: string;
  status: 'pending' | 'resolved' | 'dismissed';
  date: string;
}

export interface SearchFilters {
  query: string;
  city: string;
  area: string;
  category: string;
  subcategory: string;
  verifiedOnly: boolean;
  openNowOnly: boolean;
  minRating: number;
  maxDistanceKm: number;
  serviceType: string;
  sortBy: 'recommended' | 'rating' | 'distance' | 'price_low';
}
