import { useForm } from 'react-hook-form';
import { inquiryAPI } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function InquiryForm({ vendorId, vendorName }) {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    }
  });

  const onSubmit = async (data) => {
    try {
      await inquiryAPI.submit({ ...data, vendor_id: vendorId });
      toast.success('Inquiry sent! The vendor will contact you soon.');
      setSubmitted(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending inquiry');
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-6 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-display text-xl text-charcoal mb-2">Inquiry Sent!</h3>
        <p className="font-sans text-sm text-gray-500">
          {vendorName} will reach out to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6">
      <h3 className="font-display text-lg text-charcoal mb-4">Send Inquiry to {vendorName}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input {...register('name', { required: 'Name is required' })}
            placeholder="Your Name" className="input-field" />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
            placeholder="Email Address" className="input-field" />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <input {...register('phone')} placeholder="Phone Number (optional)" className="input-field" />
        </div>
        <div>
          <input {...register('event_date')} type="date" className="input-field" />
        </div>
        <div>
          <textarea {...register('message', { required: 'Message is required' })}
            placeholder="Tell us about your wedding..."
            rows={3} className="input-field resize-none"
          />
          {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-primary w-full text-sm py-3 disabled:opacity-60">
          {isSubmitting ? 'Sending...' : 'Send Inquiry'}
        </button>
      </form>
    </div>
  );
}