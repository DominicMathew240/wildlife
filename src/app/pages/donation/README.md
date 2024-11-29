
# Donation Page

A dynamic donation page that allows users to make contributions to wildlife conservation efforts.

## Features

- Pre-defined donation amounts (RM 5, 10, 20, 50, 100) and custom amount option
- Form validation for required fields
- Real-time email validation
- Interactive UI with visual feedback
- Loading states during donation processing
- Thank you modal after successful donation
- Certificate generation and email sending functionality

## Components Used

- StickyHeader: Navigation header that remains fixed
- ThankYouModal: Displays after successful donation
- Header & Footer: Standard page layout components

## Form Fields

1. Donation Amount Selection
2. Full Name (required)
3. Email Address (required)
4. Phone Number (optional)
5. Message (optional)

## API Integration

Connects to a backend service at `http://localhost:4000/send-certificate` to process donations and send certificates.