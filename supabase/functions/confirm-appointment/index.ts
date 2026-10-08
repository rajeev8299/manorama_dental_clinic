import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const EMAIL_FROM = Deno.env.get('EMAIL_FROM') || 'appointments@yourdentalclinic.com' // Adjust this to your verified sender domain

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Verify Admin user using the provided Authorization header
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    // Initialize Admin client to bypass RLS and perform verification/updates
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify user is present in admin_users table
    const { data: adminCheck, error: adminError } = await supabaseAdmin
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single()

    if (adminError || !adminCheck) {
      throw new Error('Forbidden: Not an admin')
    }

    const { appointmentId } = await req.json()
    if (!appointmentId) throw new Error('Missing appointmentId')

    // 2. Fetch the appointment
    const { data: appointment, error: fetchError } = await supabaseAdmin
      .from('appointments')
      .select('*')
      .eq('id', appointmentId)
      .single()

    if (fetchError || !appointment) throw new Error('Appointment not found')

    // 3. Check if already confirmed
    if (appointment.status === 'Confirmed' || appointment.status === 'confirmed') {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Already confirmed', 
        emailSent: false 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // 4. Update status to Confirmed
    const { error: updateError } = await supabaseAdmin
      .from('appointments')
      .update({ status: 'Confirmed' })
      .eq('id', appointmentId)

    if (updateError) throw new Error('Failed to update status')

    let emailSent = false
    let emailMessage = 'No email address provided.'

    // 5. Send Email if email exists
    if (appointment.email) {
      if (!RESEND_API_KEY) {
        emailMessage = 'RESEND_API_KEY is not configured.'
      } else {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: EMAIL_FROM,
            to: appointment.email,
            subject: 'Appointment Confirmed — Manorama Multispeciality Dental Clinic',
            html: `
              <p>Dear ${appointment.name},</p>
              <p>Your appointment request with Manorama Multispeciality Dental Clinic has been confirmed.</p>
              <h3>Appointment Details:</h3>
              <ul>
                <li><strong>Patient Name:</strong> ${appointment.name}</li>
                <li><strong>Date:</strong> ${new Date(appointment.preferred_date).toLocaleDateString()}</li>
                <li><strong>Time:</strong> ${appointment.preferred_time}</li>
                <li><strong>Clinic:</strong> Manorama Multispeciality Dental Clinic</li>
                <li><strong>Location:</strong> Lohta, Varanasi, Uttar Pradesh, India</li>
                <li><strong>Contact:</strong> +91 81277 66794</li>
                <li><strong>Reason:</strong> ${appointment.message || 'Not specified'}</li>
              </ul>
              <p>We look forward to seeing you.</p>
              <p>Regards,<br/>Manorama Multispeciality Dental Clinic<br/>Dr. Amit Kumar Dubey, BDS</p>
            `
          })
        })

        if (res.ok) {
          emailSent = true
          emailMessage = 'Confirmation email sent.'
          // Log email sent in DB
          await supabaseAdmin
            .from('appointments')
            .update({ 
              confirmation_email_sent: true, 
              confirmation_email_sent_at: new Date().toISOString() 
            })
            .eq('id', appointmentId)
        } else {
          const resBody = await res.text();
          console.error('Failed to send email via Resend:', resBody)
          emailMessage = 'Failed to send confirmation email via Resend.'
        }
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      emailSent, 
      emailMessage 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
