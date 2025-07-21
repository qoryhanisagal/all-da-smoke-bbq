import HeroLayout from '../../components/HeroLayout/HeroLayout';
import {
  heroBackgrounds,
  contentBackgrounds,
} from '../../data/backgroundImages';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const renderAdditionalFields = () => {
    switch (formData.inquiryType) {
      case 'catering':
        return (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Event Date</span>
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate || ''}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Number of Guests
                  </span>
                </label>
                <input
                  type="number"
                  name="guestCount"
                  value={formData.guestCount || ''}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="50"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Event Type</span>
              </label>
              <select
                name="eventType"
                value={formData.eventType || ''}
                onChange={handleInputChange}
                className="select select-bordered w-full"
              >
                <option value="">Select event type</option>
                <option value="corporate">Corporate Event</option>
                <option value="wedding">Wedding</option>
                <option value="birthday">Birthday Party</option>
                <option value="graduation">Graduation</option>
                <option value="other">Other</option>
              </select>
            </div>
          </>
        );

      case 'reservations':
        return (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Preferred Date</span>
                </label>
                <input
                  type="date"
                  name="reservationDate"
                  value={formData.reservationDate || ''}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Preferred Time</span>
                </label>
                <input
                  type="time"
                  name="reservationTime"
                  value={formData.reservationTime || ''}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Party Size</span>
                </label>
                <input
                  type="number"
                  name="partySize"
                  value={formData.partySize || ''}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="4"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Special Occasion
                  </span>
                </label>
                <select
                  name="occasion"
                  value={formData.occasion || ''}
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                >
                  <option value="">None</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="date">Date Night</option>
                  <option value="business">Business Meeting</option>
                </select>
              </div>
            </div>
          </>
        );

      case 'careers':
        return (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Position of Interest
                  </span>
                </label>
                <select
                  name="position"
                  value={formData.position || ''}
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select position</option>
                  <option value="server">Server</option>
                  <option value="cook">Cook</option>
                  <option value="manager">Manager</option>
                  <option value="host">Host/Hostess</option>
                  <option value="bartender">Bartender</option>
                  <option value="dishwasher">Dishwasher</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Years of Experience
                  </span>
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience || ''}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="2"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Availability</span>
              </label>
              <select
                name="availability"
                value={formData.availability || ''}
                onChange={handleInputChange}
                className="select select-bordered w-full"
              >
                <option value="">Select availability</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="weekends">Weekends only</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </>
        );

      case 'feedback':
        return (
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Visit Date</span>
            </label>
            <input
              type="date"
              name="visitDate"
              value={formData.visitDate || ''}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div data-theme="lofi">
      <HeroLayout
        allowStacking={false}
        heroImage={heroBackgrounds.hero1}
        heroTitle="Contact Us"
        heroSubtitle="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        contentBackgroundImage={contentBackgrounds.woodTexture}
        heroTitleClass="text-accent text-center font-stardos-stencil-bold"
        heroSubtitleClass="text-primary-content font-stardos-stencil-normal text-accent-content"
      >
        <div className="container mx-auto px-4 py-12">
          {/* Contact Form and Info Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl font-stardos-stencil-bold text-primary mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name and Email Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Name *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Email *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone and Subject Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Phone</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Inquiry Type
                        </span>
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="select select-bordered w-full"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="catering">Catering</option>
                        <option value="reservations">Reservations</option>
                        <option value="feedback">Feedback</option>
                        <option value="careers">Careers</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Subject</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  {/* Dynamic Additional Fields */}
                  {renderAdditionalFields()}

                  {/* Message */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Message *</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="textarea textarea-bordered h-32 w-full"
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="card-actions justify-end pt-4">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Restaurant Info */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-xl font-stardos-stencil-bold text-primary">
                    Restaurant Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <i className="bi bi-geo-alt-fill text-primary text-xl mt-1"></i>
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-base-content/70">
                          Primary Location
                          <br />
                          Victorville, CA 92392
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="bi bi-telephone-fill text-primary text-xl mt-1"></i>
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-base-content/70"> (760) 885–7425</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="bi bi-envelope-fill text-primary text-xl mt-1"></i>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-base-content/70">
                          info@alldasmoke.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-xl font-stardos-stencil-bold text-primary">
                    Hours of Operation
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday - Thursday</span>
                      <span>11:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Friday - Saturday</span>
                      <span>11:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday</span>
                      <span>12:00 PM - 8:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-xl font-stardos-stencil-bold text-primary">
                    Quick Contact
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="tel:+15551234567"
                      className="btn btn-outline btn-block"
                    >
                      <i className="bi bi-telephone-fill"></i>
                      Call Now
                    </a>
                    <a
                      href="mailto:info@alldasmoke.com"
                      className="btn btn-outline btn-block"
                    >
                      <i className="bi bi-envelope-fill"></i>
                      Email Us
                    </a>
                    <button className="btn btn-outline btn-block">
                      <i className="bi bi-calendar-check-fill"></i>
                      Make Reservation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-xl font-stardos-stencil-bold text-primary mb-4">
                Find Us
              </h3>
              <div className="bg-base-200 h-64 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <i className="bi bi-geo-alt text-4xl text-primary mb-2"></i>
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-base-content/70">
                    Map integration coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-stardos-stencil-bold text-primary mb-8 text-center">
              Frequently Asked Questions
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h4 className="card-title text-lg">
                    Do you take reservations?
                  </h4>
                  <p className="text-base-content/70">
                    Yes! We accept reservations for parties of 4 or more. Call
                    us or use our online reservation system.
                  </p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h4 className="card-title text-lg">
                    Do you offer catering services?
                  </h4>
                  <p className="text-base-content/70">
                    Absolutely! We cater events of all sizes. Contact us for a
                    custom quote and menu options.
                  </p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h4 className="card-title text-lg">Is parking available?</h4>
                  <p className="text-base-content/70">
                    We have a large parking lot with plenty of free parking
                    spaces for our guests.
                  </p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h4 className="card-title text-lg">
                    Do you have vegetarian options?
                  </h4>
                  <p className="text-base-content/70">
                    Yes! While we specialize in BBQ, we offer several delicious
                    vegetarian sides and salads.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeroLayout>
    </div>
  );
}
