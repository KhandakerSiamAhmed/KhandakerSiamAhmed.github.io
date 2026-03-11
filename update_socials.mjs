import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// simple .env.local parser (handles \r\n)
const env = fs.readFileSync('.env.local', 'utf-8').split(/\r?\n/).reduce((acc, line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        acc[match[1]] = match[2].replace(/["']/g, '').trim();
    }
    return acc;
}, {});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing supabase credentials from .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    console.log("Fetching config from Supabase...");
    const { data, error } = await supabase.from('config').select('*').eq('key', 'global').single();
    if (error) {
        console.error("Error fetching config:", error);
        return;
    }

    let config = data.value || {};
    let socials = config.socials || {};
    let socialPriority = config.socialPriority || {};

    socials.linkedin = socials.linkedin || 'https://www.linkedin.com/in/khandakersiamahmed/';
    socials.facebook = socials.facebook || 'https://www.facebook.com/khandaker.siam.ahmed.mahin';
    socials.github = socials.github || 'https://github.com/KhandakerSiamAhmed';
    socials.grabcad = socials.grabcad || 'https://grabcad.com/khandaker.siam.ahmed-2';
    socials.researchgate = socials.researchgate || 'https://www.researchgate.net/profile/Khandaker-Ahmed-9?ev=hdr_xprf';
    socials.orcid = socials.orcid || 'https://orcid.org/my-orcid?orcid=0009-0002-6427-2956';
    socials.instructables = socials.instructables || 'https://www.instructables.com/member/khandakersiamahmed/';
    socials.hackaday = socials.hackaday || 'https://hackaday.io/khandakersiamahmed';

    // Set default priorities if they don't exist
    socialPriority.linkedin = socialPriority.linkedin || 1;
    socialPriority.github = socialPriority.github || 2;
    socialPriority.researchgate = socialPriority.researchgate || 3;
    socialPriority.orcid = socialPriority.orcid || 4;
    socialPriority.instructables = socialPriority.instructables || 5;
    socialPriority.hackaday = socialPriority.hackaday || 6;
    socialPriority.grabcad = socialPriority.grabcad || 7;
    socialPriority.facebook = socialPriority.facebook || 8;

    config.socials = socials;
    config.socialPriority = socialPriority;
    
    console.log("Updating config in Supabase...");
    const { error: updateError } = await supabase.from('config').upsert({ key: 'global', value: config });
    
    if (updateError) {
        console.error("Error updating config:", updateError);
    } else {
        console.log('Successfully updated defaults in Supabase!');
    }
}
run();
