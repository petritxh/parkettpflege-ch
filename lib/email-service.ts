// Dummy E-Mail Service
// Sobald Sie einen Resend API Key haben, tauschen wir dies einfach gegen resend.emails.send() aus.

export async function sendEmail(to: string, subject: string, text: string) {
  console.log('\n=======================================');
  console.log('📧 E-MAIL SIMULATION (Wird später gesendet)');
  console.log('=======================================');
  console.log(`An:       ${to}`);
  console.log(`Betreff:  ${subject}`);
  console.log('---------------------------------------');
  console.log(text);
  console.log('=======================================\n');
  
  // Simulierte Verzögerung
  await new Promise(resolve => setTimeout(resolve, 800));
}
