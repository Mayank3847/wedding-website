import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { userAPI, inquiryAPI } from '../api/auth';
import { useEffect } from 'react';
import { User, Heart, MessageSquare, Settings, LogOut, Clock, CheckCircle, XCircle } from 'lucide-react';
import VendorCard from '../components/vendors/VendorCard';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) navigate({ to: '/login' });
  }, [isLoggedIn]);

  const { data: bookmarksData } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: userAPI.getBookmarks,
    enabled: isLoggedIn,
  });

  const { data: inquiriesData } = useQuery({
    queryKey: ['my-inquiries'],
    queryFn: inquiryAPI.getMine,
    enabled: isLoggedIn,
  });

  const bookmarks = bookmarksData?.data?.bookmarks || [];
  const inquiries = inquiriesData?.data?.inquiries || [];

  const statusIcon = {
    pending: <Clock size={14} className="text-yellow-500" />,
    replied: <CheckCircle size={14} className="text-green-500" />,
    closed: <XCircle size={14} className="text-gray-400" />,
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cream pt-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-charcoal to-gray-800 rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-20"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="font-serif text-gold-400 italic mb-1">Welcome back</p>
              <h1 className="font-display text-3xl md:text-4xl text-white">{user.name} 👋</h1>
              <p className="font-sans text-gray-400 text-sm mt-1">{user.email}</p>
            </div>
            <button
              onClick={() => { logout(); navigate({ to: '/' }); }}
              className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors font-sans text-sm"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Heart, label: 'Saved Vendors', count: bookmarks.length, color: 'text-red-400', bg: 'bg-red-50' },
            { icon: MessageSquare, label: 'Inquiries Sent', count: inquiries.length, color: 'text-blue-400', bg: 'bg-blue-50' },
            { icon: CheckCircle, label: 'Replied', count: inquiries.filter(i => i.status === 'replied').length, color: 'text-green-400', bg: 'bg-green-50' },
            { icon: Clock, label: 'Pending', count: inquiries.filter(i => i.status === 'pending').length, color: 'text-yellow-400', bg: 'bg-yellow-50' },
          ].map(({ icon: Icon, label, count, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl p-5 card">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={18} className={color} />
              </div>
              <div className="font-display text-2xl text-charcoal font-bold">{count}</div>
              <div className="font-sans text-xs text-gray-400 mt-1">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Saved Vendors */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl text-charcoal">Saved Vendors</h2>
              <Link to="/vendors" className="font-sans text-sm text-gold-500 hover:text-gold-600">
                Browse more →
              </Link>
            </div>
            {bookmarks.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center">
                <Heart size={32} className="text-gray-200 mx-auto mb-3" />
                <p className="font-sans text-gray-400 text-sm">No saved vendors yet</p>
                <Link to="/vendors" className="btn-primary mt-4 text-sm inline-block">
                  Explore Vendors
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bookmarks.slice(0, 4).map((v) => (
                  <VendorCard key={v.id} vendor={v} />
                ))}
              </div>
            )}
          </div>

          {/* Inquiries */}
          <div>
            <h2 className="font-display text-2xl text-charcoal mb-4">My Inquiries</h2>
            <div className="space-y-3">
              {inquiries.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center">
                  <MessageSquare size={32} className="text-gray-200 mx-auto mb-3" />
                  <p className="font-sans text-gray-400 text-sm">No inquiries yet</p>
                </div>
              ) : (
                inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="bg-white rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-sans text-xs font-medium text-charcoal">
                        {inquiry.vendor_name || 'General Inquiry'}
                      </span>
                      <div className="flex items-center gap-1">
                        {statusIcon[inquiry.status]}
                        <span className="font-sans text-xs capitalize text-gray-500">{inquiry.status}</span>
                      </div>
                    </div>
                    <p className="font-sans text-xs text-gray-400 line-clamp-2">{inquiry.message}</p>
                    <p className="font-sans text-xs text-gray-300 mt-2">
                      {new Date(inquiry.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}