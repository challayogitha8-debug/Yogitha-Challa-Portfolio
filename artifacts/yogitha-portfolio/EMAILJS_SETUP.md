# Contact form setup

1. Create an EmailJS service and template.
2. Add the values to a local `.env` file using `.env.example`.
3. Configure the template to use `to_email` as the recipient and `reply_to` as the reply-to address.
4. Restart the Vite dev server after changing environment variables.

The portfolio intentionally shows a configuration error instead of claiming delivery when the EmailJS variables are missing.