# How to Build a Contact Form

This is how I built the dynamic contact form for All Da Smoke. The form changes what questions it shows based on what the user selects from a dropdown - so if someone picks "Catering", they see catering questions, if they pick "Reservations", they see reservation fields, etc.

## What I Was Trying to Solve

You know how most contact forms are super generic and ask for stuff that doesn't always make sense? Like, if someone wants catering info, why ask them about reservations? I wanted to make a form that's actually smart and only shows relevant questions.

The basic idea: User picks "Catering" from dropdown → Form shows catering-specific questions. User picks "Reservations" → Form shows reservation questions. Pretty simple concept, but took me a bit to figure out the React part.

## Step 1: Getting Started (The Basic Setup)

First things first, I needed to import useState because this whole thing relies on managing form state:

```javascript
import { useState } from 'react';
```

Then I set up my initial form state. This is basically all the data I want to collect:

```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  inquiryType: 'general', // This is the magic field that controls everything
});
```

**Note to self:** I made 'general' the default because most people probably just have general questions.

Next, I needed a way to update the form when people type stuff:

```javascript
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
```

**Reminder:** This function grabs whatever the user typed and updates the right field in my state. The `prev => ({...prev, [name]: value})` part just means "keep everything the same except update this one field."

## Step 2: Create the Base Form Fields

### 2.1 Basic Contact Information

```javascript
{
  /* Name and Email Row */
}
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
</div>;
```

### 2.2 Phone and Inquiry Type Dropdown

```javascript
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
      <span className="label-text font-medium">Inquiry Type</span>
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
```

## Step 3: Create the Dynamic Fields Function

### 3.1 Define the renderAdditionalFields Function

```javascript
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
                <span className="label-text font-medium">Number of Guests</span>
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
                <span className="label-text font-medium">Special Occasion</span>
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
```

## Step 4: Integrate Dynamic Fields into Form

### 4.1 Add the Dynamic Fields Call

Place this after your subject field and before the message field:

```javascript
{
  /* Subject */
}
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
</div>;

{
  /* Dynamic Additional Fields */
}
{
  renderAdditionalFields();
}

{
  /* Message */
}
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
</div>;
```

## Step 5: Handle Form Submission

### 5.1 Create Submit Handler

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Form submitted:', formData);
  // Add your form submission logic here
  // e.g., send to API, email service, etc.
};
```

### 5.2 Add Submit Button

```javascript
<div className="card-actions justify-end pt-4">
  <button type="submit" className="btn btn-primary btn-lg">
    Send Message
  </button>
</div>
```

## Step 6: Styling and Framework Integration

### 6.1 Required CSS Frameworks

This implementation uses:

- **TailwindCSS** for utility classes
- **DaisyUI** for component styling
- **Bootstrap Icons** for icons

### 6.2 Install Dependencies

```bash
npm install tailwindcss daisyui
```

### 6.3 Add to Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  plugins: [require('daisyui')],
};
```

## Step 7: Advanced Features

### 7.1 Form Validation

Add validation for required fields based on inquiry type:

```javascript
const validateForm = () => {
  const errors = {};

  if (!formData.name) errors.name = 'Name is required';
  if (!formData.email) errors.email = 'Email is required';
  if (!formData.message) errors.message = 'Message is required';

  // Add specific validations based on inquiry type
  if (formData.inquiryType === 'catering') {
    if (!formData.eventDate) errors.eventDate = 'Event date is required';
    if (!formData.guestCount) errors.guestCount = 'Guest count is required';
  }

  return errors;
};
```

### 7.2 Clear Dynamic Fields on Type Change

Modify the handleInputChange to clear related fields when inquiry type changes:

```javascript
const handleInputChange = (e) => {
  const { name, value } = e.target;

  if (name === 'inquiryType') {
    // Clear fields specific to the previous inquiry type
    const clearedData = { ...formData };
    // Remove inquiry-specific fields
    delete clearedData.eventDate;
    delete clearedData.guestCount;
    delete clearedData.eventType;
    delete clearedData.reservationDate;
    delete clearedData.reservationTime;
    delete clearedData.partySize;
    delete clearedData.occasion;
    delete clearedData.position;
    delete clearedData.experience;
    delete clearedData.availability;
    delete clearedData.visitDate;

    setFormData({
      ...clearedData,
      [name]: value,
    });
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};
```

## Step 8: Testing the Implementation

### 8.1 Test Cases

1. **Default State**: Form shows basic fields with "General Inquiry" selected
2. **Catering Selection**: Shows event date, guest count, and event type fields
3. **Reservations Selection**: Shows date, time, party size, and occasion fields
4. **Careers Selection**: Shows position, experience, and availability fields
5. **Feedback Selection**: Shows visit date field
6. **Form Submission**: All data (base + dynamic fields) is captured correctly

### 8.2 Accessibility Considerations

- Ensure all form fields have proper labels
- Add ARIA attributes for screen readers
- Maintain logical tab order
- Provide clear error messages

## Step 9: Integration with Your Project

### 9.1 Project-Specific Implementation

In your All Da Smoke project, this is implemented in:

- **File**: `client/src/pages/ContactPage/ContactPage.jsx`
- **Layout**: Uses `HeroLayout` component for consistent styling
- **Theme**: Uses `data-theme="lofi"` for DaisyUI theming
- **Fonts**: Uses `font-stardos-stencil-bold` for headings

### 9.2 Contact Information Section

The contact page also includes:

- Restaurant information (address, phone, email)
- Hours of operation
- Quick contact buttons
- Map placeholder
- FAQ section

### 9.3 Data Integration

Form data can be integrated with:

- Firebase for data storage
- Email services for notifications
- CRM systems for lead management

## Conclusion

This dynamic contact form implementation provides a professional, user-friendly experience that adapts to different inquiry types. The modular approach makes it easy to add new inquiry types or modify existing ones. The use of React hooks ensures efficient state management and smooth user interactions.

Key benefits:

- **Improved UX**: Users only see relevant fields
- **Better Data Collection**: More targeted information gathering
- **Maintainable Code**: Modular structure for easy updates
- **Professional Appearance**: Consistent styling with modern frameworks

## Field Mapping by Inquiry Type

| Inquiry Type | Additional Fields                                            |
| ------------ | ------------------------------------------------------------ |
| General      | None                                                         |
| Catering     | Event Date, Guest Count, Event Type                          |
| Reservations | Preferred Date, Preferred Time, Party Size, Special Occasion |
| Careers      | Position, Years of Experience, Availability                  |
| Feedback     | Visit Date                                                   |

This implementation ensures that each inquiry type collects the most relevant information while maintaining a clean, professional interface.
