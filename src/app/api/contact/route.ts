import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, supabase } from '@/lib/supabase';
import { contactSchema } from '@/lib/validations';
import { sendContactNotification, sendContactAutoReply } from '@/lib/email';

// Use admin client if available, otherwise fall back to public client
const db = supabaseAdmin || supabase;

/**
 * POST /api/contact
 * Submit a contact form message
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation des données échouée',
            fieldErrors: validationResult.error.errors.map((err) => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          },
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check for spam (simple rate limiting by email)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { count: recentCount, error: countError } = await (db as any)
      .from('contact_messages')
      .select('*', { count: 'exact', head: true })
      .eq('email', data.email)
      .gte('created_at', oneHourAgo);

    if (countError) {
      console.error('Error checking rate limit:', countError);
    } else if ((recentCount || 0) >= 3) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMITED',
            message: 'Vous avez envoyé trop de messages récemment. Veuillez réessayer plus tard.',
          },
        },
        { status: 429 }
      );
    }

    // Save message to database
    const { data: contactMessage, error: insertError } = await (db as any)
      .from('contact_messages')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
        status: 'new',
      })
      .select('*')
      .single();

    if (insertError || !contactMessage) {
      console.error('Error creating contact message:', insertError);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: 'Erreur lors de l\'enregistrement du message.',
          },
        },
        { status: 500 }
      );
    }

    // Send notification email to admin and auto-reply to user
    const emailData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    };

    // Send emails asynchronously
    Promise.all([
      sendContactNotification(emailData),
      sendContactAutoReply(emailData),
    ]).catch((error) => {
      console.error('Failed to send contact emails:', error);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Message envoyé avec succès',
        data: {
          id: contactMessage.id,
          name: contactMessage.name,
          email: contactMessage.email,
          subject: contactMessage.subject,
          createdAt: contactMessage.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contact message:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Une erreur est survenue lors de l\'envoi de votre message.',
        },
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Get all contact messages (admin only - should be protected in production)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);

    // Build query
    let query = db.from('contact_messages').select('*', { count: 'exact' });

    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }

    // Apply pagination and ordering
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data: messages, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Error fetching contact messages:', error);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: 'Erreur lors de la récupération des messages.',
          },
        },
        { status: 500 }
      );
    }

    const totalItems = count || 0;
    const totalPages = Math.ceil(totalItems / pageSize);

    return NextResponse.json({
      success: true,
      data: {
        items: messages || [],
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages,
          hasPrevious: page > 1,
          hasNext: page < totalPages,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Une erreur est survenue lors de la récupération des messages.',
        },
      },
      { status: 500 }
    );
  }
}
