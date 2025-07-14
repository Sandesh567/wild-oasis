
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://eavajqpavntbhamunynq.supabase.co'
//our project key
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhdmFqcXBhdm50YmhhbXVueW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2ODQ5NDYsImV4cCI6MjA2NzI2MDk0Nn0.X7K6rMP8EmJFHLnIoVqXCBzA97uVm6X1JHiEwiWg8iU";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;