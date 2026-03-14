import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { inquiryAPI } from '../api/auth';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await inquiryAPI.submit(data);
      toast.success('Message sent! We will get back to you soon.');
      setSubmitted(true);
      reset();
    } catch {
      toast.error('Error sending message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-20">
      {/* Header */}
      <div className="bg-charcoal py-16 text-center">
        <p className="font-serif text-gold-400 italic mb-2">We're Here to Help</p>
        <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Contact Us</h1>
        <p className="font-sans text-gray-400 text-sm">Get in touch with our wedding planning experts</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="font-display text-3xl text-charcoal mb-6">Let's Plan Your Perfect Day</h2>
            <p className="font-sans text-gray-500 text-sm leading-relaxed mb-8">
              Our wedding planning experts are available Monday to Saturday, 9am to 7pm IST. 
              We'll help you connect with the right vendors for your dream wedding.
            </p>

            <div className="space-y-5">
              {[
                { icon: Phone, label: 'Call Us', value: '+91 98765 43210' },
                { icon: Mail, label: 'Email Us', value: 'hello@eternalvows.in' },
                { icon: MessageCircle, label: 'WhatsApp', value: '+91 98765 43210' },
                { icon: MapPin, label: 'Our Office', value: 'Connaught Place, New Delhi, India' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-50 border border-gold-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="font-sans text-xs text-gray-400">{label}</p>
                    <p className="font-sans text-sm font-medium text-charcoal">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">💌</div>
                <h3 className="font-display text-2xl text-charcoal mb-2">Message Sent!</h3>
                <p className="font-sans text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary mt-6 text-sm">
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl text-charcoal mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input {...register('name', { required: true })} placeholder="Your Name" className="input-field" />
                    </div>
                    <div>
                      <input {...register('phone')} placeholder="Phone Number" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <input {...register('email', { required: true })} placeholder="Email Address" type="email" className="input-field" />
                  </div>
                  <div>
                    <input {...register('event_date')} type="date" className="input-field" />
                  </div>
                  <div>
                    <textarea {...register('message', { required: true })}
                      rows={4} placeholder="Tell us about your wedding dreams..."
                      className="input-field resize-none"
                    />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 text-sm disabled:opacity-60">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}