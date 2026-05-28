import { NextResponse } from 'next/server';
import { getCMSData, saveCMSData } from '@/lib/data-service';

export async function POST(req: Request) {
  try {
    const { category, slug, primaryKeyword, h1, intent, contentType } = await req.json();

    if (!category || !slug || !h1) {
      return NextResponse.json({ error: 'Kategorie, Slug und H1 werden benötigt.' }, { status: 400 });
    }

    // Determine target database collection
    let dataCategory: 'services' | 'problems' | 'locations';
    let cmsCategoryType: 'service' | 'problem' | 'location';
    
    // Map categories
    if (category === 'leistungen' || category === 'service') {
      dataCategory = 'services';
      cmsCategoryType = 'service';
    } else if (category === 'problemfaelle' || category === 'problem') {
      dataCategory = 'problems';
      cmsCategoryType = 'problem';
    } else if (category === 'zuerich' || category === 'location') {
      dataCategory = 'locations';
      cmsCategoryType = 'location';
    } else {
      return NextResponse.json({ error: 'Kategorie nicht unterstützt für direktes CMS-Mapping (nur Leistungen, Problemfälle und Zürich/Standorte).' }, { status: 400 });
    }

    // Load existing items
    const items = await getCMSData(dataCategory);
    
    // Extract base slug (e.g. remove leading directory paths)
    const cleanSlug = slug.split('/').pop() || slug;

    // Check if it already exists
    const exists = items.some((i: any) => i.slug === cleanSlug);
    if (exists) {
      return NextResponse.json({ 
        success: true, 
        message: 'Seite existiert bereits.',
        editUrl: `/admin/seo/edit/${cmsCategoryType}/${cleanSlug}`
      });
    }

    // Create new item with premium defaults matching copywriting guides
    const newItem: any = {
      slug: cleanSlug,
      focusKeyword: primaryKeyword || h1,
      h1: h1,
      metaTitle: `${h1} | parkett-pflege.ch`,
      metaDescription: `${h1} in Zürich: Professionelle Fachberatung, transparente Preise und rascher Service. Erhalten Sie eine Fotoanalyse!`,
      intro: `Hier finden Sie fachliche Unterstützung und lösungsorientierte Tipps zum Thema ${h1} für Ihren Parkettboden im Grossraum Zürich. Wir bewahren Werte und retten Parkett.`,
      imageUrl: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80',
      contentMarkdown: `## Warum ${h1} für Ihr Parkett wichtig ist\n\nEin gepflegter Parkettboden verleiht Wohnräumen eine natürliche, behagliche Ausstrahlung. Wenn jedoch Abnutzungserscheinungen oder Schäden auftreten, ist schnelles und fachgerechtes Handeln entscheidend. Mit dem richtigen Vorgehen lässt sich die Lebensdauer Ihres Bodens um Jahrzehnte verlängern.\n\n### Wann ist diese Massnahme sinnvoll?\n\nEs lohnt sich immer dann, wenn Sie den ursprünglichen Charakter des Holzes erhalten möchten, ohne gleich den gesamten Boden kostspielig austauschen zu müssen. Unser Leitsatz bei **parkett-pflege.ch** lautet: *Parkett retten statt ersetzen*.\n\n### Ihre Vorteile auf einen Blick\n\n- **Werterhalt:** Schützt das Holz tiefenwirksam vor Feuchtigkeit und Schmutz.\n- **Aesthetic:** Belebt die natürliche Holzmaserung und Haptik neu.\n- **Nachhaltigkeit:** Erspart Ihnen Staub, Lärm und unnötigen Materialersatz.\n\n## Häufige Fragen & Antworten\n\n**Wie lange dauert die Behandlung?**\nIn der Regel können die Arbeiten an einem einzigen Arbeitstag durchgeführt werden. Nach einer kurzen Trocknungsphase ist der Raum wieder voll begehbar.\n\n**Was kostet die Pflege?**\nDie Preise richten sich nach der genauen Quadratmeterzahl und dem Holzzustand. Gerne erstellen wir Ihnen eine präzise Einschätzung über unsere kostenlose Fotoanalyse.`,
      benefits: [
        { title: 'Werterhalt', description: 'Schützt das Holz nachhaltig vor tiefem Verschmutzen.' },
        { title: 'Fachmännisch', description: 'Ausgeführt von erfahrenen Schweizer Parkett-Experten.' }
      ],
      processSteps: [
        { step: 1, title: 'Einschätzung', description: 'Schadensanalyse per Foto oder Besichtigung vor Ort.' },
        { step: 2, title: 'Ausführung', description: 'Schonende Tiefenreinigung, Pflege oder lokale Reparatur.' },
        { step: 3, title: 'Werterhalt', description: 'Langfristige Pflegeberatung und Schutz der Oberfläche.' }
      ],
      stats: [
        { label: 'Dauer', value: '1 Tag' },
        { label: 'Einschätzung', value: 'Fotoanalyse' }
      ]
    };

    // Push and save
    items.push(newItem);
    await saveCMSData(dataCategory, items);

    return NextResponse.json({ 
      success: true, 
      message: 'Seite erfolgreich im CMS angelegt!',
      editUrl: `/admin/seo/edit/${cmsCategoryType}/${cleanSlug}`
    });

  } catch (error: any) {
    console.error('Create from brief error:', error);
    return NextResponse.json({ error: error.message || 'Fehler beim Erstellen der Seite' }, { status: 500 });
  }
}
