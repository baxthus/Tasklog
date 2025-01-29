import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const { code, next } = getQuery(event);

  if (code) {
    const supabase = await serverSupabaseClient(event);

    const { error } = await supabase.auth.exchangeCodeForSession(code as string);
    if (error) {
      throw createError({ statusCode: 400, message: error.message });
    }

    await sendRedirect(event, next as string | undefined ?? '/');
    return;
  }

  throw createError({ statusCode: 400, message: 'Invalid code' });
});
